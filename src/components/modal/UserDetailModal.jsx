/* eslint-disable react/prop-types */
import {
	Avatar,
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	Icon,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import {
	Calendar,
	CloseSquare,
	Location,
	Message,
	TicketStar,
	TickSquare,
	User,
} from "react-iconly";

const dummy = {
	username: "John Doe",
	fullname: "John Doe Wibawa",
	email: "johndoe@gmail.com",
	birthdate: "22 November 2000",
	point: 3000,
	goal: "Melaporkan Pelanggaran Sampah",
	address:
		"Jl. Gunung Anyar Tengah (Gunung Anyar) No. 789 RT 09 RW 12, Surabaya, Jawa Timur, Indonesia",
	createdAt: "2023-09-23T10:12:35+08:00",
};

const labels = {
	username: { title: "Username", icon: null },
	fullname: { title: "Nama Pengguna", icon: <User /> },
	email: { title: "Email", icon: <Message /> },
	birthdate: { title: "Tanggal Lahir", icon: <Calendar /> },
	point: { title: "Total Poin", icon: <TicketStar /> },
	goal: { title: "Tujuan Pengguna", icon: <TickSquare /> },
	address: { title: "Alamat", icon: <Location /> },
	createdAt: { title: "Akun Terdaftar", icon: null },
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
			size={"3xl"}
			isCentered
		>
			<ModalOverlay
				bg={"#0000000D"}
				backdropFilter={"blur(5px)"}
			/>
			<ModalContent
				p={"1.5rem"}
				gap={"1.5rem"}
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
						<Flex
							ml={"1.5rem"}
							flexDirection={"column"}
						>
							<Text
								fontWeight={"bold"}
								fontSize={"3xl"}
							>
								{data.username}
							</Text>
							<Box
								as={"p"}
								fontSize={"md"}
							>
								<Text
									as={"span"}
									fontWeight={"medium"}
									color={"#828282"}
								>
									{labels.createdAt.title} :{" "}
								</Text>
								<Text
									as={"span"}
									fontWeight={"bold"}
									color={"#333333"}
								>
									{formatDate(data.createdAt)}
								</Text>
							</Box>
						</Flex>
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

				<ModalBody
					p={0}
					display={"flex"}
					flexDirection={"column"}
					gap={"1rem"}
				>
					<Text
						fontSize={"lg"}
						fontWeight={"semibold"}
						color={"#828282"}
						letterSpacing={"tight"}
					>
						Detail Informasi
					</Text>
					{Object.entries(labels).map(([key, value]) => {
						if (
							[
								"fullname",
								"email",
								"birthdate",
								"point",
								"goal",
								"address",
							].includes(key)
						) {
							return (
								<Grid
									key={key}
									templateColumns="0.4fr 1fr"
									_hover={{ bg: "#F2F2F2" }}
									gap={"3rem"}
								>
									<GridItem
										display={"flex"}
										gap={"0.5rem"}
										p={"0.5rem"}
									>
										<Icon
											color={"#949494"}
											boxSize={"1.5rem"}
										>
											{value.icon}
										</Icon>
										<Text
											fontWeight={"medium"}
											color={"#828282"}
											letterSpacing={"tight"}
										>
											{value.title}
										</Text>
									</GridItem>
									<GridItem p={"0.5rem"}>
										<Text
											fontWeight={"bold"}
											color={"#333333"}
											letterSpacing={"tight"}
										>
											{data[key]}
										</Text>
									</GridItem>
								</Grid>
							);
						}
						return null;
					})}
				</ModalBody>
				<ModalFooter p={0}>
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
