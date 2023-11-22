/* eslint-disable react/prop-types */
import { BaseTable } from "./base-table/BaseTable";
import { CenteredCell, TextCell, BadgeCell } from "./base-table/TableCells";
import { TableBodyRow } from "./base-table/TableRows";
import { CustomIconButton } from "@/components/buttons";
import { Edit2, Eye } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { DetailModal } from "../modal/transaction-list/Detail";
import { EditDetailModal } from "../modal/transaction-list/EditDetail";

const TableHead = ["No", "Nama Pengguna", "Nama Reward" , "Tujuan Pengiriman", "Tanggal", "Status", "Aksi"];

export function TransactionListTable({ data, currentPage, itemsPerPage }) {
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
	const [selectedRow, setSelectedRow] = useState(null);

	const handleBadges = (status) => {
		switch (status) {
			case "Diproses":
				return "blue";
			case "Terbaru":
				return "yellow";
			case "Berhasil":
				return "green";
			default:
				return "gray";
		}
	};

	const handleViewModal = (row) => {
		setSelectedRow(row);
		onOpenView();
	};

	const handleUpdateModal = (row) => {
		setSelectedRow(row);
		onOpenUpdate();
	};

	const handleUpdate = (row) => {
		console.log("Updated!", row);
		onCloseUpdate();
	};

	return (
		<>
			<DetailModal
				isOpen={isOpenView}
				onClose={onCloseView}
				data={selectedRow}
			/>
			
			<EditDetailModal
				isOpen={isOpenUpdate}
				onClose={onCloseUpdate}
				target={selectedRow}
				onUpdate={handleUpdate}
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
						<TextCell content={row.name}/>
						<TextCell content={row.reward}/>
						<TextCell content={row.email}/>
						<TextCell content={row.points}/>
						<BadgeCell
							content={row.status}
							colorScheme={handleBadges(row.status)}
						/>
						<CenteredCell key={rowIndex}>
							<CustomIconButton
								icon={<Eye />}
								color={"#828282"}
								hoverColor={"#333333"}
								onClick={() => handleViewModal(row)}
							/>
							<CustomIconButton
								icon={<Edit2 />}
								color={"#828282"}
								hoverColor={"#333333"}
								onClick={() => handleUpdateModal(row)}
							/>
						</CenteredCell>
					</TableBodyRow>
				))}
			</BaseTable>
		</>
	);
}
