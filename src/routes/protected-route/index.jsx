import { authService } from "@/configs";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
	if (authService.isAuthorized()) {
		return <Navigate to="/dashboard" />;
	}
	return <Outlet />;
}
