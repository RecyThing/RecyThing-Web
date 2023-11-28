import { UploadImageIcon } from "@/components/icons";
import { InputDate, InputTextArea, InputWithLogo } from "@/components/inputs";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Text,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Edit2 } from "iconsax-react";
import { Controller } from "react-hook-form";
import {
  Calendar,
  Location,
  Paper,
  People,
  TickSquare,
  ChevronDown,
  ChevronUp,
  Delete,
  TicketStar,
} from "react-iconly";
import { useState, useEffect } from "react";

const rules = {
  communityImage: {
    required: "Gambar Komunitas Tidak Boleh Kosong!",
  },
  communityName: {
    required: "Nama Komunitas Tidak Boleh Kosong!",
  },
  communityDescription: {
    required: "Deskripsi Komunitas Tidak Boleh Kosong!",
  },
  CommunityLinkLocationEvent: {
    required: "Link Lokasi Tidak Bolek Kosong!",
  },

  communityLocation: {
    required: "Lokasi Komunitas Tidak Boleh Kosong!",
  },
  CommunityLinkGoogleForm: { required: "Link Google Form Tidak Boleh Kosong!" },
  CommunityMembersField: { required: "Maksimal Anggota Tidak Bolek Kosong" },
  CommunityDateField: { required: "Tanggal Pelaksanaan Tidak Boleh Kosong" },
  StatusEvent: { required: "Status Event Tidak Boleh Kosong" },
};

const options = [
  { label: "Berjalan", value: "berjalan" },
  { label: "Belum Berjalan", value: "belum-berjalan" },
  { label: "Selesai", value: "selesai" },
];

export function CommunityImageField({
  control,
  error,
  imageRef,
  handleImageRef,
}) {
  return (
    <Controller
      name="communityImage"
      control={control}
      rules={rules.communityImage}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <Flex direction={"column"} gap={"1rem"}>
            <Input
              name="voucherImage"
              type="file"
              display={"none"}
              ref={imageRef}
              accept={".jpg,.jpeg"}
              onInput={(e) => {
                field.onChange(e.target.files[0]);
              }}
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
                    src={
                      field.value && field.value instanceof File
                        ? URL.createObjectURL(field.value)
                        : field.value
                    }
                    alt={"community image"}
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
                    <Edit2 color="white" size={24} />
                  </Box>
                </>
              ) : (
                <>
                  <UploadImageIcon color={error ? "#E53535" : "#828282"} />
                  <Text color={error ? "red.500" : "#828282"}>
                    Unggah Gambar Komunitas
                  </Text>
                </>
              )}
            </Flex>
            <Text
              color={error ? "red.500" : "#828282"}
              fontSize={"sm"}
              textAlign={"center"}
            >
              Max 5 Mb, Format JPG & JPEG
            </Text>
          </Flex>
          <FormErrorMessage textAlign={"center"}>
            {error?.message}
          </FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

export function CommunityNameField({ control, error }) {
  return (
    <FormControl isInvalid={error}>
      <Controller
        control={control}
        name="communityName"
        rules={rules.communityName}
        render={({ field }) => (
          <InputWithLogo
            label={"Masukkan Nama Event"}
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

export function CommunityDescField({ control, error }) {
  return (
    <FormControl isInvalid={error}>
      <Controller
        control={control}
        name="communityDescription"
        rules={rules.communityDescription}
        render={({ field }) => (
          <InputTextArea
            label={"Masukkan Deskripsi Komunitas"}
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

export function CommunityLocationField({ control, error }) {
  return (
    <FormControl isInvalid={error}>
      <Controller
        control={control}
        name="communityLocation"
        rules={rules.communityLocation}
        render={({ field }) => (
          <InputWithLogo
            label={"Masukkan Alamat atau Lokasi Event"}
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

export function CommunityLinkLocationEvent({ control, error }) {
  return (
    <FormControl isInvalid={error}>
      <Controller
        control={control}
        name="CommunityLinkLocationEvent"
        rules={rules.CommunityLinkLocationEvent}
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

export function CommunityLinkGoogleForm({ control, error }) {
  return (
    <FormControl isInvalid={error}>
      <Controller
        control={control}
        name="CommunityLinkGoogleForm"
        rules={rules.CommunityLinkGoogleForm}
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

export function CommunityMembersField({ control, error }) {
  return (
    <FormControl isInvalid={error}>
      <Controller
        control={control}
        name="CommunityMembersField"
        rules={rules.CommunityMembersField}
        render={({ field }) => (
          <InputWithLogo
            label={"Maksimal Total Anggota"}
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

export function CommunityDateField({ control, error }) {
  return (
    <Controller
      control={control}
      name="CommunityDateField"
      rules={rules.CommunityDateField}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <InputDate
            label={"Tanggal Pelaksanaan"}
            Logo={Calendar}
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

export function StatusEvent({ control, error }) {
  return (
    <FormControl isInvalid={error}>
      <Controller
        control={control}
        name="StatusEvent"
        rules={rules.StatusEvent}
        render={({ field }) => (
          <InputWithLogo
            label={"Status Event"}
            type={""}
            Logo={TickSquare}
            error={error}
            {...field}
          />
        )}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
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
              rightIcon={<ChevronDown />}
              leftIcon={<TickSquare />}
              onClick={handleMenuOpen}
              isActive={menuOpen}
              textAlign="left"
              fontWeight="normal"
              fontSize={"14px"}
            >
              {field.value || "Status Event"}
            </MenuButton>
            <MenuList fontSize={"14px"}>
              <MenuItem
                onClick={() => {
                  field.onChange("Berjalan");
                }}
              >
                Berjalan
              </MenuItem>
              <MenuItem
                onClick={() => {
                  field.onChange("Belum Berjalan");
                }}
              >
                Belum Berjalan
              </MenuItem>
              <MenuItem
                onClick={() => {
                  field.onChange("Berlangsung");
                }}
              >
                Berlangsung
              </MenuItem>
            </MenuList>
          </Menu>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
