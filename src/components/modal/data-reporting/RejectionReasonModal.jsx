import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	Textarea,
} from "@chakra-ui/react";

export function RejectionReasonModal({
	isOpen,
	onClose,
	target,
	onReject,
}) {
	const handleReject = () => {
		onReject(target);
		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size={"md"}
			isCentered
		>
			<ModalOverlay
				bg={"#0000000D"}
				backdropFilter={"blur(5px)"}
			/>
			<ModalContent
				borderRadius={"3xl"}
				display={"flex"}
				gap={"0.5rem"}
				py={"0.5rem"}
				shadow={"lg"}
			>
				<ModalHeader pb={0}>
                    <Text
                        fontSize={"2xl"}
                        color={"black"}
                        fontWeight={"bold"}
                        lineHeight={"1.875rem"}
                    >
                        Alasan Penolakan
                    </Text>
					<Text
                        fontSize={"lg"}
                        color={"black"}
						fontWeight={"normal"}
						marginTop={"5px"}
                        lineHeight={"1.875rem"}
                    >
                        Masukkan alasan penolakan untuk laporan ini:
                    </Text>
				</ModalHeader>
				<ModalBody>
					<Textarea
						rows="8" 
						className="resize-none h-36"
						border={"2px solid var(--dark-colors-dark-3, rgba(130, 130, 130, 0.75))"}
					>
					</Textarea>
				</ModalBody>
				<ModalFooter
					pt={"20px"}
					display={"flex"}
					justifyContent={"space-around"}
				>
					<Button
						color={"white"}
						bg={"#828282"}
						borderRadius={"lg"}
						px={"4.5rem"}
						py={"1.75rem"}
						_hover={{ bg: "#333333" }}
						onClick={onClose}
					>
						Batal
					</Button>
					<Button
						color={"white"}
						bg={"#FF5C5C"}
						borderRadius={"lg"}
						px={"4.5rem"}
						py={"1.75rem"}
						_hover={{ bg: "#FF0000" }}
						onClick={handleReject}
					>
						Tolak
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
