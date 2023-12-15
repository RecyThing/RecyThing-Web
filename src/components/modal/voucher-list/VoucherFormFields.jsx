import { Box, Flex, FormControl, FormErrorMessage, Image, Input, Text } from "@chakra-ui/react";
import { Calendar, Discount } from "react-iconly";
import { Controller } from "react-hook-form";
import { Edit2 } from "iconsax-react";
import { InputDate, InputTextArea, InputWithLogo } from "@/components/inputs";
import { UploadImageIcon } from "@/components/icons";

/**
 * VoucherImageField is a component that is used as a form field for voucher image.
 * @param {{control: any, error: any, imageRef: ref, handleImageRef: () => void}} props - The props object.
 * @returns {JSX.Element} The VoucherImageField component.
 */
export function VoucherImageField({ control, error, imageRef, handleImageRef }) {
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
										src={field.value && field.value[0] instanceof File ? URL.createObjectURL(field.value[0]) : field.value}
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
									<Text color={error ? "red.500" : "#828282"}>Unggah Gambar Reward</Text>
								</>
							)}
						</Flex>
						<Text
							color={error ? "red.500" : "#828282"}
							fontSize={"sm"}
							textAlign={"center"}
						>
							Max 5 Mb, Format JPG & PNG
						</Text>
					</Flex>
					<FormErrorMessage
						justifyContent={"center"}
						textAlign={"center"}
					>
						{error?.message}
					</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}

/**
 * VoucherNameField is a component that is used as a form field for voucher name.
 * @param {{control: any, error: any}} props - The props object.
 * @returns {JSX.Element} The VoucherNameField component.
 */
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

/**
 * VoucherPointField is a component that is used as a form field for voucher point.
 * @param {{control: any, error: any}} props - The props object.
 * @returns {JSX.Element} The VoucherPointField component.
 */
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

/**
 * VoucherDescriptionField is a component that is used as a form field for voucher description.
 * @param {{control: any, error: any}} props - The props object.
 * @returns {JSX.Element} The VoucherDescriptionField component.
 */
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

/**
 * VoucherStartDateField is a component that is used as a form field for voucher start date.
 * @param {{control: any, error: any}} props - The props object.
 * @returns {JSX.Element} The VoucherStartDateField component.
 */
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

/**
 * VoucherEndDateField is a component that is used as a form field for voucher end date.
 * @param {{control: any, error: any}} props - The props object.
 * @returns {JSX.Element} The VoucherEndDateField component.
 */
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
