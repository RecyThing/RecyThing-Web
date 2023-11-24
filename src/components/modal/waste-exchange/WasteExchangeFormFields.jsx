import { Location, User, Message } from "react-iconly";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { InputWithLogo } from "@/components/inputs";

const rules = {
	username: {
		required: "Nama Lengkap tidak boleh kosong",
	},
	userEmail: {
		required: "Email Pengguna tidak boleh kosong",
	},
	dropPointLocation: {
		required: "Lokasi Drop Point tidak boleh kosong",
	},
};

export function Username({ control, error }) {
	return (
		<Controller
			name="username"
			control={control}
			rules={rules.username}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputWithLogo
						label={"Masukkan nama pengguna"}
						Logo={User}
						autoComplete={"off"}
						{...field}
					/>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}

export function UserEmail({ control, error }) {
	return (
		<Controller
			name="userEmail"
			control={control}
			rules={rules.userEmail}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputWithLogo
						label={"Masukkan email pengguna"}
						Logo={Message}
						type={"email"}
						autoComplete={"off"}
						{...field}
					/>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}

export function DropPointLocation({ control, error }) {
	return (
		<Controller
			name="dropPointLocation"
			control={control}
			rules={rules.dropPointLocation}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputWithLogo
						label={"Masukkan nama drop point"}
						Logo={Location}
						autoComplete={"off"}
						{...field}
					/>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}
