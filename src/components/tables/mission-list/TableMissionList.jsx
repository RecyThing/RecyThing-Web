/* eslint-disable react/prop-types */
import { BaseTable } from "../base-table/BaseTable";
import { BadgeCell, CenteredCell, TextCell } from "../base-table/TableCells";
import { TableBodyRow } from "../base-table/TableRows";
import { CustomIconButton } from "@/components/buttons";
import { ModalDelete, ModalViewDetailMission, ModalEditMission } from "@/components/modal";
import { Edit2, Eye, Trash } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMission, deleteMissionSelector, fetchMission, fetchMissionSelector, updateMission, updateMissionSelector } from "@/store/mission";
import { formatDateToISOString } from "@/utils";

const TableHead = ["ID Misi", "Nama Misi", "Pembuat", "Status", "Aksi"];

export function TableMissionList({ data }) {
	const handleBadges = (status) => {
		switch (status) {
			case "Aktif":
				return "green";
			case "Melewati Tenggat":
				return "red";
			default:
				return "gray";
		}
	};
	const [id, setId] = useState(null);
	const dispatch = useDispatch();

	const { status: updateStatus } = useSelector(updateMissionSelector);
	const { status: deleteStatus } = useSelector(deleteMissionSelector);
	const { dataRow } = useSelector(fetchMissionSelector);
	const { isOpen: isOpenView, onOpen: onOpenView, onClose: onCloseView } = useDisclosure();
	const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
	const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
	const [selectedRow, setSelectedRow] = useState(null);

	const handleViewModal = (target) => {
		setSelectedRow(target);
		setId(target.id);
		dispatch(fetchMission(target));
		onOpenView();
	};

	const handleEditModal = (target) => {
		setId(target.id);
		dispatch(fetchMission(target));
		setSelectedRow(dataRow);
		onOpenEdit();
	};

	const handleSubmitEdited = (data) => {
		data.missionImage = data.missionImage[0] instanceof File ? data.missionImage[0] : data.missionImage;
		data.missionStartDate = formatDateToISOString(data.missionStartDate);
		data.missionEndDate = formatDateToISOString(data.missionEndDate);
		const formData = new FormData();
		formData.append("image", data.missionImage);
		formData.append("title", data.missionTitle);
		formData.append("point", data.missionPoint);
		formData.append("description", data.missionDescription);
		formData.append("start_date", data.missionStartDate);
		formData.append("end_date", data.missionEndDate);
		formData.append("title_stage", data.missionTitleStage);
		formData.append("description_stage", data.missionDescriptionStage);
		dispatch(updateMission({ id, data: formData }));
	};

	const handleDeleteModal = (target) => {
		setId(target.id);
		onOpenDelete();
	};

	const handleDelete = (target) => {
		dispatch(deleteMission(target));
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
			<ModalViewDetailMission
				isOpen={isOpenView}
				onClose={onCloseView}
				data={selectedRow}
			/>
			<ModalEditMission
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
				heads={TableHead}
			>
				{data.map((row, rowIndex) => (
					<TableBodyRow
						key={rowIndex}
						index={rowIndex}
					>
						<CenteredCell>{row.id}</CenteredCell>
						<TextCell
							casing={"capitalize"}
							content={row.name}
						/>
						<TextCell
							casing={"capitalize"}
							content={row.creator}
						/>
						<BadgeCell
							content={row.status}
							colorScheme={handleBadges(row.status)}
						/>
						<CenteredCell>
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
								onClick={() => handleEditModal(row)}
							/>
							<CustomIconButton
								icon={<Trash />}
								color={"#E53535"}
								hoverColor={"#B22222"}
								onClick={() => handleDeleteModal(row)}
							/>
						</CenteredCell>
					</TableBodyRow>
				))}
			</BaseTable>
		</>
	);
}
