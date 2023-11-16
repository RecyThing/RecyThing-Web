import { Pagination } from "@/components/pagination/Pagination";
import { Add } from "iconsax-react";
import { Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchBar } from "@/components/navigation";
import { AddDataCustomizationModal } from "@/components/modal/AddDataCustomizationModal";
import { DataCustomizationTable } from "@/components/tables";

function DataCustomization() {
    const [isAddData, setIsAddData] = useState(false);
    const [filterSearch, setFilterSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

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
		username.toLowerCase().includes(filterSearch.toLowerCase())
	);     

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return (
        <div className="p-6 w-full" style={{background: "#EBEBF0"}}>
        {isAddData ? (
            <AddDataCustomizationModal isOpen={isAddData} onClose={closeForm} setIsAddData={setIsAddData}/>
        ) : null}
            <div className="flex justify-between align-center">
                <Heading as="h1" color={"#201A18"} fontSize={"2xl"} fontWeight="bold" mt={"10px"}>
                    Manage Data For Open AI
                </Heading>
                <div className="text-white font-inter font-medium text-base flex items-center gap-2 mr-2 p-3 h-10 rounded-lg cursor-pointer" style={{ backgroundColor: "rgba(53, 204, 51, 1)" }} onClick={openForm}>
                    <Add size="24" color="rgba(255, 255, 255, 1)" />
                    <p>Tambah Data</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md mt-4 p-4 h-90% w-full">
                <div className="flex justify-between items-center mb-4 ml-2 w-full">
                    <div style={{width: "35%"}}>
                        <SearchBar onSearch={handleSearch}/>
                    </div>
                </div>      
                <Flex
                    direction={"column"}
                    gap={"1.5rem"}
                    p={"0.5rem"}
                    marginTop={"16px"}
                >
                    <DataCustomizationTable
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

export default DataCustomization;

// dummy
const DummyData = [];
const trash = [
	"Sampah Plastik",
	"Sampah Organik",
];
const questions = [
    "1. Apa saja contoh sampah plastik? 2. Bagaimana mengelola sampah plastik? Mengapa sampah plastik dapat mencemari lingkungan? 3. Apa dampak yang ditimbulkan jika kita tidak mengelola sampah plastik dengan baik? 4. Bagaimana cara mendaur ulang sampah plastik?", 
    "1. Apa saja contoh sampah plastik? 2. Bagaimana mengelola sampah plastik? Mengapa sampah plastik dapat mencemari lingkungan? 3. Apa dampak yang ditimbulkan jika kita tidak mengelola sampah plastik dengan baik? 4. Bagaimana cara mendaur ulang sampah plastik?"];

for (let i = 0; i < 20; i++) {
	const topik = trash[Math.floor(Math.random() * trash.length)];
	const pertanyaan = questions[Math.floor(Math.random() * questions.length)];
	DummyData.push([topik, pertanyaan]);
}
// end dummy