import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell, BadgeCell } from "../base-table/TableCells";
import { TableBodyRow } from "../base-table/TableRows";
import { CustomIconButton } from "@/components/buttons";
import { Edit2, Eye, Trash } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { formatDateToLocalDate } from "@/utils";
import { ModalDelete, ModalViewDetailTransaction } from "@/components/modal";
import { ModalViewDetailEvent } from "@/components/modal/event-community/ModalViewDetailEvent";
import { ModalEditCommunity } from "@/components/modal/event-community/ModalEditCommunity";
import { deleteEvent, fetchEvent, updateEvent } from "@/store/event-community";
import { useDispatch } from "react-redux";

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
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const [selectedRow, setSelectedRow] = useState(null);
  const handleTextAlign = (heads) => {
    return heads.map((head) => {
      if (head === "No" || head === "Event" || head === "Aksi") {
        return "center";
      }
      return "left";
    });
  };

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

  const dispatch = useDispatch();
  const handleViewModal = (id) => {
    dispatch(fetchEvent(id)).then((res) => {
      setSelectedRow(res.payload.data);
    });
    onOpenView();
  };

  const handleUpdateModal = () => {
    setTimeout(() => {
      onOpenUpdate();
    });
    clearTimeout();
  };

  const handleSubmitUpdatedData = (target) => {
    target.image = target.image[0];
    dispatch(
      updateEvent({
        id: selectedRow.id,
        data: target,
      })
    ).then(() => {
      onCloseUpdate();
    });
  };

  const handleDeleteModal = (row) => {
    setSelectedRow(row);
    onOpenDelete();
  };

  const handleDelete = (target) => {
    dispatch(deleteEvent(target.id)).then(() => {
      onCloseDelete();
    });
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
        onOpenUpdate={handleUpdateModal}
      />

      <ModalEditCommunity
        isOpen={isOpenUpdate}
        onClose={onCloseUpdate}
        onUpdate={handleSubmitUpdatedData}
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

      <BaseTable
        data={data}
        heads={TableHead}
        textAligns={handleTextAlign(TableHead)}
      >
        {data.map((row, rowIndex) => (
          <TableBodyRow key={rowIndex} index={rowIndex}>
            <CenteredCell>
              {(currentPage - 1) * itemsPerPage + rowIndex + 1}
            </CenteredCell>
            <TextCell content={row.title} />
            <TextCell content={formatDateToLocalDate(row.date)} />
            <TextCell content={row.quota} />

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
