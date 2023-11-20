/* eslint-disable react/prop-types */
import { useDisclosure } from "@chakra-ui/react";
import { Trash, Edit2 } from "iconsax-react";
import { DeleteModal, EditVoucherModal } from "@/components/modal";
import { useState } from "react";
import { BaseTable } from "./base-table/BaseTable";
import { TableBodyRow } from "./base-table/TableRows";
import { CenteredCell, TextCell } from "./base-table/TableCells";
import { CustomIconButton } from "../buttons";

const TableHead = [
	"No",
	"Nama Reward",
	"Poin Reward",
	"Tanggal Mulai",
	"Tanggal Berakhir",
	"Aksi",
];

export function VoucherListTable({ data, currentPage, itemsPerPage }) {
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
			<EditVoucherModal
				isOpen={isOpenView}
				onClose={onCloseView}
				target={selectedRow}
				onSubmit={handleSubmitEdited}
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
						<CenteredCell>
							{(currentPage - 1) * itemsPerPage + rowIndex + 1}
						</CenteredCell>
						<TextCell content={row.voucherName} />
						<TextCell content={row.voucherPoint} />
						<TextCell content={row.voucherStartDate.toLocaleDateString()} />
						<TextCell content={row.voucherEndDate.toLocaleDateString()} />
						<CenteredCell>
							<CustomIconButton
								icon={<Edit2 />}
								color={"#333333"}
								hoverColor={"#333333"}
								onClick={() => handleEditModal(row)}
							/>
							<CustomIconButton
								icon={<Trash />}
								color={"#E53535"}
								hoverColor={"#E53535"}
								onClick={() => handleDeleteModal(row)}
							/>
						</CenteredCell>
					</TableBodyRow>
				))}
			</BaseTable>
		</>
	);
}
