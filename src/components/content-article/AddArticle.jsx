import { useEffect, useRef, useState } from "react";
import ArticleCategory from "./ArticleCategory";
import TextEditor from "./TextEditor";
import { UploadImageIcon } from "../icons";
import { APIArticle } from "@/apis/APIArticle";
import { Spinner } from "../spinner";

function AddArticle({ onClose, setToastMessage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [articleData, setArticleData] = useState({ title: '', content: '', category_id: [], image: null });
  const [categoriesData, setCategoriesData] = useState([]);
  const [errorImage, setErrorImage] = useState("");
  const categoryHeight = useRef(null);
  const titleWidth = useRef(null);

  function handleImage(event) {
    setErrorImage("");
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    try {
      if (event.target.files && event.target.files[0]) {
        if (!validTypes.includes(event.target.files[0].type)) return setErrorImage("File harus image"); 
        if (event.target.files[0].size > 5000000) return setErrorImage("Ukuran gambar terlalu besar"); 
        const objUrl = URL.createObjectURL(event.target.files[0]);
        setPreviewImage(objUrl);
        setArticleData(prev => ({ ...prev, image: event.target.files[0] }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleCreateArticle() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", articleData.title);
    formData.append("content", articleData.content);
    formData.append("image", articleData.image);
    articleData.category_id.forEach(id => formData.append("category_id", id));
    APIArticle.addArticle(formData).then(res => {
      setToastMessage({ status: "success", message: res.message });
      setIsLoading(false);
      onClose(true);
    }).finally(() => setIsLoading(false));
  }

  useEffect(() => {
    APIArticle.getAllCategory().then(res => setCategoriesData(res.data));
  }, [])

  return (
    <div className="p-6 w-full min-h-screen bg-[#EBEBF0]">
      <p className="text-2xl font-bold">Tambah Konten</p>
      <div className="mt-4 flex gap-9 pl-3 pr-6 py-6 rounded-xl min-h-[85vh] bg-white">
        <div  className="flex-1">
          <p className="mb-2 text-sm font-medium">Masukkan Judul</p>
          <input ref={titleWidth} onChange={(event) => setArticleData(prev => ({ ...prev, title: event.target.value }))} maxLength={100}
          className="w-full pl-6 py-4 rounded-xl border border-[#828282]" type="text" placeholder="Masukkan Judul Disini..." />
          <TextEditor titleWidth={titleWidth} setArticleData={setArticleData} peerHeight={categoryHeight} />
        </div>

        <div ref={categoryHeight} className="flex flex-col max-w-[328px]">
          <ArticleCategory articleData={articleData} setArticleData={setArticleData} categories={categoriesData} />
          <div className={`relative mt-6 h-52 rounded-xl ${!previewImage && 'border'} border-dashed border-[#828282] min-w-[328px] cursor-pointer`}>
            <input onChange={handleImage} className="absolute w-full h-full opacity-0 cursor-pointer" type="file" accept="image/*" />
            {previewImage ? <img src={previewImage} className="w-full h-full object-cover rounded-xl" alt="" />
            : <div className="flex flex-col items-center justify-center h-full">
              <UploadImageIcon />
              <p className="text-center font-medium text-[#828282]">Unggah Gambar</p>
            </div>}
          </div>
          <p className="text-sm text-center text-red-500">{errorImage}</p>
          <p className="mt-2 text-sm text-center text-[#828282]">Max 5 Mb, Format JPG & JPEG</p>
          <div className="mt-auto flex gap-3 justify-between text-white">
            <button disabled={isLoading} onClick={() => onClose()} className="p-4 w-full rounded-lg bg-[#828282] disabled:opacity-50 hover:opacity-90">Batal</button>
            <button disabled={isLoading || !articleData.title || !articleData.image || !articleData.content || !articleData.category_id.length > 0} 
            onClick={handleCreateArticle} className="p-4 w-full rounded-lg bg-[#35CC33] disabled:opacity-50 hover:opacity-90 flex gap-2 justify-center">
              <span className="my-auto">Bagikan</span>
              {isLoading && <Spinner containerSize={6} width={6} height={6} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddArticle;
