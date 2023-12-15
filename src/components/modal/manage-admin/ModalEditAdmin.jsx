import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { CloseSquare } from "react-iconly";
import { fetchAdminSelector, updateAdminSelector } from "@/store/admin";
import { schema } from "./AdminFormSchema";
import { Spinner } from "@/components/spinner";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Fields from "./AdminFormFields";

export function ModalEditAdmin({ isOpen, onClose, onSubmit }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const { data, status } = useSelector(fetchAdminSelector);
  const { status: updateStatus } = useSelector(updateAdminSelector);

  const imageRef = useRef();

  const handleImageRef = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  useEffect(() => {
    if (data) {
      setValue("image", data.image);
      setValue("fullname", data.fullname);
      setValue("email", data.email);
      setValue("status", data.status);
    }
  }, [data, setValue]);

  const handleOnSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <>
      <Modal
        size={"sm"}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={updateStatus !== "loading"}
      >
        <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(5px)"} />
        <ModalContent padding={"10px"} borderRadius={"20px"}>
          {status === "loading" ? (
            <Spinner containerSize={"lg"} />
          ) : (
            <>
              <ModalHeader fontSize={20}>Edit Data Admin</ModalHeader>
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

              <form onSubmit={handleSubmit(handleOnSubmit)}>
                <ModalBody as={Flex} direction={"column"} gap={"1rem"}>
                  <Fields.AdminImageFields
                    control={control}
                    error={errors.image}
                    imageRef={imageRef}
                    handleImageRef={handleImageRef}
                  />
                  <Fields.AdminNameFields
                    control={control}
                    error={errors.fullname}
                  />
                  <Fields.AdminEmailFields
                    control={control}
                    error={errors.email}
                  />
                  <Fields.AdminPasswordFields
                    name={"password"}
                    control={control}
                    error={errors.password}
                  />
                  <Fields.AdminPasswordFields
                    name={"confirm_password"}
                    label={"Konfirmasi Kata Sandi"}
                    control={control}
                    error={errors.confirm_password}
                  />
                  <Fields.SelectedStatus
                    control={control}
                    error={errors.status}
                  />
                </ModalBody>

                <ModalFooter justifyContent={"center"} gap={"12px"}>
                  <Button
                    onClick={onClose}
                    color={"white"}
                    bg={"#828282"}
                    borderRadius={"lg"}
                    px={"4.5rem"}
                    py={"1.75rem"}
                    _hover={{ bg: "#333333" }}
                    isDisabled={updateStatus === "loading"}
                  >
                    Batal
                  </Button>
                  <Button
                    color={"white"}
                    bg={"#35CC33"}
                    borderRadius={"lg"}
                    px={"4rem"}
                    py={"1.75rem"}
                    _hover={{ bg: "#2DA22D" }}
                    type="submit"
                    isDisabled={updateStatus === "loading"}
                  >
                    Simpan
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
