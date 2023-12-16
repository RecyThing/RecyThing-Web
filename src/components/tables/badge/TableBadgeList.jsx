import { BadgeCell, CenteredCell, TextCell } from "../base-table/TableCells";
import { BaseTable } from "../base-table/BaseTable";
import { CustomIconButton } from "@/components/buttons";
import { Edit2 } from "iconsax-react";
import { ModalEditBadge } from "../../modal/badge/ModalEditBadge";
import { patchAchievements, toggleShouldFetchLatestAchievements } from "@/store/achievements";
import { TableBodyRow } from "../base-table/TableRows";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useState } from "react";

const TABLEHEADS = ["No", "Nama Lencana", "Badge", " Tercapai", "Total Target", "Aksi"];

export function TableBadgeList({ data }) {
	const [selectedRow, setSelectedRow] = useState(null);
	const dispatch = useDispatch();
	const { isOpen: isOpenView, onOpen: onOpenView, onClose: onCloseView } = useDisclosure();

	const handleEditModal = (row) => {
		setSelectedRow(row);
		onOpenView();
	};

	const handleSubmitModal = (data) => {
		dispatch(patchAchievements({ id: selectedRow?.id, data })).then(() => {
			onCloseView();
			dispatch(toggleShouldFetchLatestAchievements());
		});
	};

	return (
		<>
			<ModalEditBadge
				isOpen={isOpenView}
				onClose={onCloseView}
				onSubmit={handleSubmitModal}
				target={selectedRow}
			/>

			<BaseTable
				data={data}
				heads={TABLEHEADS}
			>
				{data.map((row, rowIndex) => (
					<TableBodyRow
						key={rowIndex}
						index={rowIndex}
					>
						<TextCell content={rowIndex + 1} />
						<TextCell
							className="capitalize"
							content={row.name}
						/>
						<BadgeCell
							colorScheme={rowIndex === 0 ? "azure" : rowIndex === 1 ? "gold" : rowIndex === 2 ? "silver" : "bronze"}
							content={row.name}
						/>
						<TextCell content={row.total_claimed} />
						<TextCell content={row.target_point} />
						<CenteredCell>
							{rowIndex !== 3 && (
								<CustomIconButton
									icon={<Edit2 />}
									colorScheme={"yellow"}
									hoverColor={"green"}
									variant={"solid"}
									size={"sm"}
									mr={2}
									onClick={() => handleEditModal(row)}
								/>
							)}
						</CenteredCell>
					</TableBodyRow>
				))}
			</BaseTable>
		</>
	);
}
