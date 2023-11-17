import { InputWithLogo } from '@/components/inputs';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { CloseSquare, Message } from 'react-iconly';
import { User } from "react-iconly";
import { OperationalSchedule } from './OperationalSchedule';

export function CreateDataDropPointModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"3xl"} isCentered>
      <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(10px)"} />
      <ModalContent padding={"24px"} borderRadius={"xl"}>
        <div className="flex justify-between">
          <p className="font-medium text-2xl">Tambah Data Lokasi Drop Point</p>
          <div className="cursor-pointer" onClick={onClose}>
            <CloseSquare primaryColor='#828282' size={32} />
          </div>
        </div>

        <InputWithLogo label={"Masukkan Nama Drop Point"} Logo={User} className={"mt-10"} />
        <InputWithLogo label={"Alamat"} Logo={Message} className={"mt-4"} />
        <OperationalSchedule />

        <div className="mt-9 flex justify-between text-white">
          <button onClick={onClose} className="p-4 w-[170px] rounded-lg bg-[#828282] hover:opacity-90">Batal</button>
          <button onClick={onClose} className="p-4 w-[170px] rounded-lg bg-[#35CC33] hover:opacity-90">Simpan</button>
        </div>
      </ModalContent>
    </Modal>
  )
}
