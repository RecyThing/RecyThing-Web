import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { AdminDetailTable } from "@/components/tables";
import {
  Button,
  // Button,
  // ButtonGroup,
  Container,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";

function AdminDetail() {
  // const [isActive, setIsActive] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
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

  return (
    <Container as={"section"} maxW={"container.xl"} bg={"#EBEBF0"} py={"3rem"}>
      <Heading
        as="h1"
        color={"#201A18"}
        fontSize={"2xl"}
        fontWeight="bold"
        mb={"1.5rem"}
      >
        Daftar Admin
      </Heading>
      <Flex
        bg={"white"}
        borderRadius={"xl"}
        boxShadow={"md"}
        direction={"column"}
        gap={"1.5rem"}
        p={"1.5rem"}
      >
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <SearchBar onSearch={handleSearch} />
          <Button
            backgroundColor={"#35CC33"}
            color={"white"}
            width={"12rem"}
            height={"4rem"}
            borderRadius={"20px"}
          >
            Tambah Admin
          </Button>
        </Flex>
        <AdminDetailTable
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

export default AdminDetail;

const DummyData = [
  ["Mohammad Irfan Maulana", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan", "irfanmaulana@gmail.com", "Aktif"],
  ["Mohammad Irfan Maulana", "irfanmaulana@gmail.com", "Aktif"],
];
