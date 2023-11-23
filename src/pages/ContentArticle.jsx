import { useState } from "react"
import { SearchBar } from "@/components/navigation"
import { BsPlus } from "react-icons/bs"
import { Pagination } from "@/components/pagination";
import ArticleList from "@/components/content-article/ArticleList";
import AddArticle from "@/components/content-article/AddArticle";

function ContentArticle() {
  const articleData = Array(20).fill({
    title: 'Lorem ipsum dolor sit amet',
    img: '../../assets/article-dummy.png'
  }).map((article, i) => ({ ...article, title: i % 2 === 0 ? 'Pakai sisa minyak gorengmu dengan cara ini' 
  : 'Cara Mendaur Ulang Pakaian Lama: Kontribusi untuk Lingkungan' }));

  const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showCreateArticle, setShowCreateArticle] = useState(false);
  const paginatedData = articleData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (showCreateArticle) return <AddArticle onClose={() => setShowCreateArticle(false)} />

  return (
    <div className="pt-6 px-5 pb-5 w-full min-h-screen bg-[#EBEBF0]">
      <p className="font-bold text-2xl">Daftar Konten</p>

      <div className="mt-4 p-6 rounded-2xl bg-white">
        <div className="mb-9 flex justify-between">
          <SearchBar className={"max-w-[407px]"} />
          <button onClick={() => setShowCreateArticle(true)} className="my-auto flex items-center h-fit py-4 px-5 gap-[10px] rounded-[10px] bg-[#35CC33] text-white">
            <BsPlus className="text-2xl" />
            <p>Tambah Data</p>
          </button>
        </div>

        <ArticleList articleData={paginatedData} />

        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onChangeItemsPerPage={setItemsPerPage}
          onChangePage={setCurrentPage}
          totalItems={articleData.length}
        />
      </div>
    </div>
  )
}

export default ContentArticle;
