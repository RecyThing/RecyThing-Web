import { ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import { clearFetchApprovalState, clearFetchApprovalsState, clearUpdateApprovalState, fetchApprovals, fetchApprovalsSelector, updateApprovalSelector } from "@/store/approval-mission";
import { FilterButton } from "@/components/buttons";
import { LayoutDashboardContent } from "@/layout";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { Spinner } from "@/components/spinner";
import { TableMissionApproval } from "@/components/tables";
import { useCallback, useEffect, useState } from "react";
import { useCustomToast, useDebounce } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";

const BUTTONLABELS = ["Semua", "Perlu Tinjauan", "Disetujui", "Ditolak"];

function MissionApproval() {
	const dispatch = useDispatch();
	const { data = [], status, message, count } = useSelector(fetchApprovalsSelector);
	const { status: updateStatus, message: updateMessage } = useSelector(updateApprovalSelector);

	const [_searchTerm, setSearchTerm] = useState("");
	const searchTerm = useDebounce(_searchTerm, 500);

	const [activeFilter, setActiveFilter] = useState({
		label: "Semua",
		value: "",
	});
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const fetchApprovalsData = useCallback(() => {
		dispatch(
			fetchApprovals({
				filter: activeFilter.value,
				limit: itemsPerPage,
				page: currentPage,
				search: searchTerm,
			})
		);
	}, [dispatch, currentPage, itemsPerPage, activeFilter, searchTerm]);

	useEffect(() => {
		fetchApprovalsData();
	}, [fetchApprovalsData]);

	useEffect(() => {
		if (updateStatus === "success" || updateStatus === "failed") {
			fetchApprovalsData();
			setSearchTerm("");
			setCurrentPage(1);
		}

		return () => {
			if (updateStatus !== "idle") dispatch(clearUpdateApprovalState());
		};
	}, [updateStatus, dispatch, fetchApprovalsData]);

	useEffect(() => {
		return () => {
			dispatch(clearFetchApprovalsState());
			dispatch(clearFetchApprovalState());
			dispatch(clearUpdateApprovalState());
		};
	}, [dispatch]);

	const filteredData = Object.values(data).filter((approval) => {
		return approval.user?.toLowerCase().includes(searchTerm.toLowerCase());
	});

	const filteredDataCount = (filter) => {
		switch (filter) {
			case "Perlu Tinjauan":
				return count?.count_pending || 0;
			case "Disetujui":
				return count?.count_approved || 0;
			case "Ditolak":
				return count?.count_rejected || 0;
			default:
				return count?.total_count || 0;
		}
	};

	const handleSearch = (term) => {
		setSearchTerm(term);
		setCurrentPage(1);
	};

	const handleFilterClick = (filter) => {
		setCurrentPage(1);
		if (filter === "Perlu Tinjauan") {
			setActiveFilter({ label: "Perlu Tinjauan", value: "perlu tinjauan" });
		} else if (filter === "Disetujui") {
			setActiveFilter({ label: "Disetujui", value: "disetujui" });
		} else if (filter === "Ditolak") {
			setActiveFilter({ label: "Ditolak", value: "ditolak" });
		} else {
			setActiveFilter({ label: "Semua", value: "" });
		}
	};

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
				Kelola Approval Misi
			</Heading>
			<Flex
				bg={"white"}
				borderRadius={"xl"}
				boxShadow={"md"}
				direction={"column"}
				gap={"1.5rem"}
				p={"1.5rem"}
			>
				<Flex gap={"1.5rem"}>
					<ButtonGroup spacing={0}>
						{BUTTONLABELS.map((label) => (
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
				{status === "loading" && <Spinner />}
				{status === "failed" && <div>{message}</div>}
				{status === "success" && (
					<>
						<TableMissionApproval data={filteredData} />
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
		</LayoutDashboardContent>
	);
}

export default MissionApproval;
