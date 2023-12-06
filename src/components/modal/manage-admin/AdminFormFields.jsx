import { Controller } from "react-hook-form";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Input } from "@/components/inputs";

export function AdminNameFields({ control, error }) {
  return (
    <Controller
      name="fullname"
      control={control}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <Input
            label={"Nama Lengkap"}
            className={"mt-8"}
            autoComplete={"off"}
            error={error}
            {...field}
            type={"text"}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

export function AdminEmailFields({ control, error }) {
  return (
    <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <Input
            label={"Tambahkan email"}
            className={"my-4"}
            autoComplete={"off"}
            error={error}
            {...field}
            type={"email"}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

// export function AdminPasswordFields({ control, error }) {
//   return (
//     <Controller
//       control={control}
//       render={({ field }) => (
//         <FormControl isInvalid={error}>
//           <Input
//             label={"password"}
//             autoComplete={"off"}
//             error={error}
//             {...field}
//             type={"password"}
//           />
//           <FormErrorMessage>{error?.message}</FormErrorMessage>
//         </FormControl>
//       )}
//     />
//   );
// }
