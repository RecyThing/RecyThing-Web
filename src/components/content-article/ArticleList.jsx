import ArticleItem from "./ArticleItem";

function ArticleList({ articleData }) {

  return (
    <div className="mb-10 flex flex-wrap gap-10 justify-between">
      {articleData.map((article, index) => <ArticleItem {...article} key={index} />)}
    </div>
  )
}

export default ArticleList;
