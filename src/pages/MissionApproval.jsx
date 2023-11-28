import { ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { useState } from "react";
import { FilterButton } from "@/components/buttons";
import { TableMissionApproval } from "@/components/tables";
import { LayoutDashboardContent } from "@/layout";

// dummy
const DummyData = [];
const names = ["Misi 1", "Misi 2", "Misi 3", "Misi 4", "Misi 5"];
const users = ["Putri", " Budi", " Joko", " Andi", " Siti"];
const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"Mei",
	"Jun",
	"Jul",
	"Agu",
	"Sep",
	"Okt",
	"Nov",
	"Des",
];
const labels = ["Perlu Tinjauan", "Disetujui", "Ditolak"];
const buttonLabels = ["Semua", "Perlu Tinjauan", "Disetujui", "Ditolak"];

for (let i = 0; i < 50; i++) {
	const id = `MIS${i < 10 ? `0${i}` : i}`;
	const name = names[Math.floor(Math.random() * names.length)];
	const username = users[Math.floor(Math.random() * users.length)];
	const date = `${Math.floor(Math.random() * 30) + 1} ${
		months[Math.floor(Math.random() * months.length)]
	} 2023`;
	const status = labels[Math.floor(Math.random() * labels.length)];
	DummyData.push({ id, name, username, date, status });
}
// end dummy

function MissionApproval() {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeFilter, setActiveFilter] = useState("Semua");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const filteredData = () => {
		return DummyData.filter(
			(data) =>
				(activeFilter === "Semua" || data.status === activeFilter) &&
				data.name.toLowerCase().includes(searchTerm.toLowerCase())
		).sort((a) => (a.status === "Perlu Tinjauan" ? -1 : 1));
	};

	const filteredDataCount = (filter) => {
		return DummyData.filter((data) =>
			filter === "Semua" ? true : data.status === filter
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
			<Heading
				as="h1"
				color={"#201A18"}
				fontSize={"2xl"}
				fontWeight="bold"
				mb={"1.5rem"}
			>
				Kelola Approval Misi
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
								activeFilter={activeFilter}
								handleFilterClick={handleFilterClick}
								filteredDataCount={filteredDataCount}
							/>
						))}
					</ButtonGroup>
					<SearchBar onSearch={handleSearch} />
				</Flex>
				<TableMissionApproval
					currentPage={currentPage}
					data={paginatedData}
					itemsPerPage={itemsPerPage}
				/>
				<Pagination
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					onChangeItemsPerPage={setItemsPerPage}
					onChangePage={setCurrentPage}
					totalItems={filteredData().length}
				/>
			</Flex>
		</LayoutDashboardContent>
	);
}

export default MissionApproval;
