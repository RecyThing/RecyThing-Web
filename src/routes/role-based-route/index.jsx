import { authService } from "@/configs";
import { Navigate } from "react-router-dom";

export function RoleBasedRoute({ children }) {
	const { role } = authService.getAdminRole();
	// add id check later
	if (role !== "super_admin") {
		return (
			<Navigate
				to={"/unauthorized"}
				replace
			/>
		);
	}

	return children;
}
