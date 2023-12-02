import {
  Button,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { CloseSquare } from "react-iconly";
import * as Fields from "../event-community/CommunityFormFields";

export function ModalAddEventCommunity({ isOpen, onClose, onSubmit }) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleSubmitForm = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  const imageRef = useRef(null);

  const handleImageRef = () => {
    imageRef.current.click();
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"} isCentered>
      <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(5px)"} />

      <ModalContent
        bg={"#FFFFFF"}
        borderRadius={"10px"}
        p={"1.5rem"}
        gap={"1.5rem"}
      >
        <IconButton
          as={ModalCloseButton}
          icon={<CloseSquare size={"large"} />}
          size={"sm"}
          bg={"transparent"}
          color={"#828282"}
          position={"absolute"}
          right={"1.5rem"}
          top={"1.5rem"}
          _hover={{ bg: "transparent", color: "#333333" }}
          _focus={{ boxShadow: "none" }}
        />
        <ModalHeader p={0}>
          <Heading
            as="h3"
            fontSize={"2xl"}
            fontWeight={"medium"}
            letterSpacing={"tight"}
            color={"#000000"}
          >
            Tambah Event Komunitas
          </Heading>
        </ModalHeader>

        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <ModalBody
            display={"grid"}
            gridTemplateColumns={"0.5fr 1.5fr"}
            gap={6}
            p={0}
          >
            <Fields.CommunityImageField
              control={control}
              error={errors.communityImage}
              imageRef={imageRef}
              handleImageRef={handleImageRef}
            />

            <Grid
              templateRows={"auto auto auto"}
              templateColumns={"1fr 1fr"}
              gap={6}
            >
              <GridItem colSpan={"3"}>
                <Fields.CommunityNameField
                  control={control}
                  error={errors.communityName}
                />
              </GridItem>
              <GridItem colSpan={"3"}>
                <Fields.CommunityDescField
                  control={control}
                  error={errors.communityDescription}
                />
              </GridItem>
              <GridItem colSpan={3}>
                <Fields.CommunityLocationField
                  control={control}
                  error={errors.communityLocation}
                />
              </GridItem>
              <GridItem colSpan={3}>
                <Fields.CommunityLinkLocationEvent
                  control={control}
                  error={errors.CommunityLinkLocationEvent}
                />
              </GridItem>
              <GridItem colSpan={3}>
                <Fields.CommunityLinkGoogleForm
                  control={control}
                  error={errors.CommunityLinkGoogleForm}
                />
              </GridItem>

              <GridItem colSpan={1}>
                <Fields.KuotaMaks control={control} error={errors.KuotaMaks} />
              </GridItem>

              <GridItem colSpan={1}>
                <Fields.CommunityDateField
                  control={control}
                  error={errors.CommunityDateField}
                />
              </GridItem>

              <GridItem colSpan={1}>
                <Fields.SelectUnit
                  control={control}
                  error={errors.SelectUnit}
                />
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter
            display={"flex"}
            gap={"1rem"}
            justifyContent={"flex-end"}
            p={0}
            marginTop={"1.5rem"}
          >
            <Button
              color={"white"}
              bg={"#828282"}
              borderRadius={"lg"}
              px={"3.25rem"}
              py={"1.75rem"}
              _hover={{ bg: "#333333" }}
              onClick={onClose}
            >
              Batal
            </Button>
            <Button
              type={"submit"}
              color={"white"}
              bg={"#35CC33"}
              borderRadius={"lg"}
              px={"3rem"}
              py={"1.75rem"}
              _hover={{ bg: "#2DA22D" }}
            >
              Tambah
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}