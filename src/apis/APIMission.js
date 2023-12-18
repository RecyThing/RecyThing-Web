import { AxiosError } from "axios";
import { axiosInstance } from "@/configs";

/**
 * `APIMission` is an object that provides methods to interact with the mission endpoint of the API.
 * @namespace APIMission
 */
export const APIMission = {
	/**
	 * Fetches a list of missions.
	 * @param {{ search: string, limit: number, page: number, status: string }} params - The query parameters to be sent with the request.
	 * @returns {Promise<Object>} Promise resolving to an object containing the list of missions and pagination info.
	 */
	getMissions: async ({ search = "", limit = 10, page = 1, status }) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/missions?search=${search}&limit=${limit}&page=${page}${status ? `&filter=${status}` : ""}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Fetches details of an mission.
	 * @param {string} id - The id of the mission to fetch.
	 * @returns {Promise<Object>} Promise resolving to the fetched mission.
	 */
	getMission: async ({ id }) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/missions/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Create a new mission.
	 * @param {{ name: string, description: string, image: File, point: number, start_date: string, end_date: string, title_stage: string, description_stage: string }} data - The data to create the mission with.
	 * @returns {Promise<Object>} Promise resolving to the created mission.
	 */
	createMission: async (data) => {
		try {
			const response = await axiosInstance.post("/admins/manage/missions", data, {
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
	 * Update a mission.
	 * @param {{ id: string, data: { name: string, description: string, image: File, point: number, start_date: string, end_date: string, title_stage: string, description_stage: string } }} params - The id of the mission to update and the data to update it with.
	 * @returns {Promise<Object>} Promise resolving to the updated mission.
	 */
	updateMission: async ({ id, data }) => {
		try {
			const response = await axiosInstance.put(`/admins/manage/missions/${id}`, data, {
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
	 * Delete a mission.
	 * @param {string} id - The id of the mission to delete.
	 * @returns {Promise<Object>} Promise resolving to the deleted mission.
	 */
	deleteMission: async (id) => {
		try {
			const response = await axiosInstance.delete(`/admins/manage/missions/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},
};
