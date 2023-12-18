import { AxiosError } from "axios";
import { axiosInstance } from "@/configs";

/**
 * `APIAdmin` is an object that provides methods to interact with manage admins endpoint of the API.
 * @namespace APIAdmin
 */
export const APIAdmin = {
	/**
	 * Create a new admin.
	 * @param {{ fullname: string, email: string, password: string, confirm_password: string, image: File, status: string }} data - The data to create the admin with.
	 * @returns {Promise<Object>} Promise resolving to the created admin.
	 */
	createAdmins: async (data) => {
		try {
			const response = await axiosInstance.post("/admins", data, {
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
	 * Fetches a list of admins.
	 * @param {{ search: string, limit: number, page: number }} params - The query parameters to be sent with the request.
	 * @returns {Promise<Object>} Promise resolving to an object containing the list of admins and pagination info.
	 */
	getAdmins: async ({ search = "", limit = 10, page = 1 }) => {
		try {
			const response = await axiosInstance.get(`/admins?search=${search}&limit=${limit}&page=${page}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Fetches details of an admin.
	 * @param {string} id - The id of the admin to fetch.
	 * @returns {Promise<Object>} Promise resolving to the fetched admin.
	 */
	getAdmin: async (id) => {
		try {
			const response = await axiosInstance.get(`/admins/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Update an admin.
	 * @param {{ id: string, data: { fullname: string, email: string, password: string, confirm_password: string, image: File, status: string } }} params - The id of the admin to update and the data to update it with.
	 * @returns {Promise<Object>} Promise resolving to the updated admin.
	 */
	updateAdmin: async ({ id, data }) => {
		try {
			const response = await axiosInstance.put(`/admins/${id}`, data, {
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
	 * Delete an admin.
	 * @param {string} id - The id of the admin to delete.
	 * @returns {Promise<Object>} Promise resolving to the deleted admin.
	 */
	deleteAdmin: async (id) => {
		try {
			const response = await axiosInstance.delete(`/admins/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},
};
