import { ChevronDown, ChevronUp, Delete, TicketStar } from "react-iconly";
import {
	Button,
	FormControl,
	FormErrorMessage,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { InputWithLogo } from "@/components/inputs";
import { useState, useEffect } from "react";

export function TrashTypeField({ control, error }) {
	return (
		<Controller
			name="trash_type"
			control={control}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputWithLogo
						label={"Masukan nama jenis sampah"}
						Logo={Delete}
						autoComplete={"off"}
						{...field}
					/>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}

export function RewardPointField({ control, error }) {
	return (
		<Controller
			name="point"
			control={control}
			render={({ field }) => (
				<FormControl isInvalid={error}>
					<InputWithLogo
						label={"Masukan poin reward"}
						Logo={TicketStar}
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

export function SelectUnitField({ control, error, target }) {
  const [selectedUnit, setSelectedUnit] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (target) {
      setSelectedUnit(target.unit || "");
    }
  }, [target]);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Controller
      name="unit"
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
              onClick={handleMenuOpen}
              isActive={menuOpen}
              textAlign="left"
              fontWeight="normal"
              fontSize={"14px"}
            >
              {field.value || "Pilih Satuan"}
            </MenuButton>
            <MenuList fontSize={"14px"}>
              <MenuItem
                onClick={() => {
                  field.onChange("Barang");
                }}
              >
                Barang
              </MenuItem>
              <MenuItem
                onClick={() => {
                  field.onChange("Kilogram");
                }}
              >
                Kilogram
              </MenuItem>
            </MenuList>
          </Menu>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
