import { Location, User, Message } from "react-iconly";
import {
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { InputWithLogo } from "@/components/inputs";

export function Username({ control, error }) {
  return (
    <Controller
      name="username"
      control={control}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <InputWithLogo
            label={"Masukkan nama pengguna"}
            Logo={User}
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

export function UserEmail({ control, error }) {
  return (
    <Controller
      name="userEmail"
      control={control}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <InputWithLogo
            label={"Masukkan email pengguna"}
            Logo={Message}
            type={"email"}
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

export function DropPointLocation({ control, error }) {
  return (
    <Controller
      name="dropPointLocation"
      control={control}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <InputWithLogo
            label={"Masukkan nama drop point"}
            Logo={Location}
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