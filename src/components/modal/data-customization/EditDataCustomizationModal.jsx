import  { useState, useEffect } from "react";
import { InputTextArea } from "@/components/inputs";
import { CloseSquare } from "iconsax-react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export function EditDataCustomizationModal({ isOpen, onClose, onSubmit, question, topic }){
    const [editedQuestion, setEditedQuestion] = useState(question);
    const [editedTopic, setEditedTopic] = useState(topic);

    const {
		handleSubmit,
		reset,
	} = useForm();

    const handleOnSubmit = (data) => {
		console.log(data);
		onSubmit(data);
		reset();
		onClose();
	};
    
    useEffect(() => {
        setEditedQuestion(question);
        setEditedTopic(topic);

		if (!isOpen) {
			reset();
		}
	}, [question, topic, isOpen, reset]);

    return(
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(5px)"} />
            <ModalContent maxW="900px" borderRadius="12px">
                <ModalHeader className="flex justify-between mt-8">
                    <h4 className="text-gray-800 text-2xl font-bold font-inter mb-2">Edit Data for Open AI</h4>
                    <CloseSquare size="32" color="rgba(130, 130, 130, 1)" className="cursor-pointer" onClick={() => {reset(); onClose();}}/>
                </ModalHeader>
                    <ModalBody>
                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className="w-72 border rounded-xl p-3 mb-6 relative" style={{ borderColor: "rgba(130, 130, 130, 1)"}}>
                            <select
                                name="topik"
                                id="topik"
                                className="w-64 outline-none text-sm border-none bg-transparent"
                                style={{ color: "rgba(79, 79, 79, 1)" }}
                                value={editedTopic}
                                onChange={(e) => setEditedTopic(e.target.value)}
                            >
                                <option value="Sampah Anorganik">Sampah Anorganik</option>
                                <option value="Sampah Organik">Sampah Organik</option>
                            </select>
                            <label htmlFor="topik" className="text-xs absolute -top-2 left-3 bg-white px-1" style={{color: "rgba(130, 130, 130, 1)"}}>Topik</label>
                        </div>
                        <InputTextArea
                            label={"Pertanyaan"}
                            rows="8" className="resize-none h-36"
                            value={editedQuestion} 
                            onChange={(e) => setEditedQuestion(e.target.value)}
                        />
                    </form>
                </ModalBody>
                <ModalFooter gap={4} marginBottom={8} marginTop={12}>
                    <Button
                        color={"white"}
                        bg={"#828282"}
                        borderRadius={"lg"}
                        px={"3.5rem"}
                        py={"1.7rem"}
                        _hover={{ bg: "#333333" }}
                        onClick={() => {
                            reset();
                            onClose();
                        }}
                    >
                        Batal
                    </Button>
                    <Button
                        color={"white"}
                        bg={"#35CC33"}
                        borderRadius={"lg"}
                        px={"2rem"}
                        py={"1.7rem"}
                        _hover={{ bg: "#2DA22D" }}
                        type="submit"
                    >
                        Simpan<br />Perubahan
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}