import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

function ArticleCategory() {
  const [showCategory, setShowCategory] = useState(false);
  const categories = ["Plastik", "Kaca", "Elektronik", "Kertas", "Tekstil", "Pakaian", "Organik", "Lainnya", "Metal", "Baterai", "Kaleng", "Minyak"];

  return (
    <div className="mt-7 w-full">
      <div onClick={() => setShowCategory(prev => !prev)} className="relative p-4 flex justify-between text-[#828282]
      z-20 bg-white rounded-xl border border-[#828282] cursor-pointer">
        <p className="my-auto text-sm font-medium">Kategori</p>
        {!showCategory ? <BsChevronDown className="text-2xl" /> : <BsChevronUp className="text-2xl" />}
      </div>

      <div>
        {showCategory && (
          <div className="flex flex-wrap gap-x-10 gap-y-4 px-6 pb-6 pt-12 mt-[-32px] rounded-xl border border-[#828282]">
            {categories.map((category, index) => <Checkbox key={index} colorScheme={"mainGreen"} className="flex-1 w-fit">{category}</Checkbox>)}
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticleCategory;
