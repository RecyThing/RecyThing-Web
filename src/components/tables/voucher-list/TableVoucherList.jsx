import { useDisclosure } from "@chakra-ui/react";
import { Trash, Edit2 } from "iconsax-react";
import { useState } from "react";
import { BaseTable } from "../base-table/BaseTable";
import { TableBodyRow } from "../base-table/TableRows";
import { CenteredCell, TextCell } from "../base-table/TableCells";
import { CustomIconButton } from "../../buttons";
import { ModalDelete, ModalEditVoucher } from "@/components/modal";
import { formatDateToISOString, formatDateToLocalDateString } from "@/utils";
import { useDispatch } from "react-redux";
import { fetchVoucher, updateVoucher } from "@/store/voucher";

const TableHead = [
	"No",
	"Nama Reward",
	"Poin Reward",
	"Tanggal Mulai",
	"Tanggal Berakhir",
	"Aksi",
];

export function TableVoucherList({ data, currentPage, itemsPerPage }) {
	const [id, setId] = useState(null);
	const dispatch = useDispatch();

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

	const handleEditModal = (target) => {
		setId(target);
		dispatch(fetchVoucher(target));
		onOpenView();
	};

	const handleSubmitEdited = (data) => {
		data.start_date = formatDateToISOString(data.start_date);
		data.end_date = formatDateToISOString(data.end_date);
		dispatch(updateVoucher({ id, data }));
		onCloseView();
	};

	const handleDeleteModal = (target) => {
		setId(target);
		onOpenDelete();
	};

	const handleDelete = (target) => {
		console.log("deleted!", target);
		onCloseDelete();
	};

	return (
		<>
			<ModalEditVoucher
				isOpen={isOpenView}
				onClose={onCloseView}
				onSubmit={handleSubmitEdited}
			/>

			<ModalDelete
				isOpen={isOpenDelete}
				onClose={onCloseDelete}
				target={id}
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
							casing={"uppercase"}
							content={row.reward_name}
						/>
						<TextCell content={row.point} />
						<TextCell content={formatDateToLocalDateString(row.start_date)} />
						<TextCell content={formatDateToLocalDateString(row.end_date)} />
						<CenteredCell>
							<CustomIconButton
								icon={<Edit2 />}
								color={"#333333"}
								hoverColor={"#333333"}
								onClick={() => handleEditModal(row.id)}
							/>
							<CustomIconButton
								icon={<Trash />}
								color={"#E53535"}
								hoverColor={"#E53535"}
								onClick={() => handleDeleteModal(row.id)}
							/>
						</CenteredCell>
					</TableBodyRow>
				))}
			</BaseTable>
		</>
	);
}
