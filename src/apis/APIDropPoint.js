import { AxiosError } from "axios";
import { axiosInstance } from "@/configs";

/**
 * `APIDropPoint` is an object that provides methods to interact with the drop point endpoint of the API.
 * @namespace APIDropPoint
 */
export const APIDropPoint = {
	/**
	 * Fetch a list of drop point.
	 * @param {string} search - The search query.
	 * @param {number} limit - The number of drop point to fetch.
	 * @param {number} page - The page number.
	 * @returns {Promise<Array>} Promise resolving to an array of drop point.
	 */
	getAllDataDropPoint: async (search, limit, page = 1) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/drop-points?search=${search}&limit=${limit}&page=${page}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Create a new drop point.
	 * @param {{ name: string, address: string, latitude: number, longitude: number, schedule: {day: string, open_time: string, close_time: string}[] }} data - The data to create the drop point with.
	 * @returns {Promise<Object>} Promise resolving to the created drop point.
	 */
	addDataDropPoint: async (data) => {
		try {
			const response = await axiosInstance.post("/admins/manage/drop-points", data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Update a drop point.
	 * @param {string} id - The id of the drop point to edit.
	 * @param {{ name: string, address: string, latitude: number, longitude: number, schedule: {day: string, open_time: string, close_time: string, closed: boolean}[] }} data - The data to edit the drop point with.
	 * @returns {Promise<Object>} Promise resolving to the updated drop point.
	 */
	updateDataDropPoint: async (id, data) => {
		try {
			const response = await axiosInstance.put(`/admins/manage/drop-points/${id}`, data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Delete a drop point.
	 * @param {string} id - The id of the drop point to delete.
	 * @returns {Promise<Object>} Promise resolving to the deleted drop point.
	 */
	deleteDataDropPoint: async (id) => {
		try {
			const response = await axiosInstance.delete(`/admins/manage/drop-points/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},
};
