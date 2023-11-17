import React from "react";
import { Profile, Sms, Location, AddSquare, ArrowDown2, CloseSquare } from "iconsax-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";

export function WasteExchangeAddData({ isOpen, onClose, setIsAddData  }){

    const { control, handleSubmit, register, watch } = useForm({
        defaultValues: {
            data: [
                { wasteType: "logam", unit: 1 },
            ],
        },
    });

    const { fields, append } = useFieldArray({
        control,
        name: "data",
    });

    const handleAddData = () => {
        append({ wasteType: "logam", unit: 1});
    };

    const watchUnit = watch("data", []);

    const calculatePoints = (wasteType, unit) => {
        const pointsMap = {
            logam: 500,
            plastik: 400,
            kertas: 300,
            kaca: 500,
        };
        return (unit || 0) * pointsMap[wasteType];
    };

    const onSubmit = (data) => {
        console.log(data);
        onClose();
    };
    
    const closeForm = () => {
        setIsAddData(false);
    };

    const inputWrapperStyles = {
        display: "flex", 
        position: "relative", 
        marginBottom: "24px", 
        borderWidth: "1px", 
        borderRadius: "12px", 
        padding: "16px", 
        width: "328px", 
        borderColor: "rgba(130, 130, 130, 1)"
    };

    const inputIconStyles = {
        color: "rgba(148, 148, 148, 1)", 
        width: "24px", 
        height: "auto", 
        marginRight: "8px"
    };

    const inputStyles = {
        width: "100%", 
        outline: "none", 
        fontSize: "14px", 
        position: "relative"
    };

    const inputLabelStyles = {
        color: "rgba(130, 130, 130, 1)", 
        fontSize: "12px",
        position: "absolute", 
        top: "-8px", 
        left: "12px", 
        backgroundColor: "white", 
        paddingLeft: "4px", 
        paddingRight: "4px"
    };

    const tableInputStyles = {
        borderWidth: "1px", 
        borderRadius: "8px", 
        padding: "8px", 
        paddingLeft: "12px", 
        fontSize: "14px", 
        appearance: "none"
    };

    const poinStyles = {
        fontSize: "14px", 
        fontWeight: "600"
    };

    const buttonStyles = {
        width: "144px", 
        borderRadius: "8px", 
        padding: "12px", 
        fontSize: "16px", 
        fontWeight: "700",
        color: "#FFF"
    };

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay className="fixed top-0 left-0 w-full h-full bg-opacity-5 backdrop-blur flex justify-center items-center z-10" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)"}}/>
            <ModalContent maxW="690px" className="bg-white rounded-lg max-h-[80vh] overflow-y-auto">
                <ModalHeader className="flex justify-between">
                    <h4 className="text-gray-800 text-2xl font-bold  mb-2">Tambah Data Penukaran Sampah</h4>
                    <CloseSquare size="32" color="rgba(130, 130, 130, 1)" className="cursor-pointer" onClick={closeForm}/>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex gap-x-6">
                            <div style={{ ...inputWrapperStyles }}>
                                <Profile style={{ ...inputIconStyles }}/>
                                <input type="text" name="nama" style={{ ...inputStyles }} placeholder="Masukkan nama pengguna"/>
                                <label htmlFor="nama" style={{ ...inputLabelStyles }}>Nama Pengguna</label>
                            </div>
                            <div style={{ ...inputWrapperStyles }}>
                                <Sms style={{ ...inputIconStyles }}/>
                                <input type="email" name="email" style={{ ...inputStyles }} placeholder="Masukkan email pengguna"/>
                                <label htmlFor="email" style={{ ...inputLabelStyles }}>Email Pengguna</label>
                            </div>
                        </div>
                        <div className="w-full flex items-center border rounded-xl p-4 mb-6 relative" style={{ borderColor: "rgba(130, 130, 130, 1)"}}>
                            <Location style={{ ...inputIconStyles }}/>
                            <input type="text" name="lokasi" style={{ ...inputStyles }} placeholder="Masukkan lokasi drop point"/>
                            <label htmlFor="lokasi" style={{ ...inputLabelStyles }}>Lokasi Drop Point</label>
                        </div>
                        <div className="w-full">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-sm text-left" style={{ background: "#F2F2F5"}}>
                                        <th className="font-medium p-2">Jenis Sampah</th>
                                        <th className="font-medium w-52">Satuan</th>
                                        <th className="font-medium ">Poin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fields.map((field, index) => (
                                        <tr key={field.id}>
                                            <td>
                                                <div className="relative mt-6">
                                                    <Controller
                                                        name={`data[${index}].wasteType`}
                                                        control={control}
                                                        defaultValue="logam"
                                                        render={({ field }) => (
                                                            <select
                                                                {...field}
                                                                className="w-52"
                                                                style={{ color: "rgba(79, 79, 79, 1)", borderColor: "rgba(79, 79, 79, 1)", ...tableInputStyles }}
                                                            >
                                                                <option value="logam">Logam</option>
                                                                <option value="plastik">Plastik</option>
                                                                <option value="kertas">Kertas</option>
                                                                <option value="kaca">Kaca</option>
                                                            </select>
                                                        )}
                                                    />
                                                    <ArrowDown2 size="24" color="rgba(148, 148, 148, 1)" className="absolute inset-y-0 right-24 mt-2 items-center pointer-events-none"/>
                                                </div>
                                            </td>
                                            <td key={field.id}>
                                                <input
                                                    {...register(`data[${index}].unit`)}
                                                    type="text"
                                                    className="w-32 mt-6"
                                                    style={{ color: "rgba(130, 130, 130, 1)", borderColor: "rgba(130, 130, 130, 1)", ...tableInputStyles }}
                                                    name={`data[${index}].unit`}
                                                    min="0"
                                                    step="1"
                                                />
                                            </td>
                                            <td>
                                                <div className="mt-6 w-24" style={{ color: "rgba(255, 205, 41, 1)", ...poinStyles }}>
                                                    +{watchUnit[index]?.wasteType === "logam" ? 500 : 0} Poin
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="grid grid-cols-3 mt-6">
                                <div className="flex items-center gap-2" style={{ color: "rgba(130, 130, 130, 1)" }}>
                                    <AddSquare size="24" color="rgba(148, 148, 148, 1)" className="cursor-pointer"/>
                                    <button type="button" onClick={handleAddData}>Tambah Data</button>
                                </div>
                                <p className="text-right mr-1" style={{ ...poinStyles }}>Total Poin</p>
                                <p style={{ color: "rgba(255, 205, 41, 1)", marginLeft: "36%", ...poinStyles}}>
                                    +{watchUnit.reduce((acc, cur) => acc + (cur?.unit || 0) * (cur?.wasteType === "logam" ? 500 : 0), 0)} Poin
                                </p>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter className="flex gap-4 mt-6 justify-end">
                    <button style={{background:"rgba(130, 130, 130, 1)", ...buttonStyles }} onClick={closeForm}>Batal</button>
                    <button style={{background:"#35CC33", ...buttonStyles }} onClick={closeForm}>Simpan</button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}