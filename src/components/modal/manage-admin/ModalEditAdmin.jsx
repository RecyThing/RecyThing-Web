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
import { Lock, Camera, CloseSquare, Show, Hide } from "react-iconly";
import { useEffect, useState } from "react";
import * as Fields from "./AdminFormFields";
import AdminImage from "@/assets/AdminImage.svg";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./AdminFormSchema";
import { useSelector } from "react-redux";
import { fetchAdminSelector, updateAdminSelector } from "@/store/admin";
import { Spinner } from "@/components/spinner";

export function ModalEditAdmin({ isOpen, onClose, onSubmit }) {
  const [passwordType, setPasswordType] = useState("password");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const { data, status, message } = useSelector(fetchAdminSelector);
  const { status: updateStatus } = useSelector(updateAdminSelector);

  const handleShowPassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const handleOnSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  useEffect(() => {
    if (data) {
      setValue("fullname", data.fullname);
      setValue("email", data.email);
      setValue("status", data.status);
    }
  }, [data, setValue]);

  return (
    <>
      <Modal size={"sm"} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(5px)"} />
        <ModalContent padding={"10px"} borderRadius={"20px"}>
          {(status === "loading" || updateStatus === "loading") && (
            <Spinner containerSize={"xl"} />
          )}
          {status === "failed" && <div>{message}</div>}
          {status === "success" && updateStatus === "idle" && (
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
                <ModalBody pb={8}>
                  <div className="wrapper relative w-2/3 mx-auto">
                    <img
                      src={AdminImage}
                      className="relative mx-auto rounded-full"
                      width={150}
                      height={150}
                      alt=""
                    />
                    <button
                      className="rounded-full bg-green-500 p-3 text-white absolute right-7 bottom-1 z-10"
                      type="button"
                    >
                      <Camera />
                    </button>
                  </div>
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
                        <FormControl isInvalid={errors.confirm_password}>
                          <InputWithLogo
                            label={"Masukkan kata sandi"}
                            id={"password"}
                            Logo={Lock}
                            type={passwordType}
                            error={errors.password}
                            {...field}
                          />
                          <FormErrorMessage>
                            {errors?.password?.message}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    />

                    {/* Button Hide and Seek */}
                    <button
                      className="absolute z-10 inset-y-0 right-5 flex items-center pl-3.5"
                      onClick={handleShowPassword}
                    >
                      {passwordType === "password" ? <Show /> : <Hide />}
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
                    px={"4.5rem"}
                    py={"1.75rem"}
                    _hover={{ bg: "#333333" }}
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
