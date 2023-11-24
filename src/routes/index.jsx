import { Route, Routes } from "react-router-dom/dist";
import { LayoutDashboardRoot } from "@/layout";
import Badge from "@/pages/Badge";
import Community from "@/pages/Community";
import Dashboard from "@/pages/Dashboard";
import DataCustomization from "@/pages/DataCustomization";
import DataDropPoint from "@/pages/DataDropPoint";
import DownloadStatistic from "@/pages/DownloadStatistic";
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import ManageAdmin from "@/pages/ManageAdmin";
import ManageUser from "@/pages/ManageUser";
import ManageWasteExchange from "@/pages/ManageWasteExchange";
import MissionApproval from "@/pages/MissionApproval";
import PathNotFound from "@/pages/ErrorNotFound";
import RubbishCategory from "@/pages/RubbishCategory";
import TransactionList from "@/pages/TransactionList";
import VoucherList from "@/pages/VoucherList";

export default function AppRoutes() {
	return (
		<Routes>
			<Route
				path="/"
				element={<LandingPage />}
			/>
			<Route
				path="/login"
				element={<Login />}
			/>
			<Route
				path="/dashboard"
				element={<LayoutDashboardRoot />}
			>
				<Route
					index
					element={<Dashboard />}
				/>
				<Route
					path="user-detail"
					element={<ManageUser />}
				/>
				<Route
					path="admin-list"
					element={<ManageAdmin />}
				/>
				<Route
					path="badge"
					element={<Badge />}
				/>
				<Route
					path="report"
					element={<></>}
				/>
				<Route
					path="content-article"
					element={<></>}
				/>
				<Route
					path="rubbish-category"
					element={<RubbishCategory />}
				/>
				<Route
					path="data-drop-point"
					element={<DataDropPoint />}
				/>
				<Route
					path="mission-list"
					element={<></>}
				/>
				<Route
					path="mission-approval"
					element={<MissionApproval />}
				/>
				<Route
					path="voucher-list"
					element={<VoucherList />}
				/>
				<Route
					path="transaction-list"
					element={<TransactionList />}
				/>
				<Route
					path="drop-point-transaction"
					element={<ManageWasteExchange />}
				/>
				<Route
					path="community"
					element={<Community />}
				/>
				<Route
					path="community/:id"
					element={<></>}
				/>
				<Route
					path="customize-data"
					element={<DataCustomization />}
				/>
				<Route
					path="download"
					element={<DownloadStatistic />}
				/>
			</Route>
			<Route
				path="*"
				element={<PathNotFound />}
			/>
		</Routes>
	);
}
