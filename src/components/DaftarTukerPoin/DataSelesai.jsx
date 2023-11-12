import {
  Button,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function DataSelesai() {
  const navigate = useNavigate()
  const dataTerbaru = DummyData.filter((data)=>data.status == "Menunggu")
  const dataDiproses = DummyData.filter((data)=>data.status == "Proses")
  const dataSelesai = DummyData.filter((data)=>data.status == "Berhasil")

  return (
    <div
      style={{
        backgroundColor: "rgb(235,235,240)",
        height: "100%",
        minWidth: "76%",
      }}
      className="pb-2"
    >
      <p className="font-bold text-xl ps-4 py-4">Daftar Transaksi Tukar Poin</p>
      <div
        className="mx-4 border-solid border-2 rounded-lg mb-4"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="px-4 py-5">
          {/* Header */}
          <div className="flex justify-between">
            <div
              className="flex flex-row pe-1"
              style={{ backgroundColor: "#edf2f7" }}
            >
              <Button className="text-sm font-sans" onClick={()=>navigate('/transaction')}>
                Semua
              </Button>
              <Button className="text-sm font-sans" onClick={()=>navigate('/transaction/terbaru')}>
                Terbaru
                <p
                  className="rounded ms-1 px-2"
                  style={{ color: "white", backgroundColor: "#828282" }}
                >
                  {dataTerbaru.length}
                </p>
              </Button>

              <Button className="text-sm font-sans" onClick={()=>navigate('/transaction/diproses')}>
                Diproses
                <p
                  className="rounded ms-1 px-2"
                  style={{ color: "white", backgroundColor: "#828282" }}
                >
                  {dataDiproses.length}
                </p>
              </Button>

              <Button className="text-sm font-sans" colorScheme="whatsapp">
                Selesai
                <p
                  className="rounded ms-1 px-2"
                  style={{ color: "white", backgroundColor: "#828282" }}
                >
                  {dataSelesai.length}
                </p>
              </Button>
            </div>
            <div className="flex flex-row">
              <Input htmlSize={4} />
              <IconButton aria-label="Search database" />
            </div>
          </div>

          {/* Content */}
          {/* Struktur table */}
          <div className="flex flex-col" style={{ width: "100%" }}>
            {/* THead */}
            <div
              className="mb-2 font-bold text-sm font-sans flex flex-row border-b-2 items-center"
              style={{ height: "30px" }}
            >
              <div
                className="text-center"
                style={{ color: "#808080", width: "76px" }}
              >
                No
              </div>
              <div className="flex-1" style={{ color: "#808080" }}>
                Nama Pengguna
              </div>
              <div className="flex-1" style={{ color: "#808080" }}>
                Nama Reward
              </div>
              <div className="flex-1" style={{ color: "#808080" }}>
                Tujuan Pengiriman
              </div>
              <div className="flex-1" style={{ color: "#808080" }}>
                Tanggal
              </div>
              <div className="flex-1" style={{ color: "#808080" }}>
                Status
              </div>
              <div className="text-center flex-1" style={{ color: "#808080" }}>
                Aksi
              </div>
            </div>

            {/* TBody */}
            {dataSelesai.map((val, index) => (
              <div
                val={val}
                key={index}
                className="flex flex-row items-center border-b-2"
                style={{ height: "50px" }}
              >
                <div
                  className="text-center font-sans"
                  style={{ color: "#393939", width: "76px" }}
                >
                  {index + 1}
                </div>
                <div className="font-sans flex-1" style={{ color: "#393939" }}>
                  {val.nama}
                </div>
                <div className="font-sans flex-1" style={{ color: "#393939" }}>
                  {val.reward}
                </div>
                <div className="font-sans flex-1" style={{ color: "#393939" }}>
                  {val.email}
                </div>
                <div className="font-sans flex-1" style={{ color: "#393939" }}>
                  {val.tanggal}
                </div>
                <div className="font-sans flex-1">
                  {val.status == "Berhasil" && (
                    <p
                      className="border w-max px-2 bg-opacity-10 bg-green-400 rounded"
                      style={{ color: "#3FC28A" }}
                    >
                      {val.status}
                    </p>
                  )}
                  {val.status == "Proses" && (
                    <p
                      className="border w-max px-2 bg-opacity-10 bg-blue-500 rounded"
                      style={{ color: "#0033FF" }}
                    >
                      {val.status}
                    </p>
                  )}
                  {val.status == "Menunggu" && (
                    <p
                      className="border w-max px-2 bg-opacity-10 bg-yellow-100 rounded"
                      style={{ color: "#FFCD29" }}
                    >
                      {val.status}
                    </p>
                  )}
                </div>
                <div
                  className="font-sans flex-1 text-center"
                  style={{ color: "#393939" }}
                >
                  icon1 icon2
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex flex-row">
            <div className="flex flex-row items-center mt-4">
              <p style={{ color: "#A7A19E" }} className="me-2">
                Menampilkan
              </p>
              <Menu>
                <MenuButton px={4} borderRadius="md" borderWidth="1px">
                  File
                </MenuButton>
                <MenuList>
                  <MenuItem>New File</MenuItem>
                  <MenuItem>New Window</MenuItem>
                  <MenuDivider />
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save File</MenuItem>
                </MenuList>
              </Menu>
            </div>
            <div
              style={{ color: "#A7A19E" }}
              className="flex mt-4 items-center"
            >
              Menampilkan 1 sampai 10 dari 60 data
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DummyData = [
  {
    nama: "leonar",
    reward: "Voucher Dana 5000",
    email: "leonar@mail.com",
    tanggal: "23-10-23",
    status: "Berhasil",
  },
  {
    nama: "leonar",
    reward: "Voucher Dana 5000",
    email: "leonar@mail.com",
    tanggal: "23-10-23",
    status: "Menunggu",
  },
  {
    nama: "leonar",
    reward: "Voucher Dana 5000",
    email: "leonar@mail.com",
    tanggal: "23-10-23",
    status: "Proses",
  },
  {
    nama: "leonar",
    reward: "Voucher Dana 5000",
    email: "leonar@mail.com",
    tanggal: "23-10-23",
    status: "Berhasil",
  },
  {
    nama: "leonar",
    reward: "Voucher Dana 5000",
    email: "leonar@mail.com",
    tanggal: "23-10-23",
    status: "Berhasil",
  },
  {
    nama: "leonar",
    reward: "Voucher Dana 5000",
    email: "leonar@mail.com",
    tanggal: "23-10-23",
    status: "Menunggu",
  },
  {
    nama: "leonar",
    reward: "Voucher Dana 5000",
    email: "leonar@mail.com",
    tanggal: "23-10-23",
    status: "Proses",
  },
  {
    nama: "leonar",
    reward: "Voucher Dana 5000",
    email: "leonar@mail.com",
    tanggal: "23-10-23",
    status: "Berhasil",
  },
  {
    nama: "leonar",
    reward: "Voucher Dana 5000",
    email: "leonar@mail.com",
    tanggal: "23-10-23",
    status: "Berhasil",
  },
  {
    nama: "leonar",
    reward: "Voucher Dana 5000",
    email: "leonar@mail.com",
    tanggal: "23-10-23",
    status: "Proses",
  },
  {
    nama: "leonar",
    reward: "Voucher Dana 5000",
    email: "leonar@mail.com",
    tanggal: "23-10-23",
    status: "Menunggu",
  },
  {
    nama: "leonar",
    reward: "Voucher Dana 5000",
    email: "leonar@mail.com",
    tanggal: "23-10-23",
    status: "Proses",
  },
  {
    nama: "leonar",
    reward: "Voucher Dana 5000",
    email: "leonar@mail.com",
    tanggal: "23-10-23",
    status: "Berhasil",
  },
];
