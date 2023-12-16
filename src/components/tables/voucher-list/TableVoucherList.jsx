import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell } from "../base-table/TableCells";
import { CustomIconButton } from "@/components/buttons";
import { deleteVoucher, deleteVoucherSelector, fetchVoucher, updateVoucher } from "@/store/voucher";
import { formatDateToISOString, formatDateToLocalDate, formatWithCommas } from "@/utils";
import { ModalDelete, ModalEditVoucher } from "@/components/modal";
import { TableBodyRow } from "../base-table/TableRows";
import { Trash, Edit2 } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const TABLEHEADS = ["No", "Nama Reward", "Poin Reward", "Tanggal Mulai", "Tanggal Berakhir", "Aksi"];

export function TableVoucherList({ data, currentPage, itemsPerPage }) {
	const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
	const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

	const [id, setId] = useState(null);

	const dispatch = useDispatch();
	const { status: deleteStatus } = useSelector(deleteVoucherSelector);

	const handleEditModal = (target) => {
		setId(target);
		dispatch(fetchVoucher(target));
		onOpenEdit();
	};

	const handleSubmitEdited = (data) => {
		data.image = data.image[0] instanceof File ? data.image[0] : data.image;
		data.start_date = formatDateToISOString(data.start_date);
		data.end_date = formatDateToISOString(data.end_date);

		dispatch(updateVoucher({ id, data })).then((res) => {
			if (res.payload && res.payload.status === true) {
				onCloseEdit();
			}
		});
	};

	const handleDeleteModal = (target) => {
		setId(target);
		onOpenDelete();
	};

	const handleDelete = (target) => {
		dispatch(deleteVoucher(target)).then((res) => {
			if (res.payload && res.payload.status === true) {
				onCloseDelete();
			}
		});
	};

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
				isLoading={deleteStatus === "loading"}
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
							casing={"uppercase"}
							content={row.reward_name}
						/>
						<TextCell content={formatWithCommas(row.point)} />
						<TextCell content={formatDateToLocalDate(row.start_date)} />
						<TextCell content={formatDateToLocalDate(row.end_date)} />
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
