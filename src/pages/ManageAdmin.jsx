import {
  Container,
  Flex,
  Heading,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation/";
import { AdminTable } from "@/components/tables";
import { useState } from "react";
import { AddAdminModal } from "@/components/modal";

// dummy
const DummyData = [];
const names = [
  "John Doe",
  "Jane Doe",
  "Alice Smith",
  "Bob Johnson",
  "Charlie Davis",
];
const label = ["aktif", "tidak aktif"];
const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];

for (let i = 0; i < 50; i++) {
  const name = names[Math.floor(Math.random() * names.length)];
  const email = `${name.replace(" ", ".").toLowerCase()}@${
    domains[Math.floor(Math.random() * domains.length)]
  }`;
  const status = label[Math.floor(Math.random() * label.length)];
  DummyData.push({ name, email, status });
}
// end dummy

function AdminDetailTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredData = DummyData.filter((data) => {
    return data.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleAddModal = () => {
    onOpen();
  };

  const handleSubmitData = (data) => {
    console.log(data);
    onClose();
  };

  return (
    <Container
      as={"section"}
      maxW={"container.2xl"}
      bg={"#EBEBF0"}
      p={"1.5rem"}
    >
      <AddAdminModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitData}
      />
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
          <div className="wrapper w-4/12">
            <SearchBar onSearch={handleSearch} />
          </div>
          <Button
            backgroundColor={"#35CC33"}
            color={"white"}
            width={"12rem"}
            height={"4rem"}
            _hover={"#35CC33"}
            borderRadius={"10px"}
            gap={"10px"}
            onClick={handleAddModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 12H18"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 18V6"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Tambah Admin
          </Button>
        </Flex>
        <AdminTable
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

export default AdminDetailTable;
