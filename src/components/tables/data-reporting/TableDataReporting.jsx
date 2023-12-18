import { BadgeCell, CenteredCell, TextCell } from "../base-table/TableCells";
import { BaseTable } from "../base-table/BaseTable";
import { Button, ButtonGroup, useDisclosure } from "@chakra-ui/react";
import { CustomIconButton } from "@/components/buttons";
import { Eye } from "iconsax-react";
import { fetchDataReport, patchDataReport, patchDataReportSelector } from "@/store/report";
import { formatDateToLocalDate } from "@/utils";
import { ModalApprove, ModalReject, ModalRejectionReason, ModalViewReportingApproval } from "@/components/modal";
import { TableBodyRow } from "../base-table/TableRows";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const TABLEHEADS = ["Report ID", "Tipe Laporan", "Pelapor", "Lokasi", "Tanggal", "Status", "View", "Aksi"];

export function TableDataReporting({ data }) {
	const { isOpen: isOpenView, onOpen: onOpenView, onClose: onCloseView } = useDisclosure();
	const { isOpen: isOpenApprove, onOpen: onOpenApprove, onClose: onCloseApprove } = useDisclosure();
	const { isOpen: isOpenReject, onOpen: onOpenReject, onClose: onCloseReject } = useDisclosure();
	const { isOpen: isOpenRejectionReason, onOpen: onOpenRejectionReason, onClose: onCloseRejectionReason } = useDisclosure();

	const [id, setId] = useState(null);

	const dispatch = useDispatch();
	const { status } = useSelector(patchDataReportSelector);

	const handleBadges = (status) => {
		status = status.toLowerCase();
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

	const handleTextAlign = () => {
		return TABLEHEADS.map((head) => {
			if (head === "Report ID" || head === "View" || head === "Aksi") {
				return "center";
			} else {
				return "left";
			}
		});
	};

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

	const handleRejectedData = (id, data) => {
		dispatch(patchDataReport({ id, data })).then(() => {
			if (status === "success") {
				onCloseRejectionReason();
			}
		});
	};

	const handleApprovedData = (id) => {
		const data = {
			status: "diterima",
		};
		dispatch(patchDataReport({ id, data })).then(() => {
			if (status === "success") {
				onCloseApprove();
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
				target={id}
				title={"Apakah anda yakin ingin Menyetujui Laporan?"}
				message={"Laporan tidak dapat dikembalikan"}
				onApprove={handleApprovedData}
				approveStatus={status}
			/>

			<ModalReject
				isOpen={isOpenReject}
				onClose={onCloseReject}
				target={id}
				title={"Apakah anda yakin ingin Menolak Laporan?"}
				message={"Laporan tidak dapat dikembalikan"}
				onReject={handleModalRejectReason}
			/>

			<ModalRejectionReason
				isOpen={isOpenRejectionReason}
				onClose={onCloseRejectionReason}
				target={id}
				onReject={handleRejectedData}
				rejectStatus={status}
			/>

			<BaseTable
				data={data}
				heads={TABLEHEADS}
				textAligns={handleTextAlign()}
			>
				{data.map((row, rowIndex) => (
					<TableBodyRow
						key={rowIndex}
						index={rowIndex}
					>
						<CenteredCell>{row.id}</CenteredCell>
						<TextCell
							content={row.report_type}
							casing={"capitalize"}
							isTruncated
						/>
						<TextCell
							content={row.name}
							casing={"capitalize"}
							isTruncated
						/>
						<TextCell
							content={row.location}
							casing={"capitalize"}
							isTruncated
						/>
						<TextCell
							content={formatDateToLocalDate(row.created_at)}
							isTruncated
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
