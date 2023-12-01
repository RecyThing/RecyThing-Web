import { AxiosError } from "axios";
import { axiosInstance } from "../configs/axios/index";
import { authService } from "@/configs";

export const APIAuth = {
	login: async (data) => {
		try {
			const response = await axiosInstance.post("/admins/login", data);

			if (response.data) {
				const { token } = response.data.data;
				authService.setCredentialsToCookie({ token });
				authService.setDataAdmin(JSON.stringify(response.data.data));
			}

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},
};
