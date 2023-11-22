import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";
import { SearchBar } from "@/components/navigation";
import { useEffect, useState } from "react";
import { FilteredButton } from "@/components/buttons/TransactionFilterButton";
import { FilteredTable } from "@/components/tables/transaction-list/FilteredTransactionTable";

// dummy
const DummyData = [];
const names = [
  "John Doe",
  "Jane Doe",
  "Alice Smith",
  "Bob Johnson",
  "Charlie Davis",
];
const rewards = ["Voucher Dana 5000", "Voucher Dana 10000","Voucher Dana 15000"]
const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
const stastusKu = ["Diproses", "Berhasil", "Terbaru"];

for (let i = 0; i < 50; i++) {
  const name = names[Math.floor(Math.random() * names.length)];
  const reward = rewards[Math.floor(Math.random() * rewards.length)];
  const email = `${name.replace(" ", ".").toLowerCase()}@${
    domains[Math.floor(Math.random() * domains.length)]
  }`;
  const status = stastusKu[Math.floor(Math.random() * stastusKu.length)];
  const points = Math.floor(Math.random() * 10000);
  DummyData.push([name, reward, email, points, status]);
}
// end dummy

function DaftarTransaksi() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [allButtonActive, setAllButtonActive] = useState("True");
  const [newButtonActive, setNewButtonActive] = useState("False");
  const [processButtonActive, setProcessButtonActive] = useState("False");
  const [doneButtonActive, setDoneButtonActive] = useState("False");
  const [myData, setMyData] = useState([]);

  const newFilteredData = DummyData.filter(
    ([username,reward , uemail, udate, status]) => status === "Terbaru"
  );
  const processFilteredData = DummyData.filter(
    ([username,reward , uemail, udate, status]) => status === "Diproses"
  );
  const doneFilteredData = DummyData.filter(
    ([username,reward , uemail, udate, status]) => status === "Berhasil"
  );
  

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <Container
      as={"section"}
      maxW={"container.2xl"}
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
        Daftar Transaksi Tukar Poin
      </Heading>
      <Flex
        bg={"white"}
        borderRadius={"xl"}
        boxShadow={"md"}
        direction={"column"}
        gap={"1.5rem"}
        p={"1.5rem"}
      >
        <Flex direction={"row"}>
          <Box minWidth={"711px"} backgroundColor={"rgba(167, 161, 158, 0.05)"}>
            <FilteredButton
              onSelected={allButtonActive}
              name={"Semua"}
              onClicked={() => {
                setAllButtonActive("True"),
                  setProcessButtonActive("False"),
                  setNewButtonActive("False"),
                  setDoneButtonActive("False");
              }}
            />
            <FilteredButton
              onSelected={newButtonActive}
              name={"Terbaru"}
              dataLength={newFilteredData.length}
              onClicked={() => {
                setAllButtonActive("False"),
                  setProcessButtonActive("False"),
                  setNewButtonActive("True"),
                  setDoneButtonActive("False");
              }}
            />
            <FilteredButton
              onSelected={processButtonActive}
              name={"Diproses"}
              dataLength={processFilteredData.length}
              onClicked={() => {
                setAllButtonActive("False"),
                  setProcessButtonActive("True"),
                  setNewButtonActive("False"),
                  setDoneButtonActive("False");
              }}
            />
            <FilteredButton
              onSelected={doneButtonActive}
              name={"Selesai"}
              dataLength={doneFilteredData.length}
              onClicked={() => {
                setAllButtonActive("False"),
                  setProcessButtonActive("False"),
                  setNewButtonActive("False"),
                  setDoneButtonActive("True");
              }}
            />
          </Box>
          <Box flex={"1"} marginLeft={"24px"}>
            <SearchBar onSearch={handleSearch} />
          </Box>
        </Flex>
        
        {
          allButtonActive === "True" ? 
          <FilteredTable data={DummyData} onActiveTable={"Semua"} currentPage={currentPage} itemsPerPage={itemsPerPage} searchTerm={searchTerm}/>
          : newButtonActive === "True" ?
          <FilteredTable data={newFilteredData} onActiveTable={"Terbaru"} currentPage={currentPage} itemsPerPage={itemsPerPage} searchTerm={searchTerm}/>
          : processButtonActive === "True"?
          <FilteredTable data={processFilteredData} onActiveTable={"Diproses"} currentPage={currentPage} itemsPerPage={itemsPerPage} searchTerm={searchTerm}/>
          : 
          <FilteredTable data={doneFilteredData} onActiveTable={"Selesai"} currentPage={currentPage} itemsPerPage={itemsPerPage} searchTerm={searchTerm}/>
        }
      </Flex>
    </Container>
  );
}

export default DaftarTransaksi;
