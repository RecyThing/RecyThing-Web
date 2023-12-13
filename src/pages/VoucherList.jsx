import { Add } from "iconsax-react";
import { Box, Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import {
	clearCreateVoucherState,
	clearDeleteVoucherState,
	clearFetchVouchersState,
	clearFetchVoucherState,
	clearUpdateVoucherState,
	createVoucher,
	createVoucherSelector,
	deleteVoucherSelector,
	fetchVouchers,
	fetchVouchersSelector,
	updateVoucherSelector,
} from "@/store/voucher";
import { formatDateToISOString } from "@/utils";
import { LayoutDashboardContent } from "@/layout";
import { ModalAddVoucher } from "@/components/modal";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { Spinner } from "@/components/spinner";
import { TableVoucherList } from "@/components/tables";
import { useCallback, useEffect, useState } from "react";
import { useCustomToast, useDebounce } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";

function VoucherList() {
	const dispatch = useDispatch();
	const { data = [], status, message, count_data } = useSelector(fetchVouchersSelector);
	const { status: updateStatus, message: updateMessage } = useSelector(updateVoucherSelector);
	const { status: deleteStatus, message: deleteMessage } = useSelector(deleteVoucherSelector);
	const { status: createStatus, message: createMessage } = useSelector(createVoucherSelector);

	const [_searchTerm, setSearchTerm] = useState("");
	const searchTerm = useDebounce(_searchTerm, 500);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [refreshData, setRefreshData] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure();

	useCustomToast(updateStatus, updateMessage);
	useCustomToast(deleteStatus, deleteMessage);
	useCustomToast(createStatus, createMessage);

	const fetchVouchersData = useCallback(() => {
		dispatch(
			fetchVouchers({
				search: searchTerm,
				limit: itemsPerPage,
				page: currentPage,
			})
		);
	}, [dispatch, searchTerm, itemsPerPage, currentPage]);

	useEffect(() => {
		fetchVouchersData();
	}, [fetchVouchersData, refreshData]);

	useEffect(() => {
		if (updateStatus === "success" || deleteStatus === "success" || createStatus === "success") {
			setSearchTerm("");
			setCurrentPage(1);
			setRefreshData((prev) => !prev);

			if (updateStatus !== "idle") dispatch(clearUpdateVoucherState());
			if (deleteStatus !== "idle") dispatch(clearDeleteVoucherState());
			if (createStatus !== "idle") dispatch(clearCreateVoucherState());
		}
	}, [updateStatus, deleteStatus, createStatus, dispatch]);

	useEffect(() => {
		return () => {
			dispatch(clearFetchVouchersState());
			dispatch(clearFetchVoucherState());
		};
	}, [dispatch]);

	const filteredData = Object.values(data).filter((voucher) => {
		return voucher?.reward_name.toLowerCase().includes(searchTerm.toLowerCase()) || voucher?.point.toString().includes(searchTerm);
	});

	const handleSearch = (term) => {
		setSearchTerm(term);
		setCurrentPage(1);
	};

	const handleSubmitAdded = (data) => {
		data.image = data.image[0];
		data.start_date = formatDateToISOString(data.start_date);
		data.end_date = formatDateToISOString(data.end_date);

		dispatch(createVoucher(data)).then((res) => {
			if (res.payload) {
				onClose();
			}
		});
	};

	return (
		<LayoutDashboardContent>
			<Heading
				as="h1"
				color={"#201A18"}
				fontSize={"2xl"}
				fontWeight="bold"
				mb={"1.5rem"}
			>
				Daftar Voucher
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
					<Box w={"35%"}>
						<SearchBar
							onSearch={handleSearch}
							value={_searchTerm}
						/>
					</Box>
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
						onClick={onOpen}
					>
						Tambah Voucher
					</Button>
				</Flex>
				{status === "loading" && <Spinner />}
				{status === "failed" && <div>{message}</div>}
				{status === "success" && (
					<>
						<TableVoucherList
							data={filteredData}
							currentPage={currentPage}
							itemsPerPage={itemsPerPage}
						/>

						<Pagination
							currentPage={currentPage}
							itemsPerPage={itemsPerPage}
							onChangeItemsPerPage={setItemsPerPage}
							onChangePage={setCurrentPage}
							totalItems={count_data}
						/>
					</>
				)}
			</Flex>

			<ModalAddVoucher
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={handleSubmitAdded}
			/>
		</LayoutDashboardContent>
	);
}

export default VoucherList;
