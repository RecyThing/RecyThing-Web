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

const buttonLabel = ["Semua", "Terbaru", "Paling Awal"]; // will be refactored later

function UserDetail() {
	const [isActive, setIsActive] = useState("Semua");
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const filteredData = DummyData.filter(([username]) =>
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
								onClick={() => setIsActive(label)}
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

const DummyData = [
	["I Made Sudarsana Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawa", "123@gmail.com", "08123456789"],
	["Taksa Wibawadwadwa", "123@gmail.com", "08123456789"],
];
