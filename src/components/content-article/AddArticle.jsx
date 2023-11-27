import { useRef, useState } from "react";
import ArticleCategory from "./ArticleCategory";
import TextEditor from "./TextEditor";
import { UploadImageIcon } from "../icons";

function AddArticle({ onClose }) {
  const [previewImage, setPreviewImage] = useState(null);
  const categoryHeight = useRef(null);

  function handleImage(event) {
    if (event.target.files && event.target.files[0]) {
      const objUrl = URL.createObjectURL(event.target.files[0]);
      setPreviewImage(objUrl);
    }
  }

  return (
    <div className="p-6 w-full min-h-screen bg-[#EBEBF0]">
      <p className="text-2xl font-bold">Tambah Konten</p>
      <div className="mt-4 flex gap-9 pl-3 pr-6 py-6 rounded-xl min-h-[85vh] bg-white">
        <div  className="flex-1">
          <p className="mb-2 text-sm font-medium">Masukkan Judul</p>
          <input className="w-full pl-6 py-4 rounded-xl border border-[#828282]" type="text" placeholder="Masukkan Judul Disini..." />
          <TextEditor peerHeight={categoryHeight} />
        </div>

        <div ref={categoryHeight} className="flex flex-col max-w-[328px]">
          <ArticleCategory />
          <div className={`relative mt-6 h-52 rounded-xl ${!previewImage && 'border'} border-dashed border-[#828282] min-w-[328px] cursor-pointer`}>
            <input onChange={handleImage} className="absolute w-full h-full opacity-0 cursor-pointer" type="file" accept="image/*" />
            {previewImage ? <img src={previewImage} className="w-full h-full object-cover rounded-xl" alt="" />
            : <div className="flex flex-col items-center justify-center h-full">
              <UploadImageIcon />
              <p className="text-center font-medium text-[#828282]">Unggah Gambar</p>
            </div>}
          </div>
          <p className="mt-2 text-sm text-center text-[#828282]">Max 5 Mb, Format JPG & JPEG</p>
          <div className="mt-auto flex gap-3 justify-between text-white">
            <button onClick={onClose} className="p-4 w-full rounded-lg bg-[#828282] hover:opacity-90">Batal</button>
            <button onClick={onClose} className="p-4 w-full rounded-lg bg-[#35CC33] hover:opacity-90">Bagikan</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddArticle;
