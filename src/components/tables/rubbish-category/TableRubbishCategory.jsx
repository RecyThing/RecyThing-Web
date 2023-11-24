import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell } from "../base-table/TableCells";
import { TableBodyRow } from "../base-table/TableRows";
import { CustomIconButton } from "@/components/buttons";
import { Edit2, Trash } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { ModalDelete, ModalEditRubbishCategory } from "@/components/modal";

const TableHead = ["No", "Nama Jenis Sampah", "Reward Point", "Satuan", "Aksi"];

export function TableRubbishCategory({ data, currentPage, itemsPerPage }) {
	const [selectedRow, setSelectedRow] = useState(null);

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

	const handleEditModal = (row) => {
		setSelectedRow(row);
		onOpenView();
	};

	const handleSubmitEdited = (target, data) => {
		console.log("edited!", data, target);
		onCloseView();
	};

	const handleDeleteModal = (row) => {
		setSelectedRow(row);
		onOpenDelete();
	};

	const handleDelete = (row) => {
		console.log("deleted!", row);
		onCloseDelete();
	};

	return (
		<>
			<ModalEditRubbishCategory
				isOpen={isOpenView}
				onClose={onCloseView}
				target={selectedRow}
				onSubmit={handleSubmitEdited}
			/>
			<ModalDelete
				isOpen={isOpenDelete}
				onClose={onCloseDelete}
				target={selectedRow}
				onDelete={handleDelete}
				title={"Anda yakin untuk Menghapus Kategori Sampah ini?"}
				message={"Kategori yang dihapus tidak dapat dipulihkan"}
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
						<CenteredCell>
							{(currentPage - 1) * itemsPerPage + rowIndex + 1}
						</CenteredCell>
						{row.map((cell, cellIndex) => (
							<TextCell
								key={cellIndex}
								content={cell}
							/>
						))}
						<CenteredCell>
							<CustomIconButton
								icon={<Edit2 />}
								color={"#333333"}
								hoverColor={"#000000"}
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
