import { ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import { clearDataReportState, clearDataReportsState, clearPatchDataReportState, fetchDataReports, fetchDataReportsSelector, patchDataReportSelector } from "@/store/report";
import { LayoutDashboardContent } from "@/layout";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { Spinner } from "@/components/spinner";
import { TabButton } from "@/components/buttons";
import { TableDataReporting } from "@/components/tables";
import { useCallback, useEffect, useState } from "react";
import { useCustomToast, useDebounce } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";

const FILTER_LABELS = ["Semua", "Perlu Tinjauan", "Disetujui", "Ditolak"];

function DataReporting() {
	const dispatch = useDispatch();
	const { data = [], status, message, count } = useSelector(fetchDataReportsSelector);
	const { status: patchStatus, message: patchMessage } = useSelector(patchDataReportSelector);

	const [_searchTerm, setSearchTerm] = useState("");
	const searchTerm = useDebounce(_searchTerm, 500);
	const [activeFilter, setActiveFilter] = useState({
		label: "Semua",
		value: "",
	});
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [refreshData, setRefreshData] = useState(false);

	useCustomToast(patchStatus, patchMessage);

	const fetchReportingData = useCallback(() => {
		dispatch(
			fetchDataReports({
				status: activeFilter.value,
				search: searchTerm,
				limit: itemsPerPage,
				page: currentPage,
			})
		);
	}, [dispatch, searchTerm, itemsPerPage, currentPage, activeFilter]);

	useEffect(() => {
		fetchReportingData();
	}, [fetchReportingData, refreshData]);

	// For Patch Data
	useEffect(() => {
		if (patchStatus === "success") {
			setSearchTerm("");
			setCurrentPage(1);
			setRefreshData((prev) => !prev);

			if (patchStatus !== "idle") dispatch(clearPatchDataReportState());
		}
	}, [patchStatus, dispatch]);

	useEffect(() => {
		return () => {
			dispatch(clearDataReportsState());
			dispatch(clearDataReportState());
		};
	}, [dispatch]);

	const filteredData = Object.values(data).filter((report) => {
		return report.name?.toLowerCase().includes(searchTerm.toLowerCase());
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

	const handleFilterClick = (filter) => {
		setCurrentPage(1);
		if (filter === "Perlu Tinjauan") {
			setActiveFilter({ label: "Perlu Tinjauan", value: "perlu ditinjau" });
		} else if (filter === "Disetujui") {
			setActiveFilter({ label: "Disetujui", value: "diterima" });
		} else if (filter === "Ditolak") {
			setActiveFilter({ label: "Ditolak", value: "ditolak" });
		} else {
			setActiveFilter({ label: "Semua", value: "" });
		}
	};

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
				Kelola Data Pelaporan
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
						{FILTER_LABELS.map((label) => (
							<TabButton
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
						<TableDataReporting
							currentPage={currentPage}
							data={filteredData}
							itemsPerPage={itemsPerPage}
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
		</LayoutDashboardContent>
	);
}

export default DataReporting;
