import { useState } from 'react'
import { SearchBar } from "@/components/navigation"
import { BsPlus } from "react-icons/bs"
import DataDropPointTable from '@/components/tables/DataDropPointTable';
import { Pagination } from "@/components/pagination";
import { useDisclosure } from "@chakra-ui/react";
import { CreateDataDropPointModal } from '@/components/modal';

const DummyData = [];
const names = ["Ruko Gajah Mada Padang", "Stasiun Tabing Padang", "Ruko Khatib Sulaiman", "Ruko Panam Pekanbaru"];
const addresses = ["Jl. Adinegoro, Kataping Selatan, Kec. Bulu Kumbu, Kab. Semaran...", "Jl. Gajah Mada Dalam, Kp. Olo, Kec. Batu Gede, Kab. Bekasi, Jaw..."];

for (let i = 0; i < 50; i++) {
	const address = addresses[Math.floor(Math.random() * addresses.length)];
	const name = names[Math.floor(Math.random() * names.length)];
	DummyData.push({name, address, days: "Senin - Jumat , Sabtu - Minggu", time: "09:30 - 18:30 , 10:00 - 18:00" });
}

function DataDropPoint() {
  const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const { isOpen: isOpenViewCreate, onOpen: onOpenViewCreate, onClose: onCloseViewCreate } = useDisclosure();

	const filteredData = DummyData.filter(({ name: addressName }) => 
    addressName.toLowerCase().includes(searchTerm.toLowerCase())
  );

	const paginatedData = filteredData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const handleSearch = (term) => {
		setSearchTerm(term);
		setCurrentPage(1);
	};
  
  return (
    <div className="pt-7 px-5 pb-5 w-full min-h-screen bg-[#EBEBF0]">
      <p className="font-bold text-2xl">Kelola Drop Point Penukaran Sampah</p>

      <div className="mt-4 p-6 rounded-2xl bg-white">
        <div className="flex justify-between">
          <SearchBar onSearch={handleSearch} className={"max-w-[407px]"} />
          <button onClick={onOpenViewCreate} className="my-auto flex items-center h-fit py-4 px-5 gap-[10px] rounded-[10px] bg-[#35CC33] text-white">
            <BsPlus className="text-2xl" />
            <p>Tambah Data</p>
          </button>
        </div>

				<CreateDataDropPointModal isOpen={isOpenViewCreate} onClose={onCloseViewCreate} />
        <DataDropPointTable data={paginatedData} isOpenViewCreate={isOpenViewCreate} onCloseViewCreate={onCloseViewCreate} />
        <Pagination
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					onChangeItemsPerPage={setItemsPerPage}
					onChangePage={setCurrentPage}
					totalItems={filteredData.length}
				/>
      </div>
    </div>
  )
}

export default DataDropPoint;
