import { axiosInstance } from "@/configs";
import { AxiosError } from "axios";

export const APITransactionList = {
	getTransactionsList: async ({ search = "", limit = 10, page = 1, status }) => {
		try {
			console.log(status);
			const response = await axiosInstance.get(
				`/admins/manage/exchange-point?search=${search}&limit=${limit}&page=${page}${
					status ? `&status=${status}` : ""
				}`
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	getTransactionList: async (id) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/exchange-point/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	patchTransactionList: async ({ id, data }) => {
		try {
			const response = await axiosInstance.patch(
				`/admins/manage/exchange-point/${id}`,
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
