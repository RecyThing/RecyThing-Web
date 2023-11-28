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
							onChange={(e) => field.onChange(e.target.files)}
						/>
						<Text color={error ? "red.500" : "#828282"}>Gambar Reward</Text>
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
											field.value && field.value[0] instanceof File
												? URL.createObjectURL(field.value[0])
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
									<UploadImageIcon color={error ? "#E53535" : "#828282"} />
									<Text color={error ? "red.500" : "#828282"}>
										Unggah Gambar Reward
									</Text>
								</>
							)}
						</Flex>
						<Text
							color={error ? "red.500" : "#828282"}
							fontSize={"sm"}
							textAlign={"center"}
						>
							Max 5 Mb, Format JPG & JPEG
						</Text>
					</Flex>
					<FormErrorMessage justifyContent={"center"}>
						{error?.message}
					</FormErrorMessage>
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
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputWithLogo
						label={"Nama Voucher"}
						Logo={Discount}
						autoComplete={"off"}
						error={error}
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
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputWithLogo
						label={"Poin Voucher"}
						Logo={Discount}
						type={"number"}
						autoComplete={"off"}
						error={error}
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
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputTextArea
						label={"Deskripsi Voucher"}
						rows={10}
						error={error}
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
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputDate
						label={"Tanggal Mulai Voucher"}
						Logo={Calendar}
						autoComplete={"off"}
						error={error}
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
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputDate
						label={"Tanggal Berakhir Voucher"}
						Logo={Calendar}
						autoComplete={"off"}
						error={error}
						{...field}
					/>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}
