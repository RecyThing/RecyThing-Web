import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Pagination } from "../components/pagination/Pagination";
import { SearchNormal1, Add, Profile, Sms, Location, AddSquare, ArrowDown2 } from "iconsax-react";
import { Flex } from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import KelolaPenukaranTable from "../components/tables/KelolaPenukaranTable";

function KelolaPenukaranSampah() {
    const [isTambahData, setIsTambahData] = useState(false);
    const [filterSearch, setFilterSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

    const { control, handleSubmit, register, setValue, watch } = useForm({
        defaultValues: {
            data: [
                { jenisSampah: "logam", berat: 1 },
            ],
        },
    });
    const { fields, append, remove } = useFieldArray({
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
        clickPoint.current.style.display = "none";
    };

    const handleBlur = () => {
        clickPoint.current.style.display = "block";
    };

    const handleAddData = () => {
        append({ jenisSampah: "logam", berat: 1 });
    };

    const watchBerat = watch("data", []);

    const onSubmit = (data) => {
        console.log(data);
        setValue("data", [{ jenisSampah: "logam", berat: 1 }]);
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
                    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-x-12">
                        <div>
                            <div className="flex items-center border rounded-lg border-gray-400 w-80 p-4 relative mb-6">
                                <Profile className="mr-1" size="24" color="rgba(148, 148, 148, 1)"/>
                                <input type="text" className="w-full outline-none text-sm relative" placeholder="Masukkan nama pengguna"/>
                                <label htmlFor="" className="text-xs absolute -top-2 left-3 bg-white px-1" style={{color: "#828282"}}>Nama Pengguna</label>
                            </div>
                            <div className="flex items-center border rounded-lg border-gray-400 w-80 p-4 relative mb-6">
                                <Sms className="mr-1" size="24" color="rgba(148, 148, 148, 1)"/>
                                <input type="email" className="w-full outline-none text-sm relative" placeholder="Masukkan email pengguna"/>
                                <label htmlFor="" className="text-xs absolute -top-2 left-3 bg-white px-1" style={{color: "#828282"}}>Email Pengguna</label>
                            </div>
                            <div className="flex items-center border rounded-lg border-gray-400 w-80 p-4 relative">
                                <Location className="mr-1" size="24" color="rgba(148, 148, 148, 1)"/>
                                <input type="email" className="w-full outline-none text-sm relative" placeholder="Masukkan lokasi drop point"/>
                                <label htmlFor="" className="text-xs absolute -top-2 left-3 bg-white px-1" style={{color: "#828282"}}>Lokasi Drop Point</label>
                            </div>
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr className="text-sm" style={{ background: "#F2F2F5" }}>
                                        <th className="font-medium font-inter w-48">Jenis Sampah</th>
                                        <th className="font-medium font-inter w-40">Berat (kg)</th>
                                        <th className="font-medium font-inter w-24">Poin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fields.map((field, index) => (
                                        <tr key={field.id}>
                                            <td>
                                                <div className="relative mt-4">
                                                    <Controller
                                                        name={`data[${index}].jenisSampah`}
                                                        control={control}
                                                        defaultValue="logam"
                                                        render={({ field }) => (
                                                            <select
                                                                {...field}
                                                                className="border rounded-lg border-gray-400 w-48 p-2 pl-3 text-sm appearance-none"
                                                                style={{ color: "#4F4F4F" }}
                                                            >
                                                                <option value="logam">Logam</option>
                                                                <option value="plastik">Plastik</option>
                                                                <option value="kertas">Kertas</option>
                                                                <option value="kaca">Kaca</option>
                                                            </select>
                                                        )}
                                                    />
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                                        <ArrowDown2 size="24" color="rgba(148, 148, 148, 1)" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <input
                                                    {...register(`data[${index}].berat`)}
                                                    type="number"
                                                    className="border rounded-lg border-gray-400 w-24 p-2 pl-3 text-sm appearance-none mx-5 mt-4"
                                                    style={{ color: "#4F4F4F" }}
                                                    name={`data[${index}].berat`}
                                                    min="0"
                                                    step="1"
                                                />
                                            </td>
                                            <td>
                                                <div className="text-sm font-semibold font-inter mt-4 w-24" style={{ color: "rgba(255, 205, 41, 1)" }}>
                                                    +{watchBerat[index]?.jenisSampah === "logam" ? 500 : 0} Poin
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-between mt-6 w-96">
                                <div className="flex gap-2" style={{ color: "#828282" }}>
                                    <AddSquare size="24" color="rgba(148, 148, 148, 1)" />
                                    <button type="button" onClick={handleAddData}>Tambah Data</button>
                                </div>
                                <div className="flex gap-12">
                                    <p className="text-sm font-semibold font-inter">Total Poin</p>
                                    <p className="text-sm font-semibold font-inter -mr-10" style={{ color: "rgba(255, 205, 41, 1)" }}>
                                        +{watchBerat.reduce((acc, cur) => acc + (cur?.berat || 0) * (cur?.jenisSampah === "logam" ? 500 : 0), 0)} Poin
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="flex gap-8 mt-8">
                        <button className="w-36 rounded-lg p-4 text-base font-bold" style={{background:"rgba(130, 130, 130, 1)", color:"#FFF"}} onClick={closeForm}>Batal</button>
                        <button className="w-36 rounded-lg p-4 text-base font-bold" style={{background:"#35CC33", color:"#FFF"}} onClick={closeForm}>Simpan</button>
                    </div>
                </div>
            </div>
        ) : null}
        <h4 className="text-gray-800 text-2xl font-bold font-inter">Kelola Penukaran Sampah</h4>

        <div className="bg-white rounded-lg shadow-md mt-4 p-4 h-90%">
            <div className="flex justify-between items-start">
                <div className="flex items-center">
                    <div className="relative">
                        <div className="absolute top-3 left-3" ref={clickPoint} style={{ display: "block" }}>
                            <SearchNormal1 size="24" color="rgba(130, 130, 130, 1)"/>
                        </div>
                        <input
                            type="text"
                            className="p-3 pl-11 w-96 text-gray-900 bg-white rounded-lg border border-gray-400 focus:pl-3 outline-none"
                            placeholder="Cari disini..."
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>
                </div>

                <div className="text-white font-inter font-medium text-lg flex items-center gap-2 p-3 w-44 h-12 rounded-md cursor-pointer" style={{ backgroundColor: "rgba(53, 204, 51, 1)" }} onClick={openForm}>
                    <div className="relative">
                        <div className="top-2 left-2" ref={clickPoint} style={{ display: "block" }}>
                            <Add size="24" color="rgba(255, 255, 255, 1)"/>
                        </div>
                    </div>
                    <p>Tambah Data</p>
                </div>
            </div>
            
            <Flex
                bg={"white"}
                borderRadius={"xl"}
                boxShadow={"md"}
                direction={"column"}
                gap={"1.5rem"}
                p={"1.5rem"}
                w={"full"}
            >
                <KelolaPenukaranTable
                    data={paginatedData} // Pass the paginated data, not filteredData
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
