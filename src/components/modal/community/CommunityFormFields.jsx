import { UploadImageIcon } from "@/components/icons";
import { InputTextArea, InputWithLogo } from "@/components/inputs";
import {
	Box,
	Flex,
	FormControl,
	FormErrorMessage,
	Image,
	Input,
	Text,
} from "@chakra-ui/react";
import { Edit2 } from "iconsax-react";
import { Controller } from "react-hook-form";
import { Location, People } from "react-iconly";

export function CommunityImageField({
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
						gap={"1rem"}
					>
						<Input
							name="image"
							type="file"
							display={"none"}
							ref={imageRef}
							accept={".jpg,.png"}
							onChange={(e) => field.onChange(e.target.files)}
						/>
						<Text color={error ? "red.500" : "#828282"}>Gambar Komunitas</Text>
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
										alt={"community image"}
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
										Unggah Gambar Komunitas
									</Text>
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
					<FormErrorMessage textAlign={"center"}>
						{error?.message}
					</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}

export function CommunityNameField({ control, error }) {
	return (
		<FormControl isInvalid={error}>
			<Controller
				control={control}
				name="name"
				render={({ field }) => (
					<InputWithLogo
						label={"Nama Komunitas"}
						type={"text"}
						Logo={People}
						error={error}
						{...field}
					/>
				)}
			/>
			<FormErrorMessage>{error?.message}</FormErrorMessage>
		</FormControl>
	);
}

export function CommunityDescField({ control, error }) {
	return (
		<FormControl isInvalid={error}>
			<Controller
				control={control}
				name="description"
				render={({ field }) => (
					<InputTextArea
						label={"Deskripsi Komunitas"}
						rows={6}
						error={error}
						{...field}
					/>
				)}
			/>
			<FormErrorMessage>{error?.message}</FormErrorMessage>
		</FormControl>
	);
}

export function CommunityLocationField({ control, error }) {
	return (
		<FormControl isInvalid={error}>
			<Controller
				control={control}
				name="location"
				render={({ field }) => (
					<InputWithLogo
						label={"Lokasi Komunitas"}
						type={"text"}
						Logo={Location}
						error={error}
						{...field}
					/>
				)}
			/>
			<FormErrorMessage>{error?.message}</FormErrorMessage>
		</FormControl>
	);
}

export function CommunityMembersField({ control, error }) {
	return (
		<FormControl isInvalid={error}>
			<Controller
				control={control}
				name="max_members"
				render={({ field }) => (
					<InputWithLogo
						label={"Maksimal Total Anggota"}
						type={"number"}
						Logo={People}
						error={error}
						{...field}
					/>
				)}
			/>
			<FormErrorMessage>{error?.message}</FormErrorMessage>
		</FormControl>
	);
}
