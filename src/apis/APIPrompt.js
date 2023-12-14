import { axiosInstance } from "@/configs";
import { AxiosError } from "axios";

export const APIPrompt = {
	getPrompts: async ({ search, limit, page, filter }) => {
		try {
			const response = await axiosInstance.get(
				`/admins/manage/prompts?search=${search}&limit=${limit}&page=${page}${
					filter ? `&filter=${filter}` : ""
				}`
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	getPrompt: async (id) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/prompts/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	updatePrompt: async ({ id, data }) => {
		try {
			const response = await axiosInstance.put(
				`/admins/manage/prompts/${id}`,
				data
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	deletePrompt: async (id) => {
		try {
			const response = await axiosInstance.delete(
				`/admins/manage/prompts/${id}`
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	createPrompt: async (data) => {
		try {
			const response = await axiosInstance.post("/admins/manage/prompts", data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},
};
