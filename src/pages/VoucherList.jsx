import { Add } from "iconsax-react";
import { Box, Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { useCallback, useEffect, useState } from "react";
import { TableVoucherList } from "@/components/tables";
import { ModalAddVoucher } from "@/components/modal";
import { LayoutDashboardContent } from "@/layout";
import { useDispatch, useSelector } from "react-redux";
import {
<<<<<<< HEAD
  clearCreateVoucherState,
  clearDeleteVoucherState,
  clearFetchVoucherState,
  clearFetchVouchersState,
  clearUpdateVoucherState,
  createVoucher,
  createVoucherSelector,
  deleteVoucherSelector,
  fetchVouchers,
  fetchVouchersSelector,
  updateVoucherSelector,
=======
	clearCreateVoucherState,
	clearDeleteVoucherState,
	clearFetchVouchersState,
	clearFetchVoucherState,
	clearUpdateVoucherState,
	createVoucher,
	createVoucherSelector,
	deleteVoucherSelector,
	fetchVouchers,
	fetchVouchersSelector,
	updateVoucherSelector,
>>>>>>> 70f0ecfb44ecf9a9f00990365d334a5926e31d3f
} from "@/store/voucher";
import { Spinner } from "@/components/spinner";
import { useCustomToast, useDebounce } from "@/hooks";
import { formatDateToISOString } from "@/utils";

function VoucherList() {
<<<<<<< HEAD
  const dispatch = useDispatch();
  const {
    data = [],
    status,
    message,
    count_data,
  } = useSelector(fetchVouchersSelector);
  const { status: updateStatus, message: updateMessage } = useSelector(
    updateVoucherSelector
  );
  const { status: deleteStatus, message: deleteMessage } = useSelector(
    deleteVoucherSelector
  );
  const { status: createStatus, message: createMessage } = useSelector(
    createVoucherSelector
  );
=======
	const dispatch = useDispatch();
	const { data = [], status, message } = useSelector(fetchVouchersSelector);
	const { status: updateStatus, message: updateMessage } = useSelector(
		updateVoucherSelector
	);
	const { status: deleteStatus, message: deleteMessage } = useSelector(
		deleteVoucherSelector
	);
	const { status: createStatus, message: createMessage } = useSelector(
		createVoucherSelector
	);
>>>>>>> 70f0ecfb44ecf9a9f00990365d334a5926e31d3f

  const [_searchTerm, setSearchTerm] = useState("");
  const searchTerm = useDebounce(_searchTerm, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

<<<<<<< HEAD
  const fetchVouchersData = useCallback(() => {
    dispatch(
      fetchVouchers({
        search: searchTerm,
        limit: itemsPerPage,
        page: currentPage,
      })
    );
  }, [dispatch, searchTerm, itemsPerPage, currentPage]);
=======
	useCustomToast(updateStatus, updateMessage);
	useCustomToast(deleteStatus, deleteMessage);
	useCustomToast(createStatus, createMessage);

	const fetchVouchersData = useCallback(() => {
		dispatch(
			fetchVouchers({
				search: searchTerm,
				limit: itemsPerPage,
				page: currentPage,
			})
		).then((res) => {
			if (res.payload) {
				setTotalItems(res.payload.count_data);
			}
		});
	}, [dispatch, searchTerm, itemsPerPage, currentPage]);
>>>>>>> 70f0ecfb44ecf9a9f00990365d334a5926e31d3f

  useEffect(() => {
    fetchVouchersData();
  }, [searchTerm, itemsPerPage, currentPage, fetchVouchersData]);

  useEffect(() => {
    if (
      updateStatus === "success" ||
      deleteStatus === "success" ||
      createStatus === "success"
    ) {
      fetchVouchersData();
      setSearchTerm("");
      setCurrentPage(1);
    }

    return () => {
      if (updateStatus !== "idle") dispatch(clearUpdateVoucherState());
      if (deleteStatus !== "idle") dispatch(clearDeleteVoucherState());
      if (createStatus !== "idle") dispatch(clearCreateVoucherState());
    };
  }, [fetchVouchersData, updateStatus, deleteStatus, createStatus, dispatch]);

<<<<<<< HEAD
  useEffect(() => {
    setTotalItems(count_data);
  }, [count_data]);

  useEffect(() => {
    if (createStatus === "success" || createStatus === "failed") {
      onClose();
    }
  }, [createStatus, onClose]);

  useEffect(() => {
    return () => {
      dispatch(clearFetchVouchersState());
      dispatch(clearFetchVoucherState());
      dispatch(clearUpdateVoucherState());
      dispatch(clearDeleteVoucherState());
      dispatch(clearCreateVoucherState());
    };
  }, [dispatch]);
=======
	useEffect(() => {
		return () => {
			dispatch(clearFetchVouchersState());
			dispatch(clearFetchVoucherState());
			dispatch(clearUpdateVoucherState());
			dispatch(clearDeleteVoucherState());
			dispatch(clearCreateVoucherState());
		};
	}, [dispatch]);
>>>>>>> 70f0ecfb44ecf9a9f00990365d334a5926e31d3f

  const filteredData = Object.values(data).filter((voucher) => {
    return (
      voucher.reward_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.point.toString().includes(searchTerm)
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
    data.image = data.image[0];
    data.start_date = formatDateToISOString(data.start_date);
    data.end_date = formatDateToISOString(data.end_date);

<<<<<<< HEAD
    dispatch(createVoucher(data));
  };

  useCustomToast(updateStatus, updateMessage);
  useCustomToast(deleteStatus, deleteMessage);
  useCustomToast(createStatus, createMessage);

  return (
    <LayoutDashboardContent>
      <Heading
        as="h1"
        color={"#201A18"}
        fontSize={"2xl"}
        fontWeight="bold"
        mb={"1.5rem"}
      >
        Daftar Voucher
      </Heading>
      <Flex
        bg={"white"}
        borderRadius={"xl"}
        boxShadow={"md"}
        direction={"column"}
        gap={"1.5rem"}
        p={"1.5rem"}
      >
        <Flex justifyContent={"space-between"}>
          <Box w={"35%"}>
            <SearchBar onSearch={handleSearch} />
          </Box>
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
            Tambah Reward
          </Button>
        </Flex>
        {status === "loading" && <Spinner />}
        {status === "failed" && <div>{message}</div>}
        {status === "success" && (
          <>
            <TableVoucherList
              data={filteredData}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
=======
		dispatch(createVoucher(data)).then((res) => {
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
				Daftar Voucher
			</Heading>
			<Flex
				bg={"white"}
				borderRadius={"xl"}
				boxShadow={"md"}
				direction={"column"}
				gap={"1.5rem"}
				p={"1.5rem"}
			>
				<Flex justifyContent={"space-between"}>
					<Box w={"35%"}>
						<SearchBar onSearch={handleSearch} />
					</Box>
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
						Tambah Voucher
					</Button>
				</Flex>
				{status === "loading" && <Spinner />}
				{status === "failed" && <div>{message}</div>}
				{status === "success" && (
					<>
						<TableVoucherList
							data={filteredData}
							currentPage={currentPage}
							itemsPerPage={itemsPerPage}
						/>
>>>>>>> 70f0ecfb44ecf9a9f00990365d334a5926e31d3f

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

      <ModalAddVoucher
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitAdded}
      />
    </LayoutDashboardContent>
  );
}

export default VoucherList;
