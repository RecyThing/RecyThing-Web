import { Route, Routes } from "react-router-dom/dist";
import AdminRoot from "./pages/AdminRoot";
import Dashboard from "./pages/Dashboard";

function App() {
	return (
		<Routes>
			<Route path="/" element={<AdminRoot />}>
				<Route index element={<Dashboard />} />
				<Route path="user-detail" element={<></>} />
				<Route path="content" element={<></>} />
				<Route path="report" element={<></>} />
				<Route path="mission" element={<></>} />
				<Route path="achievement" element={<></>} />
				<Route path="community" element={<></>} />
				<Route path="transaction" element={<></>} />
				<Route path="custom-data" element={<></>} />
				<Route path="setting" element={<></>} />
			</Route>
		</Routes>
	);
}

export default App;
