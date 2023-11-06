import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

function AdminRoot() {
  return (
    <div className="flex">
      <SideBar />
      <Outlet />
    </div>
  )
}

export default AdminRoot;
