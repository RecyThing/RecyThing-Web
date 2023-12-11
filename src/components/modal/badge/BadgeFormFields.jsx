import { Controller } from "react-hook-form";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Input } from "@/components/inputs";

// Input Name Badge
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
            style={{
              cursor: "not-allowed",
              color: "#73737A",
              textTransform: "capitalize",
            }}
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

// Input Target
export function BadgeTargetField({ control, error }) {
  return (
    <Controller
      name="target_point"
      control={control}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <Input
            label={"Target Poin"}
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
