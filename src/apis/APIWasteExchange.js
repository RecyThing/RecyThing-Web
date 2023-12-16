import { AxiosError } from "axios";
import { axiosInstance } from "@/configs";

/**
 * `APIRecycles` is an object that provides methods to interact with the manage exchange trash for recycle endpoint of the API.
 * @namespace APIRecycles
 */
export const APIRecycles = {
	/**
	 * Fetches a list of recycles.
	 * @param {{ search: string, limit: number, page: number }} params - The query parameters to be sent with the request.
	 * @returns {Promise<Object>} Promise resolving to an object containing the list of recycles and pagination info.
	 */
	getRecycles: async ({ search = "", limit = 10, page = 1 }) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/recycles?search=${search}&limit=${limit}&page=${page}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Fetches details of a recycle.
	 * @param {string} id - The id of the recycle to fetch.
	 * @returns {Promise<Object>} Promise resolving to the fetched recycle.
	 */
	getRecycle: async (id) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/recycles/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Fetches a list of trash categories.
	 * @returns {Promise<Object>} Promise resolving to an object containing the list of trash categories.
	 */
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

	/**
	 * Delete a recycle.
	 * @param {string} id - The id of the recycle to delete.
	 * @returns {Promise<Object>} Promise resolving to the deleted recycle.
	 */
	deleteRecycles: async (id) => {
		try {
			const response = await axiosInstance.delete(`/admins/manage/recycles/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Create a recycle.
	 * @param {{ data: { name: strign, email: string, drop_point_name: string, trash_exchange_details: { trash_type: string, amount: number }[] } }} data - The data to create the recycle with.
	 * @returns {Promise<Object>} Promise resolving to the created recycle.
	 */
	createRecycles: async (data) => {
		try {
			const response = await axiosInstance.post("/admins/manage/recycles", data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},
};
