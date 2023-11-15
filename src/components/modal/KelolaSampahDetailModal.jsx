import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Calendar, Profile, Sms, Location, CloseSquare } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";

const judulData = {
    idPenukaran: "ID Penukaran",
    namaPengguna: "Nama Lengkap",
    emailPengguna: "Email",
    point: "Poin",
    tanggalTransaksi: "Tanggal Transaksi",
    lokasiDropPoint: "Lokasi Drop Point",
    jenisSampah: "Jenis Sampah",
    satuan: "Satuan",
};

const isiDataTabel = {
    idPenukaran: "PS001",
    namaPengguna: "John Doe",
    emailPengguna: "johndoe@gmail.com",
    tanggalTransaksi: "22 November 2000",
    lokasiDropPoint: "Drop Point A",
};

export function KelolaSampahDetailModal({ isOpen, onClose, data }) {
    const { onClose: onCloseModal } = useDisclosure();

    const thStyles = {
        fontSize: "14px",
        fontWeight: 400,
        color: "var(--dark-colors-dark-3, #828282)",
        textAlign: "left",
        textTransform: "none",
    };

    const tdStyles = {
        fontSize: "14px",
        fontWeight: 600,
        color: "var(--dark-colors-dark-3, #333)",
        textAlign: "left",
    };

    const thTableStyles = {
        fontSize: "16px",
        fontWeight: 700,
        color: "var(--dark-colors-dark-3, #828282)",
        textTransform: "none",
    };
    
    const tdTableStyles  = {
        color: "#393939",
        fontSize: "16px",
        fontWeight: 400,
    }
    
    const satuanStyle = {
        fontWeight: 600
    }

    const poinStyle = {
        fontWeight: 600,
        color: "#D4AF35"
    }

    const closeSquareStyles = {
        cursor: "pointer",
    };

    const handleClose = () => {
        onClose();
    };

    const dataSampah = [
        { jenisSampah: "Plastik", satuan: 5, point: 500 },
        { jenisSampah: "Kertas", satuan: 3, point: 700 },
    ];

    const totalSatuan = dataSampah.reduce((acc, curr) => acc + curr.satuan, 0);
    const totalPoin = dataSampah.reduce((acc, curr) => acc + curr.point, 0);

    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-opacity-5 backdrop-blur flex justify-center items-center z-10 ${isOpen ? 'block' : 'hidden'}`} style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
            <div className="bg-white p-6 rounded-lg max-h-[85vh] overflow-y-auto">
                <div className="flex justify-between font-medium">
                    <h5 className="text-xl font-inter mb-6" style={{color:"#828282"}}>{judulData.idPenukaran} : 
                        <span className="text-xl font-inter ml-2" style={{color:"#333"}}>{isiDataTabel.idPenukaran}</span>
                    </h5>
                    <CloseSquare size="32" color="rgba(130, 130, 130, 1)" onClick={handleClose} style={closeSquareStyles}/>
                </div>

                <h6 className="text-base font-bold mb-6">Detail Informasi</h6>

                <div className="flex flex-col gap-10">
                    <div className="flex">
                        <div className="flex items-center gap-[8px] p-[8px] relative w-full min-w-[264px] min-h-[64px]">
                            <Profile className="relative" size="24" color="rgba(148, 148, 148, 1)"/>
                            <div className="inline-flex flex-col justify-start items-start relative flex-[0_0_auto] gap-1">
                                <div className="relative" style={{ ...thStyles}}>{judulData.namaPengguna}</div>
                                <div className="relative" style={{ ...tdStyles}}>{isiDataTabel.namaPengguna}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-[8px] p-[8px] relative w-full min-w-[264px] min-h-[64px]">
                            <Sms className="mr-1" size="24" color="rgba(148, 148, 148, 1)"/>
                            <div className="inline-flex flex-col justify-start items-start relative flex-[0_0_auto] gap-1">
                                <div className="relative" style={{ ...thStyles}}>{judulData.emailPengguna}</div>
                                <div className="relative" style={{ ...tdStyles}}>{isiDataTabel.emailPengguna}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex items-center gap-[8px] p-[8px] relative w-full min-w-[264px] min-h-[64px]">
                            <Calendar className="mr-1" size="24" color="rgba(148, 148, 148, 1)"/>
                            <div className="inline-flex flex-col justify-start items-start relative flex-[0_0_auto] gap-1">
                                <div className="relative" style={{ ...thStyles}}>{judulData.tanggalTransaksi}</div>
                                <div className="relative" style={{ ...tdStyles}}>{isiDataTabel.tanggalTransaksi}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-[8px] p-[8px] relative w-full min-w-[264px] min-h-[64px]">
                            <Location className="mr-1" size="24" color="rgba(148, 148, 148, 1)"/>
                            <div className="inline-flex flex-col justify-start items-start relative flex-[0_0_auto] gap-1">
                                <div className="relative" style={{ ...thStyles}}>{judulData.lokasiDropPoint}</div>
                                <div className="relative" style={{ ...tdStyles}}>{isiDataTabel.lokasiDropPoint}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th style={{ ...thTableStyles, paddingLeft: "22px", paddingRight: "22px", width: "46px" }}>No</Th>
                                <Th style={{ ...thTableStyles, paddingLeft: "22px", paddingRight: "22px" }}>{judulData.jenisSampah}</Th>
                                <Th style={{ ...thTableStyles, paddingLeft: "22px", paddingRight: "22px" }}>{judulData.satuan}</Th>
                                <Th style={{ ...thTableStyles, paddingLeft: "22px", paddingRight: "22px" }}>{judulData.point}</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {dataSampah.map((set, index) => (
                                <Tr key={index + 1} bg={index % 2 === 0 ? "#F2F2F5" : "white"} borderBlock={"2px solid #C4C4C4"}>
                                    <Td style={{ ...tdTableStyles, paddingLeft: "22px", paddingRight: "22px" }}>{index + 1}</Td>
                                    <Td style={{ ...tdTableStyles, paddingLeft: "22px", paddingRight: "22px" }}>{set.jenisSampah}</Td>
                                    <Td style={{ ...tdTableStyles, paddingLeft: "22px", paddingRight: "22px" }}>{set.satuan} kg</Td>
                                    <Td style={{ ...tdTableStyles, paddingLeft: "22px", paddingRight: "22px", color: "#D4AF35", fontWeight: 500 }}>+{set.point}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    <div className="grid grid-cols-4 mt-4">
                        <div className="col-span-2">
                            <p style={{ ...satuanStyle, textAlign: "right" }}>Total: </p>
                        </div>
                        <div className="col-span-1">
                            <p style={{ ...satuanStyle, paddingLeft: "38px" }}>{totalSatuan} kg</p>
                        </div>
                        <div className="col-span-1">
                            <p style={{ ...poinStyle, paddingLeft: "42px" }}>+{totalPoin}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
