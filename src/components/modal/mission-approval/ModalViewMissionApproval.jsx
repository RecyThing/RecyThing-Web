import {
	Box,
	Button,
	Flex,
	Heading,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	TabIndicator,
	TabList,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react";
import { CloseSquare } from "react-iconly";
import { RecyThingWhiteIcon } from "@/components/icons";
import { TabContent } from "./TabContent";
import { TabButton } from "./TabButton";
import { fetchApprovalSelector } from "@/store/approval-mission";
import { useSelector } from "react-redux";
import { Spinner } from "@/components/spinner";

export function ModalViewMissionApproval({ isOpen, onClose }) {
	const { data, status, message } = useSelector(fetchApprovalSelector);

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
			>
				{status === "loading" && <Spinner containerSize={"xl"} />}
				{status === "failed" && <div>{message}</div>}
				{status === "success" && (
					<>
						<IconButton
							as={ModalCloseButton}
							icon={<CloseSquare size={"large"} />}
							size={"sm"}
							bg={"transparent"}
							color={"#828282"}
							position={"absolute"}
							right={"5rem"}
							top={"4rem"}
							_hover={{ bg: "transparent", color: "#333333" }}
							_focus={{ boxShadow: "none" }}
						/>
						<Box
							position={"absolute"}
							top={0}
							right={0}
							zIndex={-9999}
						>
							<RecyThingWhiteIcon />
						</Box>
						<ModalHeader
							display={"flex"}
							flexDirection={"column"}
							gap={"1rem"}
						>
							<Heading
								as="h3"
								fontSize={"2xl"}
								fontWeight={"semibold"}
								letterSpacing={"tight"}
							>
								Bukti pengerjaan
							</Heading>
						</ModalHeader>

						<ModalBody
							display={"flex"}
							flexDirection={"column"}
							gap={"3rem"}
						>
							<Heading
								as={Text}
								fontSize={"4xl"}
								fontWeight={"bold"}
								color={"#3BA639"}
								casing={"capitalize"}
							>
								{data.mission_name || "Tidak ada nama misi"}
							</Heading>
							<Flex
								flexDirection={"column"}
								gap={"0.8rem"}
							>
								<Text
									fontSize={"lg"}
									color={"#828282"}
								>
									Foto Bukti Tahapan/Tantangan
								</Text>
								<Tabs variant="unstyled">
									<TabList>
										{Array.isArray(data) ? (
											data.map((field, index) => (
												<TabButton
													key={field.id}
													tab={index + 1}
												/>
											))
										) : (
											<TabButton tabNumber={"1"} />
										)}
									</TabList>
									<TabIndicator
										mt={"-0.75rem"}
										height={"2px"}
										bg={"#3BA639"}
										borderRadius={"4px"}
									/>
									<TabPanels>
										{Array.isArray(data) ? (
											data.map((field) => (
												<TabContent
													key={field.id}
													data={field}
												/>
											))
										) : (
											<TabContent data={data} />
										)}
									</TabPanels>
								</Tabs>
							</Flex>
						</ModalBody>
						<ModalFooter p={0}>
							<Button
								color={"white"}
								bg={"#828282"}
								borderRadius={"lg"}
								px={"3.25rem"}
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
