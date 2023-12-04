import { useState } from "react";
import { BaseTable } from "../base-table/BaseTable";
import { TableBodyRow } from "../base-table/TableRows";
import { CenteredCell, LeftAlignCell } from "../base-table/TableCells";
import { CustomIconButton } from "@/components/buttons";
import { Eye, Trash } from "iconsax-react";
import { Edit } from "react-iconly";
import { useDisclosure } from "@chakra-ui/react";
import {
	ModalDelete,
	ModalEditDataDropPoint,
	ModalViewDetailDataDropPoint,
} from "@/components/modal";

export function TableDataDropPoint({ data }) {
	const TableHead = [
		"No",
		"Nama & Alamat Drop point",
		"Jam Operasional",
		"Aksi",
	];
	const {
		isOpen: isOpenDetail,
		onOpen: onOpenDetail,
		onClose: onCloseDetail,
	} = useDisclosure();
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
	const [selectedRow, setSelectedRow] = useState(null);

	function handleOpenDeleteModal(row) {
		setSelectedRow(row);
		onOpenDelete();
	}

	function handleDelete(row) {
		console.log("deleted!", row);
		onCloseDelete();
	}

	return (
		<div className="my-6">
			<ModalDelete
				isOpen={isOpenDelete}
				onClose={onCloseDelete}
				target={selectedRow}
				onDelete={handleDelete}
			/>
			<ModalEditDataDropPoint
				isOpen={isOpenEdit}
				onClose={onCloseEdit}
			/>
			<ModalViewDetailDataDropPoint
				isOpen={isOpenDetail}
				onClose={onCloseDetail}
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
						<CenteredCell>{rowIndex + 1}</CenteredCell>
						<LeftAlignCell maxWidth={"0"}>
							<p className="w-fit">{row.name}</p>
							<p className="overflow-hidden text-ellipsis">{row.address}</p>
						</LeftAlignCell>
						<LeftAlignCell>
							<p>{row.days}</p>
							<p>{row.time}</p>
						</LeftAlignCell>

						<CenteredCell>
							<div className="flex gap-2">
								<CustomIconButton
									icon={<Eye />}
									onClick={onOpenDetail}
								/>
								<CustomIconButton
									icon={<Edit />}
									onClick={onOpenEdit}
								/>
								<CustomIconButton
									icon={<Trash color="#E53535" />}
									onClick={() => handleOpenDeleteModal(row.name)}
								/>
							</div>
						</CenteredCell>
					</TableBodyRow>
				))}
			</BaseTable>
		</div>
	);
}
