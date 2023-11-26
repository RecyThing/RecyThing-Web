import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell, BadgeCell } from "../base-table/TableCells";
import { TableBodyRow } from "../base-table/TableRows";
import { CustomIconButton } from "@/components/buttons";
import { Edit2, Trash } from "iconsax-react";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { ModalDelete, ModalEditAdmin } from "@/components/modal";

const TableHead = ["No", "Nama Lengkap", "Email", "Status", "Aksi"];

export function TableAdminList({ data, currentPage, itemsPerPage }) {
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
	const [editForm, setEditForm] = useState(null);

	const handleDeleteModal = (row) => {
		setEditForm(row);
		onOpenDelete();
	};

	const handleDelete = (row) => {
		console.log("deleted!", row);
		onCloseDelete();
	};

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

	const handleEditModal = (target) => {
		setEditForm(target);
		onOpenEdit();
	};

	const submitDataEdit = (data, target) => {
		console.log(data, target);
	};

	return (
		<>
			<ModalEditAdmin
				isOpen={isOpenEdit}
				onClose={onCloseEdit}
				onSubmit={submitDataEdit}
				target={editForm}
			/>
			<ModalDelete
				isOpen={isOpenDelete}
				onClose={onCloseDelete}
				target={editForm}
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
