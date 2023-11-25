import { useRef, useState } from "react";
import ArticleCategory from "./ArticleCategory";
import uploadImgPic from "../../assets/upload-img.png";
import TextEditor from "./TextEditor";
import { DeleteModal } from "../modal";
import { useDisclosure } from "@chakra-ui/react";

function EditArticle({ editArticleData, onClose }) {
  const [previewImage, setPreviewImage] = useState(null);
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const categoryHeight = useRef(null);

  function handleImage(event) {
    if (event.target.files && event.target.files[0]) {
      const objUrl = URL.createObjectURL(event.target.files[0]);
      setPreviewImage(objUrl);
    }
  }

  function handleDelete(data) {
    console.log("deleted!", data);
    onCloseDelete();
    onClose();
  }

  return (
    <div className="p-6 w-full min-h-screen bg-[#EBEBF0]">
      <DeleteModal title={"Anda yakin ingin menghapus konten ini?"} message={"Konten yang dihapus tidak dapat dipulihkan"}
      isOpen={isOpenDelete} target={editArticleData} onClose={onCloseDelete} onDelete={handleDelete} />
      <p className="text-2xl font-bold">Edit Konten</p>
      <div className="mt-4 flex gap-9 pl-3 pr-6 py-6 rounded-xl min-h-[85vh] bg-white">
        <div  className="flex-1">
          <p className="mb-2 text-sm font-medium">Masukkan Judul</p>
          <input className="w-full pl-6 py-4 rounded-xl border border-[#828282]" type="text" placeholder="Masukkan Judul Disini..." />
          <TextEditor peerHeight={categoryHeight} reduceHeight={101} />
          <button onClick={onOpenDelete} className="mt-[45px] p-4 rounded-lg w-[170px] font-bold hover:opacity-90 text-white bg-[#FF5C5C]">Hapus</button>
        </div>

        <div ref={categoryHeight} className="flex flex-col max-w-[328px]">
          <ArticleCategory />
          <div className={`relative mt-6 h-52 rounded-xl ${!previewImage && 'border'} border-dashed border-[#828282] min-w-[328px] cursor-pointer`}>
            <input onChange={handleImage} className="absolute w-full h-full opacity-0 cursor-pointer" type="file" accept="image/*" />
            {previewImage ? <img src={previewImage} className="w-full h-full object-cover rounded-xl" alt="" />
            :<>
              <img src={uploadImgPic} className="mt-[52px] mx-auto" alt="" />
              <p className="text-center font-medium text-[#828282]">Unggah Gambar</p>
            </>}
          </div>
          <p className="mt-2 text-sm text-center text-[#828282]">Max 5 Mb, Format JPG & JPEG</p>
          <div className="mt-auto flex gap-3 justify-between text-white">
            <button onClick={onClose} className="p-4 w-full rounded-lg bg-[#828282] hover:opacity-90">Batal</button>
            <button onClick={onClose} className="p-4 w-full rounded-lg bg-[#35CC33] hover:opacity-90">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditArticle;
