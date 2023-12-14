import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell } from "../base-table/TableCells";
import { CustomIconButton } from "@/components/buttons";
import { deleteUser, deleteUserSelector, fetchUser } from "@/store/user";
import { Eye, Trash } from "iconsax-react";
import { formatWithCommas } from "@/utils";
import { ModalDelete, ModalViewUserDetail } from "@/components/modal";
import { TableBodyRow } from "../base-table/TableRows";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const TABLEHEADS = ["No", "Nama Lengkap", "Email", "Total Poin", "Aksi"];

/**
 * TableUserList is a table component that is used to display user data.
 * @param {{data: any[], currentPage: number, itemsPerPage: number}} props - The props object.
 * @returns {JSX.Element} The TableUserList component.
 */
export function TableUserList({ data, currentPage, itemsPerPage }) {
	const { isOpen: isOpenView, onOpen: onOpenView, onClose: onCloseView } = useDisclosure();
	const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

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
		dispatch(deleteUser(target)).then(() => {
			onCloseDelete();
		});
	};

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
				isLoading={deletestatus === "loading"}
			/>
			<BaseTable
				data={data}
				heads={TABLEHEADS}
			>
				{data.map((row, rowIndex) => (
					<TableBodyRow
						key={rowIndex}
						index={rowIndex}
					>
						<CenteredCell>{(currentPage - 1) * itemsPerPage + rowIndex + 1}</CenteredCell>
						<TextCell
							casing={"capitalize"}
							content={row.fullname}
						/>
						<TextCell content={row.email} />
						<TextCell content={formatWithCommas(row.point)} />
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
