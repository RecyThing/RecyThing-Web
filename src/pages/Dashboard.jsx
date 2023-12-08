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
import { useState } from "react";
import FilterDropdown from "@/components/dashboard/FilterDropdown";

function Dashboard() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [filter, setFilter] = useState("year");

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
              <p className="my-auto font-medium text-sm">{filter === "year" ? "Tahun ini" : "Bulan ini"}</p>
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

				<Statistic filter={filter} />
				<Chart />
				<RankingUser />
			</div>
		</LayoutDashboardContent>
	);
}

export default Dashboard;
