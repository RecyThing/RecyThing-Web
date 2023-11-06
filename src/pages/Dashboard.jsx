import { Download } from "react-iconly";

function Dashboard() {
  return (
    <div className="p-6 w-full bg-[#EBEBF0]">
      <div className="flex justify-between">
        <p className="font-bold text-2xl">Dashboard</p>
        <div className="flex gap-3 px-2 py-1 rounded-md bg-white">
          <Download className="my-auto" primaryColor="#949494" size={24} />
          <p className="my-auto font-medium text-sm text-[#A7A19E]">Download</p>
        </div>
      </div>

    </div>
  )
}

export default Dashboard;
