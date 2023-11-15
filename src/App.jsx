import { Route, Routes } from "react-router-dom/dist";
import AdminRoot from "./pages/AdminRoot";
import Dashboard from "./pages/Dashboard";
import UserDetail from "./pages/UserDetail";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import DataReporting from "./pages/DataReporting";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<AdminRoot />}>
        <Route index element={<Dashboard />} />
        <Route path="user-detail" element={<UserDetail />} />
        <Route path="content" element={<></>} />
        <Route path="report" element={<DataReporting />} />
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
