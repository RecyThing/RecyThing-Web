import { Container, Flex, Heading } from "@chakra-ui/react";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { UserDetailTable } from "@/components/tables";
import { useState } from "react";

// dummy
const DummyData = [];
const names = [
	"John Doe",
	"Jane Doe",
	"Alice Smith",
	"Bob Johnson",
	"Charlie Davis",
];
const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
const dates = [
	"11/11/2021",
	"12/12/2021",
	"01/01/2022",
	"02/02/2022",
	"03/03/2022",
];

for (let i = 0; i < 50; i++) {
	const name = names[Math.floor(Math.random() * names.length)];
	const email = `${name.replace(" ", ".").toLowerCase()}@${
		domains[Math.floor(Math.random() * domains.length)]
	}`;
	const phone = "081234567" + Math.floor(Math.random() * 10).toString();
	const date = dates[Math.floor(Math.random() * dates.length)];
	DummyData.push([name, email, phone, date]);
}
// end dummy

function UserDetail() {
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const tableData = DummyData.map((row) => row.slice(0, row.length - 1)); // remove date

	const filteredData = tableData.filter(([username]) =>
		username.toLowerCase().includes(searchTerm.toLowerCase())
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
		<Container
			as={"section"}
			maxW={"container.xl"}
			bg={"#EBEBF0"}
			py={"3rem"}
		>
			<Heading
				as="h1"
				color={"#201A18"}
				fontSize={"2xl"}
				fontWeight="bold"
				mb={"1.5rem"}
			>
				Manage User
			</Heading>
			<Flex
				bg={"white"}
				borderRadius={"xl"}
				boxShadow={"md"}
				direction={"column"}
				gap={"1.5rem"}
				p={"1.5rem"}
			>
				<SearchBar onSearch={handleSearch} />
				<UserDetailTable
					currentPage={currentPage}
					data={paginatedData}
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
		</Container>
	);
}

export default UserDetail;
