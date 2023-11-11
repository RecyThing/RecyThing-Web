import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { ChevronDownCircle, ChevronUpCircle } from "react-iconly";
import { useState } from "react";

const data = [
  {
    question: "Bagaimana cara mendaftar di RecyThing?",
    answer: (
      <>
        Kamu dapat mendaftar melalui aplikasi RecyThing. Download terlebih
        dahulu aplikasi RecyThing. Pilih opsi Daftar saat kamu pertama kali
        membuka aplikasi RecyThing. Kamu dapat mendaftar menggunakan Dua Opsi,
        Yaitu Menggunakan Email dan Akun Google.
      </>
    ),
  },
  {
    question: "Bagaimana cara melaporkan sampah sembarangan?",
    answer: (
      <>
        Buka Aplikasi Recything, Akses halaman laporkan melalui navigasi menu
        pada aplikasi, lalu pilih jenis pelaporan sampah, anda bisa memilih 2
        opsi yaitu: <br />
        1. Melaporkan Tumpukan Sampah <br />
        2. Melaporkan Pelanggaran Sampah <br />
        Setelah memilih jenis Pelaporan sampah, isi data dan bukti yang
        diperlukan dan ikuti panduan pada aplikasi
      </>
    ),
  },
  {
    question: "Bagaimana cara menukar poin saya?",
    answer: (
      <>
        Untuk menukar poin Anda di Recything, pertama-tama, buka aplikasi
        Recything di perangkat Anda. Setelah itu, akses beranda aplikasi dan
        temukan kartu poin Anda. Di sana, Anda akan menemukan tombol &quot;Tukar
        Poin&quot;. Ketika Anda menekan tombol tersebut, Anda akan diarahkan ke
        halaman dengan berbagai pilihan voucher atau hadiah yang dapat Anda
        pilih. Pilih Voucher sesuai keinginan dan ikuti arahan yang ada pada
        aplikasi.
      </>
    ),
  },
  {
    question: "Bagaimana cara menukar sampah dengan poin?",
    answer: (
      <>
        Proses menukar sampah dengan poin di Recything sangat mudah dan
        mendukung konsep daur ulang. Langkah pertama, pastikan Anda telah
        mengumpulkan sampah dan memilahnya sesuai dengan kategori yang telah
        ditentukan.
        <br />
        <br />
        Selanjutnya, bawa sampah yang sudah dipilah ke Drop Point terdekat yang
        bekerja sama dengan Recything. Di sana, tim Drop Point akan membantu
        Anda untuk menimbang dan memverifikasi jenis sampah yang Anda bawa.
        Setelah sampah diverifikasi, poin akan langsung ditambahkan ke akun
        Anda.
        <br />
        <br />
        Anda dapat melihat jumlah poin yang Anda peroleh melalui aplikasi
        Recything. Dari sana, poin tersebut dapat digunakan untuk menukar
        berbagai voucher atau hadiah menarik yang telah disediakan oleh
        Recything.
      </>
    ),
  },
  {
    question: "Bagaimana mengikuti misi di RecyThing?",
    answer: (
      <>
        Buka aplikasi Recything dan pastikan Anda sudah login ke akun Anda. Pada
        Navigasi aplikasi, temukan dan pilih menu &quot;Misi&quot; atau
        &quot;Mission&quot;. Di sana, Anda akan menemukan daftar misi yang
        tersedia. Navigasikan antara tab &quot;Tersedia&quot;,
        &quot;Berjalan&quot;, dan &quot;Selesai&quot;
        <ul className="list-disc pl-5">
          <li>
            Untuk melihat berbagai misi yang dapat Anda ikuti. Misi yang
            tersedia menunjukkan tugas yang dapat Anda ambil.
          </li>
          <li>Pilih misi yang sesuai dengan minat dan ketersediaan Anda.</li>
          <li>
            Setiap misi memiliki deskripsi singkat yang menjelaskan apa yang
            perlu Anda lakukan.
          </li>
          <li>
            Setelah memilih misi, ambil tugas atau langkah-langkah yang
            diperlukan untuk menyelesaikan misi tersebut. Pastikan untuk membaca
            petunjuk dengan baik.
          </li>
        </ul>
      </>
    ),
  },
];

function Question() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionChange = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <>
      <div className="question px-4 lg:px-[72px] py-10 lg:py-16 bg-[#F6FEF6]">
        <div className="question-title flex flex-col lg:flex lg:flex-row lg:justify-between gap-5">
          <div className="lg:flex lg:w-[500px] lg:items-center">
            <p className="text-lg lg:text-4xl lg:items-center font-semibold lg:font-bold">
              Pertanyaan yang Sering Diajukan
            </p>
          </div>
          <div className="lg:flex lg:items-center">
            <button
              type="button"
              className="focus:outline-none text-white bg-[#35CC33] hover:bg-green-600 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Hubungi Kami
            </button>
          </div>
        </div>
        <div className="question-list mt-10 lg:mt-14 bg-white">
          <Accordion allowToggle>
            {data.map((item, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton
                    _expanded={{ bg: "#35cc33", color: "white" }}
                    className="flex justify-between gap-4"
                    onClick={() => handleAccordionChange(index)}
                  >
                    <Box className="flex font-semibold lg:px-[60px] lg:py-[43px]">
                      <p className="text-lg lg:text-4xl">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </p>
                      <p className="flex items-center text-left text-sm lg:text-2xl ml-4 lg:ml-[106px]">
                        {item.question}
                      </p>
                    </Box>
                    <div className="lg:pr-[60px]">
                      {activeAccordion === index ? (
                        <ChevronUpCircle className="h-8 w-8 lg:h-12 lg:w-12" />
                      ) : (
                        <ChevronDownCircle className="h-8 w-8 lg:h-12 lg:w-12" />
                      )}
                    </div>
                  </AccordionButton>
                </h2>
                <div className="bg-[#35cc33] px-9 sm:px-[35px] lg:pl-[205px] lg:pr-[200px]">
                  <AccordionPanel className="bg-[#35cc33] text-sm lg:text-xl font-normal text-white mb-4 lg:mb-10">
                    {item.answer}
                  </AccordionPanel>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default Question;
