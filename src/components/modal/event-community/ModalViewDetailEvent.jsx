import { Button, Flex, Grid, GridItem, Heading, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { ButtonCopyLink } from "./ButtonCopyLink";
import { CloseSquare } from "react-iconly";
import { DetailEventField } from "./DetailEventField";
import { fetchEventSelector } from "@/store/event-community";
import { formatDateToLocalDate, formatWithCommas } from "@/utils";
import { Spinner } from "@/components/spinner";
import { useSelector } from "react-redux";

export function ModalViewDetailEvent({ isOpen, onClose, onOpenUpdate }) {
	const { data, status, message } = useSelector(fetchEventSelector);

	const handleStatus = (status) => {
		status = status?.toLowerCase();
		switch (status) {
			case "belum berjalan":
				return "blue";
			case "berjalan":
				return "#D4AF35";
			case "selesai":
				return "green";
			default:
				return "gray";
		}
	};

	const handleUpdate = () => {
		onOpenUpdate(data);
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size={"5xl"}
			isCentered
		>
			<ModalOverlay
				bg={"#0000000D"}
				backdropFilter={"blur(5px)"}
			/>

			<ModalContent
				bg={"#FFFFFF"}
				borderRadius={"10px"}
				p={"1.5rem"}
				gap={"1.5rem"}
			>
				{status === "loading" && <Spinner containerSize={"2xl"} />}
				{status === "failed" && <p>{message}</p>}
				{status === "success" && (
					<>
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
						<ModalHeader p={0}>
							<Heading
								as="h3"
								fontSize={"2xl"}
								fontWeight={"medium"}
								letterSpacing={"tight"}
								color={"#000000"}
							>
								Detail Komunitas
							</Heading>
						</ModalHeader>
						<ModalBody
							display={"grid"}
							gridTemplateColumns={"0.5fr 1.5fr"}
							gap={6}
							p={0}
						>
							<Flex
								position={"relative"}
								aspectRatio={"4/3"}
								borderRadius={"lg"}
								flexDirection={"column"}
								gap={"1rem"}
							>
								<Text
									color={"#828282"}
									fontSize={"lg"}
								>
									Gambar Event
								</Text>
								<Image
									src={data?.image}
									alt="community image"
									aspectRatio={"4/3"}
									objectFit={"cover"}
									borderRadius={"lg"}
								/>
							</Flex>

							<Grid
								templateRows={"auto auto auto"}
								templateColumns={"1fr 1fr 1fr"}
								gap={6}
							>
								<GridItem colSpan={"3"}>
									<DetailEventField
										title={"Nama Event"}
										content={data?.title}
										contentProps={{ fontSize: "4xl", color: "#3BA639", fontWeight: "bold" }}
									/>
								</GridItem>
								<GridItem colSpan={"3"}>
									<DetailEventField
										title={"Deskripsi Event"}
										content={data?.description}
									/>
								</GridItem>

								<GridItem colSpan={"3"}>
									<DetailEventField
										title={"Lokasi"}
										content={data?.location}
									/>
								</GridItem>

								<GridItem
									position="relative"
									colSpan={3}
								>
									<ButtonCopyLink link={data?.maplink} />
									<DetailEventField
										title={"Link Google Maps Lokasi Event"}
										content={data?.maplink}
									/>
								</GridItem>

								<GridItem
									position="relative"
									colSpan={3}
								>
									<ButtonCopyLink link={data?.formlink} />
									<DetailEventField
										title={"Link Google Form Pendaftaran Event"}
										content={data?.formlink}
									/>
								</GridItem>

								<GridItem>
									<DetailEventField
										title={"Total Kuota"}
										content={formatWithCommas(data?.quota)}
									/>
								</GridItem>

								<GridItem>
									<DetailEventField
										title={"Tanggal Pelaksanaan"}
										content={formatDateToLocalDate(data?.date)}
									/>
								</GridItem>

								<GridItem>
									<DetailEventField
										title={"Status"}
										content={data?.status}
										contentProps={{ color: handleStatus(data?.status), casing: "capitalize" }}
									/>
								</GridItem>
							</Grid>
						</ModalBody>
						<ModalFooter
							display={"flex"}
							gap={"1rem"}
							justifyContent={"flex-end"}
							p={0}
						>
							<Button
								color={"white"}
								bg={"#828282"}
								borderRadius={"lg"}
								px={"3.25rem"}
								py={"1.75rem"}
								_hover={{ bg: "#333333" }}
								onClick={onClose}
							>
								Batal
							</Button>
							<Button
								color={"white"}
								bg={"#35CC33"}
								borderRadius={"lg"}
								px={"3rem"}
								py={"1.75rem"}
								_hover={{ bg: "#2DA22D" }}
								onClick={handleUpdate}
							>
								Perbarui
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
