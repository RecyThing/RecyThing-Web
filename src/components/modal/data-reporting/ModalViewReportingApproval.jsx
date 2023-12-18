import { Avatar, Box, Button, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { CloseSquare } from "react-iconly";
import { CustomRoundBadge, CustomSquareBadge } from "@/components/badges";
import { DetailScaleReport } from "./DetailScaleReport";
import { DetailTrashReport } from "./DetailTrashReport";
import { fetchDataReportSelector } from "@/store/report";
import { ModalViewImageReporting } from "./ModalViewImageReporting";
import { Spinner } from "@/components/spinner";
import { useSelector } from "react-redux";
import { useState } from "react";

const labels = {
	address_point: "Lokasi Patokan",
	created_at: "Waktu Masuk Laporan",
	description: "Keterangan",
	image: "Foto Bukti",
	insident_date: "Waktu Kejadian",
	location: "Lokasi Sampah",
	rejection_description: "Alasan Penolakan",
	report_id: "Report ID",
	report_type: "Tipe Laporan",
	scale_type: "Jenis Pelanggaran",
	status: "Status",
	trash_type: "Jenis Sampah",
	username: "Username",
	company_name: "Informasi Perusahaan",
	dangerous_waste: "Sampah Berbahaya",
};

export function ModalViewReportingApproval({ isOpen, onClose }) {
	const { data, status, message } = useSelector(fetchDataReportSelector);
	const [imageKey, setImageKey] = useState(0);
	const { isOpen: isOpenImage, onOpen: onOpenImage, onClose: onCloseImage } = useDisclosure();

	const handleStatus = (status) => {
		status = status.toLowerCase();
		switch (status) {
			case "perlu ditinjau":
				return { color: "#5F5207", bgColor: "#FBF5D0" };
			case "diterima":
				return { color: "#154C3C", bgColor: "#C7EBD1" };
			case "ditolak":
				return { color: "#76170F", bgColor: "#FADCD9" };
			default:
				return { color: "#FFCC00", bgColor: "#FFF4CC" };
		}
	};

	const handleImageView = (key) => {
		setImageKey(key);
		onOpenImage();
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
				gap={"1.5rem"}
				borderRadius={"3xl"}
				shadow={"lg"}
			>
				{status === "loading" && <Spinner containerSize={"2xl"} />}
				{status === "failed" && <p>{message}</p>}
				{status === "success" && (
					<>
						<ModalViewImageReporting
							isOpen={isOpenImage}
							onClose={onCloseImage}
							companyName={data.company_name}
							currentImage={imageKey}
							data={data.images}
							onChangeImage={setImageKey}
							totalImage={data.images?.length}
						/>

						<ModalHeader p={0}>
							<Flex
								alignItems={"center"}
								justifyContent={"flex-start"}
							>
								<Avatar
									size={"lg"}
									src={data.user_image || `https://ui-avatars.com/api/?name=${data.fullname}&background=0D8ABC&color=fff&size=128`}
								/>
								<Flex
									ml={"1.5rem"}
									flexDirection={"column"}
								>
									<Text
										fontWeight={"bold"}
										fontSize={"20"}
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
											{labels.report_id} :{" "}
										</Text>
										<Text
											as={"span"}
											fontWeight={"bold"}
											color={"#333333"}
										>
											{data.Id}
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
							gap={"2rem"}
						>
							<Flex
								gap={"2rem"}
								width={"full"}
							>
								<Flex
									flexDirection={"column"}
									gap={"0.25rem"}
								>
									<Text
										fontWeight={"medium"}
										color={"#828282"}
										letterSpacing={"tight"}
									>
										{labels.report_type}
									</Text>
									<CustomRoundBadge
										color={"#fff"}
										bgColor={data.report_type === "tumpukan sampah" ? "#828282" : "#FFCC00"}
									>
										{data.report_type}
									</CustomRoundBadge>
								</Flex>
								<Flex
									flexDirection={"column"}
									gap={"0.25rem"}
								>
									<Text
										fontWeight={"medium"}
										color={"#828282"}
										letterSpacing={"tight"}
									>
										{data.report_type === "tumpukan sampah" && labels.trash_type}
										{data.report_type === "pelanggaran sampah" && labels.scale_type}
									</Text>

									{data.report_type === "tumpukan sampah" && (
										<CustomRoundBadge
											color={"#fff"}
											bgColor={data.trash_type === "sampah kering" ? "#5B79EF" : "#FDD948"}
										>
											{data.trash_type}
										</CustomRoundBadge>
									)}

									{data.report_type === "pelanggaran sampah" && (
										<CustomRoundBadge
											color={"#fff"}
											bgColor={data.scale_type === "skala kecil" ? "#4F4F4F" : "#000000"}
										>
											{data.scale_type}
										</CustomRoundBadge>
									)}
								</Flex>
								<Flex
									flexDirection={"column"}
									gap={"0.25rem"}
								>
									<Text
										fontWeight={"medium"}
										color={"#828282"}
										letterSpacing={"tight"}
									>
										{labels.status}
									</Text>
									<CustomSquareBadge
										color={handleStatus(data.status).color}
										bgColor={handleStatus(data.status).bgColor}
									>
										{data.status}
									</CustomSquareBadge>
								</Flex>
							</Flex>

							{/* tipe laporan pelanggaran sampah */}
							{data.report_type === "pelanggaran sampah" && (
								<DetailTrashReport
									data={data}
									labels={labels}
									handleImageView={handleImageView}
								/>
							)}

							{/* tipe laporan tumpukan sampah */}
							{data.report_type === "tumpukan sampah" && (
								<DetailScaleReport
									data={data}
									labels={labels}
									handleImageView={handleImageView}
								/>
							)}
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
