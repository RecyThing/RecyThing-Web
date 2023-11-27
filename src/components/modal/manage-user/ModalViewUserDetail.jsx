/* eslint-disable react/prop-types */
import { Spinner } from "@/components/spinner";
import { fetchUserSelector } from "@/store/user";
import { formatDateToCustomDate } from "@/utils";
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
import { useSelector } from "react-redux";

const labels = {
	fullname: { title: "Nama Pengguna", icon: <User /> },
	email: { title: "Email", icon: <Message /> },
	date_of_birth: { title: "Tanggal Lahir", icon: <Calendar /> },
	point: { title: "Total Poin", icon: <TicketStar /> },
	purpose: { title: "Tujuan Pengguna", icon: <TickSquare /> },
	address: { title: "Alamat", icon: <Location /> },
	createdAt: { title: "Akun Terdaftar", icon: null },
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
				{/* will be changed to toast */}
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
									src="https://bit.ly/sage-adebayo"
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
										{data.fullname}
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
											{formatDateToCustomDate(data.createdAt) || "-"}
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
										"date_of_birth",
										"point",
										"purpose",
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
													{data[key] || "-"}
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
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
