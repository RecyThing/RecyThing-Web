import { useState } from "react";
import { Button, ButtonGroup, useDisclosure } from "@chakra-ui/react";
import { BadgeCell, CenteredCell, TextCell } from "../base-table/TableCells";
import { BaseTable } from "../base-table/BaseTable";
import { CustomIconButton } from "@/components/buttons";
import { Eye } from "iconsax-react";
import { TableBodyRow } from "../base-table/TableRows";
import {
	ModalApprove,
	ModalReject,
	ModalRejectionReason,
	ModalViewReportingApproval,
} from "@/components/modal";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchDataReport,
	patchDataReport,
	patchDataReportSelector,
} from "@/store/report";

const TableHead = [
	"Report ID",
	"Tipe Laporan",
	"Pelapor",
	"Lokasi",
	"Tanggal",
	"Status",
	"View",
	"Aksi",
];

export function TableDataReporting({ data }) {
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

	const {
		isOpen: isOpenRejectionReason,
		onOpen: onOpenRejectionReason,
		onClose: onCloseRejectionReason,
	} = useDisclosure();

	const { status } = useSelector(patchDataReportSelector);

	const handleBadges = (status) => {
		switch (status) {
			case "perlu ditinjau":
				return "yellow";
			case "diterima":
				return "green";
			case "ditolak":
				return "red";
			default:
				return "gray";
		}
	};

	const [id, setId] = useState(null);

	const dispatch = useDispatch();
	const handleViewModal = (target) => {
		dispatch(fetchDataReport(target));
		onOpenView();
	};

	const handleModalApprove = (target) => {
		setId(target);
		onOpenApprove();
	};

	const handleModalReject = (target) => {
		setId(target);
		onOpenReject();
	};

	const handleModalRejectReason = () => {
		onOpenRejectionReason();
	};

	const handlePatchData = (id, data) => {
		dispatch(patchDataReport({ id, data })).then((res) => {
			if (res.payload) {
				if (data.status === "diterima") {
					onCloseApprove();
				}
				if (data.status === "ditolak") {
					onCloseRejectionReason();
				}
			}
		});
	};

	return (
		<>
			<ModalViewReportingApproval
				isOpen={isOpenView}
				onClose={onCloseView}
				data={id}
			/>

			<ModalApprove
				isOpen={isOpenApprove}
				onClose={onCloseApprove}
				onApprove={handlePatchData}
				target={id}
				title={"Apakah anda yakin ingin Menyetujui Laporan?"}
				message={"Laporan tidak dapat dikembalikan"}
				approveStatus={status}
			/>

			<ModalReject
				isOpen={isOpenReject}
				onClose={onCloseReject}
				onReject={handleModalRejectReason}
				target={id}
				title={"Apakah anda yakin ingin Menolak Laporan?"}
				message={"Laporan tidak dapat dikembalikan"}
			/>

			<ModalRejectionReason
				isOpen={isOpenRejectionReason}
				onClose={onCloseRejectionReason}
				target={id}
				onReject={handlePatchData}
				rejectStatus={status}
			/>

			<BaseTable
				data={data}
				heads={TableHead}
				textAligns={TableHead.map((head) => {
					if (head === "Report ID" || head === "View" || head === "Aksi") {
						return "center";
					} else {
						return "left";
					}
				})}
			>
				{data.map((row, rowIndex) => (
					<TableBodyRow
						key={rowIndex}
						index={rowIndex}
					>
						<CenteredCell>{row.id}</CenteredCell>
						<TextCell content={row.report_type} />
						<TextCell content={row.name} />
						<TextCell content={row.location} />
						<TextCell content={row.insident_date} />
						<BadgeCell
							content={row.status}
							colorScheme={handleBadges(row.status)}
						/>
						<CenteredCell>
							<CustomIconButton
								icon={<Eye />}
								color={"#828282"}
								hoverColor={"#333333"}
								onClick={() => handleViewModal(row.id)}
							/>
						</CenteredCell>
						<CenteredCell>
							{row.status === "perlu ditinjau" ? (
								<ButtonGroup>
									<Button
										colorScheme={"mainGreen"}
										_hover={{ bg: "#2DA22D" }}
										onClick={() => handleModalApprove(row.id)}
									>
										Setujui
									</Button>
									<Button
										colorScheme={"red"}
										_hover={{ bg: "#B22222" }}
										onClick={() => handleModalReject(row.id)}
									>
										Tolak
									</Button>
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
