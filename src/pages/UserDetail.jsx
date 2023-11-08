import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { UserDetailTable } from "@/components/tables";
import {
	Button,
	ButtonGroup,
	Container,
	Flex,
	Heading,
} from "@chakra-ui/react";
import { useState } from "react";

const buttonLabel = ["Semua", "Terbaru", "Paling Awal"];

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
	const [isActive, setIsActive] = useState("Semua");
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	// will be changed later
	const data = DummyData; // full data
	const tableData = DummyData.map((row) => row.slice(0, row.length - 1)); // remove date
	// end

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

	const sortData = (a, b, label) => {
		if (label === "Terbaru" || label === "Semua") {
			return new Date(b[b.length - 1]) - new Date(a[a.length - 1]);
		} else if (label === "Paling Awal") {
			return new Date(a[a.length - 1]) - new Date(b[b.length - 1]);
		} else {
			return 0;
		}
	};

	const handleSort = (label) => {
		setIsActive(label);
		setCurrentPage(1);
		data.sort((a, b) => sortData(a, b, label));
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
				<Flex
					alignItems={"center"}
					justifyContent={"space-between"}
				>
					<ButtonGroup
						variant={"solid"}
						spacing={"0"}
					>
						{buttonLabel.map((label) => (
							<Button
								key={label}
								isActive={label === isActive}
								color={"black"}
								bg={"#A7A19E0D"}
								borderRadius={"lg"}
								px={"2.5rem"}
								py={"1.75rem"}
								_active={{
									bg: "#35CC33",
									color: "white",
								}}
								onClick={() => handleSort(label)}
							>
								{label}
							</Button>
						))}
					</ButtonGroup>
					<SearchBar onSearch={handleSearch} />
				</Flex>
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
