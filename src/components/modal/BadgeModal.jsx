import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  ModalCloseButton,
  Text,
  IconButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { CloseSquare } from "react-iconly";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "./../inputs/Input";

export function BadgeModal({ isOpen, onClose, badge, poin }) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [editedBadge, setEditedBadge] = useState(badge);
  const [editedPoin, setEditedPoin] = useState(poin);

  const handleOnSubmit = (data) => {
    console.log(data);
    onClose();
  };

  useEffect(() => {
    setEditedPoin(poin);
    setEditedBadge(badge);
  }, [poin, badge]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"} isCentered>
      <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(5px)"} />
      <ModalContent borderRadius="12px">
        <ModalHeader>
          <Flex flexDirection={"column"}>
            <Text fontWeight="bold" fontSize={"3xl"}>
              Edit Lencana
            </Text>
          </Flex>
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
            onClick={onClose}
          />
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <ModalBody>
              <Flex direction={"column"} gap={3}>
                <Input
                  value={editedBadge}
                  label={"Nama Lencana"}
                  placeholder={"Platinum"}
                  control={control}
                  error={errors.badge}
                />
                <Input
                  value={editedPoin}
                  label={"Target Poin"}
                  placeholder={"250.000"}
                  control={control}
                  error={errors.poin}
                />
              </Flex>
              <Text
                fontWeight="regular"
                fontSize={"md"}
                my={"2"}
                color={"#828282"}
              >
                Poin untuk mencapai lencana
              </Text>
            </ModalBody>
          </form>
        </ModalBody>
        <ModalFooter px={25} py={5}>
          <Flex gap={5}>
            <Button
              color={"white"}
              bg={"#828282"}
              borderRadius={"lg"}
              px={"2rem"}
              py={"1.5rem"}
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
              px={"2rem"}
              py={"1.5rem"}
              _hover={{ bg: "#2DA22D" }}
              type="submit"
              onSubmit={onClose}
            >
              Simpan
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
