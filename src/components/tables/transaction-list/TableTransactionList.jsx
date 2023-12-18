import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell, BadgeCell } from "../base-table/TableCells";
import { CustomIconButton } from "@/components/buttons";
import { Edit2, Eye } from "iconsax-react";
import { fetchDataTransaction, patchDataTransaction } from "@/store/transaction-list";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { formatDateToLocalDate } from "@/utils";
import { ModalEditDetailTransaction, ModalViewDetailTransaction } from "@/components/modal";
import { patchDataReportSelector } from "@/store/report";
import { TableBodyRow } from "../base-table/TableRows";
import { useDispatch, useSelector } from "react-redux";

const TABLEHEADS = ["No", "Nama Pengguna", "Nama Reward", "Tujuan Pengiriman", "Tanggal", "Status", "Aksi"];

export function TableTransactionList({ data }) {
	const { isOpen: isOpenView, onOpen: onOpenView, onClose: onCloseView } = useDisclosure();
	const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure();

	const handleBadges = (status) => {
		switch (status) {
			case "diproses":
				return "blue";
			case "terbaru":
				return "yellow";
			case "selesai":
				return "green";
			default:
				return "gray";
		}
	};

	const { status } = useSelector(patchDataReportSelector);
	const dispatch = useDispatch();
	const handleViewModal = (target) => {
		dispatch(fetchDataTransaction(target));
		onOpenView();
	};

	const handleUpdateModal = (target) => {
		dispatch(fetchDataTransaction(target));
		onOpenUpdate();
	};

	const handleUpdate = (id, data) => {
		dispatch(patchDataTransaction({ id, data })).then((res) => {
			if (res.payload) {
				onCloseUpdate();
			}
		});
	};

	return (
		<>
			<ModalViewDetailTransaction
				isOpen={isOpenView}
				onClose={onCloseView}
			/>

			<ModalEditDetailTransaction
				isOpen={isOpenUpdate}
				onClose={onCloseUpdate}
				onUpdate={handleUpdate}
				onEdit={status}
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
						<CenteredCell>{rowIndex + 1}</CenteredCell>
						<TextCell content={row.user.charAt(0)?.toUpperCase() + row.user.slice(1)} />
						<TextCell content={row.voucher?.toUpperCase()} />
						<TextCell content={row.phone} />
						<TextCell content={formatDateToLocalDate(row.created_at)} />
						{row.status === "selesai" ? (
							<BadgeCell
								content={"Berhasil"}
								colorScheme={handleBadges("selesai")}
							/>
						) : (
							<BadgeCell
								content={row.status}
								colorScheme={handleBadges(row.status)}
							/>
						)}
						{row.status === "selesai" ? (
							<CenteredCell key={rowIndex}>
								<Flex
									alignItems={"center"}
									justifyContent={"center"}
								>
									<CustomIconButton
										icon={<Eye />}
										color={"#828282"}
										hoverColor={"#333333"}
										onClick={() => handleViewModal(row.id)}
									/>
								</Flex>
							</CenteredCell>
						) : (
							<CenteredCell key={rowIndex}>
								<CustomIconButton
									icon={<Eye />}
									color={"#828282"}
									hoverColor={"#333333"}
									onClick={() => handleViewModal(row.id)}
								/>
								<CustomIconButton
									icon={<Edit2 />}
									color={"#828282"}
									hoverColor={"#333333"}
									onClick={() => handleUpdateModal(row.id)}
								/>
							</CenteredCell>
						)}
					</TableBodyRow>
				))}
			</BaseTable>
		</>
	);
}
