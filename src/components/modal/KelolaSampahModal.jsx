import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { CloseSquare } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";

const dataTitle = {
    idPenukaran: "ID Penukaran",
    namaPengguna: "Nama Pengguna",
    emailPengguna: "Email Pengguna",
    point: "Total Point",
    tanggalTransaksi: "Tanggal Transaksi",
    lokasiDropPoint: "Lokasi Drop Point",
    jenisSampah: "Jenis Sampah",
    berat: "Berat (kg)",
};

const isiDataTabel = {
    idPenukaran: 1,
    namaPengguna: "John Doe",
    emailPengguna: "johndoe@gmail.com",
    point: 3000,
    tanggalTransaksi: "22 November 2000",
    lokasiDropPoint: "Drop Point A",
    jenisSampah: "Plastik",
    berat: 5,
};

function KelolaSampahModal({ onClose, rowData }) {
    const { onClose: onCloseModal } = useDisclosure();

    const thStyles = {
        fontSize: "16px",
        fontWeight: 500,
        color: "var(--dark-colors-dark-3, #828282)",
        textAlign: "left",
    };

    const tdStyles = {
        fontSize: "16px",
        fontWeight: 700,
        color: "var(--dark-colors-dark-3, #333)",
        textAlign: "left",
    };

    const closeSquareStyles = {
        cursor: "pointer",
    };

    const handleClose = () => {
        onCloseModal();
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-5 backdrop-blur flex justify-center items-center z-10" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
        <div className="bg-white p-6 rounded-lg">
            <div className="flex justify-between">
                <h5 className="text-xl font-inter mb-6 ml-5" style={{color:"#828282"}}>{dataTitle.idPenukaran} : 
                    <span className="text-xl font-inter" style={{color:"#333"}}>{isiDataTabel.idPenukaran}</span>
                </h5>
                <CloseSquare size="32" color="rgba(130, 130, 130, 1)" onClick={handleClose} style={closeSquareStyles}/>
            </div>
            <div>
                <Table>
                    <Thead>
                        <Tr>
                            <Th style={{ ...thStyles, paddingLeft: "22px", paddingRight: "22px" }}>{dataTitle.namaPengguna}</Th>
                            <Th style={{ ...thStyles, paddingLeft: "22px", paddingRight: "22px" }}>{dataTitle.emailPengguna}</Th>
                            <Th style={{ ...thStyles, paddingLeft: "22px", paddingRight: "22px" }}>{dataTitle.tanggalTransaksi}</Th>
                            <Th style={{ ...thStyles, paddingLeft: "22px", paddingRight: "22px" }}>{dataTitle.lokasiDropPoint}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td style={{ ...tdStyles, paddingLeft: "22px", paddingRight: "22px"}}>{isiDataTabel.namaPengguna}</Td>
                            <Td style={{ ...tdStyles, paddingLeft: "22px", paddingRight: "22px"}}>{isiDataTabel.emailPengguna}</Td>
                            <Td style={{ ...tdStyles, paddingLeft: "22px", paddingRight: "22px"}}>{isiDataTabel.tanggalTransaksi}</Td>
                            <Td style={{ ...tdStyles, paddingLeft: "22px", paddingRight: "22px"}}>{isiDataTabel.lokasiDropPoint}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </div>
            <div className="mt-8">
                <Table>
                    <Thead>
                        <Tr>
                            <Th style={{ ...thStyles, paddingLeft: "22px", paddingRight: "22px" }}>{dataTitle.jenisSampah}</Th>
                            <Th style={{ ...thStyles, paddingLeft: "22px", paddingRight: "22px" }}>{dataTitle.berat}</Th>
                            <Th style={{ ...thStyles, paddingLeft: "22px", paddingRight: "22px" }}>{dataTitle.point}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td style={{ ...tdStyles, paddingLeft: "22px", paddingRight: "22px"}}>
                                <ul style={{ listStyleType: "disc", margin: 0, paddingInlineStart: "1em" }}>
                                    <li>{isiDataTabel.jenisSampah}</li>
                                </ul>
                            </Td>
                            <Td style={{ ...tdStyles, paddingLeft: "22px", paddingRight: "22px"}}>{isiDataTabel.berat}</Td>
                            <Td style={{ ...tdStyles, paddingLeft: "22px", paddingRight: "22px", color:"rgba(255, 205, 41, 1)"}}>+{isiDataTabel.point}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </div>
        </div>
        </div>
    );
}

export default KelolaSampahModal;
