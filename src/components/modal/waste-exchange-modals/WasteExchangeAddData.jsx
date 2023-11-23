import React from "react";
import * as Fields from "./WasteExchangeFormFields";
import { Trash } from "iconsax-react";
import { AddSquare, ArrowDown2, CloseSquare } from "iconsax-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Box, Flex, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

export function WasteExchangeAddData({ isOpen, onClose, setIsAddData  }){

    const { control, handleSubmit, register, watch, formState: { errors }, reset } = useForm({
        defaultValues: {
            data: [
                { wasteType: "Elektronik", unit: 0 },
            ],
        },
    });    

    const { fields, append, remove } = useFieldArray({
        control,
        name: "data",
    });

    const handleAddData = () => {
        append({ wasteType: "Elektronik", unit: 0});
    };

    const calculatePoints = (wasteType, unit) => {
        let pointPerUnit = 0;
    
        switch (wasteType) {
            case 'Elektronik':
                pointPerUnit = 1000;
                break;
            case 'Kaca':
                pointPerUnit = 2500;
                break;
            case 'Kaleng':
                pointPerUnit = 7500;
                break;
            case 'Baterai':
                pointPerUnit = 5000;
                break;
            case 'Kertas':
                pointPerUnit = 9000;
                break;
            case 'Logam':
                pointPerUnit = 1000;
                break;
            case 'Minyak':
                pointPerUnit = 8000;
                break;
            case 'Organik':
                pointPerUnit = 4500;
                break;
            case 'Pakaian':
                pointPerUnit = 10000;
                break;
            case 'Plastik':
                pointPerUnit = 9000;
                break;
            case 'Tekstil':
                pointPerUnit = 900;
                break;
            default:
                pointPerUnit = 0;
        }
        return pointPerUnit * unit;
    };

    const calculateTotalPoints = () => {
        let totalPoints = 0;
        fields.forEach((field, index) => {
            totalPoints += calculatePoints(watch(`data[${index}].wasteType`), parseInt(watch(`data[${index}].unit`) || 0));
        });
        return totalPoints;
    };

    const handleOnSubmit = (data) => {
        console.log(data);
        onSubmit(data);
        reset();
        onClose();
    };
    
    const closeForm = () => {
        setIsAddData(false);
    };

    const handleRemoveData = (index) => {
        remove(index);
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
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(5px)"} />
            <ModalContent maxW="690px" borderRadius="12px" className="max-h-[80vh] overflow-y-auto">
                <ModalHeader className="flex justify-between">
                    <h4 className="text-gray-800 text-2xl font-bold  mb-2">Tambah Data Penukaran Sampah</h4>
                    <CloseSquare size="32" color="rgba(130, 130, 130, 1)" className="cursor-pointer" onClick={closeForm}/>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className="flex gap-x-5 mb-6">
                            <Fields.Username
                                control={control}
                                error={errors.username}
                            />
                            <Fields.UserEmail
                                control={control}
                                error={errors.userEmail}
                            />
                        </div>
                        <div className="mb-6">
                            <Fields.DropPointLocation
                                control={control}
                                error={errors.dropPointLocation}
                            />
                        </div>
                        <div className="w-full">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-sm text-left" style={{ background: "#F2F2F5"}}>
                                        <th className="font-medium p-2">Jenis Sampah</th>
                                        <th className="font-medium w-44">Satuan</th>
                                        <th className="font-medium ">Poin</th>
                                        <th className="font-medium pr-4">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {fields.map((field, index) => (
                                    <tr key={field.id}>
                                        <td>
                                            <div className="relative mt-6 w-52">
                                                <Controller
                                                    name={`data[${index}].wasteType`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Menu>
                                                            <MenuButton
                                                                px={4}
                                                                py={2}
                                                                width={"220px"}
                                                                height={"41px"}
                                                                transition="all 0.2s"
                                                                borderRadius="md"
                                                                borderWidth="1px"
                                                                _hover={{ bg: "#F2F2F5" }}
                                                                _focus={{ boxShadow: "outline" }}
                                                            >
                                                                <Flex direction={"row"}>
                                                                <Box className="ms-2" minWidth={"140px"} textAlign={"start"}>{field.value}</Box>
                                                                <Box flex={"1"} marginStart={"20px"}>
                                                                    <ArrowDown2 />
                                                                </Box>
                                                                </Flex>
                                                            </MenuButton>
                                                            <MenuList maxH="110px" style={{ overflowY: 'auto' }}>
                                                                <MenuItem onClick={() => {field.onChange("Elektronik");}}>Elektronik</MenuItem>
                                                                <MenuItem onClick={() => {field.onChange("Kaca");}}>Kaca</MenuItem>
                                                                <MenuItem onClick={() => {field.onChange("Kaleng");}}>Kaleng</MenuItem>
                                                                <MenuItem onClick={() => {field.onChange("Baterai");}}>Baterai</MenuItem>
                                                                <MenuItem onClick={() => {field.onChange("Kertas");}}>Kertas</MenuItem>
                                                                <MenuItem onClick={() => {field.onChange("Logam");}}>Logam</MenuItem>
                                                                <MenuItem onClick={() => {field.onChange("Minyak");}}>Minyak</MenuItem>
                                                                <MenuItem onClick={() => {field.onChange("Organik");}}>Organik</MenuItem>
                                                                <MenuItem onClick={() => {field.onChange("Pakaian");}}>Pakaian</MenuItem>
                                                                <MenuItem onClick={() => {field.onChange("Plastik");}}>Plastik</MenuItem>
                                                                <MenuItem onClick={() => {field.onChange("Tekstil");}}>Tekstil</MenuItem>
                                                            </MenuList>
                                                        </Menu>
                                                    )}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <input
                                                {...register(`data[${index}].unit`, { required: true, min: 0, pattern: /^[0-9]*$/ })}
                                                type="number"
                                                className="w-28 mt-6"
                                                style={{ color: "rgba(130, 130, 130, 1)", borderColor: "rgba(130, 130, 130, 1)", ...tableInputStyles }}
                                                name={`data[${index}].unit`}
                                                min="0"
                                                step="1"
                                            />
                                        </td>
                                        <td>
                                            <div className="mt-6 w-24" style={{ color: "rgba(255, 205, 41, 1)", ...poinStyles }}>
                                                {calculatePoints(watch(`data[${index}].wasteType`), parseInt(watch(`data[${index}].unit`) || 0))}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mt-6 cursor-pointer" onClick={() => handleRemoveData(index)}>
                                                <Trash size="24" color="rgba(229, 53, 53, 1)"/>
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
                                <p className="text-center mr-1" style={{ ...poinStyles }}>Total Poin</p>
                                <p className="text-left ml-6" style={{ color: "rgba(255, 205, 41, 1)", ...poinStyles, fontSize:"18px"}}>
                                    +{calculateTotalPoints()}
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