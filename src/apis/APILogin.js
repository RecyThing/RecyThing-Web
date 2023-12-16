import { authService, axiosInstance } from "@/configs";
import { AxiosError } from "axios";

/**
 * `APIAuth` is an object that provides methods to interact with the authentication endpoint of the API.
 * @namespace APIAuth
 */
export const APIAuth = {
	/**
	 * Login a user.
	 * @param {{ email: string, password: string }} data - The data to login the user with.
	 * @returns {Promise<Object>} Promise resolving to the logged in user.
	 */
	login: async (data) => {
		try {
			const response = await axiosInstance.post("/admins/login", data);

			if (response.data) {
				const { token, fullname, email, image } = response.data.data;
				authService.setCredentialsToCookie({ token });
				authService.setDataAdmin({ fullname, email, image });
			}

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},
};
