import { Spinner } from "@/components/spinner";
import { fetchDataTransactionSelector } from "@/store/transaction-list";
import { formatDateToCustomDate, formatDateToLocalDate } from "@/utils";
import { formatTime2DigitHoursMinutes } from "@/utils/format-time/formatTime2DigitHoursMinutes";
import {
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
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from "@chakra-ui/react";
import { ArrowDown2 } from "iconsax-react";
import { useState } from "react";
import {
	Calendar,
	CloseSquare,
	Document,
	Location,
	TicketStar,
	TickSquare,
	User,
} from "react-iconly";
import { useSelector } from "react-redux";

const labels = {
	nama: { title: "Nama Pengguna", icon: <User /> },
	tanggal: { title: "Tanggal Transaksi", icon: <Calendar /> },
	waktu: { title: "Waktu Transaksi", icon: <Calendar /> },
	reward: { title: "Nama Reward", icon: <TicketStar /> },
	goal: { title: "Tujuan Pengguna", icon: <TickSquare /> },
	status: { title: "Status", icon: <Location /> },
};

export function ModalEditDetailTransaction({
	isOpen,
	onClose,
	onUpdate,
	onEdit,
}) {
	const { data, status, message } = useSelector(fetchDataTransactionSelector);

	const handleUpdate = () => {
		onUpdate(data.id, { status: `${statusData}` });
	};

	const [statusData, setStatusData] = useState();

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size={"3xl"}
			isCentered
			closeOnOverlayClick={onEdit !== "loading"}
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
				{status === "loading" && <Spinner containerSize={"md"} />}
				{status === "failed" && <p>{message}</p>}
				{status === "success" && (
					<>
						<ModalHeader p={0}>
							<Flex
								alignItems={"center"}
								justifyContent={"flex-start"}
							>
								<Text
									fontSize={"lg"}
									fontWeight={"semibold"}
									color={"#828282"}
									letterSpacing={"tight"}
								>
									ID Transaksi:
								</Text>
								<Text
									className="ms-2"
									fontSize={"lg"}
									fontWeight={"semibold"}
									color={"#828282"}
									letterSpacing={"tight"}
								>
									{data.id}
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
										"nama",
										"tanggal",
										"waktu",
										"reward",
										"goal",
										"status",
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
												{key === "nama" ? (
													<Text
														fontWeight={"bold"}
														color={"#333333"}
														letterSpacing={"tight"}
														casing={"capitalize"}
													>
														{data.user}
													</Text>
												) : key === "tanggal" ? (
													<Text
														fontWeight={"bold"}
														color={"#333333"}
														letterSpacing={"tight"}
														casing={"capitalize"}
													>
														{formatDateToLocalDate(data.created_at)}
													</Text>
												) : key === "waktu" ? (
													<Text
														fontWeight={"bold"}
														color={"#333333"}
														letterSpacing={"tight"}
														casing={"capitalize"}
													>
														{formatTime2DigitHoursMinutes(
															data.time_transaction
														)}
													</Text>
												) : key === "reward" ? (
													<Text
														fontWeight={"bold"}
														color={"#333333"}
														letterSpacing={"tight"}
														casing={"capitalize"}
													>
														{data.voucher}
													</Text>
												) : key === "goal" ? (
													<Text
														fontWeight={"bold"}
														color={"#333333"}
														letterSpacing={"tight"}
														casing={"capitalize"}
													>
														{data.phone}
													</Text>
												) : (
													<Menu>
														<MenuButton
															px={4}
															py={2}
															width={"328px"}
															height={"56px"}
															transition="all 0.2s"
															borderRadius="md"
															borderWidth="1px"
															_hover={{ bg: "gray.400" }}
															_focus={{ boxShadow: "outline" }}
														>
															<Flex direction={"row"}>
																<Box>
																	<Document />
																</Box>
																<Box
																	className="ms-2"
																	minWidth={"219px"}
																	textAlign={"start"}
																>
																	<Text casing={"capitalize"}>
																		{statusData ? statusData : data.status}
																	</Text>
																</Box>
																<Box
																	flex={"1"}
																	marginStart={"20px"}
																>
																	<ArrowDown2 />
																</Box>
															</Flex>
														</MenuButton>
														<MenuList>
															{data.status === "diproses" ? (
																<MenuItem
																	onClick={() => {
																		setStatusData("selesai");
																	}}
																>
																	Selesai
																</MenuItem>
															) : (
																<>
																	<MenuItem
																		onClick={() => {
																			setStatusData("diproses");
																		}}
																	>
																		Diproses
																	</MenuItem>
																	<MenuItem
																		onClick={() => {
																			setStatusData("selesai");
																		}}
																	>
																		Selesai
																	</MenuItem>
																</>
															)}
														</MenuList>
													</Menu>
												)}
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
								onClick={handleUpdate}
								isLoading={onEdit === "loading"}
							>
								Simpan
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
