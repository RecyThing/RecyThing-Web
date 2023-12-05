import { ButtonGroup, Container, Flex, Heading } from "@chakra-ui/react";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { useCallback, useEffect, useState } from "react";
import { TableDataReporting } from "@/components/tables";
import { TabButton } from "@/components/buttons";
import { LayoutDashboardContent } from "@/layout";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@/components/spinner";
import { useCustomToast, useDebounce } from "@/hooks";
import {
  clearDataReportsState,
  clearPatchDataReportState,
  fetchDataReports,
  fetchDataReportsSelector,
  patchDataReportSelector,
} from "@/store/report";

function DataReporting() {
  const dispatch = useDispatch();

  const {
    data = [],
    status,
    message,
    count_data,
  } = useSelector(fetchDataReportsSelector);

  const { status: patchStatus, message: patchMessage } = useSelector(
		patchDataReportSelector
	);

  const [_searchTerm, setSearchTerm] = useState("");
  const searchTerm = useDebounce(_searchTerm, 500);

  const buttonLabels = ["Semua", "Perlu Tinjauan", "Disetujui", "Ditolak"];
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useCustomToast(patchStatus, patchMessage);

  const fetchReportingData = useCallback(() => {
    dispatch(
      fetchDataReports({
        search: searchTerm,
        limit: itemsPerPage,
        page: currentPage,
      })
    ).then((res) => {
			if (res.payload) {
				setTotalItems(res.payload.count_data);
			}
		});;
  }, [dispatch, searchTerm, itemsPerPage, currentPage]);

  useEffect(() => {
    fetchReportingData();
  }, [fetchReportingData, searchTerm, itemsPerPage, currentPage]);

  // For Patch Data
  useEffect(() => {
    if (
      patchStatus === "success"
    ) {
      fetchReportingData();
      setSearchTerm("");
      setCurrentPage(1);
    }

    return () => {
      if (patchStatus !== "idle") dispatch(clearPatchDataReportState());
    };
  }, [fetchDataReports, patchStatus, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearDataReportsState());
    };
  }, [dispatch]);

  const filteredData = Object.values(data).filter((report) => {
		return report.name?.toLowerCase().includes(searchTerm.toLowerCase());
	});

  const filteredDataCount = (filter) => {
    return data.filter((data) =>
      filter === "Semua" ? true : filter === "Perlu Tinjauan" ? data.status === "perlu ditinjau" : filter === "Disetujui" ? data.status === "diterima" : data.status === "ditolak"
    ).length;
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  return (
    <LayoutDashboardContent>
      {console.log(data)}
      {console.log(filteredData)}
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
            {buttonLabels.map((label) => (
              <TabButton
                key={label}
                label={label}
                activeFilter={activeFilter}
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
              totalItems={totalItems}
            />
          </>
        )}
      </Flex>
    </LayoutDashboardContent>
  );
}

export default DataReporting;
