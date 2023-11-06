import { Outlet } from "react-router-dom";
import SideBar from "../components/navigation";

function AdminRoot() {
  return (
    <div className="flex">
      <SideBar />
      <Outlet />
    </div>
  )
}

export default AdminRoot;
