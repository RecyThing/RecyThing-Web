import { AxiosError } from "axios";
import { axiosInstance } from "@/configs";

/**
 * `APITransactionList` is an object that provides methods to interact with the voucher transaction list endpoint of the API.
 * @namespace APITransactionList
 */
export const APITransactionList = {
	/**
	 * Fetches a list of voucher transaction list.
	 * @param {{ search: string, limit: number, page: number, status: string }} params - The query parameters to be sent with the request.
	 * @returns {Promise<Object>} Promise resolving to an object containing the list of voucher transaction list and pagination info.
	 */
	getTransactionsList: async ({ search = "", limit = 10, page = 1, status }) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/exchange-point?search=${search}&limit=${limit}&page=${page}${status ? `&filter=${status}` : ""}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Fetches details of an voucher transaction list.
	 * @param {string} id - The id of the voucher transaction list to fetch.
	 * @returns {Promise<Object>} Promise resolving to the fetched voucher transaction list.
	 */
	getTransactionList: async (id) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/exchange-point/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Update a voucher transaction list.
	 * @param {{ id: string, data: { status: string } }} params - The id of the voucher transaction list to update and the data to update it with.
	 * @returns {Promise<Object>} Promise resolving to the updated voucher transaction list.
	 */
	patchTransactionList: async ({ id, data }) => {
		try {
			const response = await axiosInstance.patch(`/admins/manage/exchange-point/${id}`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},
};
