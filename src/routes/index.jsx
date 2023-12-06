import { LayoutDashboardRoot } from "@/layout";
import { PrivateRoute } from "./private-route";
import { ProtectedRoute } from "./protected-route";
import { Route, Routes, useNavigate } from "react-router-dom/dist";
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
import MissionList from "@/pages/MissionList";
import MissionApproval from "@/pages/MissionApproval";
import PathNotFound from "@/pages/ErrorNotFound";
import RubbishCategory from "@/pages/RubbishCategory";
import TransactionList from "@/pages/TransactionList";
import VoucherList from "@/pages/VoucherList";
import DataReporting from "@/pages/DataReporting";
import ContentArticle from "@/pages/ContentArticle";
import ManageEventCommuntity from "@/pages/ManageEventCommunity";
import { globalRoute } from "@/utils";
import { RoleBasedRoute } from "./role-based-route";
import Unauthorized from "@/pages/Unauthorized";

export default function AppRoutes() {
	const navigate = useNavigate();
	globalRoute.navigate = navigate;

	return (
		<Routes>
			<Route
				path="/"
				element={<LandingPage />}
			/>
			<Route
				path="/login"
				element={<ProtectedRoute />}
			>
				<Route
					index
					element={<Login />}
				/>
			</Route>
			<Route
				path="/dashboard"
				element={<PrivateRoute />}
			>
				<Route element={<LayoutDashboardRoot />}>
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
						element={
							<RoleBasedRoute>
								<ManageAdmin />
							</RoleBasedRoute>
						}
					/>
					<Route
						path="badge"
						element={<Badge />}
					/>
					<Route
						path="report"
						element={<DataReporting />}
					/>
					<Route
						path="content-article"
						element={<ContentArticle />}
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
						element={<MissionList />}
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
						element={<ManageEventCommuntity />}
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
			</Route>
			<Route
				path="unauthorized"
				element={<Unauthorized />}
			/>
			<Route
				path="*"
				element={<PathNotFound />}
			/>
		</Routes>
	);
}
