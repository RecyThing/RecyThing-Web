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
import { BaseTable } from "./base-table/BaseTable";
import { TableBodyRow } from "./base-table/TableRows";
import { BadgeCell, CenteredCell, TextCell } from "./base-table/TableCells";
import { CustomIconButton } from "@/components/buttons";
import { ViewMissionApprovalModal } from "@/components/modal";
import { Eye } from "iconsax-react";
import { ChevronDown } from "react-iconly";

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

export function MissionApprovalTable({ data }) {
	const [selectedRow, setSelectedRow] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

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

	const handleRejectStatus = (status) => {
		rejectMenu.forEach((item) => {
			if (item.label === status) {
				console.log("reason: ", item.label);
			}
		});
	};

	const handleApproveMission = (id) => {
		console.log("id: ", id);
	};

	const handleViewModal = (row) => {
		setSelectedRow(row);
		onOpen();
	};

	return (
		<>
			<ViewMissionApprovalModal
				isOpen={isOpen}
				onClose={onClose}
				data={tabsData} // changed later
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
										onClick={() => handleApproveMission(row.id)}
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
														onClick={() => handleRejectStatus(item.label)}
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
