import { Button, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { CloseSquare } from "react-iconly";
import * as Fields from "./RubbishCategoryFormFields";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./RubbishCategoryFormSchema";
import { useSelector } from "react-redux";
import { createTrashesSelector } from "@/store/trash-category";
import { Spinner } from "@/components/spinner";

export function ModalAddRubbishCategory({ isOpen, onClose, onSubmit }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { status: createStatus } = useSelector(createTrashesSelector);

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
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered>
      <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(10px)"} />
      <ModalContent padding={"24px"} borderRadius={"xl"}>
        {createStatus === "loading" ? (
          <Spinner containerSize={"270px"} />
        ) : (
          <>
            <div className="flex justify-between">
              <p className="font-bold text-2xl">Tambah Kategori Sampah</p>
              <div className="cursor-pointer" onClick={onClose}>
                <CloseSquare primaryColor="#828282" size={32} />
              </div>
            </div>

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
                  Tambah
                </Button>
              </div>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
