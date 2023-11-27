import { UploadImageIcon } from "@/components/icons";
import { Edit2 } from "iconsax-react";
import { Calendar, Discount } from "react-iconly";
import {
	Box,
	Flex,
	FormControl,
	FormErrorMessage,
	Image,
	Input,
	Text,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { InputDate, InputTextArea, InputWithLogo } from "@/components/inputs";

const rules = {
	voucherName: {
		required: "Nama voucher tidak boleh kosong",
	},
	voucherPoint: {
		required: "Poin voucher tidak boleh kosong",
	},
	voucherImage: {
		required: "Gambar voucher tidak boleh kosong",
	},
	voucherDescription: {
		required: "Deskripsi voucher tidak boleh kosong",
	},
	voucherStartDate: {
		required: "Tanggal mulai voucher tidak boleh kosong",
	},
	voucherEndDate: {
		required: "Tanggal berakhir voucher tidak boleh kosong",
	},
};

export function VoucherImageField({
	control,
	error,
	imageRef,
	handleImageRef,
}) {
	return (
		<Controller
			name="voucherImage"
			control={control}
			rules={rules.voucherImage}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<Flex
						direction={"column"}
						gap={2}
					>
						<Input
							name="voucherImage"
							type="file"
							display={"none"}
							ref={imageRef}
							accept={".jpg,.jpeg,.png"}
							onInput={(e) => {
								field.onChange(e.target.files[0]);
							}}
						/>
						<Text color={"#828282"}>Gambar Reward</Text>
						<Flex
							w={"full"}
							position={"relative"}
							aspectRatio={"4/3"}
							justifyContent={"center"}
							alignItems={"center"}
							border={field.value ? "none" : "2px dashed #828282"}
							borderColor={error ? "red.500" : "#828282"}
							borderRadius={"lg"}
							flexDirection={"column"}
							cursor={"pointer"}
							onClick={handleImageRef}
						>
							{field.value ? (
								<>
									<Image
										src={
											field.value && field.value instanceof File
												? URL.createObjectURL(field.value)
												: field.value
										}
										alt={"voucher image"}
										aspectRatio={"4/3"}
										objectFit={"cover"}
										borderRadius={"lg"}
									/>
									<Box
										position={"absolute"}
										p={"0.5rem"}
										borderRadius={"0.5rem 0 0.5rem 0"}
										right={"0"}
										bottom={"0"}
										bg={"#00000066"}
									>
										<Edit2
											color="white"
											size={24}
										/>
									</Box>
								</>
							) : (
								<>
									<UploadImageIcon />
									<Text color={"#828282"}>Unggah Gambar Reward</Text>
								</>
							)}
						</Flex>
					</Flex>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}

export function VoucherNameField({ control, error }) {
	return (
		<Controller
			name="voucherName"
			control={control}
			rules={rules.voucherName}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputWithLogo
						label={"Nama Voucher"}
						Logo={Discount}
						autoComplete={"off"}
						{...field}
					/>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}

export function VoucherPointField({ control, error }) {
	return (
		<Controller
			name="voucherPoint"
			control={control}
			rules={rules.voucherPoint}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputWithLogo
						label={"Poin Voucher"}
						Logo={Discount}
						type={"number"}
						autoComplete={"off"}
						{...field}
					/>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}

export function VoucherDescriptionField({ control, error }) {
	return (
		<Controller
			name="voucherDescription"
			control={control}
			rules={rules.voucherDescription}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputTextArea
						label={"Deskripsi Voucher"}
						rows={10}
						{...field}
					/>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}

export function VoucherStartDateField({ control, error }) {
	return (
		<Controller
			name="voucherStartDate"
			control={control}
			rules={rules.voucherStartDate}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputDate
						label={"Tanggal Mulai Voucher"}
						Logo={Calendar}
						autoComplete={"off"}
						{...field}
					/>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}

export function VoucherEndDateField({ control, error }) {
	return (
		<Controller
			name="voucherEndDate"
			control={control}
			rules={rules.voucherEndDate}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputDate
						label={"Tanggal Berakhir Voucher"}
						Logo={Calendar}
						autoComplete={"off"}
						{...field}
					/>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}
