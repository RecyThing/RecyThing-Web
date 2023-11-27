import { Add } from "iconsax-react";
import { Box, Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { useEffect, useState } from "react";
import { TableVoucherList } from "@/components/tables";
import { ModalAddVoucher } from "@/components/modal";
import { LayoutDashboardContent } from "@/layout";
import { useDispatch, useSelector } from "react-redux";
import {
	clearFetchVouchersState,
	fetchVouchers,
	fetchVouchersSelector,
} from "@/store/voucher";
import { Spinner } from "@/components/spinner";

function VoucherList() {
	const dispatch = useDispatch();
	const {
		data = [],
		status,
		message,
		count_data,
	} = useSelector(fetchVouchersSelector);

	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [totalItems, setTotalItems] = useState(0);

	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		dispatch(
			fetchVouchers({
				search: searchTerm,
				limit: itemsPerPage,
				page: currentPage,
			})
		);
	}, [dispatch, searchTerm, itemsPerPage, currentPage]);

	useEffect(() => {
		setTotalItems(count_data);
	}, [count_data]);

	useEffect(() => {
		return () => {
			dispatch(clearFetchVouchersState());
		};
	}, [dispatch]);

	const filteredData = Object.values(data).filter((voucher) => {
		return (
			voucher.reward_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			voucher.point.toString().includes(searchTerm)
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
		console.log("added!", data);
		onClose();
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
						<SearchBar onSearch={handleSearch} />
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
						onClick={handleAddModal}
					>
						Tambah Reward
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
							totalItems={totalItems}
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
