import { AxiosError } from "axios";
import { axiosInstance } from "../configs/axios/index";
import { authService } from "@/configs";

export const APIAuth = {
	login: async (data) => {
		try {
			const response = await axiosInstance.post("/admins/login", data);

			if (response.data) {
				const { token, fullname, email, image } = response.data.data;
				authService.setCredentialsToCookie({ token });
				authService.setDataAdmin({fullname, email, image});
			}

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},
};
