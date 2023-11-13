import {
	Category,
	Chart,
	Home,
	Paper,
	ShieldDone,
	User,
} from "react-iconly";
import recycle from '@/assets/recycle.png'

export const sideBarMenuArray = [
	{
		name: "Beranda",
		logo: <Home size={24} className="shrink-0" />,
		path: "/dashboard"
	},
	{
		name: "Manajemen Pengguna",
		logo: <User size={24} className="shrink-0" />,
		subMenu: [
			{
				name: "Detail Pengguna",
				path: "/dashboard/user-detail"
			},
			{
				name: "Daftar Admin",
				path: "/dashboard/admin-list"
			},
			{
				name: "Lencana",
				path: "/dashboard/badge"
			},
		]
	},
	{
		name: "Pelaporan",
		logo: <Chart size={24} className="shrink-0" />,
		path: "/dashboard/report"
	},
	{
		name: "Manajemen Misi",
		logo: <Paper size={24} className="shrink-0" />,
		subMenu: [
			{
				name: "Daftar Misi",
				path: "/dashboard/mission-list"
			},
			{
				name: "Approval Misi",
				path: "/dashboard/mission-approval"
			},
		]
	},
	{
		name: "Manajemen Transaksi",
		logo: <ShieldDone size={24} className="shrink-0" />,
		subMenu: [
			{
				name: "Daftar Voucher",
				path: "/dashboard/voucher-list"
			},
			{
				name: "Daftar Transaksi",
				path: "/dashboard/transaction-list"
			},
		]
	},
	{
		name: "Transaksi Drop Point",
		logo: <img src={recycle} alt="" className="shrink-0 w-6 h-6" />,
		path: "/dashboard/drop-point-transaction"
	},
	{
		name: "Manajemen Aplikasi",
		logo: <Category size={24} className="shrink-0" />,
		subMenu: [
			{
				name: "Komunitas",
				path: "/dashboard/community"
			},
			{
				name: "Kustomisasi Data",
				path: "/dashboard/customize-data"
			},
		]
	},
]