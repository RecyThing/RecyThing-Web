import { Add } from "iconsax-react";
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
import { VoucherListTable } from "@/components/tables";
import { AddVoucherModal } from "@/components/modal";

// dummy
const DummyData = [];
const names = ["Voucher 1", "Voucher 2", "Voucher 3", "Voucher 4", "Voucher 5"];
const descriptions = [
	"Description 1",
	"Description 2",
	"Description 3",
	"Description 4",
	"Description 5",
];
const images = [
	"https://avatars.githubusercontent.com/u/60215086?v=4",
	"https://avatars.githubusercontent.com/u/60215086?v=4",
	"https://avatars.githubusercontent.com/u/60215086?v=4",
	"https://avatars.githubusercontent.com/u/60215086?v=4",
	"https://avatars.githubusercontent.com/u/60215086?v=4",
];

for (let i = 0; i < 50; i++) {
	const voucherName = names[Math.floor(Math.random() * names.length)];
	const voucherDescription =
		descriptions[Math.floor(Math.random() * descriptions.length)];
	const voucherImage = images[Math.floor(Math.random() * images.length)];
	const voucherPoint = Math.floor(Math.random() * 10000);
	const voucherStartDate = new Date(2021, 1, 1);
	const voucherEndDate = new Date(2021, 12, 31);

	DummyData.push({
		voucherImage,
		voucherName,
		voucherPoint,
		voucherDescription,
		voucherStartDate,
		voucherEndDate,
	});
}
// end dummy

function VoucherList() {
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const filteredData = DummyData.filter((data) => {
		return data.voucherName.toLowerCase().includes(searchTerm.toLowerCase());
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
			maxW={"container.xl"}
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
				<Flex justifyContent={"space-between"}>
					<Box w={"35%"}>
						<SearchBar onSearch={handleSearch} />
					</Box>
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
						onClick={handleAddModal}
					>
						Tambah Reward
					</Button>
				</Flex>

				<VoucherListTable
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

			<AddVoucherModal
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={handleSubmitAdded}
			/>
		</Container>
	);
}

export default VoucherList;
