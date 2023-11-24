import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell } from "../base-table/TableCells";
import { TruncatedCell } from "../base-table/TableCells";
import { TableBodyRow } from "../base-table/TableRows";
import { CustomIconButton } from "@/components/buttons";
import { Edit2, Trash } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { ModalDelete, ModalEditCustomizationData } from "@/components/modal";

const TableHead = ["Tanggal", "Topik", "Pertanyaan", "Aksi"];

export function TableDataCustomization({ data }) {
	const [isEditData, setIsEditData] = useState(false);

	const {
		isOpen: isOpenEdit,
		onOpen: onOpenEdit,
		onClose: onCloseEdit,
	} = useDisclosure();

	const {
		isOpen: isOpenDelete,
		onOpen: onOpenDelete,
		onClose: onCloseDelete,
	} = useDisclosure();

	const [selectedQuestion, setSelectedQuestion] = useState(null);
	const [selectedTopic, setSelectedTopic] = useState(null);

	const handleEditModal = (row) => {
		setSelectedQuestion(row);
		setSelectedTopic(row);
		onOpenEdit();
	};

	const handleDeleteModal = (row) => {
		setSelectedQuestion(row);
		onOpenDelete();
	};

	const handleDelete = (row) => {
		console.log("deleted!", row);
		onCloseDelete();
	};

	const formatDate = () => {
		const date = new Date("2023-01-21");
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	return (
		<>
			<ModalEditCustomizationData
				isOpen={isOpenEdit}
				onClose={onCloseEdit}
				setIsEditData={setIsEditData}
				topic={selectedTopic ? selectedTopic[0] : ""}
				question={selectedQuestion ? selectedQuestion[1] : ""}
			/>
			<ModalDelete
				isOpen={isOpenDelete}
				onClose={onCloseDelete}
				target={selectedQuestion}
				onDelete={handleDelete}
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
						<CenteredCell>{formatDate()}</CenteredCell>

						{row.map((cell, cellIndex) => (
							<TruncatedCell
								key={cellIndex}
								content={cell}
								maxWidth={17}
							/>
						))}
						<CenteredCell>
							<CustomIconButton
								icon={<Edit2 />}
								color={"rgba(32, 26, 24, 1)"}
								hoverColor={"#585858"}
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
