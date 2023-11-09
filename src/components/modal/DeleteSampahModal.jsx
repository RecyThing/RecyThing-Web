import { InfoCircle } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";

function DeleteSampahModal({ onClose, rowData }) {
    const { onClose: onCloseModal } = useDisclosure();

    const handleCancel = () => {
        onCloseModal();
        onClose();
    };

    const handleDelete = () => {
        console.log("Data Deleted:", rowData);
        onCloseModal();
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-5 backdrop-blur flex justify-center items-center z-10" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
            <div className="bg-white p-6 rounded-lg w-80 text-center">
                <InfoCircle className="mx-auto my-auto" size="80" color="rgba(229, 53, 53, 1)"/>
                <h4 className="text-2xl font-normal font-inter mb-4 mt-4">Anda yakin ingin menghapus data ini?</h4>
                <p className="text-sm" style={{color:"#828282"}}>Data yang dihapus tidak dapat dipulihkan</p>
                <div className="flex gap-4 mt-8 justify-center">
                    <button className="w-40 rounded-lg p-3 text-sm font-bold" style={{background:"#828282", color:"#FFF"}} onClick={handleCancel}>Batal</button>
                    <button className="w-40 rounded-lg p-3 text-sm font-bold" style={{background:"#FF5C5C", color:"#FFF"}} onClick={handleDelete}>Hapus</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteSampahModal;