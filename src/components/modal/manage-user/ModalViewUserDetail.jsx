import { Spinner } from "@/components/spinner";
import { fetchUserSelector } from "@/store/user";
import { formatDateToCustomDate, formatDateToLocalDate } from "@/utils";
import {
	Avatar,
	Box,
	Button,
	Flex,
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
import { DetailUserField } from "./DetailUserField";
import { useSelector } from "react-redux";

const labels = {
	fullname: { title: "Nama Pengguna", icon: <User /> },
	email: { title: "Email", icon: <Message /> },
	date_of_birth: { title: "Tanggal Lahir", icon: <Calendar /> },
	point: { title: "Total Poin", icon: <TicketStar /> },
	purpose: { title: "Tujuan Pengguna", icon: <TickSquare /> },
	address: { title: "Alamat", icon: <Location /> },
	created_at: { title: "Akun Terdaftar", icon: null },
};

export function ModalViewUserDetail({ isOpen, onClose }) {
	const { data, status, message } = useSelector(fetchUserSelector);

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
				{status === "loading" && <Spinner containerSize={"lg"} />}
				{status === "failed" && <p>{message}</p>}
				{status === "success" && (
					<>
						<ModalHeader p={0}>
							<Flex
								alignItems={"center"}
								justifyContent={"flex-start"}
							>
								<Avatar
									size={"lg"}
									src={
										data.image ||
										`https://ui-avatars.com/api/?name=${data.fullname}&background=0D8ABC&color=fff&size=128`
									}
								/>
								<Flex
									ml={"1.5rem"}
									flexDirection={"column"}
								>
									<Text
										fontWeight={"bold"}
										fontSize={"3xl"}
										casing={"capitalize"}
									>
										{data.fullname || "-"}
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
											{labels.created_at.title} :{" "}
										</Text>
										<Text
											as={"span"}
											fontWeight={"bold"}
											color={"#333333"}
										>
											{formatDateToCustomDate(data.created_at) || "-"}
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
							<DetailUserField
								icon={labels.fullname.icon}
								title={labels.fullname.title}
								value={data.fullname}
								casing={"capitalize"}
							/>
							<DetailUserField
								icon={labels.email.icon}
								title={labels.email.title}
								value={data.email}
							/>
							<DetailUserField
								icon={labels.date_of_birth.icon}
								title={labels.date_of_birth.title}
								value={formatDateToLocalDate(data.date_of_birth)}
							/>
							<DetailUserField
								icon={labels.point.icon}
								title={labels.point.title}
								value={data.point}
							/>
							<DetailUserField
								icon={labels.purpose.icon}
								title={labels.purpose.title}
								value={data.purpose}
							/>
							<DetailUserField
								icon={labels.address.icon}
								title={labels.address.title}
								value={data.address}
							/>
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
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
