import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SideBar, TopBar } from "@/components/navigation";
export function LayoutDashboardRoot() {
	const [collapse, setCollapse] = useState(false);

	return (
		<div className="flex">
			<SideBar
				collapse={collapse}
				setCollapse={setCollapse}
			/>
			<div className={`w-full ${collapse ? "ml-[96px]" : "ml-[312px]"}`}>
				<TopBar
					collapse={collapse}
					setCollapse={setCollapse}
				/>
				<div className="mt-12 border">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
