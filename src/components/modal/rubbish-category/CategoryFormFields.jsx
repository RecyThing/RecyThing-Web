import { ChevronDown, ChevronUp, Delete, TicketStar } from "react-iconly";
import {
  FormControl,
  FormErrorMessage,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { InputWithLogo } from "@/components/inputs";
import { useState, useEffect } from "react";

const rules = {
    rubbishCategoryName: {
        required: "Nama jenis sampah tidak boleh kosong"
    },
    rewardPoint: {
        required: "Poin reward tidak boleh kosong"
    },
    selectUnit: {
        required: "Satuan tidak boleh kosong"
    }
}

export function RubbishCategoryName ({ control, error }) {
    return (
      <Controller
        name="rubbishCategoryName"
        control={control}
        rules={rules.rubbishCategoryName}
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

export function RewardPoint ({ control, error }) {
    return (
      <Controller
        name="rewardPoint"
        control={control}
        rules={rules.rewardPoint}
        render={({ field }) => (
          <FormControl isInvalid={error}>
            <InputWithLogo
              label={"Masukan poin reward"}
              Logo={TicketStar}
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

export function SelectUnit({ control, error, target }) {
  const [selectedUnit, setSelectedUnit] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (target) {
      setSelectedUnit(target[2]);
    }
  }, [target]);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Controller
      name="selectUnit"
      control={control}
      rules={rules.selectUnit}
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