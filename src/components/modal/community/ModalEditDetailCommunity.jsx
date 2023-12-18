import { Button, Grid, GridItem, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { CloseSquare } from "react-iconly";
import { schema } from "./CommunityFormSchema";
import { updateCommunitySelector } from "@/store/community";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Fields from "./CommunityFormFields";

export function ModalEditDetailCommunity({ isOpen, onClose, onUpdate, data }) {
	const {
		control,
		formState: { errors },
		handleSubmit,
		setValue,
		reset,
	} = useForm({ resolver: yupResolver(schema) });

	const { status } = useSelector(updateCommunitySelector);

	const handleUpdate = (target) => {
		onUpdate(target);
	};

	const imageRef = useRef(null);

	const handleImageRef = () => {
		imageRef.current.click();
	};

	useEffect(() => {
		if (!isOpen) {
			reset();
		}
	}, [isOpen, reset]);

	useEffect(() => {
		if (data) {
			setValue("image", data?.image);
			setValue("name", data?.name);
			setValue("description", data?.description);
			setValue("location", data?.location);
			setValue("max_members", data?.max_members);
		}
	}, [data, setValue]);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size={"5xl"}
			isCentered
			closeOnOverlayClick={status !== "loading"}
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
						Edit Komunitas
					</Heading>
				</ModalHeader>

				<form onSubmit={handleSubmit(handleUpdate)}>
					<ModalBody
						display={"grid"}
						gridTemplateColumns={"0.5fr 1.5fr"}
						gap={6}
						p={0}
					>
						<Fields.CommunityImageField
							control={control}
							error={errors.image}
							imageRef={imageRef}
							handleImageRef={handleImageRef}
						/>

						<Grid
							templateRows={"auto auto auto"}
							templateColumns={"1.75fr 1fr"}
							gap={6}
						>
							<GridItem colSpan={3}>
								<Fields.CommunityNameField
									control={control}
									error={errors.name}
								/>
							</GridItem>
							<GridItem colSpan={3}>
								<Fields.CommunityDescField
									control={control}
									error={errors.description}
								/>
							</GridItem>
							<GridItem colSpan={2}>
								<Fields.CommunityLocationField
									control={control}
									error={errors.location}
								/>
							</GridItem>
							<GridItem colSpan={1}>
								<Fields.CommunityMembersField
									control={control}
									error={errors.max_members}
								/>
							</GridItem>
						</Grid>
					</ModalBody>

					<ModalFooter
						gap={"1rem"}
						justifyContent={"flex-end"}
						p={0}
						marginTop={"1.5rem"}
					>
						<Button
							color={"white"}
							bg={"#828282"}
							borderRadius={"lg"}
							px={"3.25rem"}
							py={"1.75rem"}
							_hover={{ bg: "#333333" }}
							onClick={onClose}
							isDisabled={status === "loading"}
						>
							Batal
						</Button>
						<Button
							type={"submit"}
							color={"white"}
							bg={"#35CC33"}
							borderRadius={"lg"}
							px={"3rem"}
							py={"1.75rem"}
							_hover={{ bg: "#2DA22D" }}
							isLoading={status === "loading"}
						>
							Simpan
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
