import { axiosInstance } from "@/configs";
import { AxiosError } from "axios";

export const APIUser = {
	getUsers: async () => {
		try {
			const response = await axiosInstance.get("/admins/manage/users");
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	getUser: async (id) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/users/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	deleteUser: async (id) => {
		try {
			const response = await axiosInstance.delete(`/admins/manage/users/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},
};
