import { Container, Flex, Heading } from "@chakra-ui/react";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { RubbishCategoryTable } from "@/components/tables/RubbishCategoryTable";
import { useState } from "react";
import { Add } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";
import { AddCategoryModal } from "@/components/modal/rubbish-category/AddCategoryModal";

// dummy
const DummyData = [];
const rubbishTypes = [
  "Elektronik",
  "Kaca",
  "Kaleng",
  "Baterai",
  "Kertas",
  "Logam",
  "Minyak",
  "Organik",
  "Pakaian",
  "Plastik",
  "Tekstil",
];
const units = ["Barang", "Kilogram"];

for (let i = 0; i < rubbishTypes.length; i++) {
  const rubbishCategoryName = rubbishTypes[i];
  const rewardPoints = Math.floor(Math.random() * 20) * 500 + 1000;
  const selectUnit = units[Math.floor(Math.random() * units.length)];

  DummyData.push([
    rubbishCategoryName,
    rewardPoints,
    selectUnit,
  ]);
}
// end dummy

function RubbishCategory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredData = DummyData.filter(([data]) =>
    data.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleSubmitAdded = (data) => {
    console.log("added!", data);
    onClose();
  };

  return (
    <Container
      as={"section"}
      maxW={"container.2xl"}
      bg={"#EBEBF0"}
      p={"1.5rem"}
      minHeight="100vh"
    >
      <Heading
        as="h1"
        color={"#201A18"}
        fontSize={"2xl"}
        fontWeight="bold"
        mb={"1.5rem"}
      >
        Kelola Kategori dan Jenis Sampah
      </Heading>
      <Flex
        bg={"white"}
        borderRadius={"xl"}
        boxShadow={"md"}
        direction={"column"}
        gap={"1.5rem"}
        p={"1.5rem"}
      >
        <div className="flex justify-between">
          <div className="w-1/3">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div
            type="button"
            className="text-white font-inter font-medium text-lg flex items-center h-auto px-5 gap-[10px] bg-[#35CC33] hover:bg-green-600 rounded-lg cursor-pointer"
            onClick={handleAddModal}
          >
            <Add size="24" color="#FFFFFF" />
            Tambah Data
          </div>
        </div>
        <RubbishCategoryTable
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

      <AddCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitAdded}
      />
    </Container>
  );
}

export default RubbishCategory;
