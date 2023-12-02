import {
  ButtonGroup,
  Flex,
  Heading,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FilterButton } from "@/components/buttons";
import { Pagination } from "@/components/pagination";
import { LayoutDashboardContent } from "@/layout";
import { ArrowLeftSquare } from "react-iconly";
import { Add } from "iconsax-react";

import { ModalAddEventCommunity } from "@/components/modal";
import { TableManageEventCommunity } from "@/components/tables/manage-event-community/TableManageEventCommunity";

// dummy
const DummyData = [];
const names = [
  "Bersih-bersih pantai pandawa",
  "Gunung Rinjani Bersih dari Polusi",
  "Sungai Citarum Sik Resik",
];
// const tglPelaksanaan = ["21 Oktober 2023"];
const kuotaEvent = [1000, 2000, 3000];
const labels = ["Berjalan", "Belum Berjalan", "Selesai"];
const buttonLabels = ["Berjalan", "Belum Berjalan", "Selesai"];
const locations = ["Desa Kutuh, Badung, Kuta, Bali"];
const gMap = ["https://maps.app.goo.gl/Kqzyv87jsVF67yVV8"];
const gForm = ["https://forms.google/bla0812hxkasaonca112klasap12m1lxale/view"];
const description = [
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id nobis vel voluptatibus architecto est reiciendis perspiciatis? Doloribus neque voluptatum molestias. Necessitatibus libero at ex fuga facilis dolor ipsa ratione non.",
];

for (let i = 0; i < 10; i++) {
  const name = names[Math.floor(Math.random() * names.length)];
  // const tanggal = ["20 Oktober 2023"];
  const tanggal = new Date(
    Math.floor(Math.random() * 3) + 2021,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 31)
  );
  const kuota = kuotaEvent[Math.floor(Math.random() * kuotaEvent.length)];
  const status = labels[Math.floor(Math.random() * labels.length)];
  const points = Math.floor(Math.random() * 10000);
  const location = locations[Math.floor(Math.random() * locations.length)];
  const gMaps = gMap[Math.floor(Math.random() * gMap.length)];
  const gForms = gForm[Math.floor(Math.random() * gForm.length)];
  const descriptions =
    description[Math.floor(Math.random() * description.length)];
  DummyData.push({
    name,
    tanggal,
    kuota,
    points,
    status,
    location,
    descriptions,
    gMaps,
    gForms,
    image: "https://picsum.photos/200",
  });
}
// end dummy

function ManageEventCommunity() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeFilter, setActiveFilter] = useState("Berjalan");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredData = () => {
    return DummyData.filter(
      (data) =>
        (activeFilter === "Semua" || data.status === activeFilter) &&
        data.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a) => (a.status === "Terbaru" ? -1 : 1));
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

  const handleAddModal = () => {
    onOpen();
  };

  const handleSubmitAdded = (data) => {
    console.log("added!", data);
    onClose();
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const navigate = useNavigate();

  return (
    <LayoutDashboardContent>
      <Heading
        as="h1"
        color={"#201A18"}
        fontSize={"2xl"}
        fontWeight="bold"
        mb={"1.5rem"}
      >
        Detail Event Community
      </Heading>
      <Flex
        bg={"white"}
        borderRadius={"xl"}
        boxShadow={"md"}
        direction={"column"}
        gap={"1.5rem"}
        p={"1.5rem"}
      >
        <Flex
          gap={"1.5rem"}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <ButtonGroup spacing={0}>
            {buttonLabels.map((label) => (
              <FilterButton
                key={label}
                label={label}
                activeFilter={activeFilter}
                handleFilterClick={handleFilterClick}
                filteredDataCount={filteredDataCount}
              />
            ))}
          </ButtonGroup>
          <Flex justifyContent="flex-end" alignItems="center">
            <Button
              leftIcon={<ArrowLeftSquare />}
              _hover={{ bg: "#333333" }}
              bg={"#828282"}
              borderRadius={"lg"}
              color={"white"}
              fontWeight={"normal"}
              lineHeight={"1.5rem"}
              px={"1.5rem"}
              py={"1.75rem"}
              marginRight={"20px"}
              onClick={() => navigate("/dashboard/community")}
            >
              Kembali
            </Button>
            <Button
              leftIcon={<Add />}
              _hover={{ bg: "#2DA22D" }}
              bg={"#35CC33"}
              borderRadius={"lg"}
              color={"white"}
              fontWeight={"normal"}
              lineHeight={"1.5rem"}
              px={"1.5rem"}
              py={"1.75rem"}
              onClick={handleAddModal}
            >
              Tambah Data
            </Button>
          </Flex>
        </Flex>

        <TableManageEventCommunity
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
      <ModalAddEventCommunity
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitAdded}
      />
    </LayoutDashboardContent>
  );
}

export default ManageEventCommunity;
