import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell } from "../base-table/TableCells";
import { CustomIconButton } from "@/components/buttons";
import { deleteUser, deleteUserSelector, fetchUser } from "@/store/user";
import { Eye, Trash } from "iconsax-react";
import { ModalDelete, ModalViewUserDetail } from "@/components/modal";
import { TableBodyRow } from "../base-table/TableRows";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

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

	const [id, setId] = useState(null);

	const dispatch = useDispatch();
	const { status: deletestatus } = useSelector(deleteUserSelector);

	const handleViewModal = (target) => {
		dispatch(fetchUser(target));
		onOpenView();
	};

	const handleDeleteModal = (target) => {
		setId(target);
		onOpenDelete();
	};

	const handleDelete = (target) => {
		dispatch(deleteUser(target));
	};

	useEffect(() => {
		if (deletestatus === "success" || deletestatus === "failed") {
			onCloseDelete();
		}
	}, [deletestatus, onCloseDelete]);

	return (
		<>
			<ModalViewUserDetail
				isOpen={isOpenView}
				onClose={onCloseView}
				data={id}
			/>
			<ModalDelete
				isOpen={isOpenDelete}
				onClose={onCloseDelete}
				target={id}
				onDelete={handleDelete}
				deleteStatus={deletestatus}
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
								onClick={() => handleViewModal(row.id)}
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
