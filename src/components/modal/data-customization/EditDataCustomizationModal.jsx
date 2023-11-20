import React, { useState, useEffect } from "react";
import { CloseSquare } from "iconsax-react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";

export function EditDataCustomizationModal({ isOpen, onClose, setIsEditData, question, topic }){
    const [editedQuestion, setEditedQuestion] = useState(question);
    const [editedTopic, setEditedTopic] = useState(topic);

    useEffect(() => {
        setEditedQuestion(question);
        setEditedTopic(topic);
    }, [question, topic]);

    const onSubmit = (data) => {
        console.log(data);
        onClose();
    };
    
    const closeForm = () => {
        setIsEditData(false);
        setEditedQuestion(question);
        setEditedTopic(topic);
        onClose();
    };

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay className="fixed top-0 left-0 w-full h-full bg-opacity-5 backdrop-blur flex justify-center items-center z-10" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)"}}/>
            <ModalContent marginTop={"24"} maxW="900px" className="bg-white rounded-lg max-h-[80vh] overflow-y-auto">
                <ModalHeader className="flex justify-between mt-8">
                    <h4 className="text-gray-800 text-2xl font-bold font-inter mb-2">Edit Data for Open AI</h4>
                    <CloseSquare size="32" color="rgba(130, 130, 130, 1)" className="cursor-pointer" onClick={closeForm}/>
                </ModalHeader>
                    <ModalBody>
                    <form onSubmit={onSubmit}>
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
                        <div className="w-full border rounded-xl p-3 relative" style={{ borderColor: "rgba(130, 130, 130, 1)"}}>
                            <textarea name="question" id="question" rows="8" className="w-full resize-none h-36 outline-none text-sm border-none bg-transparent pt-4" style={{ color: "#4F4F4F" }} placeholder="Masukkan question" value={editedQuestion} onChange={(e) => setEditedQuestion(e.target.value)}></textarea>
                            <label htmlFor="question" className="text-xs absolute -top-2 left-3 bg-white px-1" style={{color: "rgba(130, 130, 130, 1)"}}>Pertanyaan</label>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter className="flex gap-4 justify-end mb-8">
                    <button className="w-36 rounded-lg p-3 text-base font-bold" style={{background:"rgba(130, 130, 130, 1)", color:"#FFF"}} onClick={closeForm}>Batal</button>
                    <button className="w-36 rounded-lg p-1 text-base font-bold leading-5" style={{background:"#35CC33", color:"#FFF"}} onClick={closeForm}>Simpan Perubahan</button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}