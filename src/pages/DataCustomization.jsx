import { useCallback, useEffect, useState } from "react";
import { Add } from "iconsax-react";
import {
	Button,
	ButtonGroup,
	Flex,
	Heading,
	useDisclosure,
} from "@chakra-ui/react";
import { Pagination } from "@/components/pagination/Pagination";
import { SearchBar } from "@/components/navigation";
import { FilterButton } from "@/components/buttons";
import { TableDataCustomization } from "@/components/tables";
import { LayoutDashboardContent } from "@/layout";
import { ModalAddCustomizationData } from "@/components/modal";
import { useDispatch, useSelector } from "react-redux";
import {
	clearCreatePromptState,
	clearDeletePromptState,
	clearFetchPromptState,
	clearFetchPromptsState,
	clearUpdatePromptState,
	createPrompt,
	createPromptSelector,
	deletePromptSelector,
	fetchPrompts,
	fetchPromptsSelector,
	updatePromptSelector,
} from "@/store/prompt";
import { Spinner } from "@/components/spinner";
import { useCustomToast, useDebounce } from "@/hooks";

const buttonLabels = ["Semua", "Sampah Anorganik", "Sampah Organik"];

function DataCustomization() {
	const dispatch = useDispatch();
	const {
		data = [],
		status,
		message,
		count,
	} = useSelector(fetchPromptsSelector);
	const { status: updateStatus, message: updateMessage } =
		useSelector(updatePromptSelector);
	const { status: deleteStatus, message: deleteMessage } =
		useSelector(deletePromptSelector);
	const { status: createStatus, message: createMessage } =
		useSelector(createPromptSelector);

	const [_searchTerm, setSearchTerm] = useState("");
	const searchTerm = useDebounce(_searchTerm, 500);

	const [isAddData, setIsAddData] = useState(false);

	const openForm = () => {
		setIsAddData(true);
	};

	const closeForm = () => {
		setIsAddData(false);
	};

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [activeFilter, setActiveFilter] = useState({
		label: "Semua",
		value: "",
	});

	const { onClose } = useDisclosure();

	const fetchPromptsData = useCallback(() => {
		dispatch(
			fetchPrompts({
				search: searchTerm,
				limit: itemsPerPage,
				page: currentPage,
				filter: activeFilter.value,
			})
		);
	}, [dispatch, searchTerm, itemsPerPage, currentPage, activeFilter]);

	useEffect(() => {
		fetchPromptsData();
	}, [searchTerm, itemsPerPage, currentPage, fetchPromptsData]);

	useEffect(() => {
		if (
			updateStatus === "success" ||
			deleteStatus === "success" ||
			createStatus === "success"
		) {
			fetchPromptsData();
			setSearchTerm("");
			setCurrentPage(1);
		}

		return () => {
			if (updateStatus !== "idle") dispatch(clearUpdatePromptState());
			if (deleteStatus !== "idle") dispatch(clearDeletePromptState());
			if (createStatus !== "idle") dispatch(clearCreatePromptState());
		};
	}, [fetchPromptsData, updateStatus, deleteStatus, createStatus, dispatch]);

	useEffect(() => {
		if (createStatus === "success" || createStatus === "failed") {
			onClose();
		}
	}, [createStatus, onClose]);

	useEffect(() => {
		return () => {
			dispatch(clearFetchPromptsState());
			dispatch(clearFetchPromptState());
			dispatch(clearUpdatePromptState());
			dispatch(clearDeletePromptState());
			dispatch(clearCreatePromptState());
		};
	}, [dispatch]);

	const filteredData = Object.values(data).filter((prompt) => {
		return prompt.question?.toLowerCase().includes(searchTerm.toLowerCase());
	});

	const filteredDataCount = (filter) => {
		switch (filter) {
			case "Sampah Anorganik":
				return count?.count_anorganic;
			case "Sampah Organik":
				return count?.count_organic;
			default:
				return count?.total_count;
		}
	};

	const handleSearch = (term) => {
		setSearchTerm(term);
		setCurrentPage(1);
	};

	const handleSubmitAdded = (data) => {
		dispatch(createPrompt(data));
	};

	const handleFilterClick = (filter) => {
		setCurrentPage(1);
		if (filter === "Sampah Organik") {
			setActiveFilter({ label: "Sampah Organik", value: "sampah organik" });
		} else if (filter === "Sampah Anorganik") {
			setActiveFilter({ label: "Sampah Anorganik", value: "sampah anorganik" });
		} else {
			setActiveFilter({ label: "Semua", value: "" });
		}
	};

	useCustomToast(updateStatus, updateMessage);
	useCustomToast(deleteStatus, deleteMessage);
	useCustomToast(createStatus, createMessage);

	return (
		<LayoutDashboardContent>
			{isAddData ? (
				<ModalAddCustomizationData
					isOpen={isAddData}
					onClose={closeForm}
					onSubmit={handleSubmitAdded}
				/>
			) : null}
			<div className="flex justify-between align-center">
				<Heading
					as="h1"
					color={"#201A18"}
					fontSize={"2xl"}
					fontWeight="bold"
					mt={"10px"}
				>
					Manage Data For Open AI
				</Heading>
				<Button
					leftIcon={<Add />}
					_hover={{ bg: "#2DA22D" }}
					bg={"#35CC33"}
					borderRadius={"lg"}
					color={"white"}
					fontWeight={"normal"}
					lineHeight={"1.5rem"}
					px={"1.5rem"}
					py={"1.5rem"}
					onClick={openForm}
				>
					Tambah Data
				</Button>
			</div>
			<div className="bg-white rounded-lg shadow-md mt-4 p-4 h-90% w-full">
				<Flex
					gap={"1.5rem"}
					p={"0.5rem"}
				>
					<ButtonGroup spacing={0}>
						{buttonLabels.map((label) => (
							<FilterButton
								key={label}
								label={label}
								activeFilter={activeFilter.label}
								handleFilterClick={handleFilterClick}
								filteredDataCount={filteredDataCount}
							/>
						))}
					</ButtonGroup>
					<SearchBar onSearch={handleSearch} />
				</Flex>
				<Flex
					direction={"column"}
					gap={"1.5rem"}
					p={"0.5rem"}
					marginTop={"16px"}
				>
					{status === "loading" && <Spinner />}
					{status === "failed" && <div>{message}</div>}
					{status === "success" && (
						<>
							<TableDataCustomization data={filteredData} />
							<Pagination
								currentPage={currentPage}
								itemsPerPage={itemsPerPage}
								onChangeItemsPerPage={setItemsPerPage}
								onChangePage={setCurrentPage}
								totalItems={filteredDataCount(activeFilter.label)}
							/>
						</>
					)}
				</Flex>
			</div>
		</LayoutDashboardContent>
	);
}

export default DataCustomization;
