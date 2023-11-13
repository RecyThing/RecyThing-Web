import {
	Chart,
	Home,
	Image,
	Paper,
	PaperPlus,
	Setting,
	TicketStar,
	TwoUsers,
	Wallet,
} from "react-iconly";
import { useLocation, useNavigate } from "react-router-dom";
import communityLogo from "@/assets/community-logo.png";
import recyThingLogo from "@/assets/recything-logo.png";

export function SideBar() {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<div className="px-6 pt-8 min-w-[312px] min-h-screen">
			<img
				className="mx-auto"
				src={recyThingLogo}
				alt=""
			/>
			<div className="my-8 h-[1px] w-full bg-[#3BA639]" />

			<div className="flex flex-col gap-4">
				<div
					onClick={() => navigate("/dashboard")}
					className={`p-2 flex gap-6 rounded-lg cursor-pointer ${
						pathname === "/dashboard" ? "bg-[#EBEBF0]" : "hover:bg-slate-100"
					}`}
				>
					<Home size={32} />
					<p className="font-medium text-xl">Beranda</p>
				</div>
				<div
					onClick={() => navigate("/dashboard/user-detail")}
					className={`p-2 flex gap-6 rounded-lg cursor-pointer ${
						pathname === "/dashboard/user-detail" ? "bg-[#EBEBF0]" : "hover:bg-slate-100"
					}`}
				>
					<TwoUsers size={32} />
					<p className="font-medium text-xl">Detail Pengguna</p>
				</div>
				<div
					onClick={() => navigate("/dashboard/content")}
					className={`p-2 flex gap-6 rounded-lg cursor-pointer ${
						pathname === "/dashboard/content" ? "bg-[#EBEBF0]" : "hover:bg-slate-100"
					}`}
				>
					<Image size={32} />
					<p className="font-medium text-xl">Konten</p>
				</div>
				<div
					onClick={() => navigate("/dashboard/report")}
					className={`p-2 flex gap-6 rounded-lg cursor-pointer ${
						pathname === "/dashboard/report" ? "bg-[#EBEBF0]" : "hover:bg-slate-100"
					}`}
				>
					<Chart size={32} />
					<p className="font-medium text-xl">Laporan</p>
				</div>
				<div
					onClick={() => navigate("/dashboard/mission")}
					className={`p-2 flex gap-6 rounded-lg cursor-pointer ${
						pathname === "/dashboard/mission" ? "bg-[#EBEBF0]" : "hover:bg-slate-100"
					}`}
				>
					<Paper size={32} />
					<p className="font-medium text-xl">Mission</p>
				</div>
				<div
					onClick={() => navigate("/dashboard/achievement")}
					className={`p-2 flex gap-6 rounded-lg cursor-pointer ${
						pathname === "/dashboard/achievement" ? "bg-[#EBEBF0]" : "hover:bg-slate-100"
					}`}
				>
					<TicketStar size={32} />
					<p className="font-medium text-xl">Achievement</p>
				</div>
				<div
					onClick={() => navigate("/dashboard/community")}
					className={`p-2 flex gap-6 rounded-lg cursor-pointer ${
						pathname === "/dashboard/community" ? "bg-[#EBEBF0]" : "hover:bg-slate-100"
					}`}
				>
					<img
						className="h-6 my-auto"
						src={communityLogo}
						alt=""
					/>
					<p className="font-medium text-xl">Komunitas</p>
				</div>
				<div
					onClick={() => navigate("/dashboard/transaction")}
					className={`p-2 flex gap-6 rounded-lg cursor-pointer ${
						pathname === "/dashboard/transaction" ? "bg-[#EBEBF0]" : "hover:bg-slate-100"
					}`}
				>
					<Wallet size={32} />
					<p className="font-medium text-xl">Transaksi</p>
				</div>
				<div
					onClick={() => navigate("/dashboard/custom-data")}
					className={`p-2 flex gap-6 rounded-lg cursor-pointer ${
						pathname === "/dashboard/custom-data" ? "bg-[#EBEBF0]" : "hover:bg-slate-100"
					}`}
				>
					<PaperPlus size={32} />
					<p className="font-medium text-xl">Custom Data</p>
				</div>
				<div
					onClick={() => navigate("/dashboard/setting")}
					className={`p-2 flex gap-6 rounded-lg cursor-pointer ${
						pathname === "/dashboard/setting" ? "bg-[#EBEBF0]" : "hover:bg-slate-100"
					}`}
				>
					<Setting size={32} />
					<p className="font-medium text-xl">Pengaturan</p>
				</div>
			</div>
		</div>
	);
}
