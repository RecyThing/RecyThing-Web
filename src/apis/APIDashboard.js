import { AxiosError } from "axios";
import { axiosInstance } from "@/configs";

/**
 * `APIDashboard` is an object that provides methods to interact with the dashboard endpoint of the API.
 * @namespace APIDashboard
 */
export const APIDashboard = {
	/**
	 * Fetches dashboard data.
	 * @param {string} filter - The filter to be sent with the request.
	 * @returns {Promise<Object>} Promise resolving to an object containing dashboard data.
	 */
	getDashboardData: async (filter = "years") => {
		try {
			const response = await axiosInstance.get(`/dashboard/${filter}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},
};
