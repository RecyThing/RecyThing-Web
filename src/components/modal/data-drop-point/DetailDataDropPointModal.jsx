import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { Calendar, CloseSquare, Location } from 'react-iconly';
import { BsRecycle } from 'react-icons/bs';

export function DetailDataDropPointModal({ isOpen, onClose }) {
  const operationalHours = [
    {
      "day": "Senin",
      "time": "09.00 - 18.30"
    },
    {
      "day": "Selasa",
      "time": "09.00 - 18.30"
    },
    {
      "day": "Rabu",
      "time": "09.00 - 18.30"
    },
    {
      "day": "Kamis",
      "time": "09.00 - 18.30"
    },
    {
      "day": "Jumat",
      "time": "09.00 - 18.30"
    },
    {
      "day": "Sabtu",
      "time": "Tutup"
    },
    {
      "day": "Minggu",
      "time": "Tutup"
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"3xl"} isCentered>
      <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(10px)"} />
      <ModalContent padding={"24px"} borderRadius={"xl"}>
        <div className="flex justify-between">
          <p className="h-fit my-auto font-bold text-[#828282]">ID Drop Point: 213712</p>
          <div className="cursor-pointer" onClick={onClose}>
            <CloseSquare primaryColor='#828282' size={32} />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-8">
          <p className="font-bold text-[#828282]">Detail Transaksi</p>

          <div className="pl-2 flex gap-10">
            <div className="w-[200px] flex gap-2 text-[#828282]">
              <BsRecycle className="text-2xl" />
              <p className="font-medium">Nama Drop Point</p>
            </div>
            <p className="font-bold">Ruko Gajah Mada Padang</p>
          </div>

          <div className="pl-2 flex gap-10">
            <div className="w-[200px] flex gap-2 text-[#828282]">
              <Location className="text-2xl" />
              <p className="font-medium">Lokasi Drop Point</p>
            </div>
            <p className="font-bold max-w-sm">Jl. Gajah Mada, Kp. Olo, Kec. Naggalo, Kota Padang, Sumatera Barat</p>
          </div>

          <div className="pl-2 flex gap-10">
            <div className="w-[200px] flex gap-2 text-[#828282]">
              <Calendar className="text-2xl" />
              <p className="font-medium">Jam Operasional</p>
            </div>
            <div className="flex flex-col gap-4">
              {operationalHours.map((operationalHour, index) => (
              <div key={index} className="flex w-96">
                <p className="flex-1 font-bold">{operationalHour.day}</p>
                <p className="flex-1 font-bold ml-2">{operationalHour.time}</p>
              </div>
              ))}
            </div>
          </div>

        </div>
        <button onClick={onClose} className="ml-auto mt-6 p-4 w-[135px] rounded-lg text-white bg-[#828282] hover:opacity-90">Kembali</button>
      </ModalContent>
    </Modal>
  )
}