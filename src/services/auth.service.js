import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export class AuthService {
	isAuthorized() {
		return this.getToken() !== null;
	}

	getToken() {
		return Cookies.get("token");
	}

	getRefreshToken() {
		return Cookies.get("refreshToken");
	}

	getRole() {
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
