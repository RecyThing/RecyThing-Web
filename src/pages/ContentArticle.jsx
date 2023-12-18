/* eslint-disable react-hooks/exhaustive-deps */
import { APIArticle } from "@/apis/APIArticle";
import { BsPlus } from "react-icons/bs";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/navigation";
import { Spinner } from "@/components/spinner";
import { useCustomToast, useDebounce } from "@/hooks";
import { useEffect, useState } from "react";
import AddArticle from "@/components/content-article/AddArticle";
import ArticleList from "@/components/content-article/ArticleList";
import EditArticle from "@/components/content-article/EditArticle";

function ContentArticle() {
	const [articleData, setArticleData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [toastMessage, setToastMessage] = useState({ status: "", message: "" });

	const [_searchTerm, setSearchTerm] = useState("");
	const searchTerm = useDebounce(_searchTerm, 500);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalItems, setTotalItems] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const [showCreateArticle, setShowCreateArticle] = useState(false);
	const [editArticleData, setEditArticleData] = useState(null);

	function handleSearch(term) {
		setSearchTerm(term);
		setCurrentPage(1);
	}

	function getArticleData() {
		setIsLoading(true);
		APIArticle.getAllArticle(searchTerm, itemsPerPage, currentPage)
			.then((res) => {
				setArticleData(res.data);
				setTotalItems(res.count_data);
			})
			.finally(() => {
				setToastMessage({ status: "", message: "" });
				setIsLoading(false);
			});
	}

	useEffect(() => {
		getArticleData();
	}, [currentPage, searchTerm, itemsPerPage]);

	useCustomToast(toastMessage.status, toastMessage.message);

	if (showCreateArticle)
		return (
			<AddArticle
				setToastMessage={setToastMessage}
				onClose={(refresh) => {
					setShowCreateArticle(false);
					if (refresh) getArticleData();
				}}
			/>
		);
	if (editArticleData)
		return (
			<EditArticle
				editArticleData={editArticleData}
				setToastMessage={setToastMessage}
				onClose={(refresh) => {
					setEditArticleData(null);
					if (refresh) getArticleData();
				}}
			/>
		);

	return (
		<div className="pt-6 px-5 pb-5 w-full min-h-screen bg-[#EBEBF0]">
			<p className="font-bold text-2xl">Daftar Konten</p>

			<div className="mt-4 p-6 rounded-2xl bg-white">
				<div className="mb-9 flex justify-between">
					<SearchBar
						onSearch={handleSearch}
						value={_searchTerm}
						className={"max-w-[407px]"}
					/>
					<button
						onClick={() => setShowCreateArticle(true)}
						className="my-auto flex items-center h-fit py-4 px-5 gap-[10px] rounded-[10px] bg-[#35CC33] text-white"
					>
						<BsPlus className="text-2xl" />
						<p>Tambah Data</p>
					</button>
				</div>

				{isLoading ? (
					<Spinner />
				) : (
					<ArticleList
						editArticleData={editArticleData}
						setEditArticleData={setEditArticleData}
						articleData={articleData}
					/>
				)}

				<Pagination
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					onChangeItemsPerPage={setItemsPerPage}
					onChangePage={setCurrentPage}
					totalItems={totalItems}
				/>
			</div>
		</div>
	);
}

export default ContentArticle;
