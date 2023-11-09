/* eslint-disable react/prop-types */
import { IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { Trash } from "iconsax-react";
import KelolaSampahModal from "../modal/KelolaSampahModal";
import DeleteSampahModal from "../modal/DeleteSampahModal";
import { useState } from "react";

const TableHead = ["ID Penukaran", "Nama", "Email", "Lokasi Drop Point", "Action"];

export default function KelolaPenukaranTable({ data, currentPage, itemsPerPage }) {
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const {
        isOpen: isOpenDelete,
        onOpen: onOpenDelete,
        onClose: onCloseDelete,
    } = useDisclosure();

    const handleDeleteModal = (row) => {
        setSelectedRowData(row);
        onOpenDelete();
        setIsDeleteModalOpen(true);
    };    

    const handleDetailModal = (row, columnIndex) => {
        if (columnIndex === 0) {
            setSelectedRowData(row);
            setIsDetailModalOpen(true);
        }
    };    

    const handleDelete = (row) => {
        console.log("deleted!", row);
        onCloseDelete();
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            {isDetailModalOpen && (
                <KelolaSampahModal
                    onClose={() => setIsDetailModalOpen(false)}
                    rowData={selectedRowData}
                    openDeleteModal={() => setIsDeleteModalOpen(true)}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteSampahModal
                    onClose={() => setIsDeleteModalOpen(false)}
                    rowData={selectedRowData}
                />
            )}
            <TableContainer>
                <Table>
                <Thead>
                    <Tr style={{ color: "#808080" }}>
                        {TableHead.map((head, index) => (
                        <Th
                            key={head}
                            color={"#808080"}
                            textAlign={index === 0 || index === TableHead.length - 1 ? "center" : "left"}
                            textTransform={"capitalize"}
                            fontSize={"md"}
                            w={head === "ID Penukaran" ? "12%" : head === "Action" ? "16%" : "auto"}
                            padding="8px 0"
                        >
                            {head}
                        </Th>
                        ))}
                    </Tr>
                </Thead>
                    <Tbody>
                        {data.length === 0 && (
                            <Tr>
                                <Td colSpan={TableHead.length} textAlign="center">
                                    Data tidak ditemukan
                                </Td>
                            </Tr>
                        )}
                        {data.map((row, rowIndex) => (
                            <Tr
                                key={rowIndex}
                                bg={rowIndex % 2 === 0 ? "#F2F2F5" : "white"}
                                borderBlock="1px solid #C7C9D9"
                                onClick={() => handleDetailModal(row)}
                                style={{ cursor: "pointer" }}
                            >                        
                                <Td textAlign="center">
                                    {(currentPage - 1) * itemsPerPage + rowIndex + 1}
                                </Td>
                                {row.map((cell, cellIndex) => (
                                    <Td
                                        key={cellIndex}
                                        style={{ color: "#393939", fontSize: "14px" }}
                                        w="28%" // Atur lebar kolom di sini (contoh: "25%")
                                        paddingY={10}
                                        overflowWrap={"break-word"}
                                        whiteSpace={"normal"}
                                        onClick={() => handleDetailModal(row, cellIndex)}
                                    >
                                        {cell}
                                  </Td>
                                ))}
                                <Td textAlign="center">
                                    <IconButton
                                        icon={<Trash />}
                                        size="sm"
                                        bg="transparent"
                                        color="#E53535"
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