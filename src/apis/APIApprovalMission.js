import { AxiosError } from "axios";
import { axiosInstance } from "@/configs";

/**
 * `APIApprovalMission` is an object that provides methods to interact with the approval mission endpoint of the API.
 * @namespace APIApprovalMission
 */
export const APIApprovalMission = {
	/**
	 * Fetches a list of mission approvals.
	 * @param {{ search: string, page: number, limit: number, filter: string }} params - The query parameters to be sent with the request.
	 * @returns {Promise<Object>} Promise resolving to an object containing the list of mission approvals and pagination info.
	 */
	getApprovals: async ({ search = "", page = 1, limit = 10, filter }) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/missions/approvals?search=${search}&page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ""}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Fetches details of an mission approval.
	 * @param {string} id - The id of the mission approval to fetch.
	 * @returns {Promise<Object>} Promise resolving to the fetched mission approval.
	 */
	getApproval: async (id) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/missions/approvals/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Update a mission approval.
	 * @param {{ id: string, data: { status: string, reason?: string } }} params - The id of the mission approval to update and the data to update it with.
	 * @returns {Promise<Object>} Promise resolving to the updated mission approval.
	 *
	 * @example Case when the mission is accepted
	 * updateMissionApproval({ id: '123', data: { status: 'accepted' } });
	 *
	 * @example Case when the mission is rejected
	 * updateMissionApproval({ id: '123', data: { status: 'rejected', reason: 'Not enough information provided.' } });
	 */
	updateApproval: async ({ id, data }) => {
		try {
			const response = await axiosInstance.put(`/admins/manage/missions/approvals/${id}`, data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},
};
