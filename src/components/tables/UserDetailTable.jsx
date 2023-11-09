/* eslint-disable react/prop-types */
import {
	IconButton,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useDisclosure,
} from "@chakra-ui/react";
import { Eye, Trash } from "iconsax-react";
import { DeleteModal, UserDetailModal } from "@/components/modal";
import { useState } from "react";

const TableHead = ["No", "Username", "Email", "Total Poin", "Aksi"];

export function UserDetailTable({ data, currentPage, itemsPerPage }) {
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
	const [selectedRow, setSelectedRow] = useState(null);

	const handleViewModal = (row) => {
		setSelectedRow(row);
		onOpenView();
	};

	const handleDeleteModal = (row) => {
		setSelectedRow(row);
		onOpenDelete();
	};

	const handleDelete = (row) => {
		console.log("deleted!", row);
		onCloseDelete();
	};

	return (
		<>
			<UserDetailModal
				isOpen={isOpenView}
				onClose={onCloseView}
				data={selectedRow}
			/>
			<DeleteModal
				isOpen={isOpenDelete}
				onClose={onCloseDelete}
				target={selectedRow}
				onDelete={handleDelete}
			/>
			<TableContainer>
				<Table>
					<Thead>
						<Tr>
							{TableHead.map((head) => (
								<Th
									key={head}
									color={"#7F7F7F"}
									textAlign={
										head !== "No" && head !== "Aksi" ? "left" : "center"
									}
									textTransform={"capitalize"}
									fontSize={"md"}
									{...(head === "No" && { width: "5%" })}
									{...(head === "Aksi" && { width: "10%" })}
								>
									{head}
								</Th>
							))}
						</Tr>
					</Thead>
					<Tbody>
						{data.length === 0 && (
							<Tr>
								<Td
									colSpan={TableHead.length}
									textAlign={"center"}
								>
									Data tidak ditemukan
								</Td>
							</Tr>
						)}
						{data.map((row, rowIndex) => (
							<Tr
								key={rowIndex}
								bg={rowIndex % 2 === 0 ? "#F2F2F5" : "white"}
								borderBlock={"2px solid #C4C4C4"}
								_hover={{ bg: "#E0F3FF" }}
							>
								<Td textAlign="center">
									{(currentPage - 1) * itemsPerPage + rowIndex + 1}
								</Td>
								{row.map((cell, cellIndex) => (
									<Td
										key={cellIndex}
										color={"#383838"}
										w={"12.5rem"}
										overflowWrap={"break-word"}
										whiteSpace={"normal"}
									>
										{cell}
									</Td>
								))}
								<Td textAlign="center">
									<IconButton
										icon={<Eye />}
										size={"sm"}
										bg={"transparent"}
										color={"#828282"}
										_hover={{ bg: "transparent", color: "#333333" }}
										_focus={{ boxShadow: "none" }}
										onClick={() => handleViewModal(row)}
									/>
									<IconButton
										icon={<Trash />}
										size={"sm"}
										bg={"transparent"}
										color={"#E53535"}
										_hover={{ bg: "transparent", color: "#B22222" }}
										_focus={{ boxShadow: "none" }}
										onClick={() => handleDeleteModal(row)}
									/>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
}
