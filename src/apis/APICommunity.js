import { AxiosError } from "axios";
import { axiosInstance } from "@/configs";

/**
 * `APICommunity` is an object that provides methods to interact with the community endpoint of the API.
 * @namespace APICommunity
 */
export const APICommunity = {
	/**
	 * Fetch a list of communities.
	 * @param {{ search: string, limit: number, page: number }} params - The query parameters to be sent with the request.
	 * @returns {Promise<Object>} Promise resolving to an object containing the list of communities and pagination info.
	 */
	getCommunities: async ({ search, limit, page = 1 }) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/communities?search=${search}&limit=${limit}&page=${page}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Fetches details of a community.
	 * @param {string} id - The id of the community to fetch.
	 * @returns {Promise<Object>} Promise resolving to the fetched community.
	 */
	getCommunity: async (id) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/communities/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Create a new community.
	 * @param {{ name: string, description: string, image: File, location: string, max_member: number }} data - The data to create the community with.
	 * @returns {Promise<Object>} Promise resolving to the created community.
	 */
	createCommunity: async (data) => {
		try {
			const response = await axiosInstance.post("/admins/manage/communities", data, {
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
	 * Update a community.
	 * @param {{ id: string, data: { name: string, description: string, image: File, location: string, max_member: number } }} params - The id of the community to update and the data to update it with.
	 * @returns {Promise<Object>} Promise resolving to the updated community.
	 */
	updateCommunity: async ({ id, data }) => {
		try {
			const response = await axiosInstance.put(`/admins/manage/communities/${id}`, data, {
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
	 * Delete a community.
	 * @param {string} id - The id of the community to delete.
	 * @returns {Promise<Object>} Promise resolving to the deleted community.
	 */
	deleteCommunity: async (id) => {
		try {
			const response = await axiosInstance.delete(`/admins/manage/communities/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},
};
