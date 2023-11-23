import { Pagination } from "@/components/pagination/Pagination";
import { Add } from "iconsax-react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchBar } from "@/components/navigation";
import { WasteExchangeAddData } from "@/components/modal/waste-exchange-modals/WasteExchangeAddData";
import { WasteExchangeTable } from "@/components/tables";

function ManageWasteExchange() {
    const [isAddData, setIsAddData] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isFocused, setIsFocused] = useState(false);

    const openForm = () => {
        setIsAddData(true);
    };
    
    const closeForm = () => {
        setIsAddData(false);
    };

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (term) => {
		setSearchTerm(term);
		setCurrentPage(1);
	};

    const filteredData = DummyData.filter(([username]) =>
		username.toLowerCase().includes(searchTerm.toLowerCase())
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
                        marginRight={"20px"}
                        onClick={openForm}
                    >
                        Tambah Data
                    </Button>
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