import LineGraph from "./LineGraph";

function Statistic({ filter }) {
  
  return (
    <div className="col-span-3 p-6 max-h-[372px] rounded-xl shadow-md bg-white">
      <p className="text-xl font-semibold leading-[30px]">Statistik</p>
      <div className="flex justify-between">
        <p className="text-sm text-[#777980]">Pelaporan dari Pengguna</p>
        <div className="flex gap-4">
          <div className="flex gap-[6px]">
            <div className="w-3 h-3 rounded-full bg-[#883DCF] my-auto" />
            <p className="text-xs font-medium text-[#667085] my-auto">Tumpukan Sampah</p>
          </div>
          <div className="flex gap-[6px]">
            <div className="w-3 h-3 rounded-full bg-[#F86624] my-auto" />
            <p className="text-xs font-medium text-[#667085] my-auto">Pelanggaran Sampah</p>
          </div>
        </div>
      </div>

      <LineGraph filter={filter} />
    </div>
  )
}

export default Statistic;
