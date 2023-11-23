import { useState } from 'react';
import { ArticleDetail } from "../modal";
import ArticleItem from "./ArticleItem";

function ArticleList({ articleData }) {
  const [currArticleData, setCurrArticleData] = useState(null);

  return (
    <>
      <ArticleDetail isOpen={currArticleData} onClose={() => setCurrArticleData(null)} />
      <div className="mb-10 flex flex-wrap gap-10">
        {articleData.map((article, index) => <ArticleItem setCurrArticleData={setCurrArticleData} {...article} key={index} />)}
      </div>
    </>
  )
}

export default ArticleList;
