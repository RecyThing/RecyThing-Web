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
import { useDispatch } from "react-redux";
import { fetchApproval } from "@/store/approval-mission";

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

	const handleApproveModal = (row) => {
		setSelectedRow(row);
		onOpenApprove();
	};

	const handleApproveMission = () => {
		console.log("id: ", selectedRow.id);
	};

	const handleRejectModal = (row, reason) => {
		setSelectedRow(row);
		setRejectReason(reason);
		onOpenReject();
	};

	const handleRejectMission = () => {
		console.log("id: ", selectedRow.id);
		console.log("reason: ", rejectReason);
		setRejectReason(null);
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
				target={selectedRow}
				title={"Apakah anda yakin ingin Menerima Verifikasi Misi?"}
				message={"Misi yang terverifikasi tidak dapat diubah kembali"}
			/>

			<ModalReject
				isOpen={isOpenReject}
				onClose={onCloseReject}
				onReject={handleRejectMission}
				target={selectedRow}
				title={"Apakah anda yakin ingin Menolak Verifikasi Misi?"}
				message={"Misi yang ditolak tidak dapat diubah kembali"}
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
												{rejectMenu.map((item, index) => (
													<MenuItemOption
														key={index}
														value={item}
														onClick={() => handleRejectModal(row, item)}
														_hover={{ bg: "#EBEBF0" }}
														_checked={{ bg: "#EBEBF0" }}
														py={"0.5rem"}
													>
														{item}
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
