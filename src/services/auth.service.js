import { axiosInstance } from "@/configs";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export class AuthService {
	isTokenValid() {
		try {
			if (!this.getToken()) return false;

			const { exp } = jwtDecode(this.getToken());
			return Date.now() <= exp * 1000;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	async isUserValid() {
		try {
			if (!this.isTokenValid()) return false;

			const { id } = jwtDecode(this.getToken());
			// check if id admin available in db
			const response = await axiosInstance.get(`/admins/${id}`);
			if (response.data) {
				return true;
			}
			return false;
		} catch (error) {
			throw new Error(error.response.data.message || error.message);
		}
	}

	isAuthorized() {
		if (!this.isTokenValid()) {
			this.clearCredentialsFromCookie();
			return false;
		}
		return true;
	}

	getToken() {
		return Cookies.get("token");
	}

	getRefreshToken() {
		return Cookies.get("refreshToken");
	}

	getAdminRole() {
		if (this.isAuthorized()) {
			const { id, role } = jwtDecode(this.getToken());
			return { id, role };
		}
		return null;
	}

	setCredentialsToCookie({ token }) {
		const { exp } = jwtDecode(token);
		Cookies.set("token", token, { expires: new Date(exp * 1000) });
		// if (refreshToken) {
		// 	Cookies.set("refreshToken", refreshToken);
		// }
	}

	clearCredentialsFromCookie() {
		if (Cookies.get("token")) Cookies.remove("token");
		if (Cookies.get("refreshToken")) Cookies.remove("refreshToken");
	}

	logout() {
		this.clearCredentialsFromCookie();
	}
}
