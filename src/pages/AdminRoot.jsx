import { Outlet } from "react-router-dom";
import { SideBar } from "@/components/navigation";
import TopBar from "@/components/navigation/TopBar";

function AdminRoot() {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full">
        <TopBar />
        <div className="mt-12 border">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminRoot;
