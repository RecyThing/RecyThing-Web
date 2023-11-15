import { Container, Flex, Heading, Button } from "@chakra-ui/react";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { useState } from "react";
import { DataReportingTable } from "@/components/tables/DataReportingTable";
import TabButton from "@/components/buttons/TabButton";

// dummy
const DummyData = [];
const names = [
  "John Doe",
  "Jane Doe",
  "Alice Smith",
  "Bob Johnson",
  "Charlie Davis",
];
const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];

for (let i = 0; i < 50; i++) {
  const name = names[Math.floor(Math.random() * names.length)];
  const email = `${name.replace(" ", ".").toLowerCase()}@${
    domains[Math.floor(Math.random() * domains.length)]
  }`;
  const points = Math.floor(Math.random() * 10000);
  DummyData.push([name, email, points]);
}
// end dummy
const handleButtonClick = () => {
  // Logic to handle button click
  console.log("Button clicked!");
  // Add your custom logic here
};

function DataReporting() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState(null);

  const filteredData = DummyData.filter(([username]) =>
    username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "semua") {
      document.getElementById("semuaButton").style.backgroundColor = "green";
    }
  };

  return (
    <Container
      as={"section"}
      maxW={"container2.xl"}
      bg={"#EBEBF0"}
      p={"1.5rem"}
    >
      <Heading
        as="h1"
        color={"#201A18"}
        fontSize={"2xl"}
        fontWeight="bold"
        mb={"1.5rem"}
      >
        Manage Data Reporting
      </Heading>

      {/* search */}
      <Flex
        bg={"white"}
        borderRadius={"xl"}
        boxShadow={"md"}
        direction={"column"}
        gap={"1.5rem"}
        p={"1.5rem"}
      >
        <Flex align="center" justify="space-between" mb="1.5rem">
          {/* semua */}

          <TabButton
            id="semuaButton"
            label="Semua"
            count={420}
            active={activeTab === "semua"}
            onClick={() => handleTabClick("semua")}
          />
          <TabButton
            label="Perlu Tinjauan"
            count={69}
            active={activeTab === "tinjauan"}
            onClick={() => handleTabClick("tinjauan")}
          />
          <TabButton
            label="Diterima"
            count={300}
            active={activeTab === "diterima"}
            onClick={() => handleTabClick("diterima")}
          />
          <TabButton
            label="Ditolak"
            count={51}
            active={activeTab === "ditolak"}
            onClick={() => handleTabClick("ditolak")}
          />

          <SearchBar onSearch={handleSearch} />
        </Flex>

        <DataReportingTable
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
      </Flex>
    </Container>
  );
}

export default DataReporting;
