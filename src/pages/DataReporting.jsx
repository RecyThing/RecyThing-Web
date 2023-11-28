import { ButtonGroup, Container, Flex, Heading } from "@chakra-ui/react";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { useState } from "react";
import { TableDataReporting } from "@/components/tables";
import { TabButton } from "@/components/buttons";
import { LayoutDashboardContent } from "@/layout";

// dummy
const DummyData = [];
const reportType = ["Tumpukan Sampah", "Pelanggaran Sampah", ];
const users = ["Putri", " Budi", " Joko", " Andi", " Siti"];
const months = [ "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des", ];
const location = [ "Jakarta Timur"]
const labels = ["Perlu Tinjauan", "Disetujui", "Ditolak"];
const buttonLabels = ["Semua", "Perlu Tinjauan", "Disetujui", "Ditolak"];

for (let i = 0; i < 50; i++) {
  const reportTypeIndex = Math.floor(Math.random() * reportType.length);
  const reportTypeValue = reportType[reportTypeIndex];

  let prefix;
  if (reportTypeValue === "Tumpukan Sampah") {
    prefix = "RBH";
  } else if (reportTypeValue === "Pelanggaran Sampah") {
    prefix = "LTR";
  } else {
    prefix = "MIS";
  }
  
  const formattedNumber = i.toString().padStart(3, '0');

  const id = `${prefix}${formattedNumber}`;
  const reportTypes = reportType[Math.floor(Math.random() * reportType.length)];
  const username = users[Math.floor(Math.random() * users.length)];
  const locations = location[Math.floor(Math.random() * location.length)];
  const date = `${Math.floor(Math.random() * 30) + 1} ${
    months[Math.floor(Math.random() * months.length)]
  } 2023`;
  const status = labels[Math.floor(Math.random() * labels.length)];
  DummyData.push({ id, reportTypes, username, locations, date, status });
}
// end dummy

function DataReporting() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = () => {
    return DummyData.filter(
      (data) =>
        (activeFilter === "Semua" || data.status === activeFilter) &&
        data.reportTypes.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a) => (a.status === "Perlu Tinjauan" ? -1 : 1));
  };

  const filteredDataCount = (filter) => {
    return DummyData.filter((data) =>
      filter === "Semua" ? true : data.status === filter
    ).length;
  };

  const paginatedData = filteredData().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      </Flex>
    </LayoutDashboardContent>
  );
}

export default DataReporting;
