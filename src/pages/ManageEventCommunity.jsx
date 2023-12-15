import { Add } from "iconsax-react";
import { ArrowLeftSquare } from "react-iconly";
import { ButtonGroup, Flex, Heading, Button, useDisclosure } from "@chakra-ui/react";
import {
	clearCreateEventState,
	clearDeleteEventState,
	clearFetchEventsState,
	clearFetchEventState,
	clearUpdateEventState,
	createEvent,
	createEventSelector,
	deleteEventSelector,
	fetchEvents,
	fetchEventsSelector,
	updateEventSelector,
} from "@/store/event-community";
import { FilterButton } from "@/components/buttons";
import { LayoutDashboardContent } from "@/layout";
import { ModalAddEventCommunity } from "@/components/modal";
import { Pagination } from "@/components/pagination";
import { Spinner } from "@/components/spinner";
import { TableManageEventCommunity } from "@/components/tables";
import { useCallback, useEffect, useState } from "react";
import { useCustomToast } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

const buttonLabels = ["Berjalan", "Belum Berjalan", "Selesai"];

function ManageEventCommunity() {
	const id = useParams().id;
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { data = [], status, message, count } = useSelector(fetchEventsSelector);
	const { status: deleteStatus, message: deleteMessage } = useSelector(deleteEventSelector);
	const { status: updateStatus, message: updateMessage } = useSelector(updateEventSelector);
	const { status: createStatus, message: createMessage } = useSelector(createEventSelector);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [refreshData, setRefreshData] = useState(false);
	const [activeFilter, setActiveFilter] = useState({
		label: "Berjalan",
		value: "berjalan",
	});

	const { isOpen, onOpen, onClose } = useDisclosure();

	useCustomToast(createStatus, createMessage);
	useCustomToast(deleteStatus, deleteMessage);
	useCustomToast(updateStatus, updateMessage);

	const fetchEventsData = useCallback(() => {
		dispatch(
			fetchEvents({
				id: id,
				status: activeFilter.value,
				limit: itemsPerPage,
				page: currentPage,
			})
		);
	}, [dispatch, id, activeFilter, itemsPerPage, currentPage]);

	useEffect(() => {
		fetchEventsData();
	}, [fetchEventsData, refreshData]);

	useEffect(() => {
		if (deleteStatus === "success" || updateStatus === "success" || createStatus === "success") {
			setCurrentPage(1);
			setRefreshData((prev) => !prev);

			if (updateStatus !== "idle") dispatch(clearUpdateEventState());
			if (deleteStatus !== "idle") dispatch(clearDeleteEventState());
			if (createStatus !== "idle") dispatch(clearCreateEventState());
		}
	}, [deleteStatus, updateStatus, createStatus, dispatch]);

	useEffect(() => {
		return () => {
			dispatch(clearFetchEventsState());
			dispatch(clearFetchEventState());
		};
	}, [dispatch]);

	const filteredDataCount = (filter) => {
		switch (filter) {
			case "Berjalan":
				return count?.count_active || 0;
			case "Belum Berjalan":
				return count?.count_pending || 0;
			case "Selesai":
				return count?.count_finished || 0;
			default:
				return count?.total_count || 0;
		}
	};

	const handleFilterClick = (filter) => {
		setCurrentPage(1);
		switch (filter) {
			case "Berjalan":
				setActiveFilter({ label: "Berjalan", value: "berjalan" });
				break;
			case "Belum Berjalan":
				setActiveFilter({ label: "Belum Berjalan", value: "belum berjalan" });
				break;
			case "Selesai":
				setActiveFilter({ label: "Selesai", value: "selesai" });
				break;
			default:
				setActiveFilter({ label: "Berjalan", value: "berjalan" });
				break;
		}
	};

	const handleSubmitAdded = (target) => {
		target.image = target.image[0] instanceof File ? target.image[0] : target.image;
		target.date = format(new Date(target.date), "yyyy/MM/dd");
		dispatch(
			createEvent({
				data: target,
				communityId: id,
			})
		).then((res) => {
			if (res.payload && res.payload.status === true) {
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
				Detail Event Community
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
					gap={"1.5rem"}
					justifyContent={"space-between"}
					alignItems="center"
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
					<Flex
						justifyContent="flex-end"
						alignItems="center"
					>
						<Button
							leftIcon={<ArrowLeftSquare />}
							_hover={{ bg: "#333333" }}
							bg={"#828282"}
							borderRadius={"lg"}
							color={"white"}
							fontWeight={"normal"}
							lineHeight={"1.5rem"}
							px={"1.5rem"}
							py={"1.75rem"}
							marginRight={"20px"}
							onClick={() => navigate("/dashboard/community")}
						>
							Kembali
						</Button>
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
							Tambah Data
						</Button>
					</Flex>
				</Flex>

				{status === "loading" && <Spinner />}
				{status === "failed" && <div>{message}</div>}
				{status === "success" && (
					<>
						<TableManageEventCommunity
							currentPage={currentPage}
							itemsPerPage={itemsPerPage}
							data={data}
						/>
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
			<ModalAddEventCommunity
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={handleSubmitAdded}
			/>
		</LayoutDashboardContent>
	);
}

export default ManageEventCommunity;
