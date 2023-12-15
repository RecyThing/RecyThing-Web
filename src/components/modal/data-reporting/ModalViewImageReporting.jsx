import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { CloseSquare } from "react-iconly";
import { Flex, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spacer, Text } from "@chakra-ui/react";

/**
 * ModalViewImageReporting is a modal component that is used to display images for data reporting in carousel.
 * @param {{isOpen: boolean, onClose: function, companyName: string, currentImage: number, data: any[], onChangeImage: function, totalImage: number}} props - The props object.
 * @returns {JSX.Element} The ModalViewImageReporting component.
 */
export function ModalViewImageReporting({ isOpen, onClose, companyName, currentImage, data, onChangeImage, totalImage }) {
	const handlePrevImage = () => {
		if (currentImage + 1 > 1) {
			onChangeImage(currentImage - 1);
		}
	};

	const handleNextImage = () => {
		if (currentImage < totalImage) {
			onChangeImage(currentImage + 1);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size={"6xl"}
			isCentered
		>
			<ModalOverlay
				bg={"#0000000D"}
				backdropFilter={"blur(5px)"}
			/>
			<ModalContent
				p={"1rem"}
				gap={"1rem"}
				borderRadius={"3xl"}
				shadow={"lg"}
			>
				<ModalHeader p={0}>
					<IconButton
						as={ModalCloseButton}
						icon={<CloseSquare size={"large"} />}
						size={"sm"}
						bg={"transparent"}
						color={"#ffffff"}
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
					<Flex
						flexDirection={"row"}
						alignItems={"center"}
						justify={"center"}
						width={"1120px"}
						height={"630px"}
						justifyItems={"space-between"}
					>
						<IconButton
							icon={<ArrowLeft2 />}
							bg={"#ffffff"}
							marginRight={"50px"}
							isDisabled={currentImage + 1 === 1}
							onClick={handlePrevImage}
						/>
						<Image
							sizes="4xl"
							minWidth={"1120px"}
							minHeight={"630px"}
							maxWidth={"1120px"}
							maxHeight={"630px"}
							objectFit={"contain"}
							src={data && data[currentImage] ? data[currentImage].image : ""}
						/>
						<IconButton
							icon={<ArrowRight2 />}
							bg={"#ffffff"}
							marginLeft={"50px"}
							isDisabled={currentImage + 1 === totalImage}
							onClick={handleNextImage}
						/>
					</Flex>
					<div>
						{companyName ? (
							<>
								<Flex
									flexDirection={"row"}
									textAlign={"space-between"}
								>
									<Text
										fontSize="sm"
										color="gray.400"
									>
										Limbah {companyName}
									</Text>
									<Spacer />
									<Text
										fontSize="sm"
										color="gray.400"
									>
										{currentImage + 1} dari {totalImage}
									</Text>
								</Flex>
							</>
						) : (
							<Text
								fontSize="sm"
								color="gray.400"
								textAlign={"end"}
								width={"100%"}
							>
								{currentImage + 1} dari {totalImage}
							</Text>
						)}
					</div>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
