import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "@/components/navigation";

function AdminRoot() {
	const [collapse, setCollapse] = useState(false);

	return (
		<div className="flex">
			<SideBar collapse={collapse} setCollapse={setCollapse} />
			<div className={`w-full ${collapse ? 'ml-[96px]' : 'ml-[312px]'}`}>
				<Outlet />
			</div>
		</div>
	);
}

export default AdminRoot;
