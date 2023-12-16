import { AxiosError } from "axios";
import { axiosInstance } from "@/configs";

/**
 * `APIVoucher` is an object that provides methods to interact with the manage vouchers endpoint of the API.
 * @namespace APIVoucher
 */
export const APIVoucher = {
	/**
	 * Fetches a list of vouchers.
	 * @param {{ search: string, limit: number, page: number }} params - The query parameters to be sent with the request.
	 * @returns {Promise<Object>} Promise resolving to an object containing the list of vouchers and pagination info.
	 */
	getVouchers: async ({ search = "", limit = 10, page = 1 }) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/vouchers?search=${search}&limit=${limit}&page=${page}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Fetches details of a voucher.
	 * @param {string} id - The id of the voucher to fetch.
	 * @returns {Promise<Object>} Promise resolving to the fetched voucher.
	 */
	getVoucher: async (id) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/vouchers/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Update a voucher.
	 * @param {{ id: string, data: { reward_name: string, description: string, image: File, point: number, start_date: string, end_date: string  } }} params - The id of the voucher to update and the data to update it with.
	 * @returns {Promise<Object>} Promise resolving to the updated voucher.
	 */
	updateVoucher: async ({ id, data }) => {
		try {
			const response = await axiosInstance.put(`/admins/manage/vouchers/${id}`, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Delete a voucher.
	 * @param {string} id - The id of the voucher to delete.
	 * @returns {Promise<Object>} Promise resolving to the deleted voucher.
	 */
	deleteVoucher: async (id) => {
		try {
			const response = await axiosInstance.delete(`/admins/manage/vouchers/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Create a new voucher.
	 * @param {{ reward_name: string, description: string, image: File, point: number, start_date: string, end_date: string }} data - The data to create the voucher with.
	 * @returns {Promise<Object>} Promise resolving to the created voucher.
	 */
	createVoucher: async (data) => {
		try {
			const response = await axiosInstance.post("/admins/manage/vouchers", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},
};
