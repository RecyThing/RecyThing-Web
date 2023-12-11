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
import { useDispatch } from "react-redux";
import {
	deleteCommunity,
	fetchCommunity,
	updateCommunity,
} from "@/store/community";

const TableHead = [
	"No",
	"Nama Komunitas",
	"Tanggal Dibuat",
	"Lokasi",
	"Event",
	"Aksi",
];

export function TableCommunityList({ data, currentPage, itemsPerPage }) {
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

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [currData, setCurrData] = useState(null);

	const handleViewModal = (id) => {
		dispatch(fetchCommunity(id)).then((res) => {
			setCurrData(res.payload.data);
		});
		onOpenView();
	};

	const handleUpdateModal = () => {
		setTimeout(() => {
			onOpenUpdate();
		});
		clearTimeout();
	};

	const handleSubmitUpdatedData = (target) => {
		target.image = target.image[0];
		dispatch(
			updateCommunity({
				id: currData.id,
				data: target,
			})
		).then(() => {
			onCloseUpdate();
		});
	};

	const handleDeleteModal = (target) => {
		setCurrData(target);
		onOpenDelete();
	};

	const handleDelete = (target) => {
		dispatch(deleteCommunity(target.id)).then(() => {
			onCloseDelete();
		});
	};

	return (
		<>
			<ModalViewCommunityModal
				isOpen={isOpenView}
				onClose={onCloseView}
				onOpenUpdate={handleUpdateModal}
			/>

			<ModalEditDetailCommunity
				isOpen={isOpenUpdate}
				onClose={onCloseUpdate}
				onUpdate={handleSubmitUpdatedData}
				data={currData}
			/>

			<ModalDelete
				isOpen={isOpenDelete}
				onClose={onCloseDelete}
				target={currData}
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
						<TextCell content={formatDateToLocalDate(row.created_at)} />
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
								onClick={() => handleViewModal(row.id)}
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
