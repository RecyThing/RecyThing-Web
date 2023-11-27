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
	reward_name: {
		required: "Nama voucher tidak boleh kosong",
	},
	point: {
		required: "Poin voucher tidak boleh kosong",
	},
	image: {
		required: "Gambar voucher tidak boleh kosong",
	},
	description: {
		required: "Deskripsi voucher tidak boleh kosong",
	},
	start_date: {
		required: "Tanggal mulai voucher tidak boleh kosong",
	},
	end_date: {
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
			name="image"
			control={control}
			rules={rules.image}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<Flex
						direction={"column"}
						gap={2}
					>
						<Input
							name="image"
							type="file"
							display={"none"}
							ref={imageRef}
							accept={".jpg,.png"}
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
			name="reward_name"
			control={control}
			rules={rules.reward_name}
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
			name="point"
			control={control}
			rules={rules.point}
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
			name="description"
			control={control}
			rules={rules.description}
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
			name="start_date"
			control={control}
			rules={rules.start_date}
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
			name="end_date"
			control={control}
			rules={rules.end_date}
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
