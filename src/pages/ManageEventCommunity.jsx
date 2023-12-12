import {
  ButtonGroup,
  Flex,
  Heading,
  Button,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pagination } from "@/components/pagination";
import { LayoutDashboardContent } from "@/layout";
import { ArrowLeftSquare } from "react-iconly";
import { Add } from "iconsax-react";

import { ModalAddEventCommunity } from "@/components/modal";
import { TableManageEventCommunity } from "@/components/tables/manage-event-community/TableManageEventCommunity";

import {
  clearDeleteEventState,
  clearFetchEventsState,
  clearFetchEventState,
  clearUpdateEventState,
  createEvent,
  createEventSelector,
  deleteEventSelector,
  fetchEvents,
  fetchEventsSelector,
  updateEventSelector,
} from "@/store/event-community";
import { useDispatch, useSelector } from "react-redux";

function ManageEventCommunity() {
  const dispatch = useDispatch();
  const {
    data = [],
    status,
    message,
    count_data,
  } = useSelector(fetchEventsSelector);

  const { status: deleteStatus, message: deleteMessage } =
    useSelector(deleteEventSelector);
  const { status: updateStatus, message: updateMessage } =
    useSelector(updateEventSelector);
  const { status: createStatus, message: createMessage } =
    useSelector(createEventSelector);

  const [_searchTerm, setSearchTerm] = useState("");
  const searchTerm = useDebounce(_searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [activeFilter, setActiveFilter] = useState("Berjalan");

  const fetchEventsData = useCallback(() => {
    dispatch(
      fetchEvents({
        search: searchTerm,
        limit: itemsPerPage,
        page: currentPage,
      })
    );
  }, [dispatch, searchTerm, itemsPerPage, currentPage]);

  useEffect(() => {
    fetchEventsData();
  }, [fetchEventsData, searchTerm, itemsPerPage, currentPage]);

  useEffect(() => {
    if (
      deleteStatus === "success" ||
      updateStatus === "success" ||
      createStatus === "success"
    ) {
      fetchEventsData();
      setSearchTerm("");
      setCurrentPage(1);
    }

    return () => {
      if (updateStatus !== "idle") dispatch(clearUpdateEventState());
      if (deleteStatus !== "idle") dispatch(clearDeleteEventState());
      if (createStatus !== "idle") dispatch(clearDeleteEventState());
    };
  }, [deleteStatus, updateStatus, createStatus, dispatch, fetchEventsData]);

  useEffect(() => {
    return () => {
      dispatch(clearFetchEventsState());
      dispatch(clearFetchEventState());
      dispatch(clearUpdateEventState());
      dispatch(clearDeleteEventState());
    };
  }, [dispatch]);

  const filteredData = Object.values(data).filter((event) => {
    return event.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // const handleSearch = (term) => {
  //   setSearchTerm(term);
  //   setCurrentPage(1);
  // };

  const handleAddModal = () => {
    onOpen();
  };

  // const paginatedData = filteredData().slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  const handleSubmitAdded = (target) => {
    target.image = target.image[0];
    dispatch(createEvent(target)).then(() => {
      onClose();
    });
  };

  useCustomToast(createStatus, createMessage);
  useCustomToast(deleteStatus, deleteMessage);
  useCustomToast(updateStatus, updateMessage);

  // const handleFilterClick = (filter) => {
  //   setActiveFilter(filter);
  //   setCurrentPage(1);
  // };

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

        {status === "loading" && <Spinner />}
        {status === "failed" && <div>{message}</div>}
        {status === "success" && (
          <>
            {" "}
            <TableManageEventCommunity
              currentPage={currentPage}
              data={filteredData}
              itemsPerPage={itemsPerPage}
            />
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onChangeItemsPerPage={setItemsPerPage}
              onChangePage={setCurrentPage}
              totalItems={count_data}
            />
          </>
        )}
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
