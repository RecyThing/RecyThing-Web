import { useRef, useState, useEffect } from "react";
import { Pagination } from "../components/pagination/Pagination";
import { Flex } from "@chakra-ui/react";
import ProfileIcon from "../assets/Profile.png";
import Message from "../assets/Message.png";
import Location from "../assets/Location.png";

function KelolaPenukaranSampah() {
    const clickPoint = useRef();
    const [isTambahData, setIsTambahData] = useState(false);
    const [idPenukaran, setIdPenukaran] = useState(1);
    const [jenisSampah, setJenisSampah] = useState(Array.from({ length: idPenukaran }).fill("logam"));
    const [berat, setBerat] = useState(Array.from({ length: idPenukaran }).fill(1));
    const [poin, setPoin] = useState(Array.from({ length: idPenukaran }).fill(0));
    const [filterSearch, setFilterSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleFocus = () => {
        clickPoint.current.style.display = "none";
    };

    const handleBlur = () => {
        clickPoint.current.style.display = "block";
    };

    const openForm = () => {
        setIsTambahData(true);
        // css tidak bisa scroll
        document.body.style.overflow = "hidden";
    };

    const closeForm = () => {
        if (idPenukaran === 1 && berat[0] === 0) {
            // Jika hanya ada satu data dan beratnya 0 kg, reset form
            const newberat = [1];
            const newJenisSampah = ["logam"];
            const updatedpoin = [500];
    
            setBerat(newberat);
            setJenisSampah(newJenisSampah);
            setPoin(updatedpoin);
            setIdPenukaran(1);
        }
    
        setIsTambahData(false);
        // Mengembalikan ke status awal bisa scroll
        document.body.style.overflow = "auto";
    };

    // menghitung perubahan poin
    const calculatePoints = () => {
        const nilaiPoin = {
            logam: 500,
            plastik: 400,
            kertas: 300,
            kaca: 200
        };
    
        const updatedpoin = [];
    
        for (let i = 0; i < idPenukaran; i++) {
            const poin = nilaiPoin[jenisSampah[i]] * berat[i];
            updatedpoin.push(poin);
        }
    
        setPoin(updatedpoin);
    };    

    // untuk melihat adanya perubahan berat kg
    useEffect(() => {
        calculatePoints();
    }, [berat, jenisSampah]);

    // menambah tbody untuk tambah data
    const addNewTbody = (e) => {
        e.preventDefault();
        // 1 kg untuk berat awal
        const newberat = [...berat, 1];
        
        // Data awal adalah logam
        const newJenisSampah = [...jenisSampah, "logam"];
        
        // Poin awal logam
        const updatedpoin = [...poin, 500];
    
        setBerat(newberat);
        setJenisSampah(newJenisSampah);
        setPoin(updatedpoin);
        
        setIdPenukaran(newberat.length);
    };

    const filteredData = DummyData.filter(([username]) =>
		username.toLowerCase().includes(filterSearch.toLowerCase())
	);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    // ID Penukaran melanjutkan dengan halaman sebelumnya
    const lastPageMaxId = indexOfFirstItem;
    const startingId = lastPageMaxId + 1;

    return (
        <div className="p-6 w-full" style={{background: "#EBEBF0"}}>
        {isTambahData ? (
            <div className="fixed top-0 left-0 w-full h-full bg-opacity-5 backdrop-blur flex justify-center items-center z-10" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
                <div className="bg-white p-6 rounded-lg">
                    <h4 className="text-gray-800 text-2xl font-bold font-inter mb-6">Tambah Data Penukaran Sampah</h4>
                    <form className="flex gap-x-12">
                        <div>
                            <div className="flex items-center border rounded-lg border-gray-400 w-80 p-4 relative mb-6">
                                <img src={ProfileIcon} alt="" className="w-5 h-5 mr-2" />
                                <input type="text" className="w-full outline-none text-sm relative" placeholder="Masukkan nama pengguna"/>
                                <label htmlFor="" className="text-xs absolute -top-2 left-3 bg-white px-1" style={{color: "#828282"}}>Nama Pengguna</label>
                            </div>
                            <div className="flex items-center border rounded-lg border-gray-400 w-80 p-4 relative mb-6">
                                <img src={Message} alt="" className="w-5 h-5 mr-2" />
                                <input type="email" className="w-full outline-none text-sm relative" placeholder="Masukkan email pengguna"/>
                                <label htmlFor="" className="text-xs absolute -top-2 left-3 bg-white px-1" style={{color: "#828282"}}>Email Pengguna</label>
                            </div>
                            <div className="flex items-center border rounded-lg border-gray-400 w-80 p-4 relative">
                                <img src={Location} alt="" className="w-5 h-5 mr-2" />
                                <input type="email" className="w-full outline-none text-sm relative" placeholder="Masukkan lokasi drop point"/>
                                <label htmlFor="" className="text-xs absolute -top-2 left-3 bg-white px-1" style={{color: "#828282"}}>Lokasi Drop Point</label>
                            </div>
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr className="text-sm" style={{background:"#F2F2F5"}}>
                                        <th className="font-medium font-inter w-48">Jenis Sampah</th>
                                        <th className="font-medium font-inter w-40">Berat (kg)</th>
                                        <th className="font-medium font-inter w-24">Poin</th>
                                    </tr>
                                </thead>
                                {Array.from({ length: idPenukaran }).map((_, index) => {
                                if (berat[index] === 0) {
                                    // Skip rendering untuk data 0 kg
                                    return null;
                                }
                                return (
                                    <tbody key={index}>
                                        <tr>
                                            <td>
                                                <div className="relative mt-4">
                                                    <select
                                                        className="border rounded-lg border-gray-400 w-48 p-2 pl-3 text-sm appearance-none" style={{color:"#4F4F4F"}}
                                                        value={jenisSampah[index]}
                                                        onChange={(e) => {
                                                            const newJenisSampah = [...jenisSampah];
                                                            newJenisSampah[index] = e.target.value;
                                                            setJenisSampah(newJenisSampah);
                                                        }}
                                                    >
                                                        <option value="logam">Logam</option>
                                                        <option value="plastik">Plastik</option>
                                                        <option value="kertas">Kertas</option>
                                                        <option value="kaca">Kaca</option>
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9" fill="none">
                                                            <path d="M0.46967 0.46967C0.735936 0.203403 1.1526 0.179197 1.44621 0.397052L1.53033 0.46967L8 6.939L14.4697 0.46967C14.7359 0.203403 15.1526 0.179197 15.4462 0.397052L15.5303 0.46967C15.7966 0.735936 15.8208 1.1526 15.6029 1.44621L15.5303 1.53033L8.53033 8.53033C8.26406 8.7966 7.8474 8.8208 7.55379 8.60295L7.46967 8.53033L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967Z" fill="#949494"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <input type="number" className="border rounded-lg border-gray-400 w-24 p-2 pl-3 text-sm appearance-none mx-5 mt-4" style={{color:"#4F4F4F"}} name="jumlah" min="0" step="1"
                                                    value={berat[index]}
                                                    onChange={(e) => {
                                                        const newberat = [...berat];
                                                        newberat[index] = parseFloat(e.target.value);
                                                        setBerat(newberat);
                                                        if (e.target.value === 0) {
                                                            // membatalkan tambah data jika 0 kg
                                                            const updatedSelectedWaste = [...jenisSampah];
                                                            const updatedPoints = [...poin];
                                                            updatedSelectedWaste.splice(index, 1);
                                                            updatedPoints.splice(index, 1);
                                                            setJenisSampah(updatedSelectedWaste);
                                                            setPoin(updatedPoints);
                                                            setIdPenukaran(updatedSelectedWaste.length);
                                                        }
                                                    }}
                                                />
                                            </td>
                                            <td id="poin"><div className="text-sm font-semibold font-inter mt-4 w-24" style={{color:"rgba(255, 205, 41, 1)"}}>+{poin[index]} Poin</div></td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                            </table>
                            <div className="flex justify-between mt-6 w-96">
                                <div className="flex gap-2" style={{color:"#828282"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.75 15.6551C10.336 15.6551 10 15.3191 10 14.9051V7.57812C10 7.16412 10.336 6.82812 10.75 6.82812C11.164 6.82812 11.5 7.16412 11.5 7.57812V14.9051C11.5 15.3191 11.164 15.6551 10.75 15.6551Z" fill="#949494"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4165 11.9883H7.0835C6.6685 11.9883 6.3335 11.6523 6.3335 11.2383C6.3335 10.8243 6.6685 10.4883 7.0835 10.4883H14.4165C14.8305 10.4883 15.1665 10.8243 15.1665 11.2383C15.1665 11.6523 14.8305 11.9883 14.4165 11.9883Z" fill="#949494"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.064 2C3.292 2 1.5 3.897 1.5 6.835V15.665C1.5 18.603 3.292 20.5 6.064 20.5H15.436C18.209 20.5 20 18.603 20 15.665V6.835C20 3.897 18.209 2 15.436 2H6.064ZM15.436 22H6.064C2.437 22 0 19.454 0 15.665V6.835C0 3.046 2.437 0.5 6.064 0.5H15.436C19.063 0.5 21.5 3.046 21.5 6.835V15.665C21.5 19.454 19.063 22 15.436 22Z" fill="#949494"/>
                                    </svg>
                                    <button type="button" onClick={addNewTbody}>Tambah Data</button>
                                </div>
                                <div className="flex gap-12">
                                    <p className="text-sm font-semibold font-inter">Total Poin</p>
                                    <p className="text-sm font-semibold font-inter -mr-10" style={{color:"rgba(255, 205, 41, 1)"}}>+{poin.reduce((acc, cur) => acc + cur, 0)} Poin</p>
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
                        <div className="absolute top-4 left-4" ref={clickPoint} style={{ display: "block" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21" fill="none">
                                <path fill="#828282" d="M9.738 1.5C5.196 1.5 1.5 5.195 1.5 9.738C1.5 14.281 5.196 17.977 9.738 17.977C14.281 17.977 17.977 14.281 17.977 9.738C17.977 5.195 14.281 1.5 9.738 1.5ZM9.738 19.477C4.368 19.477 0 15.108 0 9.738C0 4.368 4.368 0 9.738 0C15.108 0 19.477 4.368 19.477 9.738C19.477 15.108 15.108 19.477 9.738 19.477Z" />
                                <path fill="#828282" d="M19.5142 20.7218C19.3232 20.7218 19.1312 20.6488 18.9842 20.5028L15.4602 16.9888C15.1672 16.6958 15.1662 16.2208 15.4592 15.9278C15.7512 15.6328 16.2262 15.6348 16.5202 15.9258L20.0442 19.4408C20.3372 19.7338 20.3382 20.2078 20.0452 20.5008C19.8992 20.6488 19.7062 20.7218 19.5142 20.7218Z" />
                            </svg>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M6 12H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 18V6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <p>Tambah Data</p>
                </div>
            </div>
            <div>
                <table className="w-full mt-8 mx-3 text-left">
                    <thead>
                        <tr style={{color:"#808080"}}>
                            <th className="w-24 text-center py-2">ID Penukaran</th>
                            <th className="w-44">Nama</th>
                            <th className="w-52">Email</th>
                            <th className="w-40">Lokasi Drop Point</th>
                            <th className="w-20 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentData.map((item, index) => (
                        <tr key={index} className={`border-t border-b text-sm ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`} style={{color:"#393939", borderColor:"#C7C9D9"}}>
                            <td className="text-center py-3">{startingId + index}</td>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                            <td className="flex justify-center pt-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M20.9999 5.98047C17.6699 5.65047 14.3199 5.48047 10.9799 5.48047C8.99994 5.48047 7.01994 5.58047 5.03994 5.78047L2.99994 5.98047" stroke="#E63535" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.49994 4.97L8.71994 3.66C8.87994 2.71 8.99994 2 10.6899 2H13.3099C14.9999 2 15.1299 2.75 15.2799 3.67L15.4999 4.97" stroke="#E63535" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.8499 9.14062L18.1999 19.2106C18.0899 20.7806 17.9999 22.0006 15.2099 22.0006H8.78993C5.99993 22.0006 5.90993 20.7806 5.79993 19.2106L5.14993 9.14062" stroke="#E63535" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10.3299 16.5H13.6599" stroke="#E63535" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9.49994 12.5H14.4999" stroke="#E63535" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Flex
				direction={"column"}
				gap={"1.5rem"}
				p={"1.5rem"}
                fontSize={"14px"}
			>
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
