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
import { useEffect } from "react";
import * as Fields from "./BadgeFormFields";
import { patchAchievements } from "@/store/achievements";
import { useDispatch } from "react-redux";
import { toggleShouldFetchLatestAchievements } from "@/store/achievements/getAchievementsSlice";

export function ModalEditBadge({ isOpen, onClose, onSubmit, target }) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const dispatch = useDispatch();

  const handleOnSubmit = (row) => {
    onSubmit({ target_point: parseInt(row.target_point)});
    dispatch(toggleShouldFetchLatestAchievements());
    reset();
    onClose();
  };


  useEffect(() => {
    if (target) {
      setValue("name", target.name);
      setValue("target_point", target.target_point);
      dispatch(patchAchievements());
    }
  }, [target, setValue, dispatch]);

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
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <ModalBody>
            <Flex direction={"column"} gap={3}>
              <Fields.BadgeNameFields control={control} error={errors.name} />

              <Fields.BadgeTargetField
                control={control}
                error={errors.target_point}
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
              >
                Simpan
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
