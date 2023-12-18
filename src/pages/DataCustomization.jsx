import { Add } from "iconsax-react";
import { Button, ButtonGroup, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import {
	clearCreatePromptState,
	clearDeletePromptState,
	clearFetchPromptsState,
	clearFetchPromptState,
	clearUpdatePromptState,
	createPrompt,
	createPromptSelector,
	deletePromptSelector,
	fetchPrompts,
	fetchPromptsSelector,
	updatePromptSelector,
} from "@/store/prompt";
import { FilterButton } from "@/components/buttons";
import { LayoutDashboardContent } from "@/layout";
import { ModalAddCustomizationData } from "@/components/modal";
import { Pagination } from "@/components/pagination/Pagination";
import { SearchBar } from "@/components/navigation";
import { Spinner } from "@/components/spinner";
import { TableDataCustomization } from "@/components/tables";
import { useCallback, useEffect, useState } from "react";
import { useCustomToast, useDebounce } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";

const BUTTON_LABELS = ["Semua", "Sampah Anorganik", "Sampah Organik", "Informasi", "Batasan"];

function DataCustomization() {
	const dispatch = useDispatch();
	const { data = [], status, message, count } = useSelector(fetchPromptsSelector);
	const { status: updateStatus, message: updateMessage } = useSelector(updatePromptSelector);
	const { status: deleteStatus, message: deleteMessage } = useSelector(deletePromptSelector);
	const { status: createStatus, message: createMessage } = useSelector(createPromptSelector);

	const [_searchTerm, setSearchTerm] = useState("");
	const searchTerm = useDebounce(_searchTerm, 500);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [refreshData, setRefreshData] = useState(false);
	const [activeFilter, setActiveFilter] = useState({
		label: "Semua",
		value: "",
	});

	const { isOpen, onOpen, onClose } = useDisclosure();

	useCustomToast(updateStatus, updateMessage);
	useCustomToast(deleteStatus, deleteMessage);
	useCustomToast(createStatus, createMessage);

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
	}, [fetchPromptsData, refreshData]);

	useEffect(() => {
		if (updateStatus === "success" || deleteStatus === "success" || createStatus === "success") {
			setSearchTerm("");
			setCurrentPage(1);
			setRefreshData((prev) => !prev);
		}

		return () => {
			if (updateStatus !== "idle") dispatch(clearUpdatePromptState());
			if (deleteStatus !== "idle") dispatch(clearDeletePromptState());
			if (createStatus !== "idle") dispatch(clearCreatePromptState());
		};
	}, [updateStatus, deleteStatus, createStatus, dispatch]);

	useEffect(() => {
		return () => {
			dispatch(clearFetchPromptsState());
			dispatch(clearFetchPromptState());
		};
	}, [dispatch]);

	const filteredData = Object.values(data).filter((prompt) => {
		return prompt.question?.toLowerCase().includes(searchTerm.toLowerCase());
	});

	const filteredDataCount = (filter) => {
		switch (filter) {
			case "Sampah Anorganik":
				return count?.count_anorganic || 0;
			case "Sampah Organik":
				return count?.count_organic || 0;
			case "Informasi":
				return count?.count_information || 0;
			case "Batasan":
				return count?.count_limitation || 0;
			default:
				return count?.total_count || 0;
		}
	};

	const handleFilterClick = (filter) => {
		setCurrentPage(1);
		if (filter === "Sampah Organik") {
			setActiveFilter({ label: "Sampah Organik", value: "sampah organik" });
		} else if (filter === "Sampah Anorganik") {
			setActiveFilter({ label: "Sampah Anorganik", value: "sampah anorganik" });
		} else if (filter === "Informasi") {
			setActiveFilter({ label: "Informasi", value: "informasi" });
		} else if (filter === "Batasan") {
			setActiveFilter({ label: "Batasan", value: "batasan" });
		} else {
			setActiveFilter({ label: "Semua", value: "" });
		}
	};

	const handleSearch = (term) => {
		setSearchTerm(term);
		setCurrentPage(1);
	};

	const handleSubmitAdded = (data) => {
		dispatch(createPrompt(data)).then(() => {
			if (createStatus === "success") {
				onClose();
			}
		});
	};

	return (
		<LayoutDashboardContent>
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
					onClick={onOpen}
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
						{BUTTON_LABELS.map((label) => (
							<FilterButton
								key={label}
								label={label}
								activeFilter={activeFilter.label}
								handleFilterClick={handleFilterClick}
								filteredDataCount={filteredDataCount}
								isDisabled={status}
							/>
						))}
					</ButtonGroup>
					<SearchBar
						onSearch={handleSearch}
						value={_searchTerm}
					/>
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
			<ModalAddCustomizationData
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={handleSubmitAdded}
			/>
		</LayoutDashboardContent>
	);
}

export default DataCustomization;
