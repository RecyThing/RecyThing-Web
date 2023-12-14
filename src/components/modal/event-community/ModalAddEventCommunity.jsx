import { Button, Grid, GridItem, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { CloseSquare } from "react-iconly";
import { schema } from "./CommunityEventFormSchema";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Fields from "../event-community/EventCommunityFields";
import { useSelector } from "react-redux";
import { createEventSelector } from "@/store/event-community";

export function ModalAddEventCommunity({ isOpen, onClose, onSubmit }) {
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const { status } = useSelector(createEventSelector);

	const handleSubmitForm = (data) => {
		onSubmit(data);
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
						Tambah Event Komunitas
					</Heading>
				</ModalHeader>

				<form onSubmit={handleSubmit(handleSubmitForm)}>
					<ModalBody
						display={"grid"}
						gridTemplateColumns={"0.5fr 1.5fr"}
						gap={6}
						p={0}
					>
						<Fields.EventCommunityImageField
							control={control}
							error={errors.image}
							imageRef={imageRef}
							handleImageRef={handleImageRef}
						/>

						<Grid
							templateColumns={"1fr 1fr 1fr"}
							gap={6}
						>
							<GridItem colSpan={"3"}>
								<Fields.EventCommunityTitleField
									control={control}
									error={errors.title}
								/>
							</GridItem>

							<GridItem colSpan={"3"}>
								<Fields.EventCommunityDescField
									control={control}
									error={errors.description}
								/>
							</GridItem>
							<GridItem colSpan={3}>
								<Fields.EventCommunityLocationField
									control={control}
									error={errors.location}
								/>
							</GridItem>
							<GridItem colSpan={3}>
								<Fields.EventCommunityMapLinkField
									control={control}
									error={errors.maplink}
								/>
							</GridItem>
							<GridItem colSpan={3}>
								<Fields.EventCommunityFormLinkField
									control={control}
									error={errors.formlink}
								/>
							</GridItem>

							<GridItem colSpan={1}>
								<Fields.EventCommunityQuotaField
									control={control}
									error={errors.quota}
								/>
							</GridItem>

							<GridItem colSpan={1}>
								<Fields.EventCommunityDateField
									control={control}
									error={errors.date}
								/>
							</GridItem>

							<GridItem colSpan={1}>
								<Fields.EventCommunityStatusField
									control={control}
									error={errors.status}
								/>
							</GridItem>
						</Grid>
					</ModalBody>

					<ModalFooter
						display={"flex"}
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
							Tambah
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
