import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";
import { SearchBar } from "@/components/navigation";
import { useEffect, useState } from "react";
import { FilteredButton } from "@/components/DaftarTransaksi/Button";
import { FilteredTable } from "@/components/DaftarTransaksi/table/FilteredTransaksiTable";

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
  const [semuaButtonActive, setSemuaButtonActive] = useState("True");
  const [terbaruButtonAcive, setTerbaruButtonAcive] = useState("False");
  const [diprosesButtonActive, setDiprosesButtonActive] = useState("False");
  const [selesaiButtonActive, setSelesaiButtonActive] = useState("False");
  const [myData, setMyData] = useState([]);

  const filteredDataTerbaru = DummyData.filter(
    ([username,reward , uemail, udate, status]) => status === "Terbaru"
  );
  const filteredDataDiproses = DummyData.filter(
    ([username,reward , uemail, udate, status]) => status === "Diproses"
  );
  const filteredDataSelesai = DummyData.filter(
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
              onSelected={semuaButtonActive}
              name={"Semua"}
              onClicked={() => {
                setSemuaButtonActive("True"),
                  setDiprosesButtonActive("False"),
                  setTerbaruButtonAcive("False"),
                  setSelesaiButtonActive("False");
              }}
            />
            <FilteredButton
              onSelected={terbaruButtonAcive}
              name={"Terbaru"}
              dataLength={filteredDataTerbaru.length}
              onClicked={() => {
                setSemuaButtonActive("False"),
                  setDiprosesButtonActive("False"),
                  setTerbaruButtonAcive("True"),
                  setSelesaiButtonActive("False");
              }}
            />
            <FilteredButton
              onSelected={diprosesButtonActive}
              name={"Diproses"}
              dataLength={filteredDataDiproses.length}
              onClicked={() => {
                setSemuaButtonActive("False"),
                  setDiprosesButtonActive("True"),
                  setTerbaruButtonAcive("False"),
                  setSelesaiButtonActive("False");
              }}
            />
            <FilteredButton
              onSelected={selesaiButtonActive}
              name={"Selesai"}
              dataLength={filteredDataSelesai.length}
              onClicked={() => {
                setSemuaButtonActive("False"),
                  setDiprosesButtonActive("False"),
                  setTerbaruButtonAcive("False"),
                  setSelesaiButtonActive("True");
              }}
            />
          </Box>
          <Box flex={"1"} marginLeft={"24px"}>
            <SearchBar onSearch={handleSearch} />
          </Box>
        </Flex>
        
        {
          semuaButtonActive === "True" ? 
          <FilteredTable data={DummyData} onActiveTable={"Semua"} currentPage={currentPage} itemsPerPage={itemsPerPage} searchTerm={searchTerm}/>
          : terbaruButtonAcive === "True" ?
          <FilteredTable data={filteredDataTerbaru} onActiveTable={"Terbaru"} currentPage={currentPage} itemsPerPage={itemsPerPage} searchTerm={searchTerm}/>
          : diprosesButtonActive === "True"?
          <FilteredTable data={filteredDataDiproses} onActiveTable={"Diproses"} currentPage={currentPage} itemsPerPage={itemsPerPage} searchTerm={searchTerm}/>
          : 
          <FilteredTable data={filteredDataSelesai} onActiveTable={"Selesai"} currentPage={currentPage} itemsPerPage={itemsPerPage} searchTerm={searchTerm}/>
        }
      </Flex>
    </Container>
  );
}

export default DaftarTransaksi;
