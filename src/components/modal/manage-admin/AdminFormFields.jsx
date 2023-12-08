import { Controller } from "react-hook-form";
import { Button, FormControl, FormErrorMessage, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Input } from "@/components/inputs";
import { useState } from "react";
import { ChevronDown, ChevronUp, Document } from "react-iconly";

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

export function SelectedStatus({ control, error}) {
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
                textTransform: "capitalize",
                borderColor: "#35CC33",
              }}
              rightIcon={menuOpen ? <ChevronUp /> : <ChevronDown />}
              leftIcon={<Document />}
              onClick={handleMenuOpen}
              isActive={menuOpen}
              textAlign="left"
              fontWeight="normal"
              fontSize={"14px"}
            >
              {field.value || "Pilih Status"}
            </MenuButton>
            <MenuList fontSize={"14px"}>
              <MenuItem
                onClick={() => {
                  field.onChange("Aktif");
                }}
              >
                Aktif
              </MenuItem>
              <MenuItem
                onClick={() => {
                  field.onChange("Tidak Aktif");
                }}
              >
                Tidak Aktif
              </MenuItem>
            </MenuList>
          </Menu>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
