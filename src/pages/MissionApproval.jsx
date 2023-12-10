import { ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import {
	clearFetchApprovalsState,
	fetchApprovals,
	fetchApprovalsSelector,
} from "@/store/approval-mission";
import { FilterButton } from "@/components/buttons";
import { LayoutDashboardContent } from "@/layout";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { TableMissionApproval } from "@/components/tables";
import { useDebounce } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { Spinner } from "@/components/spinner";

const buttonLabels = ["Semua", "Perlu Tinjauan", "Disetujui", "Ditolak"];

function MissionApproval() {
	const dispatch = useDispatch();
	const {
		data = [],
		status,
		message,
		count,
	} = useSelector(fetchApprovalsSelector);

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
		return () => {
			dispatch(clearFetchApprovalsState());
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
			setActiveFilter({ label: "Disetujui", value: "diterima" });
		} else if (filter === "Ditolak") {
			setActiveFilter({ label: "Ditolak", value: "ditolak" });
		} else {
			setActiveFilter({ label: "Semua", value: "" });
		}
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
					<SearchBar onSearch={handleSearch} />
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
