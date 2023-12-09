import { ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import { SearchBar } from "@/components/navigation";
import { useCallback, useEffect, useState } from "react";
import { FilterButton } from "@/components/buttons";
import { Pagination } from "@/components/pagination";
import { TableTransactionList } from "@/components/tables";
import { LayoutDashboardContent } from "@/layout";
import { useDispatch, useSelector } from "react-redux";
import { clearDatasTransactionState, clearPatchDataTransactionState, fetchDatasTransaction, fetchDatasTransactionSelector, patchDataTransactionSelector } from "@/store/transaction-list";
import { useCustomToast, useDebounce } from "@/hooks";
import { Spinner } from "@/components/spinner";

function TransactionList() {
	const dispatch = useDispatch();

	const {
		data = [],
		status,
		message,
		count,
	} = useSelector(fetchDatasTransactionSelector);

	const { status: patchStatus, message: patchMessage } = useSelector(
		patchDataTransactionSelector
	);

	const [_searchTerm, setSearchTerm] = useState("");
	const searchTerm = useDebounce(_searchTerm, 500);

	const buttonLabels = ["Semua", "Terbaru", "Diproses", "Selesai"];
	const [activeFilter, setActiveFilter] = useState({
		label: "Semua",
		value: "",
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	useCustomToast(patchStatus, patchMessage);

	const fectchTransactionData = useCallback(() => {
		dispatch(
			fetchDatasTransaction({
				status: activeFilter.value,
				search: searchTerm,
				limit: itemsPerPage,
				page: currentPage,
			})
		)
	}, [dispatch, searchTerm, itemsPerPage, currentPage, activeFilter]);

	useEffect(() => {
	  fectchTransactionData();
	}, [fectchTransactionData, searchTerm,  itemsPerPage, currentPage])

	useEffect(() => {
		if (patchStatus === "success") {
			fectchTransactionData();
			setSearchTerm("");
			setCurrentPage(1);
		}

		return () => {
			if (patchStatus !== "idle") dispatch(clearPatchDataTransactionState());
		};
	}, [patchStatus, dispatch, fetchDatasTransaction]);

	useEffect(() => {
		return () => {
			dispatch(clearDatasTransactionState());
		};
	}, [dispatch]);

	const filteredData = Object.values(data).filter((transaction) => {
		return transaction.user?.toLowerCase().includes(searchTerm.toLowerCase());
	});

	const filteredDataCount = (filter) => {
		switch (filter) {
			case "Terbaru":
				return count?.count_newest || 0;
			case "Diproses":
				return count?.count_process || 0;
			case "Selesai":
				return count?.count_done || 0;
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
		if (filter === "Terbaru") {
			setActiveFilter({ label: "Terbaru", value: "terbaru" });
		} else if (filter === "Diproses") {
			setActiveFilter({ label: "Diproses", value: "diproses" });
		} else if (filter === "Selesai") {
			setActiveFilter({ label: "Selesai", value: "selesai" });
		} else {
			setActiveFilter({ label: "Semua", value: "" });
		}
	};

	return (
		<LayoutDashboardContent>
			{console.log(patchStatus)}
			<Heading
				as="h1"
				color={"#201A18"}
				fontSize={"2xl"}
				fontWeight="bold"
				mb={"1.5rem"}
			>
				Daftar Transaksi Tukar Poin
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
				</Flex>
				{status === "loading" && <Spinner />}
				{status === "failed" && <div>{message}</div>}
				{status === "success" && (
					<>
						<TableTransactionList
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
		</LayoutDashboardContent>
	);
}

export default TransactionList;
