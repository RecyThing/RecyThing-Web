import { Box } from "@chakra-ui/react";
import InfoCard from "@/components/dashboard/InfoCard";
import { Download } from "react-iconly";
import recycleImage from "@/assets/dashboard/recycle.png";
import activeUserImage from "@/assets/dashboard/active-user.png";
import voucherImage from "@/assets/dashboard/voucher.png";
import megaphoneImage from "@/assets/dashboard/megaphone.png";
import Statistic from "@/components/dashboard/Statistic";
import Chart from "@/components/dashboard/Chart";
import { useNavigate } from "react-router-dom";
import { LayoutDashboardContent } from "@/layout";
import RankingUser from "@/components/dashboard/RankingUser";
import { ArrowDown2 } from "iconsax-react";
import { useEffect, useState } from "react";
import FilterDropdown from "@/components/dashboard/FilterDropdown";
import { APIDashboard } from "@/apis/APIDashboard";
import { Spinner } from "@/components/spinner";

function Dashboard() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [filter, setFilter] = useState("years");

  useEffect(() => {
    setIsLoading(true);
    APIDashboard.getDashboardData(filter).then(res => {
      setDashboardData(res.data);
    }).finally(() => setIsLoading(false));
  }, [filter]);

  if (isLoading || !dashboardData) return <Spinner />
  return (
    <LayoutDashboardContent>
      <div className="flex justify-between">
        <p className="font-bold text-2xl">Dashboard</p>
        <div className="flex gap-6">
          <div className="relative">
            <Box
              className="flex gap-3 px-2 py-1 h-8 rounded-md bg-white cursor-pointer"
              onClick={() => setShowDropdown(prev => !prev)}
            >
              <p className="my-auto font-medium text-sm">{filter === "years" ? "Tahun ini" : "Bulan ini"}</p>
              <ArrowDown2 className="my-auto" size={16} />
            </Box>
            {showDropdown && <FilterDropdown setShowDropdown={setShowDropdown} setFilter={setFilter} />}
          </div>
          <Box
            _hover={{ bg: "#F2F2F5", color: "#A7A19E" }}
            className="flex gap-3 px-2 py-1 rounded-md bg-white cursor-pointer"
            onClick={() => navigate("download")}
          >
            <Download className="my-auto" size={24} />
            <p className="my-auto font-medium text-sm">Download</p>
          </Box>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-5">
        <InfoCard
          title="Pengguna Aktif"
          count={parseInt(dashboardData.user_active?.total_user_active)}
          image={activeUserImage}
          percentage={parseInt(dashboardData.user_active?.percentage)}
        />
        <InfoCard
          title="Transaksi Tukar Poin"
          count={parseInt(dashboardData.exchange?.total_exchange)}
          image={voucherImage}
          percentage={parseInt(dashboardData.exchange.percentage)}
        />
        <InfoCard
          title="Total Laporan"
          count={parseInt(dashboardData.report?.total_report)}
          image={megaphoneImage}
          percentage={parseInt(dashboardData.report.percentage)}
        />
        <InfoCard
          title="Transaksi Daur Ulang"
          count={parseInt(dashboardData.recycle?.total_recycle)}
          image={recycleImage}
          percentage={parseInt(dashboardData.recycle.percentage)}
        />

				<Statistic data={dashboardData} filter={filter} />
				<Chart chartData={dashboardData.scale} />
				<RankingUser data={dashboardData.ranking} />
			</div>
		</LayoutDashboardContent>
	);
}

export default Dashboard;
