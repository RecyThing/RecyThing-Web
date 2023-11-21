
function ArticleItem() {
  function getImgUrl(name) {
    return new URL(`${name}`, import.meta.url).href
  }

  return (
    <div className="shadow-md w-[220px] h-[244px] rounded-xl">
      <img className="rounded-t-xl" src={getImgUrl('../../assets/article-dummy.png')} alt="" />
      <p className="p-2 text-sm font-medium">Pakai sisa minyak gorengmu dengan cara ini</p>
    </div>
  )
}

export default ArticleItem;
