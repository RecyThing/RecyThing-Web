import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell } from "../base-table/TableCells";
import { TruncatedCell } from "../base-table/TableCells";
import { TableBodyRow } from "../base-table/TableRows";
import { CustomIconButton } from "@/components/buttons";
import { Edit2, Trash } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrompt,
	deletePrompt,
	deletePromptSelector,
	updatePromptSelector,
} from '@/store/prompt';
import { ModalDelete, ModalEditCustomizationData } from "@/components/modal";

const TableHead = ["Tanggal", "Topik", "Pertanyaan", "Aksi"];

function capitalizeWords(string) {
	return string.replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDateToCustomFormat(dateString) {
	const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
	const date = new Date(dateString);
	return date.toLocaleDateString('en-GB', options);
}

export function TableDataCustomization({ data }) {
	const dispatch = useDispatch();
	const [id, setId] = useState(null);

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
	const [selectedCategory, setSelectedCategory] = useState(null);

	const handleEditModal = (row) => {
		const promptId = row.id;
	  
		setId(promptId);
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
		dispatch(deletePrompt(row.id));
	};

	useEffect(() => {
		if (updateStatus === "success" || updateStatus === "failed") {
			onCloseEdit();
		}
	}, [updateStatus, onCloseEdit]);

	useEffect(() => {
		if (deleteStatus === "success" || deleteStatus === "failed") {
			onCloseDelete();
		}
	}, [deleteStatus, onCloseDelete]);

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
				deleteStatus={deleteStatus}
			/>
			<BaseTable
				data={data}
				heads={TableHead}
			>
				{sortedData.map((row, rowIndex) => (
					<TableBodyRow
						key={rowIndex}
						index={rowIndex}
					>
						{/* ini buat datenya nanti kamu ganti kalo udah ada response dari BE @Putri-R */}
						<CenteredCell>{formatDateToCustomFormat(row.created_at)}</CenteredCell>
						<TextCell content={capitalizeWords(row.category)} />
						<TruncatedCell content={row.question} />

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
