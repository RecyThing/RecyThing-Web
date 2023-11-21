import { Route, Routes } from "react-router-dom/dist";
import AdminRoot from "./pages/AdminRoot";
import Dashboard from "./pages/Dashboard";
import UserDetail from "./pages/UserDetail";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import KelolaPenukaranSampah from "./pages/KelolaPenukaranSampah";
import Download from "./pages/Download";
import ErrorNotFound from "./error/ErrorNotFound";
import DataReporting from "./pages/DataReporting";
import DaftarTransaksi from "./pages/DaftarTransaksi";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<AdminRoot />}>
        <Route index element={<Dashboard />} />
        <Route path="user-detail" element={<UserDetail />} />
        <Route path="admin-list" element={<></>} />
        <Route path="badge" element={<></>} />
        <Route path="report" element={<DataReporting />} />
        <Route path="report" element={<></>} />
        <Route path="content-article" element={<></>} />
        <Route path="rubbish-category" element={<></>} />
        <Route path="data-drop-point" element={<></>} />
        <Route path="mission-list" element={<></>} />
        <Route path="mission-approval" element={<></>} />
        <Route path="voucher-list" element={<></>} />
        <Route path="transaction-list" element={<DaftarTransaksi />} />
        <Route
          path="drop-point-transaction"
          element={<KelolaPenukaranSampah />}
        />
        <Route path="community" element={<></>} />
        <Route path="customize-data" element={<></>} />
        <Route path="download" element={<Download />} />
      </Route>

      <Route path="*" element={<ErrorNotFound />} />
    </Routes>
  );
}

export default App;
