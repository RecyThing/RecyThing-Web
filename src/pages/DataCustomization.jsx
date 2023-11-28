import { useState } from "react";
import { Add } from "iconsax-react";
import { Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import { Pagination } from "@/components/pagination/Pagination";
import { SearchBar } from "@/components/navigation";
import { FilterButton } from "@/components/buttons";
import { TableDataCustomization } from "@/components/tables";
import { LayoutDashboardContent } from "@/layout";
import { ModalAddCustomizationData } from "@/components/modal";

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
	const [activeFilter, setActiveFilter] = useState("Semua");

	const buttonLabels = ["Semua", "Sampah Anorganik", "Sampah Organik"];

	const filteredData = () => {
		return DummyData.filter(
			([topics, username]) =>
				(activeFilter === "Semua" || topics === activeFilter) &&
				username.toLowerCase().includes(searchTerm.toLowerCase())
		);
	};

	const filteredDataCount = (filter) => {
		return DummyData.filter(([topics]) =>
			filter === "Semua" ? true : topics === filter
		).length;
	};

	const paginatedData = filteredData().slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const handleSearch = (term) => {
		setSearchTerm(term);
		setCurrentPage(1);
	};

	const handleFilterClick = (filter) => {
		setActiveFilter(filter);
		setCurrentPage(1);
	};

	return (
		<LayoutDashboardContent>
			{isAddData ? (
				<ModalAddCustomizationData
					isOpen={isAddData}
					onClose={closeForm}
					setIsAddData={setIsAddData}
				/>
			) : null}
			<div className="flex justify-between align-center">
				<Heading
					as="h1"
					color={"#201A18"}
					fontSize={"2xl"}
					fontWeight="bold"
					mt={"10px"}
				>
					Manage Data For Open AI
				</Heading>
				<Button
					leftIcon={<Add />}
					_hover={{ bg: "#2DA22D" }}
					bg={"#35CC33"}
					borderRadius={"lg"}
					color={"white"}
					fontWeight={"normal"}
					lineHeight={"1.5rem"}
					px={"1.5rem"}
					py={"1.5rem"}
					onClick={openForm}
				>
					Tambah Data
				</Button>
			</div>
			<div className="bg-white rounded-lg shadow-md mt-4 p-4 h-90% w-full">
				<Flex
					gap={"1.5rem"}
					p={"0.5rem"}
				>
					<ButtonGroup spacing={0}>
						{buttonLabels.map((label) => (
							<FilterButton
								key={label}
								label={label}
								activeFilter={activeFilter}
								handleFilterClick={handleFilterClick}
								filteredDataCount={filteredDataCount}
							/>
						))}
					</ButtonGroup>
					<SearchBar onSearch={handleSearch} />
				</Flex>
				<Flex
					direction={"column"}
					gap={"1.5rem"}
					p={"0.5rem"}
					marginTop={"16px"}
				>
					<TableDataCustomization
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
		</LayoutDashboardContent>
	);
}

export default DataCustomization;

// dummy
const DummyData = [];
const trash = ["Sampah Anorganik", "Sampah Organik"];
const questions = [
	"1. Apa saja contoh sampah anorganik?\n2. Bagaimana mengelola sampah anorganik?\n3. Mengapa sampah anorganik dapat mencemari lingkungan?\n4. Apa dampak yang ditimbulkan jika kita tidak mengelola sampah anorganik dengan baik?\n5. Bagaimana cara mendaur ulang sampah anorganik?",
	"1. Apa saja contoh sampah anorganik?\n2. Bagaimana mengelola sampah anorganik?\n3. Mengapa sampah anorganik dapat mencemari lingkungan?\n4. Apa dampak yang ditimbulkan jika kita tidak mengelola sampah anorganik dengan baik?\n5. Bagaimana cara mendaur ulang sampah anorganik?",
];

for (let i = 0; i < 20; i++) {
	const topics = trash[Math.floor(Math.random() * trash.length)];
	const question = questions[Math.floor(Math.random() * questions.length)];
	DummyData.push([topics, question]);
}
// end dummy
