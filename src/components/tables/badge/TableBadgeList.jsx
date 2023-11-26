import { Edit } from "react-iconly";
import { BaseTable } from "../base-table/BaseTable";
import { TableBodyRow } from "../base-table/TableRows";
import { BadgeCell, CenteredCell, TextCell } from "../base-table/TableCells";
import { CustomIconButton } from "@/components/buttons";
import { useDisclosure } from "@chakra-ui/react";
import { ModalEditBadge } from "../../modal/badge/ModalEditBadge";
import { useState } from "react";

const TableHeads = [
	"No",
	"Nama Lencana",
	"Badge",
	" Tercapai",
	"Total Target",
	"Aksi",
];

export function TableBadgeList({ data }) {
	const {
		isOpen: isOpenView,
		onOpen: onOpenView,
		onClose: onCloseView,
	} = useDisclosure();

	const [selectedRow, setSelectedRow] = useState(null);

	const handleViewModal = (row) => {
		setSelectedRow(row);
		onOpenView();
	};
	return (
		<>
			<ModalEditBadge
				isOpen={isOpenView}
				onClose={onCloseView}
				data={selectedRow}
			/>
			<BaseTable
				data={data}
				heads={TableHeads}
			>
				{data.map((row, rowIndex) => (
					<TableBodyRow
						key={rowIndex}
						index={rowIndex}
					>
						<TextCell content={rowIndex + 1} />
						<TextCell content={row.nama} />
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
							content={row.badge}
						/>
						<TextCell content={row.tercapai} />
						<TextCell content={row.target} />
						<CenteredCell>
							<CustomIconButton
								icon={<Edit />}
								colorScheme={"yellow"}
								hoverColor={"green"}
								variant={"solid"}
								size={"sm"}
								mr={2}
								onClick={() => handleViewModal(row)}
							/>
						</CenteredCell>
					</TableBodyRow>
				))}
			</BaseTable>
		</>
	);
}
