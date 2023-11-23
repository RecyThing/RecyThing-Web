import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "@/components/navigation";
import TopBar from "@/components/navigation/TopBar";
function AdminRoot() {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="flex">
      <SideBar collapse={collapse} setCollapse={setCollapse} />
      <div className={`w-full ${collapse ? "ml-[96px]" : "ml-[312px]"}`}>
        <TopBar collapse={collapse} setCollapse={setCollapse} />
        <div className="pt-12 border">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminRoot;
