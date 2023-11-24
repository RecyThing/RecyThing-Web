import { useDisclosure } from "@chakra-ui/react";
import { Trash, Eye } from "iconsax-react";
import {
	ModalDelete,
	ModalEditDetailCommunity,
	ModalViewCommunityModal,
} from "@/components/modal";
import { useState } from "react";
import { CustomIconButton } from "@/components/buttons";
import { BaseTable } from "@/components/tables/base-table/BaseTable";
import { TableBodyRow } from "@/components/tables/base-table/TableRows";
import {
	CenteredCell,
	LinkCell,
	TextCell,
} from "@/components/tables/base-table/TableCells";
import { useNavigate } from "react-router-dom";
import { formatDateToLocalDate } from "@/utils";

const TableHead = [
	"No",
	"Nama Komunitas",
	"Tanggal Dibuat",
	"Lokasi",
	"Event",
	"Aksi",
];

export function TableCommunityList({ data, currentPage, itemsPerPage }) {
	const [selectedRow, setSelectedRow] = useState(null);
	const navigate = useNavigate();

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

	const {
		isOpen: isOpenDelete,
		onOpen: onOpenDelete,
		onClose: onCloseDelete,
	} = useDisclosure();

	const handleTextAlign = (heads) => {
		return heads.map((head) => {
			if (head === "No" || head === "Event" || head === "Aksi") {
				return "center";
			}
			return "left";
		});
	};

	const handleViewModal = (row) => {
		setSelectedRow(row);
		onOpenView();
	};

	const handleUpdateModal = () => {
		onCloseView();
		onOpenUpdate();
	};

	const handleSubmitUpdatedData = (data) => {
		console.log("updated!", data);
		onCloseUpdate();
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
			<ModalEditDetailCommunity
				isOpen={isOpenUpdate}
				onClose={onCloseUpdate}
				onUpdate={handleSubmitUpdatedData}
				data={selectedRow}
			/>

			<ModalViewCommunityModal
				isOpen={isOpenView}
				onClose={onCloseView}
				onOpenUpdate={handleUpdateModal}
				data={selectedRow}
			/>

			<ModalDelete
				isOpen={isOpenDelete}
				onClose={onCloseDelete}
				target={selectedRow}
				onDelete={handleDelete}
				title={"Anda yakin ingin Menghapus Komunitas?"}
				message={"Komunitas yang dihapus tidak dapat dipulihkan"}
			/>

			<BaseTable
				data={data}
				heads={TableHead}
				textAligns={handleTextAlign(TableHead)}
			>
				{data.map((row, rowIndex) => (
					<TableBodyRow
						key={rowIndex}
						index={rowIndex}
					>
						<CenteredCell>
							{(currentPage - 1) * itemsPerPage + rowIndex + 1}
						</CenteredCell>
						<TextCell content={row.name} />
						<TextCell content={formatDateToLocalDate(row.createdAt)} />
						<TextCell content={row.location} />
						<LinkCell
							content="Lihat"
							textAlign={"center"}
							onClick={() => navigate(`${row.id}`)}
						/>
						<CenteredCell>
							<CustomIconButton
								icon={<Eye />}
								color={"#333333"}
								hoverColor={"#333333"}
								onClick={() => handleViewModal(row)}
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
