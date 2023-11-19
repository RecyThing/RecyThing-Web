import React, { useState } from "react";
import { Add } from "iconsax-react";
import { AddDataCustomizationModal } from "@/components/modal/data-customization/AddDataCustomizationModal";
import { DataCustomizationTable } from "@/components/tables";
import { Flex, Heading } from "@chakra-ui/react";
import { Pagination } from "@/components/pagination/Pagination";
import { SearchBar } from "@/components/navigation";

function DataCustomization() {
    const [isAddData, setIsAddData] = useState(false);
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

    const [activeFilter, setActiveFilter] = useState("Semua");

    const tableData = () => {
        return DummyData.filter(([topics, username]) =>
          (activeFilter === "Semua" || topics === activeFilter) &&
          username.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const filteredData = tableData();

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
        setCurrentPage(1);
    };

    const filteredDataCount = (filter) => {
        return DummyData.filter(([topics]) => (filter === "Semua" ? true : topics === filter)).length;
    };

    const paginatedData = filteredData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

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
                    <div className="flex items-center">
                    {["Semua", "Sampah Anorganik", "Sampah Organik"].map((filter) => (
                        <div key={filter}
                            className="font-inter font-normal text-base flex items-center gap-2 py-7 px-5 h-10 rounded-xl cursor-pointer"
                            style={
                            activeFilter === filter
                                ? {
                                    backgroundColor: "rgba(53, 204, 51, 1)",
                                    color: "rgba(255, 255, 255, 1)",
                                }
                                : {
                                    backgroundColor: "rgba(246, 246, 246, 1)",
                                    color: "rgba(32, 26, 24, 1)",
                                }
                            }
                            onClick={() => handleFilterClick(filter)}
                        >
                            <p>{filter}</p>
                            <p className="px-3 py-1 rounded-full text-sm font-semibold"
                                style={
                                    activeFilter === filter
                                    ? {
                                        backgroundColor: "rgba(255, 255, 255, 1)",
                                        color: "rgba(53, 204, 51, 1)",
                                        }
                                    : {
                                        backgroundColor: "rgba(130, 130, 130, 1)",
                                        color: "rgba(255, 255, 255, 1)",
                                        }
                                }
                            >
                                {filteredDataCount(filter)}
                            </p>
                        </div>
                        ))}
                    </div>
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
	"Sampah Anorganik",
	"Sampah Organik",
];
const questions = [
    "1. Apa saja contoh sampah anorganik?\n2. Bagaimana mengelola sampah anorganik?\n3. Mengapa sampah anorganik dapat mencemari lingkungan?\n4. Apa dampak yang ditimbulkan jika kita tidak mengelola sampah anorganik dengan baik?\n5. Bagaimana cara mendaur ulang sampah anorganik?", 
    "1. Apa saja contoh sampah anorganik?\n2. Bagaimana mengelola sampah anorganik?\n3. Mengapa sampah anorganik dapat mencemari lingkungan?\n4. Apa dampak yang ditimbulkan jika kita tidak mengelola sampah anorganik dengan baik?\n5. Bagaimana cara mendaur ulang sampah anorganik?"];

for (let i = 0; i < 20; i++) {
	const topics = trash[Math.floor(Math.random() * trash.length)];
	const question = questions[Math.floor(Math.random() * questions.length)];
	DummyData.push([topics, question]);
}
// end dummy