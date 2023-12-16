import { APIDropPoint } from "@/apis/APIDropPoint";
import { BaseTable } from "../base-table/BaseTable";
import { CenteredCell, LeftAlignCell } from "../base-table/TableCells";
import { CustomIconButton } from "@/components/buttons";
import { Eye, Trash, Edit2 } from "iconsax-react";
import { ModalDelete, ModalEditDataDropPoint, ModalViewDetailDataDropPoint } from "@/components/modal";
import { TableBodyRow } from "../base-table/TableRows";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

export function TableDataDropPoint({ data, currentPage, itemsPerPage, refetch, setToastMessage }) {
	const TABLEHEADS = ["No", "Nama & Alamat Drop point", "Jam Operasional", "Aksi"];
	const { isOpen: isOpenDetail, onOpen: onOpenDetail, onClose: onCloseDetail } = useDisclosure();
	const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
	const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
	const [selectedRow, setSelectedRow] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function handleOpenDeleteModal(row) {
		setSelectedRow(row);
		onOpenDelete();
	}

	function handleOpenEditModal(row) {
		setSelectedRow(row);
		onOpenEdit();
	}

	function handleDelete(row) {
		setIsLoading(true);
		APIDropPoint.deleteDataDropPoint(row.id)
			.then((res) => {
				onCloseDelete();
				setToastMessage({ status: "success", message: res.message });
				refetch();
			})
			.finally(() => setIsLoading(false));
	}

	return (
		<div className="my-6">
			<ModalDelete
				isOpen={isOpenDelete}
				onClose={onCloseDelete}
				target={selectedRow}
				onDelete={handleDelete}
				isLoading={isLoading}
			/>
			<ModalEditDataDropPoint
				isOpen={isOpenEdit}
				onClose={(refresh) => {
					if (refresh) refetch();
					onCloseEdit();
				}}
				data={selectedRow}
				setToastMessage={setToastMessage}
			/>
			<ModalViewDetailDataDropPoint
				isOpen={isOpenDetail}
				onClose={onCloseDetail}
				data={selectedRow}
			/>

			<BaseTable
				data={data || []}
				heads={TABLEHEADS}
			>
				{data?.map((row, rowIndex) => (
					<TableBodyRow
						key={rowIndex}
						index={rowIndex}
					>
						<CenteredCell>{(currentPage - 1) * itemsPerPage + rowIndex + 1}</CenteredCell>
						<LeftAlignCell maxWidth={"0"}>
							<p className="w-fit">{row.name}</p>
							<p className="overflow-hidden text-ellipsis text-sm leading-6 text-[#828282]">{row.address}</p>
						</LeftAlignCell>
						<LeftAlignCell maxWidth={"0"}>
							<p>
								{row.schedule
									.filter((item) => item.open_time && !item.closed)
									?.map((item) => `${capitalizeFirstLetter(item.day)}`)
									.join(", ")}
							</p>
							<p className="text-sm leading-6 text-ellipsis overflow-hidden text-[#828282]">
								{row.schedule
									.filter((item) => item.open_time && !item.closed)
									?.map((item) => `${item.open_time}-${item.close_time}`)
									.join(", ")}
							</p>
						</LeftAlignCell>

						<CenteredCell>
							<div className="flex gap-2">
								<CustomIconButton
									icon={<Eye />}
									onClick={() => {
										setSelectedRow(row);
										onOpenDetail();
									}}
								/>
								<CustomIconButton
									icon={<Edit2 />}
									onClick={() => handleOpenEditModal(row)}
								/>
								<CustomIconButton
									icon={<Trash color="#E53535" />}
									onClick={() => handleOpenDeleteModal(row)}
								/>
							</div>
						</CenteredCell>
					</TableBodyRow>
				))}
			</BaseTable>
		</div>
	);
}
