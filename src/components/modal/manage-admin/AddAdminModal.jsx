// import { InputWithLogo } from "@/components/inputs";
import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useRef } from "react";

export function AddAdminModal({ isOpen, onClose, onSubmit }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const handleSubmitData = (data) => {
    onSubmit(data);
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
        <ModalContent width={"80"}>
          <ModalHeader>Tambah Data Admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <FormControl>
              <Input placeholder="Nama Lengkap" />
            </FormControl>

            <FormControl mt={4}>
              <Input placeholder="Tambahkan Email" />
            </FormControl>

            <FormControl mt={4}>
              <Input placeholder="Masukkan Kata Sandi" />
            </FormControl>

            <FormControl mt={4}>
              <Input placeholder="Konfirmasi Kata Sandi" />
            </FormControl>

            <FormControl mt={4}>
              <Select placeholder="Status">
                <option>Aktif</option>
                <option>Tidak Aktif</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter gap={"2"}>
            <Button
              onClick={onClose}
              color={"white"}
              bg={"#828282"}
              borderRadius={"lg"}
              px={"3.5rem"}
              py={"1.75rem"}
              _hover={{ bg: "#333333" }}
            >
              Cancel
            </Button>
            <Button
              color={"white"}
              bg={"#35CC33"}
              borderRadius={"lg"}
              px={"3.5rem"}
              py={"1.75rem"}
              _hover={{ bg: "#2DA22D" }}
              type="submit"
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
