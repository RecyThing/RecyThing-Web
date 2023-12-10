import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axios";

export const APICommunity = {
	getCommunities: async ({ search, limit, page = 1 }) => {
		try {
			const response = await axiosInstance.get(
				`/admins/manage/communities?search=${search}&limit=${limit}&page=${page}`
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	getCommunity: async (id) => {
		try {
			const response = await axiosInstance.get(
				`/admins/manage/communities/${id}`
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	createCommunity: async (data) => {
		try {
			const response = await axiosInstance.post(
				"/admins/manage/communities",
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	updateCommunity: async ({ id, data }) => {
		try {
			console.log(data);
			const response = await axiosInstance.put(
				`/admins/manage/communities/${id}`,
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	deleteCommunity: async (id) => {
		try {
			const response = await axiosInstance.delete(
				`/admins/manage/communities/${id}`
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},
};
