import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import * as Fields from "./MissionFormFields";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { AddCircle } from "iconsax-react";
import { EditMissionStepSection } from "@/components/sections";
import { CloseSquare } from "react-iconly";

export function ModalEditMission({ isOpen, onClose, target, onSubmit }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  const imageRef = useRef();

  const handleImageRef = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleOnSubmit = (data) => {
    console.log(data);
    onSubmit(target, data);
    reset();
    onClose();
  };

  const missionSteps = watch("missionSteps");

  const removeStep = (no) => {
    const temp = missionSteps.filter((val, idx) => {
      return idx !== no - 1;
    });
    setValue("missionSteps", temp);
  };

  useEffect(() => {
    if (target) {
      setValue("missionImage", target.missionImage);
      setValue("missionTitle", target.title);
      setValue("missionPoint", target.point);
      setValue("missionDescription", target.description);
      setValue("missionStartDate", target.missionStartDate);
      setValue("missionEndDate", target.missionEndDate);
      setValue("missionSteps", target.steps);
    }
  }, [target, setValue]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"} isCentered>
      <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(5px)"} />
      <ModalContent borderRadius={"3xl"} gap={"1.5rem"} py={"1rem"}>
        <ModalHeader pb={"0"}>
          <Heading as="h2" fontSize={"2xl"} fontWeight={"bold"}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              Edit Data Mission
              <CloseSquare
                primaryColor="#828282"
                size={32}
                onClick={onClose}
                cursor={"pointer"}
              />
            </Flex>
          </Heading>
        </ModalHeader>

        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <ModalBody
            display={"grid"}
            gridTemplateColumns={"0.5fr 1.5fr"}
            gap={6}
            py={"1.5rem"}
            overflowY={"auto"}
            height={"400px"}
          >
            <Fields.MissionImageField
              control={control}
              error={errors.missionImage}
              imageRef={imageRef}
              handleImageRef={handleImageRef}
            />

            <Grid
              templateRows={"auto auto auto"}
              templateColumns={"1fr 1fr"}
              gap={6}
            >
              <GridItem>
                <Fields.MissionTitleField
                  control={control}
                  error={errors.missionTitle}
                />
              </GridItem>
              <GridItem>
                <Fields.MissionPointField
                  control={control}
                  error={errors.missionPoint}
                />
              </GridItem>
              <GridItem colSpan={"2"}>
                <Fields.MissionDescriptionField
                  control={control}
                  error={errors.missionDescription}
                />
              </GridItem>
              <GridItem>
                <Fields.MissionStartDateField
                  control={control}
                  error={errors.missionStartDate}
                />
              </GridItem>
              <GridItem>
                <Fields.MissionEndDateField
                  control={control}
                  error={errors.missionEndDate}
                />
              </GridItem>
              <GridItem colSpan={"2"}>
                <Flex flexDirection={"column"} gap={"16px"}>
                  <Text color={"#828282"}>Tahapan/Tantangan Misi</Text>
                  <Box
                    display={"flex"}
                    gap={2}
                    width="100%"
                    cursor={"pointer"}
                    _hover={{ opacity: "50%" }}
                    bg={"white"}
                    border={"1px"}
                    borderColor={"#35CC33"}
                    borderRadius={"lg"}
                    color={"#35CC33"}
                    fontWeight={"normal"}
                    lineHeight={"1.5rem"}
                    px={"1.5rem"}
                    py={"1rem"}
                    onClick={() => {
                      const temp = missionSteps.concat([
                        { title: "", description: "" },
                      ]);
                      setValue("missionSteps", temp);
                    }}
                  >
                    <AddCircle />
                    Tambah Tahapan / Tantangan
                  </Box>
                  {missionSteps?.map((step, index) => {
                    if (step?.title || step?.description) {
                      return (
                        <EditMissionStepSection
                          key={index + 1}
                          no={index + 1}
                          control={control}
                          errors={errors}
                          remove={removeStep}
                          data={step}
                        />
                      );
                    } else {
                      return (
                        <EditMissionStepSection
                          key={index + 1}
                          no={index + 1}
                          control={control}
                          errors={errors}
                          remove={removeStep}
                          onCreate={true}
                        />
                      );
                    }
                  })}
                </Flex>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter gap={4}>
            <Button
              color={"white"}
              bg={"#828282"}
              borderRadius={"lg"}
              px={"3rem"}
              py={"1.75rem"}
              _hover={{ bg: "#333333" }}
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Batal
            </Button>
            <Button
              color={"white"}
              bg={"#35CC33"}
              borderRadius={"lg"}
              px={"3rem"}
              py={"1.75rem"}
              _hover={{ bg: "#2DA22D" }}
              type="submit"
            >
              Perbarui
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
