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
import { User, Message, Lock, Camera, CloseSquare } from "react-iconly";
import { useRef } from "react";
import AdminImage from "@/assets/AdminImage.svg";

export function ModalEditAdmin({ isOpen, onClose, onSubmit, target }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const handleSubmitData = (data) => {
    onSubmit(data, target);
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
            <InputWithLogo
              label={"Kata Sandi"}
              Logo={Lock}
              className={"mt-4"}
            />

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
