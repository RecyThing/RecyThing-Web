import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell, BadgeCell } from "../base-table/TableCells";
import { TableBodyRow } from "../base-table/TableRows";
import { CustomIconButton } from "@/components/buttons";
import { Edit2, Trash } from "iconsax-react";
import { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { ModalDelete, ModalEditAdmin } from "@/components/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdmin,
  deleteAdminSelector,
  fetchAdmin,
  updateAdmin,
} from "@/store/admin";

const TableHead = ["No", "Nama Lengkap", "Email", "Status", "Aksi"];

export function TableAdminList({ data, currentPage, itemsPerPage }) {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [id, setId] = useState(null);
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [idAdmin, setIdAdmin] = useState(null);
  const dispatch = useDispatch();
  const { status: deleteStatusAdmin } = useSelector(deleteAdminSelector);

  const handleEditModal = (target) => {
    setId(target);
    dispatch(fetchAdmin(target));
    onOpenEdit();
  };

  const handleDeleteModal = (id) => {
    setIdAdmin(id);
    onOpenDelete();
  };

  const handleDelete = (id) => {
    dispatch(deleteAdmin(id));
  };

  useEffect(() => {
    if (deleteStatusAdmin === "success" || deleteStatusAdmin === "failed") {
      onCloseDelete();
    }
  }, [dispatch, deleteStatusAdmin]);

  const handleSubmitEdited = (data) => {
    data.fullname = data.fullname[0];
    data.email = data.email[0];
    data.status = data.status[0];

    dispatch(updateAdmin({ id, data }));
  };

  const handleBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "green";
      case "non active":
        return "red";
      default:
        return "grey";
    }
  };

  return (
    <>
      <ModalEditAdmin
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        onSubmit={handleSubmitEdited}
        target={idAdmin}
      />
      <ModalDelete
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        target={idAdmin}
        onDelete={handleDelete}
        deleteStatus={deleteStatusAdmin}
      />
      <BaseTable data={data} heads={TableHead}>
        {data.map((row, rowIndex) => (
          <TableBodyRow key={rowIndex} index={rowIndex}>
            <CenteredCell>
              {(currentPage - 1) * itemsPerPage + rowIndex + 1}
            </CenteredCell>
            <TextCell content={row.fullname} />
            <TextCell content={row.email} />
            <BadgeCell
              content={row.status}
              colorScheme={handleBadgeColor(row.status)}
            />
            <CenteredCell>
              <CustomIconButton
                icon={<Edit2 />}
                color={"#201A18"}
                hoverColor={"#333333"}
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
