import { AddSquare } from "iconsax-react";
import { Box, Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { useCallback, useEffect, useState } from "react";
import { ModalAddCommunity } from "@/components/modal";
import { TableCommunityList } from "@/components/tables";
import { LayoutDashboardContent } from "@/layout";
import { useDispatch, useSelector } from "react-redux";
import {
	clearDeleteCommunityState,
	clearFetchCommunitiesState,
	clearFetchCommunityState,
	clearUpdateCommunityState,
	createCommunity,
	createCommunitySelector,
	deleteCommunitySelector,
	fetchCommunities,
	fetchCommunitiesSelector,
	updateCommunitySelector,
} from "@/store/community";
import { Spinner } from "@/components/spinner";
import { useCustomToast, useDebounce } from "@/hooks";

function Community() {
	const dispatch = useDispatch();
	const {
		data = [],
		status,
		message,
		count_data,
	} = useSelector(fetchCommunitiesSelector);

	const { status: deleteStatus, message: deleteMessage } = useSelector(
		deleteCommunitySelector
	);
	const { status: updateStatus, message: updateMessage } = useSelector(
		updateCommunitySelector
	);
	const { status: createStatus, message: createMessage } = useSelector(
		createCommunitySelector
	);

	const [_searchTerm, setSearchTerm] = useState("");
	const searchTerm = useDebounce(_searchTerm, 500);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const fetchCommunitiesData = useCallback(() => {
		dispatch(
			fetchCommunities({
				search: searchTerm,
				limit: itemsPerPage,
				page: currentPage,
			})
		);
	}, [dispatch, searchTerm, itemsPerPage, currentPage]);

	useEffect(() => {
		fetchCommunitiesData();
	}, [fetchCommunitiesData, searchTerm, itemsPerPage, currentPage]);

	useEffect(() => {
		if (
			deleteStatus === "success" ||
			updateStatus === "success" ||
			createStatus === "success"
		) {
			fetchCommunitiesData();
			setSearchTerm("");
			setCurrentPage(1);
		}

		return () => {
			if (updateStatus !== "idle") dispatch(clearUpdateCommunityState());
			if (deleteStatus !== "idle") dispatch(clearDeleteCommunityState());
			if (createStatus !== "idle") dispatch(clearDeleteCommunityState());
		};
	}, [
		deleteStatus,
		updateStatus,
		createStatus,
		dispatch,
		fetchCommunitiesData,
	]);

	useEffect(() => {
		return () => {
			dispatch(clearFetchCommunitiesState());
			dispatch(clearFetchCommunityState());
			dispatch(clearUpdateCommunityState());
			dispatch(clearDeleteCommunityState());
		};
	}, [dispatch]);

	const filteredData = Object.values(data).filter((community) => {
		return community.name?.toLowerCase().includes(searchTerm.toLowerCase());
	});

	const handleSearch = (term) => {
		setSearchTerm(term);
		setCurrentPage(1);
	};

	const handleAddModal = () => {
		onOpen();
	};

	const handleSubmitAdded = (target) => {
		target.image = target.image[0];
		dispatch(createCommunity(target)).then(() => {
			onClose();
		});
	};

	useCustomToast(createStatus, createMessage);
	useCustomToast(deleteStatus, deleteMessage);
	useCustomToast(updateStatus, updateMessage);

	return (
		<LayoutDashboardContent>
			<Heading
				as="h1"
				color={"#201A18"}
				fontSize={"2xl"}
				fontWeight="bold"
				mb={"1.5rem"}
			>
				Kelola Komunitas
			</Heading>
			<Flex
				bg={"white"}
				borderRadius={"xl"}
				boxShadow={"md"}
				direction={"column"}
				gap={"1.5rem"}
				p={"1.5rem"}
			>
				<Flex
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					<SearchBar onSearch={handleSearch} />
					<Box
						w={"1.5rem"}
						bg={"transparent"}
					/>
					<Button
						leftIcon={<AddSquare />}
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
						Tambah Komunitas
					</Button>
				</Flex>

				{status === "loading" && <Spinner />}
				{status === "failed" && <div>{message}</div>}
				{status === "success" && (
					<>
						<TableCommunityList
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

			<ModalAddCommunity
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={handleSubmitAdded}
			/>
		</LayoutDashboardContent>
	);
}

export default Community;
