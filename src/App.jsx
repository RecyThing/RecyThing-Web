import { Route, Routes } from "react-router-dom/dist";
import AdminRoot from "./pages/AdminRoot";
import Dashboard from "./pages/Dashboard";
import UserDetail from "./pages/UserDetail";
import DaftarTransaksiTukerPoin from "./pages/daftar-tuker-poin";
import DataTerbaru from "./components/DaftarTukerPoin/DataTerbaru";
import DataDiproses from "./components/DaftarTukerPoin/DataDiproses";
import DataSelesai from "./components/DaftarTukerPoin/DataSelesai";

function App() {
	return (
		<Routes>
			<Route
				path="/"
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
					path="content"
					element={<></>}
				/>
				<Route
					path="report"
					element={<></>}
				/>
				<Route
					path="mission"
					element={<></>}
				/>
				<Route
					path="achievement"
					element={<></>}
				/>
				<Route
					path="community"
					element={<></>}
				/>
				<Route
					path="transaction"
					element={<DaftarTransaksiTukerPoin/>}
				/>
				<Route
					path="transaction/terbaru"
					element={<DataTerbaru/>}
				/>
				<Route
					path="transaction/diproses"
					element={<DataDiproses/>}
				/>
				<Route
					path="transaction/selesai"
					element={<DataSelesai/>}
				/>
				<Route
					path="custom-data"
					element={<></>}
				/>
				<Route
					path="setting"
					element={<></>}
				/>
				
			</Route>
		</Routes>
	);
}

export default App;
