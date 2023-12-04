import { Flex, Heading } from "@chakra-ui/react";
import { LayoutDashboardContent } from "@/layout";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { TableUserList } from "@/components/tables";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
	clearDeleteUserState,
	clearFetchUsersState,
	clearFetchUserState,
	deleteUserSelector,
	fetchUsers,
	fetchUsersSelector,
} from "@/store/user";
import { Spinner } from "@/components/spinner";
import { useCustomToast, useDebounce } from "@/hooks";

function ManageUser() {
	const dispatch = useDispatch();
	const { data = [], status, message } = useSelector(fetchUsersSelector);
	const { status: deleteStatus, message: deleteMessage } =
		useSelector(deleteUserSelector);

	const [_searchTerm, setSearchTerm] = useState("");
	const searchTerm = useDebounce(_searchTerm, 500);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [totalItems, setTotalItems] = useState(0);

	useCustomToast(deleteStatus, deleteMessage);

	const fetchUsersData = useCallback(() => {
		dispatch(
			fetchUsers({
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
		fetchUsersData();
	}, [fetchUsersData, searchTerm, currentPage, itemsPerPage]);

	useEffect(() => {
		if (deleteStatus === "success") {
			fetchUsersData();
			setSearchTerm("");
			setCurrentPage(1);
		}

		return () => {
			if (deleteStatus !== "idle") dispatch(clearDeleteUserState());
		};
	}, [deleteStatus, dispatch, fetchUsersData]);

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
				<SearchBar onSearch={handleSearch} />
				{status === "loading" && <Spinner />}
				{status === "failed" && <p>{message}</p>}
				{status === "success" && (
					<>
						<TableUserList
							currentPage={currentPage}
							data={filteredData}
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
		</LayoutDashboardContent>
	);
}

export default ManageUser;
