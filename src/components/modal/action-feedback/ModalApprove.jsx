import {
	Button,
	Center,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	VStack,
} from "@chakra-ui/react";
import { ApproveIcon } from "@/components/icons";

export function ModalApprove({
	isOpen,
	onClose,
	target,
	onApprove,
	title,
	message,
}) {
	const handleApprove = () => {
		onApprove(target);
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
				gap={"1.5rem"}
				py={"0.5rem"}
				shadow={"lg"}
			>
				<ModalHeader pb={0}>
					<Center>
						<ApproveIcon />
					</Center>
				</ModalHeader>

				<ModalBody>
					<VStack
						spacing={"1.5rem"}
						textAlign={"center"}
					>
						<Text
							fontSize={"2xl"}
							color={"black"}
							fontWeight={"medium"}
							lineHeight={"1.875rem"}
						>
							{title}
						</Text>
						<Text
							color={"#828282"}
							fontWeight={"semibold"}
							lineHeight={"1.5rem"}
						>
							{message}
						</Text>
					</VStack>
				</ModalBody>
				<ModalFooter
					pt={0}
					display={"flex"}
					justifyContent={"space-around"}
				>
					<Button
						color={"white"}
						bg={"#828282"}
						borderRadius={"lg"}
						px={"3.5rem"}
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
						px={"3.5rem"}
						py={"1.75rem"}
						_hover={{ bg: "#2DA22D" }}
						onClick={handleApprove}
					>
						Verifikasi
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
