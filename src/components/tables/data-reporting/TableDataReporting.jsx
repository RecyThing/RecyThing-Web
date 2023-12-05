import { useState } from "react";
import {
	Button,
	ButtonGroup,
	useDisclosure,
} from "@chakra-ui/react";
import { BadgeCell, CenteredCell, TextCell } from "../base-table/TableCells";
import { BaseTable } from "../base-table/BaseTable";
import { CustomIconButton } from "@/components/buttons";
import { Data, Eye } from "iconsax-react";
import { TableBodyRow } from "../base-table/TableRows";
import {
	ModalApprove,
	ModalReject,
  	ModalRejectionReason,
	ModalViewReportingApproval,
} from "@/components/modal";
import { useDispatch } from "react-redux";
import { fetchDataReport } from "@/store/report";

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

	const handleRejectReport = () => {
    onOpenRejectionReason();
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
			/>

			<ModalReject
				isOpen={isOpenReject}
				onClose={onCloseReject}
				onReject={handleRejectReport}
				target={id}
				title={"Apakah anda yakin ingin Menolak Laporan?"}
				message={"Laporan tidak dapat dikembalikan"}
			/>

			<ModalRejectionReason
				isOpen={isOpenRejectionReason}
				onClose={onCloseRejectionReason}
				target={id}
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
				{/* {console.log(data)} */}
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
