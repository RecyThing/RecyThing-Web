import { DownloadIcon } from "@/components/icons";
import { Edit2 } from "iconsax-react";
import { Calendar, Discount } from "react-iconly";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import {
  InputDate,
  InputTextArea,
  InputWithLogo,
  InputWithoutLogo,
} from "@/components/inputs";
import frame from "@/assets/input-image-frame.png";

const rules = {
  missionTitle: {
    required: "Judul misi tidak boleh kosong",
  },
  missionPoint: {
    required: "Poin reward tidak boleh kosong",
  },
  missionImage: {
    required: "Gambar misi tidak boleh kosong",
  },
  missionDescription: {
    required: "Deskripsi misi tidak boleh kosong",
  },
  missionStartDate: {
    required: "Tanggal mulai misi tidak boleh kosong",
  },
  missionEndDate: {
    required: "Tanggal berakhir misi tidak boleh kosong",
  },
  missionTitleStep: {
    required: "Tahapan / Tantangan Judul misi tidak boleh kosong",
  },
  missionDescriptionStep: {
    required: "Tahapan / Tantangan Deskripsi misi tidak boleh kosong",
  },
};

export function MissionImageField({
  control,
  error,
  imageRef,
  handleImageRef,
}) {
  return (
    <Controller
      name="missionImage"
      control={control}
      rules={rules.missionImage}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <Flex direction={"column"} gap={2}>
            <Input
              name="missionImage"
              type="file"
              display={"none"}
              ref={imageRef}
              accept={".jpg,.jpeg,.png"}
              onInput={(e) => {
                field.onChange(e.target.files[0]);
              }}
            />
            <Text color={"#828282"}>Gambar Misi</Text>
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
                    alt={"mission image"}
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
                  <DownloadIcon />
                  <Text color={"#828282"}>Unggah Gambar Misi</Text>
                </>
              )}
              <Image src={frame} position={"absolute"} bottom={0}/>
            </Flex>
            
          </Flex>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

export function MissionTitleField({ control, error }) {
  return (
    <Controller
      name="missionTitle"
      control={control}
      rules={rules.missionTitle}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <InputWithLogo
            label={"Judul"}
            Logo={Discount}
            autoComplete={"off"}
            {...field}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

export function MissionPointField({ control, error }) {
  return (
    <Controller
      name="missionPoint"
      control={control}
      rules={rules.missionPoint}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <InputWithLogo
            label={"Points"}
            Logo={Discount}
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

export function MissionDescriptionField({ control, error }) {
  return (
    <Controller
      name="missionDescription"
      control={control}
      rules={rules.missionDescription}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <InputTextArea label={"Deskripsi Singkat"} rows={10} {...field} />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

export function MissionStartDateField({ control, error }) {
  return (
    <Controller
      name="missionStartDate"
      control={control}
      rules={rules.missionStartDate}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <InputDate
						label={"Tanggal Dimulai"}
						Logo={Calendar}
						autoComplete={"off"}
						{...field}
					/>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

export function MissionEndDateField({ control, error }) {
  return (
    <Controller
      name="missionEndDate"
      control={control}
      rules={rules.missionEndDate}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <InputDate
						label={"Tanggal Berakhir"}
						Logo={Calendar}
						autoComplete={"off"}
						{...field}
					/>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

export function MissionTitleStepField({ control, error, no, disabled }) {
  return (
    <Controller
      name={`missionSteps.${no-1}.title`}
      control={control}
      rules={rules.missionTitleStep}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <InputWithoutLogo
            label={"Judul"}
            autoComplete={"off"}
            {...field}
            disabled={disabled}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

export function MissionDescriptionStepField({ control, error, no, disabled }) {
  return (
    <Controller
      name={`missionSteps.${no-1}.description`}
      control={control}
      rules={rules.missionDescriptionStep}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <InputWithoutLogo
            label={"Deskripsi"}
            autoComplete={"off"}
            {...field}
            disabled={disabled}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
