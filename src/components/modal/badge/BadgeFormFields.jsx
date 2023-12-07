import { Controller } from "react-hook-form";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Input } from "@/components/inputs";

export function BadgeNameFields({ control, error }) {
  return (
    <Controller
      name="name"
      control={control}
      disabled
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <Input
            label={"Nama Lencana"}
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

export function BadgeTargetField({ control, error }) {
  return (
    <Controller
      name="target_point"
      control={control}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <Input
            label={"Target Poin"}
            autoComplete={"off"}
            error={error}
            type={"number"}
            {...field}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}