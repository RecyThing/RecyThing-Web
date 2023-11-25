import { useState } from "react";
import {
	Button,
	ButtonGroup,
	useDisclosure,
} from "@chakra-ui/react";
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

const TableHead = [ "Report ID", "Tipe Laporan", "Pelapor", "Lokasi", "Tanggal", "Status", "View", "Aksi", ];

export function TableDataReporting({ data }) {
	const [selectedRow, setSelectedRow] = useState(null);
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

	const handleBadges = (status) => {
		switch (status) {
			case "Perlu Tinjauan":
				return "yellow";
			case "Disetujui":
				return "green";
			case "Ditolak":
				return "red";
			default:
				return "gray";
		}
	};

	const handleViewModal = (row) => {
		setSelectedRow(row);
		onOpenView();
	};

	const handleModalApprove = (row) => {
		setSelectedRow(row);
		onOpenApprove();
	};

  const handleModalReject = (row) => {
		setSelectedRow(row);
		onOpenReject();
	};

	const handleApproveReport = () => {
		console.log("id: ", selectedRow.id);
	};

	const handleRejectReport = () => {
		console.log("id: ", selectedRow.id);
    onOpenRejectionReason();
	};

	return (
		<>
			<ModalViewReportingApproval
				isOpen={isOpenView}
				onClose={onCloseView}
				data={tabsData}
			/>

			<ModalApprove
				isOpen={isOpenApprove}
				onClose={onCloseApprove}
				onApprove={handleApproveReport}
				target={selectedRow}
				title={"Apakah anda yakin ingin Menyetujui Laporan?"}
				message={"Laporan tidak dapat dikembalikan"}
			/>

			<ModalReject
				isOpen={isOpenReject}
				onClose={onCloseReject}
				onReject={handleRejectReport}
				target={selectedRow}
				title={"Apakah anda yakin ingin Menolak Laporan?"}
				message={"Laporan tidak dapat dikembalikan"}
			/>

			<ModalRejectionReason
				isOpen={isOpenRejectionReason}
				onClose={onCloseRejectionReason}
				target={selectedRow}
				onReject={handleRejectReport}
				title={"Alasan Penolakan"}
				message={"Masukkan alasan penolakan"}
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
						<TextCell content={row.reportTypes} />
						<TextCell content={row.username} />
						<TextCell content={row.locations} />
						<TextCell content={row.date} />
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
						</CenteredCell>
						<CenteredCell>
							{row.status === "Perlu Tinjauan" ? (
								<ButtonGroup>
									<Button
										colorScheme={"mainGreen"}
										_hover={{ bg: "#2DA22D" }}
										onClick={() => handleModalApprove(row)}
									>
										Setujui
									</Button>
                  					<Button
										colorScheme={"red"}
										_hover={{ bg: "#B22222" }}
										onClick={() => handleModalReject(row)}
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

// dummy
const tabsData = [
	{
		tab: "1",
		images: [
			{
				src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg0p1LxMUPefoY0uoosNfK1L37K2HVPOY15Q&usqp=CAU",
				alt: "image 1",
			},
			{
				src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg0p1LxMUPefoY0uoosNfK1L37K2HVPOY15Q&usqp=CAU",
				alt: "image 2",
			},
			{
				src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg0p1LxMUPefoY0uoosNfK1L37K2HVPOY15Q&usqp=CAU",
				alt: "image 3",
			},
		],
		description: "Saya telah membuang sampah yang berserakan pada tempatnya.",
		uploadTime: new Date(),
	},
	{
		tab: "2",
		images: [
			{
				src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg0p1LxMUPefoY0uoosNfK1L37K2HVPOY15Q&usqp=CAU",
				alt: "image 1",
			},
		],
		description: "Saya telah membuang sampah yang berserakan pada tempatnya.",
		uploadTime: new Date(),
	},
	{
		tab: "3",
		images: [
			{
				src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg0p1LxMUPefoY0uoosNfK1L37K2HVPOY15Q&usqp=CAU",
				alt: "image 2",
			},
			{
				src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg0p1LxMUPefoY0uoosNfK1L37K2HVPOY15Q&usqp=CAU",
				alt: "image 3",
			},
		],
		description: "Saya telah membuang sampah yang berserakan pada tempatnya.",
		uploadTime: new Date(),
	},
];
// end dummy
