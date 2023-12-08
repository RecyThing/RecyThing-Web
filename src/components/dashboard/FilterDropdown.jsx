
function FilterDropdown({ setShowDropdown, setFilter }) {

  return (
    <div className="absolute top-9 left-0 w-full py-2 shadow-md rounded-lg bg-white">
      <p className="px-3 cursor-pointer hover:bg-gray-300" onClick={() => {setShowDropdown(false); setFilter("year")}}>Tahun ini</p>
      <p className="px-3 cursor-pointer hover:bg-gray-300 mt-2" onClick={() => {setShowDropdown(false); setFilter("month")}}>Bulan ini</p>
    </div>
  )
}

export default FilterDropdown;
