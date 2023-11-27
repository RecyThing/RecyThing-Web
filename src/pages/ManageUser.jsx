import { Flex, Heading } from "@chakra-ui/react";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { useEffect, useState } from "react";
import { TableUserList } from "@/components/tables";
import { LayoutDashboardContent } from "@/layout";
import { useDispatch, useSelector } from "react-redux";
import {
	clearDeleteUserState,
	clearFetchUserState,
	clearFetchUsersState,
	deleteUserSelector,
	fetchUsers,
	fetchUsersSelector,
} from "@/store/user";
import { Spinner } from "@/components/spinner";
import { useCustomToast } from "@/hooks";

function ManageUser() {
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const dispatch = useDispatch();
	const { data, status, message } = useSelector(fetchUsersSelector);
	const { status: deleteStatus, message: deleteMessage } =
		useSelector(deleteUserSelector);

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	useCustomToast(status, message);
	useCustomToast(deleteStatus, deleteMessage);

	useEffect(() => {
		if (status === "success") {
			setSearchTerm("");
			setCurrentPage(1);
		}
	}, [status]);

	useEffect(() => {
		if (deleteStatus === "success") {
			dispatch(fetchUsers());
		}
	}, [deleteStatus, dispatch]);

	useEffect(() => {
		return () => {
			dispatch(clearFetchUsersState());
			dispatch(clearFetchUserState());
			dispatch(clearDeleteUserState());
		};
	}, [dispatch]);

	const filteredData = Object.values(data).filter((user) => {
		return user.fullname.toLowerCase().includes(searchTerm.toLowerCase());
	});

	const paginatedData = filteredData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const handleSearch = (term) => {
		setSearchTerm(term);
		setCurrentPage(1);
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
				Kelola Data Pengguna
			</Heading>
			<Flex
				bg={"white"}
				borderRadius={"xl"}
				boxShadow={"md"}
				direction={"column"}
				gap={"1.5rem"}
				p={"1.5rem"}
			>
				{status === "loading" && <Spinner />}
				{status === "failed" && <p>{message}</p>}
				{status === "success" && (
					<>
						<SearchBar onSearch={handleSearch} />
						<TableUserList
							currentPage={currentPage}
							data={paginatedData}
							itemsPerPage={itemsPerPage}
						/>
						<Pagination
							currentPage={currentPage}
							itemsPerPage={itemsPerPage}
							onChangeItemsPerPage={setItemsPerPage}
							onChangePage={setCurrentPage}
							totalItems={filteredData.length}
						/>
					</>
				)}
			</Flex>
		</LayoutDashboardContent>
	);
}

export default ManageUser;
