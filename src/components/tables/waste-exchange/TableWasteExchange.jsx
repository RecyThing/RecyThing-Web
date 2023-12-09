import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, TextCell } from "../base-table/TableCells";
import { CustomIconButton } from "@/components/buttons";
import { deleteRecycles, deleteRecyclesSelector, fetchRecycle } from "@/store/waste-exchange";
import { Eye, Trash } from "iconsax-react";
import { ModalDelete, ModalViewDetailWasteExchange } from "@/components/modal";
import { TableBodyRow } from "../base-table/TableRows";
import { TruncatedCell } from "../base-table/TableCells";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const TableHead = [
	"ID Penukaran",
	"Nama Lengkap",
	"Email",
	"Lokasi Drop Point",
	"Aksi",
];

export function TableWasteExchange({ data, currentPage, itemsPerPage }) {
	const {
		isOpen: isOpenView,
		onOpen: onOpenView,
		onClose: onCloseView,
	} = useDisclosure();

	const {
		isOpen: isOpenDelete,
		onOpen: onOpenDelete,
		onClose: onCloseDelete,
	} = useDisclosure();

	const [id, setId] = useState(null);

	const dispatch = useDispatch();
	const { status: deletestatus } = useSelector(deleteRecyclesSelector);

	const handleViewModal = (target) => {
		dispatch(fetchRecycle(target));
		onOpenView();
	};

	const handleDeleteModal = (target) => {
		setId(target);
		onOpenDelete();
	};

	const handleDelete = (target) => {
		dispatch(deleteRecycles(target));
	};

	useEffect(() => {
		if (deletestatus === "success" || deletestatus === "failed") {
			onCloseDelete();
		}
	}, [deletestatus, onCloseDelete]);

	return (
		<>
			<ModalViewDetailWasteExchange
				isOpen={isOpenView}
				onClose={onCloseView}
				data={id}
			/>

			<ModalDelete
				isOpen={isOpenDelete}
				onClose={onCloseDelete}
				target={id}
				onDelete={handleDelete}
				deleteStatus={deletestatus}
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
						<CenteredCell>
							{row.id}
						</CenteredCell>

						<TextCell
							casing={"capitalize"}
							content={row.name}
						/>
						<TextCell content={row.email} />
						<TextCell content={row.address} className="overflow-hidden text-ellipsis"/>
						<CenteredCell>
							<CustomIconButton
								icon={<Eye />}
								color={"#828282"}
								hoverColor={"#333333"}
								onClick={() => handleViewModal(row.id)}
							/>
							<CustomIconButton
								icon={<Trash />}
								color={"#E53535"}
								hoverColor={"#B22222"}
								onClick={() => handleDeleteModal(row.id)}
							/>
						</CenteredCell>
					</TableBodyRow>
				))}
			</BaseTable>
		</>
	);
}
