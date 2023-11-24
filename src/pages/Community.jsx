import { AddSquare } from "iconsax-react";
import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	useDisclosure,
} from "@chakra-ui/react";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { useState } from "react";
import { CommunityTable } from "@/components/tables";
import { ModalAddCommunity } from "@/components/modal";

// dummy
const DummyData = [];
const names = [
	"Zero Waste Community Indonesia",
	"Rumah Edukasi Sampah",
	"Komunitas Peduli Sampah",
	"Komunitas Zero Waste",
	"Komunitas Peduli Lingkungan",
];
const locations = ["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Bali"];

for (let i = 0; i < 50; i++) {
	const id = Math.floor(Math.random() * 10000);
	const name = names[Math.floor(Math.random() * names.length)];
	const createdAt = new Date(
		Math.floor(Math.random() * 3) + 2021,
		Math.floor(Math.random() * 12),
		Math.floor(Math.random() * 31)
	);
	const location = locations[Math.floor(Math.random() * locations.length)];

	DummyData.push({
		id,
		name,
		createdAt,
		location,
		description: "Lorem ipsum dolor sit amet, consectetur adipisci",
		image: "https://picsum.photos/200",
		members: Math.floor(Math.random() * 100),
	});
}
// end dummy

function Community() {
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const filteredData = DummyData.filter((data) => {
		return data.name.toLowerCase().includes(searchTerm.toLowerCase());
	});

	const paginatedData = filteredData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const handleSearch = (term) => {
		setSearchTerm(term);
		setCurrentPage(1);
	};

	const handleAddModal = () => {
		onOpen();
	};

	const handleSubmitAdded = (data) => {
		console.log("added!", data);
		onClose();
	};

	return (
		<Container
			as={"section"}
			maxW={"container.2xl"}
			bg={"#EBEBF0"}
			p={"1.5rem"}
		>
			<Heading
				as="h1"
				color={"#201A18"}
				fontSize={"2xl"}
				fontWeight="bold"
				mb={"1.5rem"}
			>
				Daftar Voucher
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
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					<SearchBar onSearch={handleSearch} />
					<Box
						w={"1.5rem"}
						bg={"transparent"}
					/>
					<Button
						leftIcon={<AddSquare />}
						_hover={{ bg: "#2DA22D" }}
						bg={"#35CC33"}
						borderRadius={"lg"}
						color={"white"}
						fontWeight={"normal"}
						lineHeight={"1.5rem"}
						px={"1.5rem"}
						py={"1.75rem"}
						onClick={handleAddModal}
					>
						Tambah Komunitas
					</Button>
				</Flex>

				<CommunityTable
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

			<ModalAddCommunity
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={handleSubmitAdded}
			/>
		</Container>
	);
}

export default Community;
