import { AxiosError } from "axios";
import { axiosInstance } from "@/configs";

/**
 * `APIUser` is an object that provides methods to interact with the manage users endpoint of the API.
 * @namespace APIUser
 */
export const APIUser = {
	/**
	 * Fetches a list of users.
	 * @param {{ search: string, limit: number, page: number }} params - The query parameters to be sent with the request.
	 * @returns {Promise<Object>} Promise resolving to an object containing the list of users and pagination info.
	 */
	getUsers: async ({ search = "", limit = 10, page = 1 }) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/users?search=${search}&limit=${limit}&page=${page}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Fetches details of a user.
	 * @param {string} id - The id of the user to fetch.
	 * @returns {Promise<Object>} Promise resolving to the fetched user.
	 */
	getUser: async (id) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/users/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Delete a user.
	 * @param {string} id - The id of the user to delete.
	 * @returns {Promise<Object>} Promise resolving to the deleted user.
	 */
	deleteUser: async (id) => {
		try {
			const response = await axiosInstance.delete(`/admins/manage/users/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},
};
