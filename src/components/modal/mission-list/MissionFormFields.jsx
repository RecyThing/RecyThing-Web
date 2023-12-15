import { DownloadIcon } from "@/components/icons";
import { Edit2 } from "iconsax-react";
import { Calendar, Discount } from "react-iconly";
import { Box, Flex, FormControl, FormErrorMessage, Image, Input, Text } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { Input as InputWithoutLogo, InputDate, InputTextArea, InputWithLogo } from "@/components/inputs";
import frame from "@/assets/input-image-frame.png";

export function MissionImageField({ control, error, imageRef, handleImageRef }) {
	return (
		<Controller
			name="missionImage"
			control={control}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<Flex
						direction={"column"}
						gap={2}
					>
						<Input
							name="missionImage"
							type="file"
							display={"none"}
							ref={imageRef}
							accept={".jpg,.png"}
							onChange={(e) => {
								field.onChange(e.target.files);
							}}
						/>
						<Text color={"#828282"}>Gambar Misi</Text>
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
										alt={"mission image"}
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
										zIndex={10}
									>
										<Edit2
											color="white"
											size={24}
										/>
									</Box>
								</>
							) : (
								<>
									<DownloadIcon />
									<Text color={"#828282"}>Unggah Gambar Misi</Text>
								</>
							)}
							<Image
								src={frame}
								position={"absolute"}
								bottom={0}
							/>
						</Flex>
						<Text
							color={error ? "red.500" : "#828282"}
							fontSize={"sm"}
							textAlign={"center"}
						>
							Max 5 Mb, Format JPG & PNG
						</Text>
					</Flex>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}

export function MissionTitleField({ control, error }) {
	return (
		<Controller
			name="missionTitle"
			control={control}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputWithLogo
						label={"Judul"}
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

export function MissionPointField({ control, error }) {
	return (
		<Controller
			name="missionPoint"
			control={control}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputWithLogo
						label={"Points"}
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

export function MissionDescriptionField({ control, error }) {
	return (
		<Controller
			name="missionDescription"
			control={control}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputTextArea
						label={"Deskripsi Singkat"}
						rows={10}
						{...field}
					/>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}

export function MissionStartDateField({ control, error }) {
	return (
		<Controller
			name="missionStartDate"
			control={control}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputDate
						label={"Tanggal Dimulai"}
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

export function MissionEndDateField({ control, error }) {
	return (
		<Controller
			name="missionEndDate"
			control={control}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputDate
						label={"Tanggal Berakhir"}
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

export function MissionTitleStepField({ control, error, no, disabled }) {
	return (
		<Controller
			name={`missionSteps.${no - 1}.title`}
			control={control}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputWithoutLogo
						label={"Judul"}
						autoComplete={"off"}
						{...field}
						disabled={disabled}
					/>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}

export function MissionDescriptionStepField({ control, error, no, disabled }) {
	return (
		<Controller
			name={`missionSteps.${no - 1}.description`}
			control={control}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputWithoutLogo
						label={"Deskripsi"}
						autoComplete={"off"}
						{...field}
						disabled={disabled}
					/>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}

export function MissionTitleStageField({ control, error }) {
	return (
		<Controller
			name="missionTitleStage"
			control={control}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputWithoutLogo
						label={"Judul"}
						autoComplete={"off"}
						{...field}
					/>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}

export function MissionDescriptionStageField({ control, error }) {
	return (
		<Controller
			name="missionDescriptionStage"
			control={control}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputWithoutLogo
						label={"Deskripsi"}
						autoComplete={"off"}
						{...field}
					/>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}
