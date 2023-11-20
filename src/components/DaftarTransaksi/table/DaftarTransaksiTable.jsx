/* eslint-disable react/prop-types */
import { BaseTable } from "../../tables/base-table/BaseTable";
import { CenteredCell, TextCell, BadgeCell } from "../../tables/base-table/TableCells";
import { TableBodyRow } from "../../tables/base-table/TableRows";
import { CustomIconButton } from "@/components/buttons";
import { DeleteModal, UserDetailModal } from "@/components/modal";
import { Edit2, Eye } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { DetailModal } from "../modal/Detail";
import { EditDetailModal } from "../modal/EditDetail";

const TableHead = ["No", "Nama Pengguna", "Nama Reward" , "Tujuan Pengiriman", "Tanggal", "Status", "Aksi"];

export function DaftarTransaksiTable({ data, currentPage, itemsPerPage }) {
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
						{row.map((cell, cellIndex) => (
						
								cell === "Diproses" ? 
									<BadgeCell key={cellIndex} colorScheme={"blue"} content={cell}/>
									: cell === "Terbaru" ? 
									<BadgeCell key={cellIndex} colorScheme={"yellow"} content={cell}/>
									:cell === "Berhasil" ?
									<BadgeCell key={cellIndex} colorScheme={"green"} content={cell}/>
									: <TextCell key={cellIndex} content={cell}/>
						))}
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
