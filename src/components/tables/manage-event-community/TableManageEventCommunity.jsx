import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell, BadgeCell } from "../base-table/TableCells";
import { CustomIconButton } from "@/components/buttons";
import { deleteEvent, deleteEventSelector, fetchEvent, updateEvent } from "@/store/event-community";
import { Eye, Trash } from "iconsax-react";
import { format } from "date-fns";
import { formatDateToLocalDate, formatWithCommas } from "@/utils";
import { ModalDelete } from "@/components/modal";
import { ModalEditCommunity } from "@/components/modal/event-community/ModalEditEventCommunity";
import { ModalViewDetailEvent } from "@/components/modal/event-community/ModalViewDetailEvent";
import { TableBodyRow } from "../base-table/TableRows";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const TABLEHEADS = ["No", "Nama Event", "Tanggal Pelaksanaan", "Kuota Event", "Status Event", "Aksi"];

export function TableManageEventCommunity({ data, currentPage, itemsPerPage }) {
	const { isOpen: isOpenView, onOpen: onOpenView, onClose: onCloseView } = useDisclosure();
	const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure();
	const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

	const dispatch = useDispatch();
	const { status: deleteEventStatus } = useSelector(deleteEventSelector);
	const [currData, setCurrData] = useState(null);

	const handleTextAlign = (heads) => {
		return heads.map((head) => {
			if (head === "No" || head === "Event" || head === "Aksi") {
				return "center";
			}
			return "left";
		});
	};

	const handleBadges = (status) => {
		status = status.toLowerCase();
		switch (status) {
			case "belum berjalan":
				return "blue";
			case "berjalan":
				return "yellow";
			case "selesai":
				return "green";
			default:
				return "gray";
		}
	};

	const handleViewModal = (communityId, eventId) => {
		dispatch(fetchEvent({ communityId, eventId }));
		onOpenView();
	};

	const handleUpdateModal = (target) => {
		onCloseView();
		setCurrData(target);
		setTimeout(() => {
			onOpenUpdate();
		});
		clearTimeout();
	};

	const handleSubmitUpdatedData = (target, communityId, eventId) => {
		target.image = target.image[0] instanceof File ? target.image[0] : target.image;
		target.date = format(new Date(target.date), "yyyy/MM/dd");
		dispatch(
			updateEvent({
				data: target,
				communityId,
				eventId,
			})
		).then(() => {
			if (updateEvent === "success") {
				onCloseUpdate();
			}
		});
	};

	const handleDeleteModal = (target) => {
		setCurrData(target);
		onOpenDelete();
	};

	const handleDelete = (target) => {
		dispatch(
			deleteEvent({
				communityId: target.communityId,
				eventId: target.id,
			})
		).then(() => {
			onCloseDelete();
		});
	};

	return (
		<>
			<ModalViewDetailEvent
				isOpen={isOpenView}
				onClose={onCloseView}
				onOpenUpdate={handleUpdateModal}
			/>

			<ModalEditCommunity
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
				title={"Anda yakin ingin Menghapus Event Komunitas?"}
				message={"Event komunitas yang dihapus tidak dapat dipulihkan"}
				isLoading={deleteEventStatus === "loading"}
			/>

			<BaseTable
				data={data}
				heads={TABLEHEADS}
				textAligns={handleTextAlign(TABLEHEADS)}
			>
				{data.map((row, rowIndex) => (
					<TableBodyRow
						key={rowIndex}
						index={rowIndex}
					>
						<CenteredCell>{(currentPage - 1) * itemsPerPage + rowIndex + 1}</CenteredCell>
						<TextCell
							content={row.title}
							casing={"capitalize"}
							isTruncated={true}
							maxWidth={"20rem"}
						/>
						<TextCell
							content={formatDateToLocalDate(row.date)}
							isTruncated={true}
						/>
						<TextCell
							content={formatWithCommas(row.quota)}
							isTruncated={true}
						/>

						<BadgeCell
							content={row.status}
							colorScheme={handleBadges(row.status)}
						/>
						<CenteredCell key={rowIndex}>
							<CustomIconButton
								icon={<Eye />}
								color={"#333333"}
								hoverColor={"#333333"}
								onClick={() => handleViewModal(row.communityId, row.id)}
							/>
							<CustomIconButton
								icon={<Trash />}
								color={"#E53535"}
								hoverColor={"#333333"}
								onClick={() => handleDeleteModal(row)}
							/>
						</CenteredCell>
					</TableBodyRow>
				))}
			</BaseTable>
		</>
	);
}
