/* eslint-disable react/prop-types */
import { color } from "framer-motion";
// import { EditAdminModal } from "../modal";
import { BaseTable } from "./base-table/BaseTable";
import { CenteredCell, TextCell, BadgeCell } from "./base-table/TableCells";
import { TableBodyRow } from "./base-table/TableRows";
import { CustomIconButton } from "@/components/buttons";
// import { AdminFormModal } from "@/components/modal";
import { Edit2, Trash } from "iconsax-react";
// import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const TableHead = ["No", "Nama Lengkap", "Email", "Status", "Aksi"];

export function AdminTable({ data, currentPage, itemsPerPage, OnOpen }) {
  // const {
  //   isOpen: isOpenView,
  //   onOpen: onOpenView,
  //   onClose: onCloseView,
  // } = useDisclosure();
  // const {
  //   isOpen: isOpenDelete,
  //   onOpen: onOpenDelete,
  //   onClose: onCloseDelete,
  // } = useDisclosure();
  // const [selectedRow, setSelectedRow] = useState(null);

  // const handleViewModal = (row) => {
  //   setSelectedRow(row);
  //   onOpenView();
  // };

  // const handleDeleteModal = (row) => {
  //   setSelectedRow(row);
  //   onOpenDelete();
  // };

  // const handleDelete = (row) => {
  //   console.log("deleted!", row);
  //   onCloseDelete();
  // };

  const handleBadgeColor = (status) => {
    switch (status) {
      case "aktif":
        return "green";
      case "tidak aktif":
        return "red";
      default:
        return "grey";
    }
  };

  // const handleEditModal = () => {
  //   OnOpen();
  // }

  return (
    <>
      {/* <UserDetailModal
        isOpen={isOpenView}
        onClose={onCloseView}
        data={selectedRow}
      />
      <DeleteModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        target={selectedRow}
        onDelete={handleDelete}
      /> */}
      <BaseTable data={data} heads={TableHead}>
        {console.log(data)}
        {data.map((row, rowIndex) => (
          <TableBodyRow key={rowIndex} index={rowIndex}>
            {console.log(row)}
            <CenteredCell>
              {(currentPage - 1) * itemsPerPage + rowIndex + 1}
            </CenteredCell>
            <TextCell content={row.name} />
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
                onClick={(onOpen) => handleViewModal(row)}
              />
              <CustomIconButton
                icon={<Trash />}
                color={"#E53535"}
                hoverColor={"#B22222"}
                onClick={() => handleDeleteModal(row)}
              />
            </CenteredCell>
          </TableBodyRow>
        ))}
      </BaseTable>
    </>
  );
}
