import { Flex, Heading } from "@chakra-ui/react";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { useCallback, useEffect, useState } from "react";
import { Add } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";
import { TableRubbishCategory } from "@/components/tables";
import { ModalAddRubbishCategory } from "@/components/modal";
import { LayoutDashboardContent } from "@/layout";
import {
	clearCreateTrashesState,
	clearDeleteTrashesState,
	clearFetchTrashState,
	clearFetchTrashesState,
	clearUpdateTrashesState,
	createTrashes,
	createTrashesSelector,
	deleteTrashesSelector,
	fetchTrashSelector,
	fetchTrashes,
	fetchTrashesSelector,
	updateTrashesSelector,
} from "@/store/trash-category";
import { useDispatch, useSelector } from "react-redux";
import { useCustomToast, useDebounce } from "@/hooks";
import { Spinner } from "@/components/spinner";

function RubbishCategory() {
	const dispatch = useDispatch();
	const { data = [], status, message } = useSelector(fetchTrashesSelector);
	const { status: updateStatus, message: updateMessage } = useSelector(
		updateTrashesSelector
	);
	const { status: deleteStatus, message: deleteMessage } = useSelector(
		deleteTrashesSelector
	);
	const { status: createStatus, message: createMessage } = useSelector(
		createTrashesSelector
	);

	const [_searchTerm, setSearchTerm] = useState("");
	const searchTerm = useDebounce(_searchTerm, 500);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [totalItems, setTotalItems] = useState(0);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const fetchTrashData = useCallback(() => {
		dispatch(
			fetchTrashes({
				search: searchTerm,
				limit: itemsPerPage,
				page: currentPage,
			})
		).then((res) => {
			if (res.payload) {
				setTotalItems(res.payload.count_data);
			}
		});
	}, [dispatch, searchTerm, itemsPerPage, currentPage]);

	useEffect(() => {
		fetchTrashData();
	}, [searchTerm, itemsPerPage, currentPage, fetchTrashData]);

	useEffect(() => {
		if (
			updateStatus === "success" ||
			deleteStatus === "success" ||
			createStatus === "success"
		) {
			setSearchTerm("");
			setCurrentPage(1);
			fetchTrashData();
		}

		return () => {
			if (updateStatus !== "idle") dispatch(clearUpdateTrashesState());
			if (deleteStatus !== "idle") dispatch(clearDeleteTrashesState());
			if (createStatus !== "idle") dispatch(clearCreateTrashesState());
		};
	}, [fetchTrashData, updateStatus, deleteStatus, createStatus, dispatch]);

	useEffect(() => {
		if (createStatus === "success" || createStatus === "failed") {
			onClose();
		}
	}, [createStatus, onClose]);

	useEffect(() => {
		return () => {
			dispatch(clearFetchTrashState());
			dispatch(clearFetchTrashesState());
			dispatch(clearUpdateTrashesState());
			dispatch(clearDeleteTrashesState());
			dispatch(clearCreateTrashesState());
		};
	}, [dispatch]);

	const filteredData = Object.values(data).filter((trashes) => {
		return (
			(trashes.trash_type &&
				trashes.trash_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
			(trashes.point && trashes.point.toString().includes(searchTerm))
		);
	});

	const handleSearch = (term) => {
		setSearchTerm(term);
		setCurrentPage(1);
	};

	const handleAddModal = () => {
		onOpen();
	};

	const handleSubmitAdded = (data) => {
		dispatch(createTrashes(data)).then((res) => {
			if (res.payload) {
				onClose();
			}
		});
	};

	useCustomToast(updateStatus, updateMessage);
	useCustomToast(deleteStatus, deleteMessage);
	useCustomToast(createStatus, createMessage);

	return (
		<LayoutDashboardContent>
			<Heading
				as="h1"
				color={"#201A18"}
				fontSize={"2xl"}
				fontWeight="bold"
				mb={"1.5rem"}
			>
				Kelola Kategori dan Jenis Sampah
			</Heading>
			<Flex
				bg={"white"}
				borderRadius={"xl"}
				boxShadow={"md"}
				direction={"column"}
				gap={"1.5rem"}
				p={"1.5rem"}
			>
				<Flex justifyContent={"space-between"}>
					<div className="w-1/3">
						<SearchBar onSearch={handleSearch} />
					</div>
					<div
						type="button"
						className="text-white font-inter font-medium text-lg flex items-center h-auto px-5 gap-[10px] bg-[#35CC33] hover:bg-green-600 rounded-lg cursor-pointer"
						onClick={handleAddModal}
					>
						<Add
							size="24"
							color="#FFFFFF"
						/>
						Tambah Data
					</div>
				</Flex>
				{status === "loading" && <Spinner />}
				{status === "failed" && <div>{message}</div>}
				{status === "success" && (
					<>
						<TableRubbishCategory
							data={filteredData}
							currentPage={currentPage}
							itemsPerPage={itemsPerPage}
						/>
						<Pagination
							currentPage={currentPage}
							itemsPerPage={itemsPerPage}
							onChangeItemsPerPage={setItemsPerPage}
							onChangePage={setCurrentPage}
							totalItems={totalItems}
						/>
					</>
				)}
			</Flex>

			<ModalAddRubbishCategory
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={handleSubmitAdded}
			/>
		</LayoutDashboardContent>
	);
}

export default RubbishCategory;
