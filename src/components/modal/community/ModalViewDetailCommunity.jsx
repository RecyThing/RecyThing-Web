import { formatDateToLocalDate } from "@/utils";
import {
	Button,
	Flex,
	Grid,
	GridItem,
	Heading,
	IconButton,
	Image,
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

export function ModalViewCommunityModal({
	isOpen,
	onClose,
	onOpenUpdate,
	data,
}) {
	const handleUpdate = () => {
		onOpenUpdate();
		onClose();
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
							Gambar Komunitas
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
							<Flex
								flexDirection={"column"}
								gap={"0.5rem"}
							>
								<Text
									color={"#828282"}
									fontSize={"lg"}
								>
									Nama Komunitas
								</Text>
								<Heading
									color={"#3BA639"}
									fontSize={"4xl"}
									fontWeight={"bold"}
								>
									{data?.name}
								</Heading>
							</Flex>
						</GridItem>
						<GridItem
							as={Flex}
							colSpan={"3"}
							flexDirection={"column"}
							gap={"0.5rem"}
						>
							<Text
								color={"#828282"}
								fontSize={"lg"}
							>
								Deskripsi Komunitas
							</Text>
							<Text
								color={"#333333"}
								fontSize={"sm"}
								textAlign={"justify"}
							>
								{data?.description}
							</Text>
						</GridItem>
						<GridItem
							as={Flex}
							flexDirection={"column"}
							gap={"0.5rem"}
						>
							<Text
								color={"#828282"}
								fontSize={"lg"}
							>
								Lokasi
							</Text>
							<Text
								color={"#333333"}
								fontSize={"lg"}
							>
								{data?.location}
							</Text>
						</GridItem>
						<GridItem
							as={Flex}
							flexDirection={"column"}
							gap={"0.5rem"}
						>
							<Text
								color={"#828282"}
								fontSize={"lg"}
							>
								Total Maksimal Anggota
							</Text>
							<Text
								color={"#333333"}
								fontSize={"lg"}
							>
								{data?.members}
							</Text>
						</GridItem>
						<GridItem
							as={Flex}
							flexDirection={"column"}
							gap={"0.5rem"}
						>
							<Text
								color={"#828282"}
								fontSize={"lg"}
							>
								Dibuat
							</Text>
							<Text
								color={"#333333"}
								fontSize={"lg"}
							>
								{formatDateToLocalDate(data?.createdAt)}
							</Text>
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
			</ModalContent>
		</Modal>
	);
}
