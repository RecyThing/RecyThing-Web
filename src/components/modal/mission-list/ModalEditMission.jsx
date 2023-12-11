/* eslint-disable react-hooks/exhaustive-deps */
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
import { CloseSquare } from "react-iconly";
import { fetchMissionSelector, updateMissionSelector } from "@/store/mission";
import { useSelector } from "react-redux";
import { Spinner } from "@/components/spinner";

export function ModalEditMission({ isOpen, onClose, onSubmit }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const { data, status, message } = useSelector(fetchMissionSelector);
  const { status: updateStatus } = useSelector(updateMissionSelector);
  const imageRef = useRef();

  const handleImageRef = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleOnSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  useEffect(() => {
    if (data) {
      setValue("missionImage", data.mission_image);
      setValue("missionTitle", data.name);
      setValue("missionPoint", data.point);
      setValue("missionDescription", data.description);
      setValue("missionStartDate", data.start_date);
      setValue("missionEndDate", data.end_date);
      setValue("missionTitleStage", data.title_stage);
      setValue("missionDescriptionStage", data.description_stage);
    }
  }, [data, setValue]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"} isCentered>
      <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(5px)"} />
      <ModalContent borderRadius={"3xl"} gap={"1.5rem"} py={"1rem"}>
        {(status === "loading" || updateStatus === "loading") && (
          <Spinner containerSize={"xl"} />
        )}
        {status === "failed" && <div>{message}</div>}
        {status === "success" && updateStatus === "idle" && (
          <>
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
                        border={"1px solid #828282"}
                        borderRadius={"lg"}
                        p={3}
                      >
                        <Flex flexDirection={"column"} gap={"16px"}>
                          <Fields.MissionTitleStageField
                            control={control}
                            error={errors.missionTitleStage}
                          />
                          <Fields.MissionDescriptionStageField
                            control={control}
                            error={errors.missionDescriptionStage}
                          />
                        </Flex>
                      </Box>
                    </Flex>
                  </GridItem>
                  {/* <GridItem colSpan={"2"}>
                    <Flex flexDirection={"column"} gap={"16px"}>
                      <Text color={"#828282"}>Tahapan/Tantangan Misi</Text>
                      {missionSteps?.map((step, index) => {
                        return (
                          <InputMissionStepSection
                            key={index + 1}
                            no={index + 1}
                            control={control}
                            errors={errors}
                            remove={removeStep}
                            data={step}
                          />
                        );
                      })}
                      <Box
                        display={"flex"}
                        gap={2}
                        width="100%"
                        cursor={"pointer"}
                        _hover={{
                          opacity:
                            missionSteps?.length < 3 || !missionSteps
                              ? "50%"
                              : "100%",
                        }}
                        bg={"white"}
                        border={"1px"}
                        borderColor={
                          missionSteps?.length < 3 || !missionSteps
                            ? "#35CC33"
                            : "#A7A19E"
                        }
                        borderRadius={"lg"}
                        color={
                          missionSteps?.length < 3 || !missionSteps
                            ? "#35CC33"
                            : "#A7A19E"
                        }
                        fontWeight={"normal"}
                        lineHeight={"1.5rem"}
                        px={"1.5rem"}
                        py={"1rem"}
                        onClick={() => {
                          let temp = [{ title: "", description: "" }];
                          if (Array.isArray(missionSteps)) {
                            temp = missionSteps.concat([
                              { title: "", description: "" },
                            ]);
                          }
                          if (missionSteps?.length || !missionSteps < 3) {
                            setValue("missionSteps", temp);
                          }
                        }}
                      >
                        <AddCircle />
                        Tambah Tahapan / Tantangan
                      </Box>
                    </Flex>
                  </GridItem> */}
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
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
