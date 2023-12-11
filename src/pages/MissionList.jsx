/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  ButtonGroup,
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
import { LayoutDashboardContent } from "@/layout";

function MissionList() {
  const dispatch = useDispatch();
  const {
    data = [],
    status,
    message,
    count,
  } = useSelector(fetchMissionsSelector);
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
  const buttonLabels = ["Semua", "Aktif", "Melewati Tenggat"];
  const [activeFilter, setActiveFilter] = useState({
    label: "Semua",
    value: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useCustomToast(updateStatus, updateMessage);
  useCustomToast(deleteStatus, deleteMessage);
  useCustomToast(createStatus, createMessage);

  const fetchMissionsData = useCallback(() => {
    dispatch(
      fetchMissions({
        status: activeFilter.value,
        search: searchTerm,
        limit: itemsPerPage,
        page: currentPage,
      })
    );
  }, [dispatch, searchTerm, itemsPerPage, currentPage, activeFilter]);

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
    return mission.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredDataCount = (filter) => {
    switch (filter) {
      case "Aktif":
        return count?.count_active || 0;
      case "Melewati Tenggat":
        return count?.count_expired || 0;
      default:
        return count?.total_count || 0;
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterClick = (filter) => {
    setCurrentPage(1);
    if (filter === "Aktif") {
      setActiveFilter({ label: "Aktif", value: "aktif" });
    } else if (filter === "Melewati Tenggat") {
      setActiveFilter({ label: "Melewati Tenggat", value: "melewati tenggat" });
    } else {
      setActiveFilter({ label: "Semua", value: "" });
    }
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
    formData.append("title_stage", data.missionTitleStage);
    formData.append("description_stage", data.missionDescriptionStage);
    dispatch(createMission(formData)).then((res) => {
      if (res.payload) {
        onClose();
      }
    });
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
                activeFilter={activeFilter.label}
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
              totalItems={filteredDataCount(activeFilter.label)}
            />
          </>
        )}
      </Flex>
      <ModalAddMission
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitAdded}
      />
    </LayoutDashboardContent>
  );
}

export default MissionList;
