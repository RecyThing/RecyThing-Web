import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

class AuthService {
  isAuthorized() {
    return this.getToken() !== null;
  }

  getToken() {
    const token = Cookies.get("idToken") || Cookies.get("oauthAccessToken");
    return token;
  }

  getRefreshToken() {
    return Cookies.get("refreshToken");
  }

  setCredentialsToCookie({ idToken, oauthAccessToken, refreshToken }) {
    const expires = new Date();
		expires.setSeconds(expires.getSeconds() + 3600);
    if (idToken) Cookies.set("idToken", idToken);
    if (oauthAccessToken) Cookies.set("oauthAccessToken", oauthAccessToken);
    Cookies.set("refreshToken", refreshToken);
  }

  clearCredentialsFromCookie() {
    Cookies.remove("idToken");
    Cookies.remove("oauthAccessToken");
    Cookies.remove("refreshToken");
  }

  decodeToken() {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
  async logOut() {
		try {
			await this.clearCredentialsFromCookie();
			window.location.href = "/login";
		} catch (err) {
			console.error(err);
		}
  }
}

export default new AuthService();
