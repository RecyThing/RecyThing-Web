import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export class AuthService {
	isAuthorized() {
		return this.getToken() ? true : false;
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

	getDataAdmin() {
		if (this.isAuthorized()) {
			return JSON.parse(Cookies.get("data"));
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
	
	setDataAdmin( {fullname, email , image} ) {
		const data = {
			'name': fullname,
			'email': email,
			'image': image,
		}
		Cookies.set("data", JSON.stringify(data));
	}

	clearCredentialsFromCookie() {
		if (Cookies.get("token")) Cookies.remove("token");
		if (Cookies.get("refreshToken")) Cookies.remove("refreshToken");
		if (Cookies.get("data")) Cookies.remove("data");
	}

	logout() {
		this.clearCredentialsFromCookie();
	}
}
