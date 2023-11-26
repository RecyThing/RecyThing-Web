import { authService } from "@/configs";
import { Navigate, Outlet } from "react-router-dom";

export function RoleBasedRoute() {
	const { id, role } = authService.getAdminRole();
	if (role !== "super_admin" && id !== "ambil id dari redux nanti") {
		return <Navigate to="/dashboard" />;
	}

	return <Outlet />;
}
