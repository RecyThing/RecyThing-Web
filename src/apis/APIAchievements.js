import { AxiosError } from "axios";
import { axiosInstance } from "@/configs";

/**
 * `APIAchievements` is an object that provides methods to interact with the achievements endpoint of the API.
 * @namespace APIAchievements
 */
export const APIAchievements = {
	/**
	 * Fetch a list of achievements.
	 * @returns {Promise<Array>} Promise resolving to an array of achievements.
	 */
	getAchievements: async () => {
		try {
			const response = await axiosInstance.get("/admins/manage/achievements");
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Update an achievement.
	 * @param {{ id: string, data: { target_point: number } }} params - The id of the achievement to update and the data to update it with.
	 * @returns {Promise<Object>} Promise resolving to the updated achievement.
	 */
	patchAchievements: async ({ id, data }) => {
		try {
			const response = await axiosInstance.patch(`/admins/manage/achievements/${id}`, data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},
};
