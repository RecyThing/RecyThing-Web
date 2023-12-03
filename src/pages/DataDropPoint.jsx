/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { SearchBar } from "@/components/navigation";
import { BsPlus } from "react-icons/bs";
import { Pagination } from "@/components/pagination";
import { useDisclosure } from "@chakra-ui/react";
import { ModalAddDataDropPoint } from "@/components/modal";
import { TableDataDropPoint } from "@/components/tables";
import { LayoutDashboardContent } from "@/layout";
import { useCustomToast } from "@/hooks";
import { APIDropPoint } from "@/apis/APIDropPoint";

function DataDropPoint() {
	const [toastMessage, setToastMessage] = useState({ status: "", message: "" });
	const [dropPointData, setDropPointData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [totalItems, setTotalItems] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const {
		isOpen: isOpenViewCreate,
		onOpen: onOpenViewCreate,
		onClose: onCloseViewCreate,
	} = useDisclosure();

	const handleSearch = (term) => {
		setSearchTerm(term);
		setCurrentPage(1);
	};

	function getDropPointData() {
    setIsLoading(true);
    APIDropPoint.getAllDataDropPoint(searchTerm, itemsPerPage, currentPage).then(res => {
      setDropPointData(res.data);
      setTotalItems(res.count_data);
    }).finally(() => {setToastMessage({ status: "", message: "" }); setIsLoading(false)});
  }

	useCustomToast(toastMessage.status, toastMessage.message);

	useEffect(() => {
		getDropPointData();
	}, [currentPage, searchTerm, itemsPerPage]);

	return (
		<LayoutDashboardContent>
			<p className="font-bold text-2xl">Kelola Drop Point Penukaran Sampah</p>

			<div className="mt-4 p-6 rounded-2xl bg-white">
				<div className="flex justify-between">
					<SearchBar
						onSearch={handleSearch}
						className={"max-w-[407px]"}
					/>
					<button
						onClick={onOpenViewCreate}
						className="my-auto flex items-center h-fit py-4 px-5 gap-[10px] rounded-[10px] bg-[#35CC33] text-white"
					>
						<BsPlus className="text-2xl" />
						<p>Tambah Data</p>
					</button>
				</div>

				<ModalAddDataDropPoint
					isOpen={isOpenViewCreate}
					onClose={onCloseViewCreate}
				/>
				<TableDataDropPoint
					data={dropPointData}
					isOpenViewCreate={isOpenViewCreate}
					onCloseViewCreate={onCloseViewCreate}
				/>
				<Pagination
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					onChangeItemsPerPage={setItemsPerPage}
					onChangePage={setCurrentPage}
					totalItems={totalItems}
				/>
			</div>
		</LayoutDashboardContent>
	);
}

export default DataDropPoint;
