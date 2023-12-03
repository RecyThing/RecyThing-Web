
function ArticleItem({ data, setCurrArticleData }) {

  return (
    <div onClick={() => setCurrArticleData(data)} className="cursor-pointer shadow-md w-[220px] h-[244px] rounded-xl">
      <img className="rounded-t-xl h-[180px] w-full object-cover" src={data.image} alt="" />
      <p className="p-2 text-sm font-medium max-w-[220px]">{data.title}</p>
    </div>
  )
}

export default ArticleItem;
