import {
	Button,
	Grid,
	GridItem,
	Heading,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import * as Fields from "./VoucherFormFields";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./VoucherFormSchema";

export function ModalAddVoucher({ isOpen, onClose, onSubmit }) {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const imageRef = useRef();

	const handleImageRef = () => {
		if (imageRef.current) {
			imageRef.current.click();
		}
	};

	const handleOnSubmit = (data) => {
		onSubmit(data);
		reset();
		onClose();
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
		>
			<ModalOverlay
				bg={"#0000000D"}
				backdropFilter={"blur(5px)"}
			/>
			<ModalContent
				borderRadius={"3xl"}
				gap={"1.5rem"}
				py={"1rem"}
			>
				<ModalHeader pb={"0"}>
					<Heading
						as="h2"
						fontSize={"2xl"}
						fontWeight={"bold"}
					>
						Tambah Data Voucher
					</Heading>
				</ModalHeader>

				<form onSubmit={handleSubmit(handleOnSubmit)}>
					<ModalBody
						display={"grid"}
						gridTemplateColumns={"0.5fr 1.5fr"}
						gap={6}
						py={"1.5rem"}
					>
						<Fields.VoucherImageField
							control={control}
							error={errors.image}
							imageRef={imageRef}
							handleImageRef={handleImageRef}
						/>

						<Grid
							templateRows={"auto auto auto"}
							templateColumns={"1fr 1fr"}
							gap={6}
						>
							<GridItem>
								<Fields.VoucherNameField
									control={control}
									error={errors.reward_name}
								/>
							</GridItem>
							<GridItem>
								<Fields.VoucherPointField
									control={control}
									error={errors.point}
								/>
							</GridItem>
							<GridItem colSpan={"2"}>
								<Fields.VoucherDescriptionField
									control={control}
									error={errors.description}
								/>
							</GridItem>
							<GridItem>
								<Fields.VoucherStartDateField
									control={control}
									error={errors.start_date}
								/>
							</GridItem>
							<GridItem>
								<Fields.VoucherEndDateField
									control={control}
									error={errors.end_date}
								/>
							</GridItem>
						</Grid>
					</ModalBody>
					<ModalFooter gap={4}>
						<Button
							color={"white"}
							bg={"#828282"}
							borderRadius={"lg"}
							px={"3.5rem"}
							py={"1.75rem"}
							_hover={{ bg: "#333333" }}
							onClick={() => {
								reset();
								onClose();
							}}
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
							type="submit"
						>
							Tambah Data
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
