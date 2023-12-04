import { InputWithLogo } from "@/components/inputs";
import {
  Button,
  FormControl,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { User, Message, Lock, Camera, CloseSquare, Show, Hide } from "react-iconly";
import { useRef, useState } from "react";
import AdminImage from "@/assets/AdminImage.svg";
import { Controller, useForm } from "react-hook-form";

export function ModalEditAdmin({ isOpen, onClose, onSubmit, target }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const handleSubmitData = (data) => {
    onSubmit(data, target);
  };

    const [passwordType, setPasswordType] = useState("password");
    // react hooks form
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const handleShowPassword = (e) => {
      e.preventDefault();
      if (passwordType === "password") {
        setPasswordType("text");
      } else {
        setPasswordType("password");
      }
    };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(5px)"} />
        <ModalContent padding={"10px"} borderRadius={"20px"}>
          <ModalHeader fontSize={25}>Edit Data Admin</ModalHeader>
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
            <InputWithLogo
              label={"Nama Lengkap"}
              Logo={User}
              className={"mt-10"}
            />
            <InputWithLogo label={"Email"} Logo={Message} className={"mt-4"} />
            <div className="relative wrapper my-4">
              <Controller
                name={"password"}
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 2,
                    message: "Password must be at least 2 characters long",
                  },
                }}
                render={() => (
                  <InputWithLogo
                    label={"Masukkan kata sandi"}
                    id={"password"}
                    Logo={Lock}
                    type={passwordType}
                    error={errors.password}
                  />
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

            <FormControl mt={4}>
              <div
                className="w-90 border rounded-xl p-3 mt-4 pb-3 relative"
                style={{ borderColor: "rgba(130, 130, 130, 1)" }}
              >
                <select
                  className="w-11/12 h-8 outline-none text-sm border-none bg-transparent"
                  style={{ color: "rgba(79, 79, 79, 1)" }}
                >
                  <option value="Aktif" selected>
                    Aktif
                  </option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
                <label
                  htmlFor=""
                  className="text-xs absolute -top-2 left-3 bg-white px-1"
                  style={{ color: "rgba(130, 130, 130, 1)" }}
                >
                  Status
                </label>
              </div>
            </FormControl>
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
              onClick={handleSubmitData}
              color={"white"}
              bg={"#35CC33"}
              borderRadius={"lg"}
              px={"4rem"}
              py={"1.75rem"}
              _hover={{ bg: "#2DA22D" }}
              type="submit"
            >
              Tambah
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
