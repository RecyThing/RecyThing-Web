import { AxiosError } from "axios";
import { axiosInstance } from "@/configs";

/**
 * `APIDataReporting` is an object that provides methods to interact with the data reporting endpoint of the API.
 * @namespace APIDataReporting
 */
export const APIDataReporting = {
	/**
	 * Fetches a list of data reporting.
	 * @param {{ search: string, limit: number, page: number, status: string }} params - The query parameters to be sent with the request.
	 * @returns {Promise<Object>} Promise resolving to an object containing the list of data reporting and pagination info.
	 */
	getDatasRepoting: async ({ search = "", limit = 10, page = 1, status }) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/reports?search=${search}&limit=${limit}&page=${page}${status ? `&status=${status}` : ""}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Fetches details of an data reporting.
	 * @param {string} id - The id of the data reporting to fetch.
	 * @returns {Promise<Object>} Promise resolving to the fetched data reporting.
	 */
	getDataReporting: async (id) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/reports/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Update a data reporting.
	 * @param {{ id: string, data: { status: string, rejection_description?: string } }} params - The id of the data reporting to update and the data to update it with.
	 * @returns {Promise<Object>} Promise resolving to the updated data reporting.
	 */
	patchDataReporting: async ({ id, data }) => {
		try {
			const response = await axiosInstance.patch(`/admins/manage/reports/${id}`, data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},
};
