import { Route, Routes } from "react-router-dom/dist";
import AdminRoot from "./pages/AdminRoot";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ManageWasteExchange from "./pages/ManageWasteExchange";
import UserDetail from "./pages/UserDetail";
import VoucherList from "./pages/VoucherList";
import Download from "./pages/Download";
import ErrorNotFound from "./error/ErrorNotFound";
import DataDropPoint from "./pages/DataDropPoint";
import DataCustomization from "./pages/DataCustomization";
import ManageAdmin from "./pages/ManageAdmin";

function App() {
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
				element={<AdminRoot />}
			>
				<Route
					index
					element={<Dashboard />}
				/>
				<Route
					path="user-detail"
					element={<UserDetail />}
				/>
				<Route
					path="admin-list"
					element={<ManageAdmin />}
				/>
				<Route
					path="badge"
					element={<></>}
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
					element={<></>}
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
					element={<></>}
				/>
				<Route
					path="voucher-list"
					element={<VoucherList />}
				/>
				<Route
					path="transaction-list"
					element={<></>}
				/>
				<Route
					path="drop-point-transaction"
					element={<ManageWasteExchange />}
				/>
				<Route
					path="community"
					element={<></>}
				/>
				<Route
					path="customize-data"
					element={<DataCustomization />}
				/>
				<Route
					path="download"
					element={<Download />}
				/>
			</Route>
			<Route
				path="*"
				element={<ErrorNotFound />}
			/>
		</Routes>
	);
}

export default App;
