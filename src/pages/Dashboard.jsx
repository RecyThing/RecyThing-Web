import InfoCard from "@/components/dashboard/InfoCard";
import { Download } from "react-iconly";
import recycleImage from "@/assets/dashboard/recycle.png";
import activeUserImage from "@/assets/dashboard/active-user.png";
import voucherImage from "@/assets/dashboard/voucher.png";
import megaphoneImage from "@/assets/dashboard/megaphone.png";
import Statistic from "@/components/dashboard/Statistic";
import Chart from "@/components/dashboard/Chart";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-6 w-full flex flex-col min-h-screen bg-[#EBEBF0] pb-10">
      <div className="flex justify-between">
        <p className="font-bold text-2xl">Dashboard</p>
        <div
          className="flex gap-3 px-2 py-1 rounded-md bg-white cursor-pointer"
          onClick={() => navigate("download")}
        >
          <Download className="my-auto" primaryColor="#949494" size={24} />
          <p className="my-auto font-medium text-sm text-[#A7A19E]">Download</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-5">
        <InfoCard
          title="Pengguna Aktif"
          count={1784}
          image={activeUserImage}
          percentage={0.1}
        />
        <InfoCard
          title="Transaksi Tukar Poin"
          count={145}
          image={voucherImage}
          percentage={-0.1}
        />
        <InfoCard
          title="Total Laporan"
          count={329}
          image={megaphoneImage}
          percentage={0.1}
        />
        <InfoCard
          title="Transaksi Daur Ulang"
          count={52}
          image={recycleImage}
          percentage={0.1}
        />

        <Statistic />
        <Chart />
      </div>
    </div>
  );
}

export default Dashboard;
