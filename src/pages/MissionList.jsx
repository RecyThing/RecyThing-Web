import {
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { useState } from "react";
import { TableMissionList } from "@/components/tables/mission-list/TableMissionList";
import { Add } from "iconsax-react";
import { ModalAddMission } from "@/components/modal";
import { FilterButton } from "@/components/buttons";

// dummy
const dummyData = [];
const missions = [
  "Buang Sampah",
  "Membaca Artikel",
  "Lingkungan yang lebih bersih!",
  "Tukarkan 1 kg sampah",
  "Laporkan 3 Pelaku Pelanggaran sampah",
  "Tukarkan 2 kg sampah",
  "Ikuti Event Komunitas",
  "Jaga Lingkungan, Sayangi bumi",
  "3 Step Daur Ulang",
  "Mulai hari dengan kehijauan!",
];
const steps = [
  {
    title: "Tantangan pertama untukmu",
    description: "Buanglah sampah Plastik pada pembuangan terdekat!",
  },
  {
    title: "Yuk, Tantangan kedua!",
    description: "Buanglah sampah Kaca pada pembuangan tersebut",
  },
  {
    title: "Terakhir, tantangan ketiga.",
    description: "Buanglah sampah Logam pada pembuangan terdekat!",
  },
];
const images = [
	"https://avatars.githubusercontent.com/u/60215086?v=4",
	"https://avatars.githubusercontent.com/u/60215086?v=4",
	"https://avatars.githubusercontent.com/u/60215086?v=4",
	"https://avatars.githubusercontent.com/u/60215086?v=4",
	"https://avatars.githubusercontent.com/u/60215086?v=4",
];

const buttonLabels = ["Semua", "Aktif", "Melewati Tenggat"];

for (let i = 0; i < 50; i++) {
  const mission = missions[Math.floor(Math.random() * missions.length)];
  const maker = `admin${Math.floor(Math.random() * 50)}`;
  const status =
    Math.floor(Math.random() * 30) % 2 ? "Aktif" : "Melewati Tenggat";
  const point = Math.floor(Math.random() * 9900) + 100;
  const startDate = new Date(2021, 1, 1);
	const endDate = new Date(2021, 12, 31);
  const image = images[Math.floor(Math.random() * images.length)];
  dummyData.push({
    title: mission,
    description:
      "Mari ciptakan lingkungan yang lebih bersih, mulai dari langkah yang kecil.",
    maker: maker,
    status: status,
    point: point,
    image: image,
    startDate: startDate,
    endDate: endDate,
    steps: steps,
  });
}
// end dummy

function MissionList() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const filteredData = dummyData.filter(([username]) =>
  //   username.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredDataCount = (filter) => {
    return dummyData.filter((data) =>
      filter === "Semua" ? true : data.status === filter
    ).length;
  };

  const paginatedData = dummyData.slice(
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
        Kelola Misi
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
              <FilterButton
                key={label}
                label={label}
                activeFilter={activeFilter}
                handleFilterClick={handleFilterClick}
                filteredDataCount={filteredDataCount}
              />
            ))}
          </ButtonGroup>
          <SearchBar onSearch={handleSearch} />
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
            onClick={onOpen}
            width={"400px"}
          >
            Tambah Data
          </Button>
        </Flex>

        <TableMissionList
          currentPage={currentPage}
          data={paginatedData}
          itemsPerPage={itemsPerPage}
        />
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onChangeItemsPerPage={setItemsPerPage}
          onChangePage={setCurrentPage}
          totalItems={dummyData.length}
        />
      </Flex>
      <ModalAddMission isOpen={isOpen} onClose={onClose} onSubmit={onClose} />
    </Container>
  );
}

export default MissionList;
