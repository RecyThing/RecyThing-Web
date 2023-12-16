import { AxiosError } from "axios";
import { axiosInstance } from "@/configs";

/**
 * `APIPrompt` is an object that provides methods to interact with the prompt for chatbot endpoint of the API.
 * @namespace APIPrompt
 */
export const APIPrompt = {
	/**
	 * Fetches a list of prompts.
	 * @param {{ search: string, limit: number, page: number, filter: string }} params - The query parameters to be sent with the request.
	 * @returns {Promise<Object>} Promise resolving to an object containing the list of prompts and pagination info.
	 */
	getPrompts: async ({ search, limit, page, filter }) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/prompts?search=${search}&limit=${limit}&page=${page}${filter ? `&filter=${filter}` : ""}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Fetches details of a prompt.
	 * @param {string} id - The id of the prompt to fetch.
	 * @returns {Promise<Object>} Promise resolving to the fetched prompt.
	 */
	getPrompt: async (id) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/prompts/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Update a prompt.
	 * @param {{ id: string, data: { category: string, question: string } }} params - The id of the prompt to update and the data to update it with.
	 * @returns {Promise<Object>} Promise resolving to the updated prompt.
	 */
	updatePrompt: async ({ id, data }) => {
		try {
			const response = await axiosInstance.put(`/admins/manage/prompts/${id}`, data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Delete a prompt.
	 * @param {string} id - The id of the prompt to delete.
	 * @returns {Promise<Object>} Promise resolving to the deleted prompt.
	 */
	deletePrompt: async (id) => {
		try {
			const response = await axiosInstance.delete(`/admins/manage/prompts/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Create a new prompt.
	 * @param {{ category: string, question: string }} data - The data to create the prompt with.
	 * @returns {Promise<Object>} Promise resolving to the created prompt.
	 */
	createPrompt: async (data) => {
		try {
			const response = await axiosInstance.post("/admins/manage/prompts", data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},
};
