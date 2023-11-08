/* eslint-disable react/prop-types */
import {
	Avatar,
	Button,
	Flex,
	Grid,
	GridItem,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { CloseSquare } from "react-iconly";

const dummy = {
	username: "John Doe",
	email: "johndoe@gmail.com",
	point: 3000,
	birthdate: "22 November 2000",
	goal: "Melaporkan Pelanggaran Sampah",
	address: "Jl. Diponegoro No. 789, Surabaya",
	createdAt: "2023-09-23T10:12:35+08:00",
};

const dataTitle = {
	username: "Username",
	email: "Email",
	point: "Total Poin",
	birthdate: "Tanggal Lahir",
	goal: "Tujuan Penggunaan",
	address: "Alamat",
	createdAt: "Akun Terdaftar",
};

export function UserDetailModal({ isOpen, onClose, data }) {
	// will be changed later
	data = dummy;

	// will be changed later
	const formatDate = (value) => {
		return (
			new Date(value).toLocaleDateString("id-ID", {
				day: "numeric",
				month: "long",
				year: "numeric",
			}) +
			" | " +
			new Date(value).toLocaleTimeString("en-GB", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: false,
			})
		);
	};
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size={"4xl"}
			isCentered
		>
			<ModalOverlay
				bg={"#0000000D"}
				backdropFilter={"blur(5px)"}
			/>
			<ModalContent
				p={"1.5rem"}
				gap={"2rem"}
				borderRadius={"3xl"}
				shadow={"lg"}
			>
				<ModalHeader p={0}>
					<Flex
						alignItems={"center"}
						justifyContent={"flex-start"}
					>
						<Avatar
							size={"lg"}
							src="https://bit.ly/sage-adebayo"
						/>
						<Text
							ml={"1.25rem"}
							fontWeight={"bold"}
							fontSize={"lg"}
						>
							{data.username}
						</Text>
					</Flex>
					<IconButton
						as={ModalCloseButton}
						icon={<CloseSquare size={"large"} />}
						size={"sm"}
						bg={"transparent"}
						color={"#828282"}
						position={"absolute"}
						right={"1.5rem"}
						top={"1.5rem"}
						_hover={{ bg: "transparent", color: "#333333" }}
						_focus={{ boxShadow: "none" }}
					/>
				</ModalHeader>

				<ModalBody p={0}>
					<TableContainer>
						<Table>
							<Thead>
								<Tr>
									{Object.keys(dataTitle).map((key) => {
										if (
											key !== "goal" &&
											key !== "address" &&
											key !== "createdAt"
										) {
											return (
												<Th
													key={key}
													color={"#7F7F7F"}
													textTransform={"capitalize"}
													fontSize={"md"}
												>
													{dataTitle[key]}
												</Th>
											);
										}
										return null;
									})}
								</Tr>
							</Thead>
							<Tbody>
								<Tr
									bg={"#F2F2F5"}
									borderBlock={"2px solid #C4C4C4"}
								>
									{Object.keys(data).map((key) => {
										if (
											key !== "goal" &&
											key !== "address" &&
											key !== "createdAt"
										) {
											return (
												<Td
													key={key}
													color={"#333333"}
													w={"12rem"}
													wordBreak={"break-word"}
													whiteSpace={"normal"}
												>
													{data[key]}
												</Td>
											);
										}
										return null;
									})}
								</Tr>
							</Tbody>
						</Table>
					</TableContainer>

					<Grid
						templateColumns={"repeat(3, 1fr)"}
						gap={"1rem"}
						mt={"2rem"}
					>
						<GridItem
							display={"flex"}
							justifyContent={"flex-start"}
							flexDirection={"column"}
						>
							<Text
								fontWeight={"medium"}
								color={"#828282"}
								letterSpacing={"tight"}
							>
								{dataTitle.goal}
							</Text>
							<Text
								fontWeight={"bold"}
								color={"#333333"}
								letterSpacing={"tight"}
								wordBreak={"break-word"}
							>
								{data.goal}
							</Text>
						</GridItem>
						<GridItem
							display={"flex"}
							justifyContent={"flex-start"}
							flexDirection={"column"}
						>
							<Text
								fontWeight={"medium"}
								color={"#828282"}
								letterSpacing={"tight"}
							>
								{dataTitle.address}
							</Text>
							<Text
								fontWeight={"bold"}
								color={"#333333"}
								letterSpacing={"tight"}
								wordBreak={"break-word"}
							>
								{data.address}
							</Text>
						</GridItem>
					</Grid>
				</ModalBody>
				<ModalFooter
					p={0}
					display={"flex"}
					justifyContent={"space-between"}
				>
					<Flex
						justifyContent={"flex-start"}
						flexDirection={"column"}
					>
						<Text
							fontWeight={"medium"}
							color={"#828282"}
							letterSpacing={"tight"}
						>
							{dataTitle.createdAt}
						</Text>
						<Text
							fontWeight={"bold"}
							color={"#333333"}
							letterSpacing={"tight"}
							wordBreak={"break-word"}
						>
							{formatDate(data.createdAt)}
						</Text>
					</Flex>
					<Button
						color={"white"}
						bg={"#828282"}
						borderRadius={"lg"}
						px={"2.5rem"}
						py={"1.75rem"}
						_hover={{ bg: "#333333" }}
						onClick={onClose}
					>
						Kembali
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
