import { Pagination } from "@/components/pagination/Pagination";
import { Add } from "iconsax-react";
import { Flex, Heading } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { SearchBar } from "@/components/navigation";
import { KelolaSampahTambahData } from "@/components/modal/KelolaSampahTambahData";
import { KelolaPenukaranTable } from "@/components/tables";

function KelolaPenukaranSampah() {
    const [isTambahData, setIsTambahData] = useState(false);
    const [filterSearch, setFilterSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isFocused, setIsFocused] = useState(false);

    const openForm = () => {
        setIsTambahData(true);
    };
    
    const closeForm = () => {
        setIsTambahData(false);
    };
    
    const clickPoint = useRef();
    const [searchTerm, setSearchTerm] = useState("");

    const handleFocus = () => {
        if (clickPoint.current) {
          clickPoint.current.style.display = "none";
        }
        setIsFocused(true);
    };
      
    const handleBlur = () => {
        if (clickPoint.current) {
            clickPoint.current.style.display = "block";
        }
        setIsFocused(false);
    };

    const handleSearch = (term) => {
		setSearchTerm(term);
		setCurrentPage(1);
	};

    const filteredData = DummyData.filter(([username]) =>
		username.toLowerCase().includes(filterSearch.toLowerCase())
	);     

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return (
        <div className="p-6 w-full" style={{background: "#EBEBF0"}}>
        {isTambahData ? (
            <KelolaSampahTambahData isOpen={isTambahData} onClose={closeForm} setIsTambahData={setIsTambahData}/>
        ) : null}
            <Heading as="h1" color={"#201A18"} fontSize={"2xl"} fontWeight="bold" mb={"1.5rem"}>
				Kelola Penukaran Sampah
			</Heading>
            <div className="bg-white rounded-lg shadow-md mt-4 p-4 h-90% w-full">
                <div className="flex justify-between items-center mb-4 ml-2 w-full">
                    <div style={{width: "35%"}}>
                        <SearchBar onSearch={handleSearch}/>
                    </div>
                    <div className={`text-white font-inter font-medium text-lg flex items-center gap-2 mr-2 p-3 h-12 rounded-lg cursor-pointer ${isFocused ? 'ml-3' : ''}`} style={{ backgroundColor: "rgba(53, 204, 51, 1)" }} onClick={openForm}>
                        <Add size="24" color="rgba(255, 255, 255, 1)" />
                        <p>Tambah Data</p>
                    </div>
                </div>      
                <Flex
                    direction={"column"}
                    gap={"1.5rem"}
                    p={"0.5rem"}
                    marginTop={"16px"}
                >
                    <KelolaPenukaranTable
                        data={paginatedData}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                    />
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onChangeItemsPerPage={setItemsPerPage}
                        onChangePage={setCurrentPage}
                        totalItems={filteredData.length}
                    />
                </Flex>
            </div>
        </div>
    );
}

export default KelolaPenukaranSampah;

const getPointsByType = (jenisSampah) => {
    const pointsMap = {
        logam: 500,
        plastik: 400,
        kertas: 300,
        kaca: 200,
    };
    return pointsMap[jenisSampah] || 0;
};

const DummyData = [
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
];