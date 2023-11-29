
function ArticleItem({ setCurrArticleData }) {

  return (
    <div onClick={() => setCurrArticleData(1)} className="cursor-pointer shadow-md w-[220px] h-[244px] rounded-xl">
      <img className="rounded-t-xl h-[180px] object-cover" src={'https://blog.sciencemuseum.org.uk/wp-content/uploads/2014/06/D1413351-1024x696.jpg'} alt="" />
      <p className="p-2 text-sm font-medium max-w-[220px]">Pakai sisa minyak gorengmu dengan cara ini</p>
    </div>
  )
}

export default ArticleItem;
