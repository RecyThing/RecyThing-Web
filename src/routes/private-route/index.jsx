import { authService } from "@/configs";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
	if (!authService.isAuthorized()) {
		return <Navigate to="/login" />;
	}

	return <Outlet />;
}
