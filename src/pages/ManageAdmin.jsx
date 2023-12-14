import { Flex, Heading, Button, useDisclosure } from "@chakra-ui/react";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation/";
import { useCallback, useEffect, useState } from "react";
import { ModalAddAdmin } from "@/components/modal";
import { TableAdminList } from "@/components/tables";
import { LayoutDashboardContent } from "@/layout";
import { useCustomToast, useDebounce } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCreateAdminState,
  clearDeleteAdminState,
  clearFetchAdminsState,
  clearUpdateAdminState,
  createAdminSelector,
  createAdmins,
  deleteAdminSelector,
  fetchAdmins,
  fetchAdminsSelector,
  updateAdminSelector,
} from "@/store/admin";
import { Spinner } from "@/components/spinner";

function ManageAdmin() {
  const dispatch = useDispatch();
  const {
    data = [],
    status,
    // pagination,
    count_data,
    message,
  } = useSelector(fetchAdminsSelector);

  const { status: updateStatus, message: updateMessage } =
    useSelector(updateAdminSelector);
  const { status: deleteStatus, message: deleteMessage } =
    useSelector(deleteAdminSelector);
  const { status: createStatus, message: createMessage } =
    useSelector(createAdminSelector);

  const [_searchTerm, setSearchTerm] = useState("");
  const searchTerm = useDebounce(_searchTerm);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useCustomToast(updateStatus, updateMessage);
  useCustomToast(deleteStatus, deleteMessage);
  useCustomToast(createStatus, createMessage);

  const fetchAdminData = useCallback(() => {
    dispatch(
      fetchAdmins({
        search: searchTerm,
        limit: itemsPerPage,
        page: currentPage,
      })
    );
  }, [dispatch, searchTerm, itemsPerPage, currentPage]);

  useEffect(() => {
    fetchAdminData();
  }, [searchTerm, itemsPerPage, currentPage, fetchAdminData]);

  useEffect(() => {
    if (
      updateStatus === "success" ||
      deleteStatus === "success" ||
      createStatus === "success"
    ) {
      fetchAdminData();
      setSearchTerm("");
      setCurrentPage(1);
    }

    return () => {
      if (updateStatus !== "idle") dispatch(clearUpdateAdminState());
      if (deleteStatus !== "idle") dispatch(clearDeleteAdminState());
      if (createStatus !== "idle") dispatch(clearCreateAdminState());
    };
  }, [fetchAdminData, updateStatus, deleteStatus, createStatus, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearFetchAdminsState());
    };
  }, [dispatch]);

  const filteredData = Object.values(data).filter((admin) => {
    return admin.fullname?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSubmitAdded = (data) => {
    data.image = data.image[0];

    dispatch(createAdmins(data)).then((res) => {
      if (res.payload) {
        onClose();
      }
    });
  };

  const handleAddModal = () => {
    onOpen();
  };

  const handleSubmitData = (data) => {
    dispatch(createAdmins(data)).then((res) => {
      if (res.payload) {
        onClose();
      }
    });
  };

  return (
    <LayoutDashboardContent>
      <ModalAddAdmin
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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 18V6"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Tambah Admin
          </Button>
        </Flex>
        {status === "success" && (
          <>
            <TableAdminList
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
        {status === "loading" && <Spinner />}
        {status === "failed" && <div>{message}</div>}
      </Flex>

      <ModalAddAdmin
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitAdded}
      />
    </LayoutDashboardContent>
  );
}

export default ManageAdmin;
