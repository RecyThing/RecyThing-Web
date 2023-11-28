import { ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import { SearchBar } from "@/components/navigation";
import { useState } from "react";
import { FilterButton } from "@/components/buttons";
import { Pagination } from "@/components/pagination";
import { TableTransactionList } from "@/components/tables";
import { LayoutDashboardContent } from "@/layout";

// dummy
const DummyData = [];
const names = [
	"John Doe",
	"Jane Doe",
	"Alice Smith",
	"Bob Johnson",
	"Charlie Davis",
];
const rewards = [
	"Voucher Dana 5000",
	"Voucher Dana 10000",
	"Voucher Dana 15000",
];
const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
const labels = ["Diproses", "Berhasil", "Terbaru"];
const buttonLabels = ["Semua", "Diproses", "Berhasil", "Terbaru"];

for (let i = 0; i < 50; i++) {
	const name = names[Math.floor(Math.random() * names.length)];
	const reward = rewards[Math.floor(Math.random() * rewards.length)];
	const email = `${name.replace(" ", ".").toLowerCase()}@${
		domains[Math.floor(Math.random() * domains.length)]
	}`;
	const status = labels[Math.floor(Math.random() * labels.length)];
	const points = Math.floor(Math.random() * 10000);
	DummyData.push({ name, reward, email, points, status });
}
// end dummy

function TransactionList() {
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [activeFilter, setActiveFilter] = useState("Semua");

	const filteredData = () => {
		return DummyData.filter(
			(data) =>
				(activeFilter === "Semua" || data.status === activeFilter) &&
				data.name.toLowerCase().includes(searchTerm.toLowerCase())
		).sort((a) => (a.status === "Terbaru" ? -1 : 1));
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
								activeFilter={activeFilter}
								handleFilterClick={handleFilterClick}
								filteredDataCount={filteredDataCount}
							/>
						))}
					</ButtonGroup>
					<SearchBar onSearch={handleSearch} />
				</Flex>
				<TableTransactionList
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

export default TransactionList;
