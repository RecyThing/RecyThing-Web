import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell } from "../base-table/TableCells";
import { CustomIconButton } from "@/components/buttons";
import { deleteUser, fetchUser } from "@/store/user";
import { Eye, Trash } from "iconsax-react";
import { ModalDelete, ModalViewUserDetail } from "@/components/modal";
import { TableBodyRow } from "../base-table/TableRows";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useState } from "react";

const TableHead = ["No", "Nama Lengkap", "Email", "Total Poin", "Aksi"];

export function TableUserList({ data, currentPage, itemsPerPage }) {
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
	const dispatch = useDispatch();

	const handleViewModal = (row) => {
		dispatch(fetchUser(row.id));
		onOpenView();
	};

	const handleDeleteModal = (row) => {
		setSelectedRow(row);
		onOpenDelete();
	};

	const handleDelete = (row) => {
		dispatch(deleteUser(row.id));
		onCloseDelete();
	};

	return (
		<>
			<ModalViewUserDetail
				isOpen={isOpenView}
				onClose={onCloseView}
				data={selectedRow}
			/>
			<ModalDelete
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
						<CenteredCell>
							{(currentPage - 1) * itemsPerPage + rowIndex + 1}
						</CenteredCell>
						<TextCell
							casing={"capitalize"}
							content={row.fullname}
						/>
						<TextCell content={row.email} />
						<TextCell content={row.point} />
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
