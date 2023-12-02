import { ButtonGroup, Container, Flex, Heading } from "@chakra-ui/react";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { useCallback, useEffect, useState } from "react";
import { TableDataReporting } from "@/components/tables";
import { TabButton } from "@/components/buttons";
import { LayoutDashboardContent } from "@/layout";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@/components/spinner";
import { useDebounce } from "@/hooks";
import {
  clearDataReportsState,
  fetchDataReports,
  fetchDataReportsSelector,
} from "@/store/report";

function DataReporting() {
  const dispatch = useDispatch();

  console.log("hai");
  const {
    data = [],
    status,
    message,
    count_data,
  } = useSelector(fetchDataReportsSelector);
  console.log("saya rivaldo");

  const [_searchTerm, setSearchTerm] = useState("");
  const searchTerm = useDebounce(_searchTerm, 500);

  const [activeFilter, setActiveFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchReportingData = useCallback(() => {
    dispatch(
      fetchDataReports({
        search: searchTerm,
        limit: itemsPerPage,
        page: currentPage,
      })
    );
  }, [dispatch, searchTerm, itemsPerPage, currentPage]);

  useEffect(() => {
    fetchReportingData();
  }, [fetchReportingData, searchTerm, itemsPerPage, currentPage]);

  // For Patch Data
  // useEffect(() => {
  //   useEffect(() => {
  //     if (
  //       patchStatus === "success"
  //     ) {
  //       fetchVouchersData();
  //       setSearchTerm("");
  //       setCurrentPage(1);
  //     }

  //     return () => {
  //       if (updateStatus !== "idle") dispatch(clearUpdateVoucherState());
  //       if (deleteStatus !== "idle") dispatch(clearDeleteVoucherState());
  //       if (createStatus !== "idle") dispatch(clearCreateVoucherState());
  //     };
  //   }, [fetchVouchersData, updateStatus, deleteStatus, createStatus, dispatch]);
  // });

  // useEffect(() => {
  // 	setTotalItems(count_data);
  // }, [count_data]);

  useEffect(() => {
    return () => {
      dispatch(clearDataReportsState());
    };
  }, [dispatch]);

  console.log(stateDataReports);

  // const filteredData = Object.values(data).filter((report) => {
  //   return report.name.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  // const filteredData = () => {
  //   return data.filter(
  //     (data) =>
  //       (activeFilter === "Semua" || data.status === activeFilter) &&
  //       data.report_types.toLowerCase().includes(searchTerm.toLowerCase())
  //   ).sort((a) => (a.status === "Perlu Tinjauan" ? -1 : 1));
  // };

  // const filteredDataCount = (filter) => {
  //   return DummyData.filter((data) =>
  //     filter === "Semua" ? true : data.status === filter
  //   ).length;
  // };

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
              data={paginatedData}
              itemsPerPage={itemsPerPage}
            />
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onChangeItemsPerPage={setItemsPerPage}
              onChangePage={setCurrentPage}
              totalItems={filteredData().length}
            />
          </>
        )}
      </Flex>
    </LayoutDashboardContent>
  );
}

export default DataReporting;
