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
	{
		label: "Bukti tidak jelas",
	},
	{
		label: "Bukti kurang lengkap",
	},
	{
		label: "Tidak ada detail kejadian",
	},
];

export function TableMissionApproval({ data }) {
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
				data={tabsData} // changed later
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
				textAligns={TableHead.map((head) => {
					if (head === "ID Misi" || head === "View" || head === "Aksi") {
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
						<TextCell content={row.name} />
						<TextCell content={row.username} />
						<BadgeCell
							content={row.status}
							colorScheme={handleBadges(row.status)}
						/>
						<TextCell content={row.date} />
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
														value={item.label}
														onClick={() => handleRejectModal(row, item.label)}
														_hover={{ bg: "#EBEBF0" }}
														_checked={{ bg: "#EBEBF0" }}
														py={"0.5rem"}
													>
														{item.label}
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
