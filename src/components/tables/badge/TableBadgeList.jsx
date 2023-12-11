import { Edit } from "react-iconly";
import { BaseTable } from "../base-table/BaseTable";
import { TableBodyRow } from "../base-table/TableRows";
import { BadgeCell, CenteredCell, TextCell } from "../base-table/TableCells";
import { CustomIconButton } from "@/components/buttons";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalEditBadge } from "../../modal/badge/ModalEditBadge";
import {
  patchAchievements,
  patchAchievementsSelector,
} from "@/store/achievements";
import { Spinner } from "@/components/spinner";

const TableHeads = [
  "No",
  "Nama Lencana",
  "Badge",
  " Tercapai",
  "Total Target",
  "Aksi",
];

export function TableBadgeList({ data }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const dispatch = useDispatch();
  const {
    isOpen: isOpenView,
    onOpen: onOpenView,
    onClose: onCloseView,
  } = useDisclosure();

  const handleEditModal = (row) => {
    setSelectedRow(row);
    onOpenView();
  };

  const handleSubmitModal = (data) => {
    dispatch(patchAchievements({ id: selectedRow?.id, data }));
  };
  const { status: statusPatch, message: messagePatch } = useSelector(
    patchAchievementsSelector
  );

  return (
    <>
      {statusPatch === "loading" && <Spinner />}
      {statusPatch === "failed" && <p>{messagePatch}</p>}
      {statusPatch === "success" && (
        <ModalEditBadge
          isOpen={isOpenView}
          onClose={onCloseView}
          onSubmit={handleSubmitModal}
          target={selectedRow}
        />
      )}
      <ModalEditBadge
        isOpen={isOpenView}
        onClose={onCloseView}
        onSubmit={handleSubmitModal}
        target={selectedRow}
      />
      <BaseTable data={data} heads={TableHeads}>
        {data.map((row, rowIndex) => (
          <TableBodyRow key={rowIndex} index={rowIndex}>
            <TextCell content={rowIndex + 1} />
            <TextCell className="capitalize" content={row.name} />
            <BadgeCell
              colorScheme={
                rowIndex === 0
                  ? "azure"
                  : rowIndex === 1
                  ? "gold"
                  : rowIndex === 2
                  ? "silver"
                  : "bronze"
              }
              content={row.name}
            />
            <TextCell content={row.total_claimed} />
            <TextCell content={row.target_point} />
            <CenteredCell>
              <CustomIconButton
                icon={<Edit />}
                colorScheme={"yellow"}
                hoverColor={"green"}
                variant={"solid"}
                size={"sm"}
                mr={2}
                onClick={() => handleEditModal(row)}
              />
            </CenteredCell>
          </TableBodyRow>
        ))}
      </BaseTable>
    </>
  );
}
