import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell, BadgeCell } from "../base-table/TableCells";
import { CustomIconButton } from "@/components/buttons";
import { deleteAdmin, deleteAdminSelector, fetchAdmin, updateAdmin } from "@/store/admin";
import { Edit2, Trash } from "iconsax-react";
import { ModalDelete, ModalEditAdmin } from "@/components/modal";
import { TableBodyRow } from "../base-table/TableRows";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const TableHead = ["No", "Nama Lengkap", "Email", "Status", "Aksi"];

export function TableAdminList({ data, currentPage, itemsPerPage }) {
	const [id, setId] = useState(null);
	const [idAdmin, setIdAdmin] = useState(null);
	const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
	const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
	const { status: deleteStatusAdmin } = useSelector(deleteAdminSelector);
	const dispatch = useDispatch();

	const handleEditModal = (target) => {
		setId(target);
		dispatch(fetchAdmin(target));
		onOpenEdit();
	};

	const handleDeleteModal = (id) => {
		setIdAdmin(id);
		onOpenDelete();
	};

	const handleDelete = (id) => {
		dispatch(deleteAdmin(id));
	};

	useEffect(() => {
		if (deleteStatusAdmin === "success" || deleteStatusAdmin === "failed") {
			onCloseDelete();
		}
	}, [dispatch, deleteStatusAdmin, onCloseDelete]);

	const handleSubmitEdited = (data) => {
    console.log(data);
    data.image = data.image[0];
    console.log(data);
		dispatch(updateAdmin({ id, data }));
	};

	const handleBadgeColor = (status) => {
		status = status.toLowerCase();
		switch (status) {
			case "aktif":
				return "green";
			case "tidak aktif":
				return "red";
			default:
				return "grey";
		}
	};

	return (
		<>
			<ModalEditAdmin
				isOpen={isOpenEdit}
				onClose={onCloseEdit}
				onSubmit={handleSubmitEdited}
			/>
			<ModalDelete
				isOpen={isOpenDelete}
				onClose={onCloseDelete}
				target={idAdmin}
				onDelete={handleDelete}
				deleteStatus={deleteStatusAdmin}
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
						<CenteredCell>{(currentPage - 1) * itemsPerPage + rowIndex + 1}</CenteredCell>
						<TextCell content={row.fullname} />
						<TextCell content={row.email} />
						<BadgeCell
							content={row.status || "tidak ada status"}
							colorScheme={handleBadgeColor(row.status)}
						/>
						<CenteredCell>
							<CustomIconButton
								icon={<Edit2 />}
								color={"#201A18"}
								hoverColor={"#333333"}
								onClick={() => handleEditModal(row.id)}
							/>
							<CustomIconButton
								icon={<Trash />}
								color={"#E53535"}
								hoverColor={"#B22222"}
								onClick={() => handleDeleteModal(row.id)}
							/>
						</CenteredCell>
					</TableBodyRow>
				))}
			</BaseTable>
		</>
	);
}
