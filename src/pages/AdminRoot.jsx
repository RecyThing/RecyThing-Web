import { Outlet } from "react-router-dom";
import { SideBar } from "@/components/navigation";
import TopBar from "@/components/navigation/TopBar";
import { useState } from "react";

function AdminRoot() {
  const [hide, setHide] = useState(false);
  const onHide = (bool) => {
    setHide(bool);
  }
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full">
        <TopBar onHide={onHide} hide={hide}/>
        <div className="mt-12 border">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminRoot;
