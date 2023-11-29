import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell } from "../base-table/TableCells";
import { CustomIconButton } from "@/components/buttons";
import {
	deleteVoucher,
	deleteVoucherSelector,
	fetchVoucher,
	updateVoucher,
	updateVoucherSelector,
} from "@/store/voucher";
import { formatDateToISOString, formatDateToLocalDateString } from "@/utils";
import { ModalDelete, ModalEditVoucher } from "@/components/modal";
import { TableBodyRow } from "../base-table/TableRows";
import { Trash, Edit2 } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

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

	const { status: updateStatus } = useSelector(updateVoucherSelector);
	const { status: deleteStatus } = useSelector(deleteVoucherSelector);

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

	const handleEditModal = (target) => {
		setId(target);
		dispatch(fetchVoucher(target));
		onOpenEdit();
	};

	const handleSubmitEdited = (data) => {
		data.image = data.image[0];
		data.start_date = formatDateToISOString(data.start_date);
		data.end_date = formatDateToISOString(data.end_date);

		dispatch(updateVoucher({ id, data }));
	};

	const handleDeleteModal = (target) => {
		setId(target);
		onOpenDelete();
	};

	const handleDelete = (target) => {
		dispatch(deleteVoucher(target));
	};

	useEffect(() => {
		if (updateStatus === "success" || updateStatus === "failed") {
			onCloseEdit();
		}
	}, [updateStatus, onCloseEdit]);

	useEffect(() => {
		if (deleteStatus === "success" || deleteStatus === "failed") {
			onCloseDelete();
		}
	}, [deleteStatus, onCloseDelete]);

	return (
		<>
			<ModalEditVoucher
				isOpen={isOpenEdit}
				onClose={onCloseEdit}
				onSubmit={handleSubmitEdited}
			/>

			<ModalDelete
				isOpen={isOpenDelete}
				onClose={onCloseDelete}
				target={id}
				onDelete={handleDelete}
				deleteStatus={deleteStatus}
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
