import { axiosInstance } from "@/configs";
import { AxiosError } from "axios";

export const APIRecycles = {
	getRecycles: async ({ search = "", limit = 10, page = 1 }) => {
		try {
			const response = await axiosInstance.get(
				`/admins/manage/recycles?search=${search}&limit=${limit}&page=${page}`
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	getRecycle: async (id) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/recycles/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	getCategories: async () => {
		try {
			const response = await axiosInstance.get("/admins/manage/trashes/categories");
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				throw new Error(error.response.data.message);
			}
		}
	},

	deleteRecycles: async (id) => {
		try {
			const response = await axiosInstance.delete(
				`/admins/manage/recycles/${id}`
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	createRecycles: async (data) => {
		try {
			const response = await axiosInstance.post("/admins/manage/recycles", data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},
};
