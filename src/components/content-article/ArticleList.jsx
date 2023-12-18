import { ModalDetailArticle } from "../modal";
import { useState } from "react";
import ArticleItem from "./ArticleItem";

function ArticleList({ editArticleData, setEditArticleData, articleData }) {
	const [currArticleData, setCurrArticleData] = useState(null);

	return (
		<>
			<ModalDetailArticle
				currArticleData={currArticleData}
				editArticleData={editArticleData}
				setEditArticleData={setEditArticleData}
				onClose={() => setCurrArticleData(null)}
			/>
			<div className="mb-10 flex flex-wrap gap-10">
				{articleData.map((article, index) => (
					<ArticleItem
						setCurrArticleData={setCurrArticleData}
						data={article}
						key={index}
					/>
				))}
			</div>
		</>
	);
}

export default ArticleList;
