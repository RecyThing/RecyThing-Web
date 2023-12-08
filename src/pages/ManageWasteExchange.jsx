import { Pagination } from "@/components/pagination/Pagination";
import { Add } from "iconsax-react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { SearchBar } from "@/components/navigation";
import { ModalAddWasteExchangeData } from "@/components/modal";
import { TableWasteExchange } from "@/components/tables";
import { LayoutDashboardContent } from "@/layout";
import {
	clearCreateRecyclesState,
	clearDeleteRecyclesState,
	clearFetchRecycleState,
	clearFetchRecyclesState,
	createRecycles,
	createRecyclesSelector,
	deleteRecyclesSelector,
	fetchRecycles,
	fetchRecyclesSelector,
  } from "@/store/waste-exchange";
import { useDispatch, useSelector } from "react-redux";
import { useCustomToast, useDebounce } from "@/hooks";
import { Spinner } from "@/components/spinner";

function ManageWasteExchange() {
	const dispatch = useDispatch();
	const { data = [], status, message } = useSelector(fetchRecyclesSelector);
	const { status: deleteStatus, message: deleteMessage } = useSelector(
		deleteRecyclesSelector
	);
	const { status: createStatus, message: createMessage } = useSelector(
		createRecyclesSelector
	);

	const [isAddData, setIsAddData] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const openForm = () => {
		setIsAddData(true);
	};

	const closeForm = () => {
		setIsAddData(false);
	};

	const [_searchTerm, setSearchTerm] = useState("");
  	const searchTerm = useDebounce(_searchTerm, 500);

	const fetchRecycleData = useCallback(() => {
		dispatch(
			fetchRecycles({
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
		fetchRecycleData();
	}, [searchTerm, itemsPerPage, currentPage, fetchRecycleData]);

	useEffect(() => {
		if (
			deleteStatus === "success" ||
			createStatus === "success"
		) {
			setSearchTerm("");
			setCurrentPage(1);
			fetchRecycleData();
		}
	
		return () => {
			if (deleteStatus !== "idle") dispatch(clearDeleteRecyclesState());
			if (createStatus !== "idle") dispatch(clearCreateRecyclesState());
		};
	}, [fetchRecycleData, deleteStatus, createStatus, dispatch]);

	useEffect(() => {
		if (createStatus === "success" || createStatus === "failed") {
		  	onClose();
		}
	}, [createStatus, onClose]);

	useEffect(() => {
		return () => {
			dispatch(clearFetchRecycleState());
			dispatch(clearFetchRecyclesState());
			dispatch(clearDeleteRecyclesState());
			dispatch(clearCreateRecyclesState());
		};
	}, [dispatch]);
	
	const filteredData = Object.values(data).filter((Recycles) => {
		return (
			Recycles.Recycle_type &&
			Recycles.Recycle_type.toLowerCase().includes(searchTerm.toLowerCase())
		);
	});	

	// const filteredData = DummyData.filter(([username]) =>
	// 	username.toLowerCase().includes(searchTerm.toLowerCase())
	// );

	const handleSearch = (term) => {
		setSearchTerm(term);
		setCurrentPage(1);
	};

	// const paginatedData = filteredData.slice(
	// 	(currentPage - 1) * itemsPerPage,
	// 	currentPage * itemsPerPage
	// );

	const handleAddModal = () => {
		onOpen();
	};

	const handleSubmitAdded = (data) => {
		dispatch(createRecycles(data)).then((res) => {
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
			{isAddData ? (
				<ModalAddWasteExchangeData
					isOpen={isAddData}
					onClose={closeForm}
					setIsAddData={setIsAddData}
				/>
			) : null}
			<Heading
				as="h1"
				color={"#201A18"}
				fontSize={"2xl"}
				fontWeight="bold"
				mb={"1.5rem"}
			>
				Kelola Penukaran Sampah
			</Heading>
			<div className="bg-white rounded-lg shadow-md mt-4 p-4 h-90% w-full">
				<div className="flex justify-between items-center mb-4 ml-2 w-full">
					<div style={{ width: "35%" }}>
						<SearchBar onSearch={handleSearch} />
					</div>
					<Button
						leftIcon={<Add />}
						_hover={{ bg: "#2DA22D" }}
						bg={"#35CC33"}
						borderRadius={"lg"}
						color={"white"}
						fontWeight={"normal"}
						lineHeight={"1.5rem"}
						px={"1.5rem"}
						py={"1.75rem"}
						marginRight={"20px"}
						onClick={handleAddModal}
					>
						Tambah Data
					</Button>
				</div>
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
						<TableWasteExchange
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
			</div>
		</LayoutDashboardContent>
	);
}

export default ManageWasteExchange;