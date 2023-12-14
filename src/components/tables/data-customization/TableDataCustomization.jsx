import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell } from "../base-table/TableCells";
import { CustomIconButton } from "@/components/buttons";
import { Edit2, Trash } from "iconsax-react";
import { fetchPrompt, deletePrompt, deletePromptSelector, updatePromptSelector } from "@/store/prompt";
import { formatDateToLocalDateString } from "@/utils";
import { ModalDelete, ModalEditCustomizationData } from "@/components/modal";
import { TableBodyRow } from "../base-table/TableRows";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const TABLEHEADS = ["Tanggal", "Topik", "Pertanyaan", "Aksi"];

/**
 * TableDataCustomization is a table component that is used to display prompt data.
 * @param {{data: any[]}} props - The props object.
 * @returns {JSX.Element} The TableDataCustomization component.
 */
export function TableDataCustomization({ data }) {
	const dispatch = useDispatch();

	const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();

	const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

	const [selectedQuestion, setSelectedQuestion] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const handleEditModal = (row) => {
		const promptId = row.id;

		dispatch(fetchPrompt(promptId));

		setSelectedQuestion(row);
		setSelectedCategory(row.category);

		onOpenEdit();
	};

	const { status: updateStatus } = useSelector(updatePromptSelector);
	const { status: deleteStatus } = useSelector(deletePromptSelector);

	const handleDeleteModal = (row) => {
		setSelectedQuestion(row);
		onOpenDelete();
	};

	const handleDelete = (row) => {
		dispatch(deletePrompt(row.id)).then(() => {
			if (deleteStatus === "success") {
				onCloseDelete();
			}
		});
	};

	useEffect(() => {
		if (updateStatus === "success") {
			onCloseEdit();
		}
	}, [updateStatus, onCloseEdit]);

	const sortedData = [...data].sort((a, b) => {
		const dateA = new Date(a.created_at);
		const dateB = new Date(b.created_at);
		return dateB - dateA;
	});

	return (
		<>
			<ModalEditCustomizationData
				isOpen={isOpenEdit}
				onClose={onCloseEdit}
				selectedQuestion={selectedQuestion}
				selectedCategory={selectedCategory}
			/>
			<ModalDelete
				isOpen={isOpenDelete}
				onClose={onCloseDelete}
				target={selectedQuestion}
				onDelete={() => handleDelete(selectedQuestion)}
				isLoading={deleteStatus === "loading"}
			/>
			<BaseTable
				data={data}
				heads={TABLEHEADS}
			>
				{sortedData.map((row, rowIndex) => (
					<TableBodyRow
						key={rowIndex}
						index={rowIndex}
					>
						<CenteredCell>{formatDateToLocalDateString(row.created_at)}</CenteredCell>
						<TextCell
							content={row.category}
							maxWidth={"2rem"}
							casing={"capitalize"}
						/>
						<TextCell
							content={row.question}
							casing={"capitalize"}
							maxWidth={"25rem"}
							isTruncated={true}
						/>

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
