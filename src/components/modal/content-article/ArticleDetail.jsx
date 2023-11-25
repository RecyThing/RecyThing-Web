/* eslint-disable react/no-unescaped-entities */
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { GoThumbsup, GoShareAndroid } from 'react-icons/go'

export function ArticleDetail({ setEditArticleData, isOpen, onClose }) {
  function getImgUrl(name) {
    return new URL(`${name}`, import.meta.url).href
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"} isCentered>
      <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(10px)"} />
      <ModalContent padding={"24px"} borderRadius={"xl"}>
        <p className="text-[28px]">3 Cara mendaur ulang sampah PLASTIK!</p>
        <img src={getImgUrl('../../../assets/article-dummy.png')} className="my-8 object-cover h-[148px]" alt="" />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="text-sm text-[#35CC33]">Minyak</p>
            <div className="my-auto h-3 w-[1px] bg-[#C7C9D9]" />
            <p className="text-sm text-[#808080]">22/10/2023</p>
          </div>

          <div className="flex gap-2">
            <GoThumbsup className="text-2xl text-[#828282]" />
            <p className="my-auto text-sm text-[#828282]">182</p>
            <GoShareAndroid className="text-2xl text-[#828282]" />
            <p className="my-auto text-sm text-[#828282]">182</p>
          </div>
        </div>

        <p className="mt-2 max-h-[353px] overflow-y-scroll">
          Sampah plastik adalah masalah serius yang merusak lingkungan kita. Plastik tidak mudah terurai, dan banyak jenisnya akhirnya mencemari lautan, hutan, dan daratan. Namun, dengan berpartisipasi dalam praktik daur ulang plastik, kita dapat berkontribusi untuk mengurangi dampak negatifnya terhadap bumi. Berikut adalah tiga cara sederhana untuk mendaur ulang sampah plastik yang dapat membantu menyelamatkan lingkungan: 1. Mencari Tempat Pengumpulan Daur Ulang Plastik
          Langkah pertama adalah mencari tempat pengumpulan daur ulang plastik di sekitar Anda. Banyak komunitas memiliki fasilitas daur ulang yang menerima berbagai jenis plastik, termasuk botol, wadah, dan kemasan plastik lainnya. Informasi tentang lokasi pengumpulan ini biasanya dapat ditemukan di situs web pemerintah setempat atau lembaga daur ulang. Ketika Anda mengetahui lokasinya, Anda dapat mulai mengumpulkan plastik Anda.
          2. Pisahkan Plastik Menurut Jenisnya
          Pisahkan sampah plastik menurut jenisnya. Ini penting karena beberapa jenis plastik lebih mudah didaur ulang daripada yang lain. Biasanya, plastik memiliki label kode daur ulang yang membantu Anda mengidentifikasi jenisnya. Contoh labelnya adalah "PET" untuk botol air minum, "HDPE" untuk botol susu, dan "LDPE" untuk kantong plastik. Dengan memisahkan plastik sesuai dengan jenisnya, Anda mempermudah proses daur ulang.
          3. Bersihkan dan Persiapkan Plastik untuk Daur Ulang
          Sebelum Anda mengirim plastik ke tempat daur ulang, pastikan untuk membersihkannya terlebih dahulu. Bersihkan botol atau wadah plastik dari sisa makanan atau minuman. Kemudian, keringkan plastik tersebut. Hal ini membantu menjaga kualitas daur ulangnya. Setelah bersih, Anda dapat mengikuti panduan dari tempat daur ulang setempat Anda untuk mengirimkan plastik tersebut.
          Dengan mengikuti langkah-langkah sederhana ini, Anda dapat berperan dalam mendaur ulang sampah plastik. Dengan mendaur ulang plastik, Anda membantu mengurangi limbah plastik di tempat pembuangan sampah dan membantu menyelamatkan lingkungan kita dari dampak negatif plastik yang terbuang begitu saja. Mari kita bersama-sama berkontribusi untuk menjaga bumi kita tetap hijau dan bersih.
        </p>

        <div className="mt-8 flex gap-3 justify-between text-white">
          <button onClick={onClose} className="p-4 w-full rounded-lg bg-[#828282] hover:opacity-90">Kembali</button>
          <button onClick={() => {onClose(); setEditArticleData(1)}} className="p-4 w-full rounded-lg bg-[#35CC33] hover:opacity-90">Ubah</button>
        </div>
      </ModalContent>
    </Modal>
  )
}
