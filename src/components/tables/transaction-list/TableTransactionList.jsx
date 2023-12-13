import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell, BadgeCell } from "../base-table/TableCells";
import { TableBodyRow } from "../base-table/TableRows";
import { CustomIconButton } from "@/components/buttons";
import { Edit2, Eye } from "iconsax-react";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import {
	ModalEditDetailTransaction,
	ModalViewDetailTransaction,
} from "@/components/modal";
import { useDispatch, useSelector } from "react-redux";
import { formatDateToLocalDate } from "@/utils";
import { fetchDataTransaction, patchDataTransaction } from "@/store/transaction-list";
import { patchDataReportSelector } from "@/store/report";

const TableHead = [
	"No",
	"Nama Pengguna",
	"Nama Reward",
	"Tujuan Pengiriman",
	"Tanggal",
	"Status",
	"Aksi",
];

export function TableTransactionList({ data, currentPage, itemsPerPage }) {
	const {
		isOpen: isOpenView,
		onOpen: onOpenView,
		onClose: onCloseView,
	} = useDisclosure();
	const {
		isOpen: isOpenUpdate,
		onOpen: onOpenUpdate,
		onClose: onCloseUpdate,
	} = useDisclosure();
	

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

	const [id, setId] = useState(null);
	const { status } = useSelector(patchDataReportSelector);
	const dispatch = useDispatch();
	const handleViewModal = (target) => {
		dispatch(fetchDataTransaction(target))
		onOpenView();
	};

	const handleUpdateModal = (target) => {
		dispatch(fetchDataTransaction(target))
		onOpenUpdate();
	};

	const handleUpdate = (id,data) => {
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
				data={id}
			/>

			<ModalEditDetailTransaction
				isOpen={isOpenUpdate}
				onClose={onCloseUpdate}
				target={id}
				onUpdate={handleUpdate}
				onEdit={status}
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
							{rowIndex+1}
						</CenteredCell>
						<TextCell content={row.user} />
						<TextCell content={row.voucher} />
						<TextCell content={row.phone} />
						<TextCell content={formatDateToLocalDate(row.created_at)} />
						{row.status === "selesai" ? (
							<BadgeCell
								content={"Berhasil"}
								colorScheme={handleBadges("selesai")}
							/>
							
						): (
							<BadgeCell
								content={row.status}
								colorScheme={handleBadges(row.status)}
							/>
						)}
						{ row.status === "selesai" ? (
							<CenteredCell key={rowIndex}>
								<Flex alignItems={"center"} justifyContent={"center"}>
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
