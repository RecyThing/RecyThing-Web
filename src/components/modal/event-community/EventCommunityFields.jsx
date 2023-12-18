import { Box, Flex, FormControl, FormErrorMessage, Image, Input, Text, Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { Calendar, Location, Paper, People, TickSquare, ChevronDown, ChevronUp } from "react-iconly";
import { Controller } from "react-hook-form";
import { Edit2 } from "iconsax-react";
import { InputDate, InputTextArea, InputWithLogo } from "@/components/inputs";
import { UploadImageIcon } from "@/components/icons";
import { useState } from "react";

const options = [
	{ label: "Berjalan", value: "berjalan" },
	{ label: "Belum Berjalan", value: "belum berjalan" },
	{ label: "Selesai", value: "selesai" },
];

export function EventCommunityImageField({ control, error, imageRef, handleImageRef }) {
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
										src={field.value && field.value[0] instanceof File ? URL.createObjectURL(field.value[0]) : field.value}
										alt={"event community image"}
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
									<Text
										color={error ? "red.500" : "#828282"}
										textAlign={"center"}
									>
										Unggah Gambar Event Komunitas
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
					<FormErrorMessage textAlign={"center"}>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}

export function EventCommunityTitleField({ control, error }) {
	return (
		<FormControl isInvalid={error}>
			<Controller
				control={control}
				name="title"
				render={({ field }) => (
					<InputWithLogo
						label={"Nama Event Komunitas"}
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

export function EventCommunityDescField({ control, error }) {
	return (
		<FormControl isInvalid={error}>
			<Controller
				control={control}
				name="description"
				render={({ field }) => (
					<InputTextArea
						label={"Deskripsi"}
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

export function EventCommunityLocationField({ control, error }) {
	return (
		<FormControl isInvalid={error}>
			<Controller
				control={control}
				name="location"
				render={({ field }) => (
					<InputWithLogo
						label={"Lokasi Event Komunitas"}
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

export function EventCommunityMapLinkField({ control, error }) {
	return (
		<FormControl isInvalid={error}>
			<Controller
				control={control}
				name="maplink"
				render={({ field }) => (
					<InputWithLogo
						label={"Masukkan Link Google Maps Lokasi Event"}
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

export function EventCommunityFormLinkField({ control, error }) {
	return (
		<FormControl isInvalid={error}>
			<Controller
				control={control}
				name="formlink"
				render={({ field }) => (
					<InputWithLogo
						label={"Masukkan Link Google Form Pendaftaran Event"}
						type={"text"}
						Logo={Paper}
						error={error}
						{...field}
					/>
				)}
			/>
			<FormErrorMessage>{error?.message}</FormErrorMessage>
		</FormControl>
	);
}

export function EventCommunityQuotaField({ control, error }) {
	return (
		<FormControl isInvalid={error}>
			<Controller
				control={control}
				name="quota"
				render={({ field }) => (
					<InputWithLogo
						label={"Kuota Maksimal"}
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

export function EventCommunityDateField({ control, error }) {
	return (
		<FormControl isInvalid={error}>
			<Controller
				control={control}
				name="date"
				render={({ field }) => (
					<InputDate
						label={"Tanggal Pelaksanaan"}
						Logo={Calendar}
						error={error}
						{...field}
					/>
				)}
			/>
			<FormErrorMessage>{error?.message}</FormErrorMessage>
		</FormControl>
	);
}

export function EventCommunityStatusField({ control, error }) {
	const [menuOpen, setMenuOpen] = useState(false);

	const handleMenuOpen = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<Controller
			name="status"
			control={control}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<Menu>
						<MenuButton
							as={Button}
							px={4}
							py={2}
							width={"100%"}
							height={"53.6px"}
							transition="all 0.2s"
							borderRadius="lg"
							borderWidth="1px"
							borderColor={"#949494"}
							backgroundColor={"white"}
							_hover={{ bg: "gray.100" }}
							_expanded={{
								bg: "#35CC33",
								textColor: "white",
								borderColor: "#35CC33",
							}}
							rightIcon={menuOpen ? <ChevronUp /> : <ChevronDown />}
							leftIcon={<TickSquare />}
							onClick={handleMenuOpen}
							isActive={menuOpen}
							textAlign="left"
							fontWeight="normal"
							fontSize={"14px"}
						>
							<Text casing="capitalize">{field.value || "Status Event"}</Text>
						</MenuButton>
						<MenuList fontSize={"14px"}>
							{options.map((option) => (
								<MenuItem
									key={option.value}
									onClick={() => {
										field.onChange(option.value);
										handleMenuOpen();
									}}
								>
									{option.label}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}
