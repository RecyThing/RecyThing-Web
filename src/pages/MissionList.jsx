/* eslint-disable react-hooks/exhaustive-deps */
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
import { useCallback, useEffect, useState } from "react";
import { TableMissionList } from "@/components/tables/mission-list/TableMissionList";
import { Add } from "iconsax-react";
import { ModalAddMission } from "@/components/modal";
import { FilterButton } from "@/components/buttons";
import { useCustomToast, useDebounce } from "@/hooks";
import { Spinner } from "@/components/spinner";
import { formatDateToISOString } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCreateMissionState,
  clearDeleteMissionState,
  clearFetchMissionsState,
  clearFetchMissionState,
  clearUpdateMissionState,
  createMission,
  createMissionSelector,
  deleteMissionSelector,
  fetchMissions,
  fetchMissionsSelector,
  updateMissionSelector,
} from "@/store/mission";

// dummy
// const dummyData = [];
// const missions = [
//   "Buang Sampah",
//   "Membaca Artikel",
//   "Lingkungan yang lebih bersih!",
//   "Tukarkan 1 kg sampah",
//   "Laporkan 3 Pelaku Pelanggaran sampah",
//   "Tukarkan 2 kg sampah",
//   "Ikuti Event Komunitas",
//   "Jaga Lingkungan, Sayangi bumi",
//   "3 Step Daur Ulang",
//   "Mulai hari dengan kehijauan!",
// ];
// const steps = [
//   {
//     title: "Tantangan pertama untukmu",
//     description: "Buanglah sampah Plastik pada pembuangan terdekat!",
//   },
//   {
//     title: "Yuk, Tantangan kedua!",
//     description: "Buanglah sampah Kaca pada pembuangan tersebut",
//   },
//   {
//     title: "Terakhir, tantangan ketiga.",
//     description: "Buanglah sampah Logam pada pembuangan terdekat!",
//   },
// ];
// const images = [
//   "https://avatars.githubusercontent.com/u/60215086?v=4",
//   "https://avatars.githubusercontent.com/u/60215086?v=4",
//   "https://avatars.githubusercontent.com/u/60215086?v=4",
//   "https://avatars.githubusercontent.com/u/60215086?v=4",
//   "https://avatars.githubusercontent.com/u/60215086?v=4",
// ];

const buttonLabels = ["Semua", "Aktif", "Melewati Tenggat"];

// for (let i = 0; i < 50; i++) {
//   const mission = missions[Math.floor(Math.random() * missions.length)];
//   const maker = `admin${Math.floor(Math.random() * 50)}`;
//   const status =
//     Math.floor(Math.random() * 30) % 2 ? "Aktif" : "Melewati Tenggat";
//   const point = Math.floor(Math.random() * 9900) + 100;
//   const startDate = new Date(2021, 1, 1);
//   const endDate = new Date(2021, 12, 31);
//   const image = images[Math.floor(Math.random() * images.length)];
//   dummyData.push({
//     title: mission,
//     description:
//       "Mari ciptakan lingkungan yang lebih bersih, mulai dari langkah yang kecil.",
//     maker: maker,
//     status: status,
//     point: point,
//     image: image,
//     startDate: startDate,
//     endDate: endDate,
//     steps: steps,
//   });
// }
// end dummy

function MissionList() {
  const dispatch = useDispatch();
  const { data = [], status, message } = useSelector(fetchMissionsSelector);
  const { status: updateStatus, message: updateMessage } = useSelector(
    updateMissionSelector
  );
  const { status: deleteStatus, message: deleteMessage } = useSelector(
    deleteMissionSelector
  );
  const { status: createStatus, message: createMessage } = useSelector(
    createMissionSelector
  );

  const [_searchTerm, setSearchTerm] = useState("");
  const searchTerm = useDebounce(_searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useCustomToast(updateStatus, updateMessage);
  useCustomToast(deleteStatus, deleteMessage);
  useCustomToast(createStatus, createMessage);

  const fetchMissionsData = useCallback(() => {
    dispatch(
      fetchMissions({
        search: searchTerm,
        limit: 10,
        page: currentPage,
      })
    ).then((res) => {
      if (res.payload) {
        setTotalItems(res.payload.count_data);
      }
    });
  }, [dispatch, searchTerm, itemsPerPage, currentPage]);

  useEffect(() => {
    fetchMissionsData();
  }, [searchTerm, itemsPerPage, currentPage, fetchMissionsData]);

  useEffect(() => {
    if (
      updateStatus === "success" ||
      deleteStatus === "success" ||
      createStatus === "success"
    ) {
      fetchMissionsData();
      setSearchTerm("");
      setCurrentPage(1);
    }

    return () => {
      if (updateStatus !== "idle") dispatch(clearUpdateMissionState());
      if (deleteStatus !== "idle") dispatch(clearDeleteMissionState());
      if (createStatus !== "idle") dispatch(clearCreateMissionState());
    };
  }, [fetchMissionsData, updateStatus, deleteStatus, createStatus, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearFetchMissionsState());
      dispatch(clearFetchMissionState());
      dispatch(clearUpdateMissionState());
      dispatch(clearDeleteMissionState());
      dispatch(clearCreateMissionState());
    };
  }, [dispatch]);

  const filteredData = Object.values(data).filter((mission) => {
    return (
      mission.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleAddModal = () => {
    onOpen();
  };

  const handleSubmitAdded = (data) => {
    data.missionStartDate = formatDateToISOString(data.missionStartDate);
		data.missionEndDate = formatDateToISOString(data.missionEndDate);
    const formData = new FormData();
    formData.append("image", data.missionImage);
    formData.append("title", data.missionTitle);
    formData.append("point", data.missionPoint);
    formData.append("description", data.missionDescription);
    formData.append("start_date", data.missionStartDate);
    formData.append("end_date", data.missionEndDate);
    dispatch(createMission(formData)).then((res) => {
      if (res.payload) {
        onClose();
      }
    });
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
          {/* <ButtonGroup spacing={0}>
            {buttonLabels.map((label) => (
              <FilterButton
                key={label}
                label={label}
                activeFilter={activeFilter}
                handleFilterClick={handleFilterClick}
                filteredDataCount={filteredDataCount}
              />
            ))}
          </ButtonGroup> */}
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
            onClick={handleAddModal}
            width={"400px"}
          >
            Tambah Data
          </Button>
        </Flex>

        {status === "loading" && <Spinner />}
        {status === "failed" && <div>{message}</div>}
        {status === "success" && (
          <>
            <TableMissionList
              currentPage={currentPage}
              data={filteredData}
              itemsPerPage={itemsPerPage}
            />
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onChangeItemsPerPage={setItemsPerPage}
              onChangePage={setCurrentPage}
              totalItems={totalItems}
            />
          </>
        )}
      </Flex>
      <ModalAddMission
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitAdded}
      />
    </Container>
  );
}

export default MissionList;
