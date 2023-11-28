import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell, BadgeCell } from "../base-table/TableCells";
import { TableBodyRow } from "../base-table/TableRows";
import { CustomIconButton } from "@/components/buttons";
import { Edit2, Eye, Trash } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

import { ModalDelete, ModalViewDetailTransaction } from "@/components/modal";
import { ModalViewDetailEvent } from "@/components/modal/event-community/ModalViewDetailEvent";

const TableHead = [
  "No",
  "Nama Event",
  "Tanggal Pelaksanaan",
  "Kuota Event",
  "Status Event",
  "Aksi",
];

export function TableManageEventCommunity({ data, currentPage, itemsPerPage }) {
  const {
    isOpen: isOpenView,
    onOpen: onOpenView,
    onClose: onCloseView,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [selectedRow, setSelectedRow] = useState(null);

  const handleBadges = (status) => {
    switch (status) {
      case "Belum Berjalan":
        return "blue";
      case "Berjalan":
        return "yellow";
      case "Selesai":
        return "green";
      default:
        return "gray";
    }
  };

  const handleViewModal = (row) => {
    setSelectedRow(row);
    onOpenView();
  };

  const handleDeleteModal = (row) => {
    setSelectedRow(row);
    onOpenDelete();
  };

  const handleDelete = (row) => {
    console.log("deleted!", row);
    onCloseDelete();
  };

  const handleUpdate = (row) => {
    console.log("Updated!", row);
    onCloseUpdate();
  };

  return (
    <>
      <ModalViewDetailEvent
        isOpen={isOpenView}
        onClose={onCloseView}
        data={selectedRow}
      />

      <ModalDelete
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        target={selectedRow}
        onDelete={handleDelete}
        title={"Anda yakin ingin Menghapus Komunitas?"}
        message={"Komunitas yang dihapus tidak dapat dipulihkan"}
      />

      <BaseTable data={data} heads={TableHead}>
        {data.map((row, rowIndex) => (
          <TableBodyRow key={rowIndex} index={rowIndex}>
            <CenteredCell>
              {(currentPage - 1) * itemsPerPage + rowIndex + 1}
            </CenteredCell>
            <TextCell content={row.name} />
            <TextCell content={row.tanggal} />
            <TextCell content={row.kuota} />

            <BadgeCell
              content={row.status}
              colorScheme={handleBadges(row.status)}
            />
            <CenteredCell key={rowIndex}>
              <CustomIconButton
                icon={<Eye />}
                color={"#333333"}
                hoverColor={"#333333"}
                onClick={() => handleViewModal(row)}
              />
              <CustomIconButton
                icon={<Trash />}
                color={"#E53535"}
                hoverColor={"#333333"}
                onClick={() => handleDeleteModal(row)}
              />
            </CenteredCell>
          </TableBodyRow>
        ))}
      </BaseTable>
    </>
  );
}
