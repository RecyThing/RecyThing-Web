import { axiosInstance } from "@/configs";
import { AxiosError } from "axios";

export const APITrashes = {
	getTrashes: async ({ search = "", limit = 10, page = 1 }) => {
		try {
			const response = await axiosInstance.get(
				`/admins/manage/trashes?search=${search}&limit=${limit}&page=${page}`
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	getTrash: async (id) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/trashes/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	updateTrashes: async ({ id, data }) => {
		try {
			const response = await axiosInstance.put(
				`/admins/manage/trashes/${id}`,
				data,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	deleteTrashes: async (id) => {
		try {
			const response = await axiosInstance.delete(
				`/admins/manage/trashes/${id}`
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	createTrashes: async (data) => {
		try {
			const response = await axiosInstance.post(
				"/admins/manage/trashes",
				data,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},
};
