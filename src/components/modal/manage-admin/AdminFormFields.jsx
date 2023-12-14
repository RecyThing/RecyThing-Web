import { Controller } from "react-hook-form";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { InputWithLogo } from "@/components/inputs";
import { useState } from "react";
import {
  Camera,
  ChevronDown,
  ChevronUp,
  Document,
  Message,
} from "react-iconly";
import { Profile } from "iconsax-react";
import AdminImage from "@/assets/AdminImage.svg";
import { useSelector } from "react-redux";
import { updateAdminSelector } from "@/store/admin";

export function AdminImageFields({ control, error, imageRef, handleImageRef }) {
  return (
    <Controller
      name="image"
      control={control}
      render={({ field }) => (
        <div
          className="wrapper relative w-2/3 mx-auto"
          onClick={handleImageRef}
        >
          <img
            src={
              field.value
                ? field.value[0] instanceof File
                  ? URL.createObjectURL(field.value[0])
                  : field.value
                : AdminImage
            }
            className="relative mx-auto aspect-square rounded-full object-contain border"
            width={150}
            height={150}
            alt=""
          />
          <input
            name="image"
            type="file"
            className="hidden"
            ref={imageRef}
            accept={".jpg,.png"}
            onChange={(e) => field.onChange(e.target.files)}
          />
          <button
            className="rounded-full bg-green-500 p-3 text-white absolute right-7 bottom-1 z-10"
            type="button"
          >
            <Camera />
          </button>
          <FormErrorMessage justifyContent={"center"} textAlign={"center"}>
            {error?.message}
          </FormErrorMessage>
        </div>
      )}
    />
  );
}

export function AdminNameFields({ control, error }) {
  return (
    <Controller
      name="fullname"
      control={control}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <InputWithLogo
            label={"Nama Lengkap"}
            Logo={Profile}
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
          <InputWithLogo
            label={field.value ? "Email" : "Tambahkan Email"}
            Logo={Message}
            className={"my-4"}
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

export function SelectedStatus({ control, error }) {
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
