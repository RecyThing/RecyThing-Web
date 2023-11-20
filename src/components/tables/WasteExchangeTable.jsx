import { BaseTable } from "./base-table/BaseTable";
import { CenteredCell, TextCell } from "./base-table/TableCells";
import { TableBodyRow } from "./base-table/TableRows";
import { CustomIconButton } from "@/components/buttons";
import { WasteExchangeDetailModal, DeleteModal } from "@/components/modal";
import { Eye, Trash } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const TableHead = ["ID Penukaran", "Nama Lengkap", "Email", "Lokasi Drop Point", "Aksi"];

export function WasteExchangeTable({ data, currentPage, itemsPerPage }) {
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

    const formatId = (id) => {
        const desiredLength = 3;
        const paddedId = String(id).padStart(desiredLength, '0');
        return `PS${paddedId}`;
    };

	return (
		<>
			<WasteExchangeDetailModal
				isOpen={isOpenView}
				onClose={onCloseView}
				data={selectedRow}
			/>
			<DeleteModal
				isOpen={isOpenDelete}
				onClose={onCloseDelete}
				target={selectedRow}
				onDelete={handleDelete}
			/>
			<BaseTable
				data={data}
				heads={TableHead}
			>
				{data.map((row, rowIndex) => (
					<TableBodyRow
						key={rowIndex}
						index={rowIndex}
					>
						<CenteredCell>{formatId((currentPage - 1) * itemsPerPage + rowIndex + 1)}</CenteredCell>

						{row.map((cell, cellIndex) => (
							<TextCell
								key={cellIndex}
								content={cell}
							/>
						))}
						<CenteredCell>
							<CustomIconButton
								icon={<Eye />}
								color={"#828282"}
								hoverColor={"#333333"}
								onClick={() => handleViewModal(row)}
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