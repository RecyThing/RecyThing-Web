import { useState } from "react";
import {
	Button,
	ButtonGroup,
	Menu,
	MenuButton,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
	useDisclosure,
} from "@chakra-ui/react";
import { BadgeCell, CenteredCell, TextCell } from "../base-table/TableCells";
import { BaseTable } from "../base-table/BaseTable";
import { ChevronDown } from "react-iconly";
import { CustomIconButton } from "@/components/buttons";
import { Eye } from "iconsax-react";
import { TableBodyRow } from "../base-table/TableRows";
import {
	ModalApprove,
	ModalReject,
	ModalViewMissionApproval,
} from "@/components/modal";
import { formatDateToLocalDate } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchApproval,
	updateApproval,
	updateApprovalSelector,
} from "@/store/approval-mission";

const TableHead = [
	"ID Misi",
	"Nama Misi",
	"Pelaku Misi",
	"Status",
	"Tanggal",
	"View",
	"Aksi",
];

const rejectMenu = [
	"Bukti tidak jelas",
	"Bukti kurang lengkap",
	"Tidak ada detail kejadian",
];

export function TableMissionApproval({ data }) {
	const dispatch = useDispatch();
	const { status } = useSelector(updateApprovalSelector);

	const [selectedRow, setSelectedRow] = useState(null);
	const [rejectReason, setRejectReason] = useState(null);

	const {
		isOpen: isOpenView,
		onOpen: onOpenView,
		onClose: onCloseView,
	} = useDisclosure();

	const {
		isOpen: isOpenApprove,
		onOpen: onOpenApprove,
		onClose: onCloseApprove,
	} = useDisclosure();

	const {
		isOpen: isOpenReject,
		onOpen: onOpenReject,
		onClose: onCloseReject,
	} = useDisclosure();

	const handleBadges = (status) => {
		status = status.toLowerCase();
		switch (status) {
			case "perlu tinjauan":
				return "yellow";
			case "disetujui":
				return "green";
			case "ditolak":
				return "red";
			default:
				return "gray";
		}
	};

	const handleTextAlign = () => {
		return TableHead.map((head) => {
			if (head === "ID Misi" || head === "View" || head === "Aksi") {
				return "center";
			} else {
				return "left";
			}
		});
	};

	const handleViewModal = (target) => {
		dispatch(fetchApproval(target));
		onOpenView();
	};

	const handleApproveModal = (target) => {
		setSelectedRow(target);
		onOpenApprove();
	};

	const handleApproveMission = () => {
		dispatch(
			updateApproval({
				id: selectedRow.id,
				data: {
					status: "disetujui",
				},
			})
		).then(() => {
			onCloseApprove();
		});
	};

	const handleRejectModal = (row, reason) => {
		setSelectedRow(row);
		setRejectReason(reason);
		onOpenReject();
	};

	const handleRejectMission = () => {
		dispatch(
			updateApproval({
				id: selectedRow.id,
				data: {
					status: "ditolak",
					reason: rejectReason,
				},
			})
		).then(() => {
			onCloseReject();
			setRejectReason(null);
		});
	};

	return (
		<>
			<ModalViewMissionApproval
				isOpen={isOpenView}
				onClose={onCloseView}
			/>

			<ModalApprove
				isOpen={isOpenApprove}
				onClose={onCloseApprove}
				onApprove={handleApproveMission}
				title={"Apakah anda yakin ingin Menerima Verifikasi Misi?"}
				message={"Misi yang terverifikasi tidak dapat diubah kembali"}
				approveStatus={status}
			/>

			<ModalReject
				isOpen={isOpenReject}
				onClose={onCloseReject}
				onReject={handleRejectMission}
				title={"Apakah anda yakin ingin Menolak Verifikasi Misi?"}
				message={"Misi yang ditolak tidak dapat diubah kembali"}
				rejectStatus={status}
			/>

			<BaseTable
				data={data}
				heads={TableHead}
				textAligns={handleTextAlign()}
			>
				{data.map((row, rowIndex) => (
					<TableBodyRow
						key={rowIndex}
						index={rowIndex}
					>
						<CenteredCell>{row.mission_id}</CenteredCell>
						<TextCell
							casing={"capitalize"}
							content={row.mission_name}
						/>
						<TextCell
							casing={"capitalize"}
							content={row.user}
						/>
						<BadgeCell
							content={row.status}
							colorScheme={handleBadges(row.status)}
						/>
						<TextCell content={formatDateToLocalDate(row.created_at)} />
						<CenteredCell>
							<CustomIconButton
								icon={<Eye />}
								color={"#828282"}
								hoverColor={"#333333"}
								onClick={() => handleViewModal(row.id)}
							/>
						</CenteredCell>
						<CenteredCell>
							{row.status.toLowerCase() === "perlu tinjauan" ? (
								<ButtonGroup>
									<Button
										colorScheme={"mainGreen"}
										_hover={{ bg: "#2DA22D" }}
										onClick={() => handleApproveModal(row)}
									>
										Setujui
									</Button>
									<Menu>
										<MenuButton
											as={Button}
											colorScheme={"red"}
											rightIcon={<ChevronDown size={20} />}
										>
											Tolak
										</MenuButton>
										<MenuList py={0}>
											<MenuOptionGroup type={"radio"}>
												{rejectMenu.map((reason, index) => (
													<MenuItemOption
														key={index}
														value={reason}
														onClick={() => handleRejectModal(row, reason)}
														_hover={{ bg: "#EBEBF0" }}
														_checked={{ bg: "#EBEBF0" }}
														py={"0.5rem"}
													>
														{reason}
													</MenuItemOption>
												))}
											</MenuOptionGroup>
										</MenuList>
									</Menu>
								</ButtonGroup>
							) : (
								"--"
							)}
						</CenteredCell>
					</TableBodyRow>
				))}
			</BaseTable>
		</>
	);
}
