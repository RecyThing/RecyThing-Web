import { Button, Center, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { DangerCircleIcon } from "@/components/icons";

export function ModalDelete({ isOpen, onClose, target, onDelete, title, message, isLoading }) {
	const handleDelete = () => {
		onDelete(target);
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size={"md"}
			closeOnOverlayClick={isLoading ? false : true}
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
						<DangerCircleIcon />
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
							{title || "Anda yakin ingin menghapus data ini?"}
						</Text>
						<Text
							color={"#828282"}
							fontWeight={"semibold"}
						>
							{message || "Data yang dihapus tidak dapat dipulihkan"}
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
						isDisabled={isLoading}
						className="w-40"
					>
						Batal
					</Button>
					<Button
						color={"white"}
						bg={"#FF5C5C"}
						borderRadius={"lg"}
						px={"3.5rem"}
						py={"1.75rem"}
						_hover={{ bg: "#FF0000" }}
						isLoading={isLoading}
						onClick={handleDelete}
						className="w-40 !flex !gap-2 !justify-center disabled:!opacity-70"
					>
						Hapus
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
