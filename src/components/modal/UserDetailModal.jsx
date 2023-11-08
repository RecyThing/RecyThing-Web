/* eslint-disable react/prop-types */
import {
	Avatar,
	Button,
	Flex,
	GridItem,
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
import { CloseSquare } from "react-iconly";

const dummy = {
	username: "John Doe",
	email: "johndoe@gmail.com",
	telp: "08123456789",
	birthdate: "22 November 2000",
	address: "Jl. Diponegoro No. 789, Surabaya",
	point: 3000,
	goal: "Ingin berkontribusi untuk kebersihan lingkungan",
	createdAt: "2023-09-23T10:12:35+08:00",
};

const dataTitle = {
	username: "Username",
	email: "Email",
	telp: "No. Telp",
	birthdate: "Tanggal Lahir",
	address: "Alamat",
	point: "Total Poin",
	goal: "Tujuan Penggunaan",
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
			size={"3xl"}
			isCentered
		>
			<ModalOverlay />
			<ModalContent
				p={"1.5rem"}
				gap={"2rem"}
				borderRadius={"3xl"}
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

				<ModalBody
					p={0}
					display={"grid"}
					gridTemplate={"repeat(3, 1fr) / 0.65fr 1fr 0.4fr"}
					gridGap={"32px"}
					columnGap={"32px"}
				>
					{Object.entries(data).map(([key, value]) => (
						<GridItem
							key={key}
							display={"flex"}
							justifyContent={"flex-start"}
							flexDirection={"column"}
						>
							<Text
								fontWeight={"medium"}
								color={"#828282"}
								letterSpacing={"tight"}
							>
								{dataTitle[key]}
							</Text>
							<Text
								fontWeight={"bold"}
								color={"#333333"}
								letterSpacing={"tight"}
								wordBreak={"break-word"}
							>
								{key === "createdAt" ? formatDate(value) : value}
								{key === "point" && " Poin"}
							</Text>
						</GridItem>
					))}
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
