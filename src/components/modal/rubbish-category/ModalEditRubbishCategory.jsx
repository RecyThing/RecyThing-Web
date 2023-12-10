import { useEffect } from "react";
import {
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { CloseSquare } from "react-iconly";
import { useForm } from "react-hook-form";
import * as Fields from "./RubbishCategoryFormFields";
import { useSelector } from "react-redux";
import {
  fetchTrashSelector,
  updateTrashesSelector,
} from "@/store/trash-category";
import { Spinner } from "@/components/spinner";

export function ModalEditRubbishCategory({
  isOpen,
  onClose,
  onSubmit,
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const { data, status, message } = useSelector(fetchTrashSelector);
  const { status: updateStatus } = useSelector(updateTrashesSelector);

  const handleOnSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  useEffect(() => {
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    if (data && data.trash_type && data.unit) {
      setValue("trash_type", capitalizeFirstLetter(data.trash_type));
      setValue("point", data.point);
      setValue("unit", capitalizeFirstLetter(data.unit));
    }
  }, [data, setValue]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered>
      <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(10px)"} />
      <ModalContent padding={"24px"} borderRadius={"xl"}>
        {(status === "loading" || updateStatus === "loading") && (
          <Spinner containerSize={"270px"} />
        )}
        {status === "failed" && <div>{message}</div>}
        {status === "success" && updateStatus === "idle" && (
          <>
            <ModalHeader p={"0"}>
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Text
                  fontWeight={"bold"}
                  fontSize={"2xl"}
                  casing={"capitalize"}
                >
                  Edit Kategori Sampah
                </Text>
                <div className="cursor-pointer" onClick={onClose}>
                  <CloseSquare primaryColor="#828282" size={32} />
                </div>
              </Flex>
            </ModalHeader>
            <form className="mt-6" onSubmit={handleSubmit(handleOnSubmit)}>
              <Fields.TrashTypeField
                control={control}
                error={errors.trash_type}
              />
              <div className="flex justify-between mt-6 gap-4">
                <div className="w-3/5">
                  <Fields.RewardPointField
                    control={control}
                    error={errors.point}
                  />
                </div>
                <div className="w-2/5">
                  <Fields.SelectUnitField
                    control={control}
                    error={errors.unit}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4 text-white">
                <Button
                  color={"white"}
                  bg={"#828282"}
                  borderRadius={"lg"}
                  px={"3.5rem"}
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
                  Simpan
                </Button>
              </div>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
