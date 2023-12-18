import { AxiosError } from "axios";
import { axiosInstance } from "@/configs";

/**
 * `APITrashes` is an object that provides methods to interact with the trash category endpoint of the API.
 * @namespace APITrashes
 */
export const APITrashes = {
	/**
	 * Fetches a list of trashes.
	 * @param {{ search: string, limit: number, page: number }} params - The query parameters to be sent with the request.
	 * @returns {Promise<Object>} Promise resolving to an object containing the list of trashes and pagination info.
	 */
	getTrashes: async ({ search = "", limit = 10, page = 1 }) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/trashes?search=${search}&limit=${limit}&page=${page}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Fetches details of a trash.
	 * @param {string} id - The id of the trash to fetch.
	 * @returns {Promise<Object>} Promise resolving to the fetched trash.
	 */
	getTrash: async (id) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/trashes/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Update a trash.
	 * @param {{ id: string, data: { trash_type: string, unit: string, point: number } }} params - The id of the trash to update and the data to update it with.
	 * @returns {Promise<Object>} Promise resolving to the updated trash.
	 */
	updateTrashes: async ({ id, data }) => {
		try {
			const response = await axiosInstance.put(`/admins/manage/trashes/${id}`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Delete a trash.
	 * @param {string} id - The id of the trash to delete.
	 * @returns {Promise<Object>} Promise resolving to the deleted trash.
	 */
	deleteTrashes: async (id) => {
		try {
			const response = await axiosInstance.delete(`/admins/manage/trashes/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Create a new trash.
	 * @param {{ trash_type: string, unit: string, point: number }} data - The data to create the trash with.
	 * @returns {Promise<Object>} Promise resolving to the created trash.
	 */
	createTrashes: async (data) => {
		try {
			const response = await axiosInstance.post("/admins/manage/trashes", data, {
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
