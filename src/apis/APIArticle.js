import { AxiosError } from "axios";
import { axiosInstance } from "@/configs";

/**
 * `APIArticle` is an object that provides methods to interact with the article endpoint of the API.
 * @namespace APIArticle
 */
export const APIArticle = {
	/**
	 * Fetch a list of articles.
	 * @param {string} search - The search query.
	 * @param {number} limit - The number of articles to fetch.
	 * @param {number} page - The page number.
	 * @returns {Promise<Array>} Promise resolving to an array of articles.
	 */
	getAllArticle: async (search, limit, page = 1) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/articles?search=${search}&limit=${limit}&page=${page}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Fetch a list of article categories.
	 * @returns {Promise<Array>} Promise resolving to an array of article categories.
	 */
	getAllCategory: async () => {
		try {
			const response = await axiosInstance.get("/admins/manage/trashes");
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Create a new article.
	 * @param {{ title: string, content: string, image: File, category_id: Array }} data - The data to create the article with.
	 * @returns {Promise<Object>} Promise resolving to the created article.
	 */
	addArticle: async (data) => {
		try {
			const response = await axiosInstance.post("/admins/manage/articles", data, {
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
	 * Edit an article.
	 * @param {string} id - The id of the article to edit.
	 * @param {{ title: string, content: string, image: File, category_id: Array }} data - The data to edit the article with.
	 * @returns {Promise<Object>} Promise resolving to the updated article.
	 */
	editArticle: async (id, data) => {
		try {
			const response = await axiosInstance.put(`/admins/manage/articles/${id}`, data, {
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
	 * Delete an article.
	 * @param {string} id - The id of the article to delete.
	 * @returns {Promise<Object>} Promise resolving to the deleted article.
	 */
	deleteArticle: async (id) => {
		try {
			const response = await axiosInstance.delete(`/admins/manage/articles/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},
};
