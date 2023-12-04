import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell } from "../base-table/TableCells";
import { TableBodyRow } from "../base-table/TableRows";
import { CustomIconButton } from "@/components/buttons";
import { Edit2, Trash } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ModalDelete, ModalEditRubbishCategory } from "@/components/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTrashes,
  deleteTrashesSelector,
  fetchTrashes,
  updateTrashes,
  updateTrashesSelector,
} from "@/store/trash-category";

const TableHead = ["No", "Nama Jenis Sampah", "Reward Point", "Satuan", "Aksi"];

export function TableRubbishCategory({ data, currentPage, itemsPerPage }) {
  const [id, setId] = useState(null);
  const dispatch = useDispatch();

  const { status: updateStatus } = useSelector(updateTrashesSelector);
  const { status: deleteStatus } = useSelector(deleteTrashesSelector);

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const handleEditModal = (target) => {
    setId(target);
    dispatch(fetchTrashes(target));
    onOpenEdit();
  };

  const handleSubmitEdited = (data) => {
    dispatch(updateTrashes({ id, data }));
  };

  const handleDeleteModal = (target) => {
    setId(target);
    onOpenDelete();
  };

  const handleDelete = (target) => {
    dispatch(deleteTrashes(target));
  };

  useEffect(() => {
    if (updateStatus === "success" || updateStatus === "failed") {
      onCloseEdit();
    }
  }, [updateStatus, onCloseEdit]);

  useEffect(() => {
    if (deleteStatus === "success" || deleteStatus === "failed") {
      onCloseDelete();
    }
  }, [deleteStatus, onCloseDelete]);

  return (
    <>
      <ModalEditRubbishCategory
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        onSubmit={handleSubmitEdited}
      />
      <ModalDelete
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        target={id}
        onDelete={handleDelete}
        deleteStatus={deleteStatus}
      />
      <BaseTable data={data} heads={TableHead}>
        {data.map((row, rowIndex) => (
          <TableBodyRow key={rowIndex} index={rowIndex}>
            <CenteredCell>
              {(currentPage - 1) * itemsPerPage + rowIndex + 1}
            </CenteredCell>
            <TextCell textTransform="capitalize" content={row.trash_type} />
            <TextCell content={row.point} />
            <TextCell textTransform="capitalize"  content={row.unit} />
            <CenteredCell>
              <CustomIconButton
                icon={<Edit2 />}
                color={"#333333"}
                hoverColor={"#000000"}
                onClick={() => handleEditModal(row.id)}
              />
              <CustomIconButton
                icon={<Trash />}
                color={"#E53535"}
                hoverColor={"#B22222"}
                onClick={() => handleDeleteModal(row.id)}
              />
            </CenteredCell>
          </TableBodyRow>
        ))}
      </BaseTable>
    </>
  );
}
