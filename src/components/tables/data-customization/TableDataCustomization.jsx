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

export function TableDataCustomization({ data }) {
	const [isEditData, setIsEditData] = useState(false);
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
	}, [deleteStatus, dispatch]);

	const formatDate = () => {
		const currentDate = new Date();
		const day = currentDate.getDate().toString().padStart(2, "0");
		const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
		const year = currentDate.getFullYear();
		return `${day}/${month}/${year}`;
	};	  

	return (
		<>
			<ModalEditCustomizationData
				isOpen={isOpenEdit}
				onClose={onCloseEdit}
				category={selectedCategory || ""}
				question={selectedQuestion ? selectedQuestion[1] : ""}
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
				{data.map((row, rowIndex) => (
					<TableBodyRow
						key={rowIndex}
						index={rowIndex}
					>
						{/* ini buat datenya nanti kamu ganti kalo udah ada response dari BE @Putri-R */}
						<CenteredCell>{formatDate()}</CenteredCell>
						<TextCell content={row.category} />
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
