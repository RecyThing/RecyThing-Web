import { Pagination } from "@/components/pagination/Pagination";
import { Add } from "iconsax-react";
import { Flex, Heading } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { SearchBar } from "@/components/navigation";
import { WasteExchangeAddData } from "@/components/modal/waste-exchange-modals/WasteExchangeAddData";
import { WasteExchangeTable } from "@/components/tables";

function ManageWasteExchange() {
    const [isAddData, setIsAddData] = useState(false);
    const [filterSearch, setFilterSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isFocused, setIsFocused] = useState(false);

    const openForm = () => {
        setIsAddData(true);
    };
    
    const closeForm = () => {
        setIsAddData(false);
    };

    const handleSearch = (term) => {
		setSearchTerm(term);
		setCurrentPage(1);
	};

    const filteredData = DummyData.filter(([username]) =>
		username.toLowerCase().includes(filterSearch.toLowerCase())
	);     
    
	const paginatedData = filteredData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

    return (
        <div className="p-6 w-full" style={{background: "#EBEBF0"}}>
        {isAddData ? (
            <WasteExchangeAddData isOpen={isAddData} onClose={closeForm} setIsAddData={setIsAddData}/>
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
                    <WasteExchangeTable
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

export default ManageWasteExchange;

// dummy
const DummyData = [];
const names = [
	"Courtney Henry",
	"Bessie Cooper",
	"Brooklyn Simmons",
	"Theresa Webb",
	"Jerome Bell",
    "Cameron Williamson",
	"Darrell Steward",
	"Esther Howard",
	"Jacob Jones",
	"Eleanor Pena",
];
const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];

for (let i = 0; i < 50; i++) {
	const name = names[Math.floor(Math.random() * names.length)];
	const email = `${name.replace(" ", ".").toLowerCase()}@${
		domains[Math.floor(Math.random() * domains.length)]
	}`;
	const location = "Drop Point A";
	DummyData.push([name, email, location]);
}
// end dummy