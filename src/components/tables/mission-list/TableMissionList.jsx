/* eslint-disable react/prop-types */
import { BaseTable } from "../base-table/BaseTable";
import { BadgeCell, CenteredCell, TextCell } from "../base-table/TableCells";
import { TableBodyRow } from "../base-table/TableRows";
import { CustomIconButton } from "@/components/buttons";
import {
  ModalDelete,
  ModalViewDetailMission,
  ModalEditMission,
} from "@/components/modal";
import { Edit2, Eye, Trash } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const TableHead = ["ID Misi", "Nama Misi", "Pembuat", "Status", "Aksi"];

export function TableMissionList({ data, currentPage, itemsPerPage }) {
  const handleBadges = (status) => {
		switch (status) {
			case "Aktif":
				return "green";
			case "Melewati Tenggat":
				return "red";
			default:
				return "gray";
		}
	};
  const {
    isOpen: isOpenView,
    onOpen: onOpenView,
    onClose: onCloseView,
  } = useDisclosure();
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
  const [selectedRow, setSelectedRow] = useState(null);

  const handleViewModal = (row) => {
    setSelectedRow(row);
    onOpenView();
  };

  const handleEditModal = (row) => {
    setSelectedRow(row);
    onOpenEdit();
  };

  const handleDeleteModal = (row) => {
    setSelectedRow(row);
    onOpenDelete();
  };

  const handleSubmitEdited = (row) => {
    console.log("Edited!", row);
  };
  const handleDelete = (row) => {
    console.log("deleted!", row);
    onCloseDelete();
  };

  return (
    <>
      <ModalViewDetailMission
        isOpen={isOpenView}
        onClose={onCloseView}
        data={selectedRow}
      />
      <ModalEditMission
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        target={selectedRow}
        onSubmit={handleSubmitEdited}
      />
      <ModalDelete
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        target={selectedRow}
        onDelete={handleDelete}
      />
      <BaseTable data={data} heads={TableHead}>
        {data.map((row, rowIndex) => (
          <TableBodyRow key={rowIndex} index={rowIndex}>
            <CenteredCell>
              {(currentPage - 1) * itemsPerPage + rowIndex + 1}
            </CenteredCell>
            <TextCell key={rowIndex} content={row.title} />
            <TextCell key={rowIndex} content={row.maker} />
            <BadgeCell
							content={row.status}
							colorScheme={handleBadges(row.status)}
						/>
            <CenteredCell>
              <CustomIconButton
                icon={<Eye />}
                color={"#828282"}
                hoverColor={"#333333"}
                onClick={() => handleViewModal(row)}
              />
              <CustomIconButton
                icon={<Edit2 />}
                color={"#828282"}
                hoverColor={"#333333"}
                onClick={() => handleEditModal(row)}
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
