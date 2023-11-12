import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Pagination } from "../components/pagination/Pagination";
import { SearchNormal1, Add, Profile, Sms, Location, AddSquare, ArrowDown2 } from "iconsax-react";
import { Flex } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import KelolaPenukaranTable from "../components/tables/KelolaPenukaranTable";

function KelolaPenukaranSampah() {
    const [isTambahData, setIsTambahData] = useState(false);
    const [filterSearch, setFilterSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isFocused, setIsFocused] = useState(false);

    const { control, handleSubmit, register, setValue, watch } = useForm({
        defaultValues: {
            data: [
                { jenisSampah: "logam", satuan: 1 },
            ],
        },
    });
    const { fields, append } = useFieldArray({
        control,
        name: "data",
    });

    const openForm = () => {
        setIsTambahData(true);
    };
    
    const closeForm = () => {
        setIsTambahData(false);
    };
    
    const clickPoint = useRef();
    const [searchTerm, setSearchTerm] = useState("");

    const handleFocus = () => {
        if (clickPoint.current) {
          clickPoint.current.style.display = "none";
        }
        setIsFocused(true);
    };
      
      const handleBlur = () => {
        if (clickPoint.current) {
            clickPoint.current.style.display = "block";
        }
        setIsFocused(false);
    };
      
    const handleAddData = () => {
        append({ jenisSampah: "logam", satuan: 1});
    };

    const watchSatuan = watch("data", []);

    const onSubmit = (data) => {
        console.log(data);
    };

    const filteredData = DummyData.filter(([username]) =>
		username.toLowerCase().includes(filterSearch.toLowerCase())
	);     

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return (
        <div className="p-6 w-full" style={{background: "#EBEBF0"}}>
        {isTambahData ? (
            <div className="fixed top-0 left-0 w-full h-full bg-opacity-5 backdrop-blur flex justify-center items-center z-10" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
                <div className="bg-white p-6 rounded-lg">
                    <h4 className="text-gray-800 text-2xl font-bold font-inter mb-6">Tambah Data Penukaran Sampah</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex gap-x-6">
                            <div className="flex items-center border rounded-xl p-4 relative mb-6" style={{ width: "328px", borderColor: "rgba(130, 130, 130, 1)"}}>
                                <Profile className="mr-2" size="24" color="rgba(148, 148, 148, 1)"/>
                                <input type="text" className="w-full outline-none text-sm relative" placeholder="Masukkan nama pengguna"/>
                                <label htmlFor="" className="text-xs absolute -top-2 left-3 bg-white px-1" style={{color: "rgba(130, 130, 130, 1)"}}>Nama Pengguna</label>
                            </div>
                            <div className="flex items-center border rounded-xl p-4 relative mb-6" style={{ width: "328px", borderColor: "rgba(130, 130, 130, 1)"}}>
                                <Sms className="mr-2" size="24" color="rgba(148, 148, 148, 1)"/>
                                <input type="email" className="w-full outline-none text-sm relative" placeholder="Masukkan email pengguna"/>
                                <label htmlFor="" className="text-xs absolute -top-2 left-3 bg-white px-1" style={{color: "rgba(130, 130, 130, 1)"}}>Email Pengguna</label>
                            </div>
                        </div>
                        <div className="flex items-center border rounded-xl w-full p-4 mb-6 relative" style={{ borderColor: "rgba(130, 130, 130, 1)"}}>
                            <Location className="mr-2" size="24" color="rgba(148, 148, 148, 1)"/>
                            <input type="email" className="w-full outline-none text-sm relative" placeholder="Masukkan lokasi drop point"/>
                            <label htmlFor="" className="text-xs absolute -top-2 left-3 bg-white px-1" style={{color: "rgba(130, 130, 130, 1)"}}>Lokasi Drop Point</label>
                        </div>
                        <div className="w-full">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-sm text-left" style={{ background: "#F2F2F5"}}>
                                        <th className="font-medium font-inter p-2">Jenis Sampah</th>
                                        <th className="font-medium font-inter w-52">Satuan</th>
                                        <th className="font-medium font-inter">Poin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fields.map((field, index) => (
                                        <tr key={field.id}>
                                            <td>
                                                <div className="relative mt-6">
                                                    <Controller
                                                        name={`data[${index}].jenisSampah`}
                                                        control={control}
                                                        defaultValue="logam"
                                                        render={({ field }) => (
                                                            <select
                                                                {...field}
                                                                className="border rounded-lg w-56 p-2 pl-3 text-sm appearance-none"
                                                                style={{ color: "rgba(79, 79, 79, 1)", borderColor: "rgba(79, 79, 79, 1)" }}
                                                            >
                                                                <option value="logam">Logam</option>
                                                                <option value="plastik">Plastik</option>
                                                                <option value="kertas">Kertas</option>
                                                                <option value="kaca">Kaca</option>
                                                            </select>
                                                        )}
                                                    />
                                                    <ArrowDown2 size="24" color="rgba(148, 148, 148, 1)" className="absolute inset-y-0 right-28 mt-2 items-center pointer-events-none"/>
                                                </div>
                                            </td>
                                            <td key={field.id}>
                                                <input
                                                    {...register(`data[${index}].satuan`)}
                                                    type="text"
                                                    className="border rounded-lg w-32 p-2 pl-3 text-sm appearance-none mt-6"
                                                    style={{ color: "rgba(130, 130, 130, 1)", borderColor: "rgba(130, 130, 130, 1)" }}
                                                    name={`data[${index}].satuan`}
                                                    min="0"
                                                    step="1"
                                                />
                                            </td>
                                            <td>
                                                <div className="text-sm font-semibold font-inter mt-6 w-24" style={{ color: "rgba(255, 205, 41, 1)" }}>
                                                    +{watchSatuan[index]?.jenisSampah === "logam" ? 500 : 0} Poin
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex gap-64 mt-6">
                                <div className="flex gap-2" style={{ color: "rgba(130, 130, 130, 1)" }}>
                                    <AddSquare size="24" color="rgba(148, 148, 148, 1)" />
                                    <button type="button" onClick={handleAddData}>Tambah Data</button>
                                </div>
                                <div className="flex gap-20">
                                    <p className="text-sm font-semibold font-inter">Total Poin</p>
                                    <p className="text-sm font-semibold font-inter" style={{ color: "rgba(255, 205, 41, 1)", marginRight: "70px" }}>
                                        +{watchSatuan.reduce((acc, cur) => acc + (cur?.satuan || 0) * (cur?.jenisSampah === "logam" ? 500 : 0), 0)} Poin
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="flex gap-4 mt-6 justify-end">
                        <button className="w-36 rounded-lg p-2 text-base font-bold" style={{background:"rgba(130, 130, 130, 1)", color:"#FFF"}} onClick={closeForm}>Batal</button>
                        <button className="w-36 rounded-lg p-3 text-base font-bold" style={{background:"#35CC33", color:"#FFF"}} onClick={closeForm}>Simpan</button>
                    </div>
                </div>
            </div>
        ) : null}
        <h4 className="text-gray-800 text-2xl font-bold font-inter">Kelola Penukaran Sampah</h4>

        <div className="bg-white rounded-lg shadow-md mt-4 p-4 h-90%">
            <div className="flex justify-between items-center mb-4 ml-2">
                <div className="flex items-center">
                    <div className={`relative`}>
                    {!isFocused && (
                        <div className="absolute top-3 left-3">
                        <SearchNormal1 size="24" color="rgba(130, 130, 130, 1)" />
                      </div>
                    )}
                    <input
                        type="text"
                        className="p-3 pl-11 w-96 text-gray-900 bg-white rounded-lg border focus:pl-3 outline-none" style={{ borderColor: "rgba(130, 130, 130, 1)"}}
                        placeholder="Cari disini..."
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    </div>
                </div>

                <div className={`text-white font-inter font-medium text-lg flex items-center gap-2 mr-2 p-3 w-44 h-12 rounded-lg cursor-pointer ${isFocused ? 'ml-3' : ''}`} style={{ backgroundColor: "rgba(53, 204, 51, 1)" }} onClick={openForm}>
                    <Add size="24" color="rgba(255, 255, 255, 1)" />
                    <p>Tambah Data</p>
                </div>
            </div>      
            <Flex
                direction={"column"}
                gap={"1.5rem"}
                p={"0.5rem"}
                marginTop={"16px"}
            >
                <KelolaPenukaranTable
                    data={paginatedData}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                />
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onChangeItemsPerPage={setItemsPerPage}
                    onChangePage={setCurrentPage}
                    totalItems={filteredData.length}
                />
            </Flex>
        </div>
        </div>
    );
}

export default KelolaPenukaranSampah;

const getPointsByType = (jenisSampah) => {
    const pointsMap = {
        logam: 500,
        plastik: 400,
        kertas: 300,
        kaca: 200,
    };
    return pointsMap[jenisSampah] || 0;
};

const DummyData = [
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
	["Putri Ramadhani", "123@gmail.com", "Drop Point A"],
];