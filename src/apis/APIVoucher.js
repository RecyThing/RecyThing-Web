import { axiosInstance } from "@/configs";
import { AxiosError } from "axios";

export const APIVoucher = {
	getVouchers: async ({ search, limit, page }) => {
		try {
			const response = await axiosInstance.get(
				`/admins/manage/vouchers?search=${search}&limit=${limit}&page=${page}`
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	getVoucher: async (id) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/vouchers/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	updateVoucher: async ({ id, data }) => {
		try {
			const response = await axiosInstance.put(
				`/admins/manage/vouchers/${id}`,
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

	deleteVoucher: async (id) => {
		try {
			const response = await axiosInstance.delete(
				`/admins/manage/vouchers/${id}`
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	createVoucher: async (data) => {
		try {
			const response = await axiosInstance.post(
				"/admins/manage/vouchers",
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
};