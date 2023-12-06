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
	clearDeletePromptState,
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

	const handleEditModal = async (row) => {
		try {
			const promptId = row.id;
			await dispatch(fetchPrompt(promptId));
		
			setSelectedQuestion(row);
			setSelectedCategory(row.category);
		
			onOpenEdit();
		} catch (error) {
			console.error('Error fetching prompt data:', error);
		}
	};
	  
	const { status: deleteStatus, message: deleteMessage } = useSelector(
		deletePromptSelector
	);

	const handleDeleteModal = (row) => {
		setSelectedQuestion(row);
		onOpenDelete();
	};

	const handleDelete = async (row) => {
		try {
			await dispatch(deletePrompt(row.id));
			onCloseDelete();
		} catch (error) {
		  	console.error("Error deleting prompt:", error);
		}
	};

	useEffect(() => {
		if (deleteStatus === "success") {
			dispatch(clearDeletePromptState());
		}
	}, [deleteStatus, selectedQuestion, dispatch]);	 

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
