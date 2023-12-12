import { InputWithLogo } from "@/components/inputs";
import {
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Lock, CloseSquare, Show, Hide } from "react-iconly";
import * as Fields from "./AdminFormFields";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./AdminFormSchema";
import { Spinner } from "@/components/spinner";
import { createAdminSelector } from "@/store/admin";
import { useSelector } from "react-redux";

export function ModalAddAdmin({ isOpen, onClose, onSubmit }) {
  const [passwordType, setPasswordType] = useState("password");
  const [repasswordType, setRepasswordType] = useState("password");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleShowPassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }; 

  const imageRef = useRef();

  const handleImageRef = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const { status } = useSelector(createAdminSelector);

  const handleShowRepassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setRepasswordType("text");
    } else {
      setRepasswordType("password");
    }
  };

  const handleOnSubmit = (data) => {
    onSubmit(data);
    console.log(data);
    reset();
  };

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  return (
    <>
      <Modal size={"sm"} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(5px)"} />
        <ModalContent
          padding={2}
          borderRadius={"20px"}
          justifyContent={"center"}
        >
          {status === "idle" && (
            <>
              <ModalHeader fontSize={20}>Tambah Data Admin</ModalHeader>
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
                <ModalBody gap={"1.5rem"} p={4}>
                  <Fields.AdminImageFields control={control} error={errors.image} imageRef={imageRef} handleImageRef={handleImageRef} />

                  <Fields.AdminNameFields
                    control={control}
                    error={errors.fullname}
                  />
                  <Fields.AdminEmailFields
                    control={control}
                    error={errors.email}
                  />
                  <div className="relative wrapper my-4">
                    <Controller
                      name={"password"}
                      control={control}
                      render={({ field }) => (
                        <>
                          <FormControl isInvalid={errors.password}>
                            <InputWithLogo
                              label={"Masukkan kata sandi"}
                              Logo={Lock}
                              type={passwordType}
                              error={errors.password}
                              {...field}
                              autoComplete={"off"}
                            />
                            <FormErrorMessage>
                              {errors?.password?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </>
                      )}
                    />

                    <button
                      className="absolute z-10 inset-y-0 right-5 flex items-center pl-3.5"
                      onClick={handleShowPassword}
                    >
                      {passwordType === "password" ? <Show /> : <Hide />}
                    </button>
                  </div>

                  <div className="relative wrapper my-4">
                    <Controller
                      name={"confirm_password"}
                      control={control}
                      render={({ field }) => (
                        <>
                          <FormControl isInvalid={errors.confirm_password}>
                            <InputWithLogo
                              label={"Konfirmasi kata sandi"}
                              Logo={Lock}
                              type={repasswordType}
                              error={errors.confirm_password}
                              autoComplete={"off"}
                              {...field}
                            />
                            <FormErrorMessage>
                              {errors?.confirm_password?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </>
                      )}
                    />

                    <button
                      className="absolute z-10 inset-y-0 right-5 flex items-center pl-3.5"
                      onClick={handleShowRepassword}
                    >
                      {repasswordType === "password" ? <Show /> : <Hide />}
                    </button>
                  </div>

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
                    px={"5.5rem"}
                    py={"1.75rem"}
                    _hover={{ bg: "#333333" }}
                  >
                    Batal
                  </Button>
                  <Button
                    color={"white"}
                    bg={"#35CC33"}
                    borderRadius={"lg"}
                    px={"5rem"}
                    py={"1.75rem"}
                    _hover={{ bg: "#2DA22D" }}
                    type="submit"
                  >
                    Tambah
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
          {status === "loading" && <Spinner containerSize={"sm"} />}
        </ModalContent>
      </Modal>
    </>
  );
}
