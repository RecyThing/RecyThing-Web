import { AxiosError } from "axios";
import { axiosInstance } from "@/configs";

/**
 * `APIEventCommunity` is an object that provides methods to interact with the event community endpoint of the API.
 * @namespace APIEventCommunity
 */
export const APIEventCommunity = {
	/**
	 * Fetch a list of event communities.
	 * @param {{ id: string, limit: number, page: number }} params - The query parameters to be sent with the request.
	 * @returns {Promise<Object>} Promise resolving to an object containing the list of event communities and pagination info.
	 */
	getEventCommunities: async ({ id, limit = 10, page = 1 }) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/event/${id}?limit=${limit}&page=${page}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Fetches details of an event community.
	 * @param {{ communityId: string, eventId: string }} params - The id community and event community to fetch.
	 * @returns {Promise<Object>} Promise resolving to the fetched event community.
	 */
	getEventCommunity: async ({ communityId, eventId }) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/event/${communityId}/${eventId}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	/**
	 * Create a new event community.
	 * @param {{ communityId: string, data: { name: string, description: string, image: File, location: string, maplink: string, formlink: string, quota: number, date: string, status: string }}} params - The data to create the event community with.
	 * @returns {Promise<Object>} Promise resolving to the created event community.
	 */
	createEventCommunity: async ({ data, communityId }) => {
		try {
			const response = await axiosInstance.post(`/admins/manage/event/${communityId}`, data, {
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
	 * Update an event community.
	 * @param {{ communityId: string, eventId: string, data: { name: string, description: string, image: File, location: string, maplink: string, formlink: string, quota: number, date: string, status: string }}} params - The id of the event community to update and the data to update it with.
	 * @returns {Promise<Object>} Promise resolving to the updated event community.
	 */
	updateEventCommunity: async ({ data, communityId, eventId }) => {
		try {
			const response = await axiosInstance.put(`/admins/manage/event/${communityId}/${eventId}`, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	deleteEventCommunity: async ({ communityId, eventId }) => {
		try {
			const response = await axiosInstance.delete(`/admins/manage/event/${communityId}/${eventId}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},
};
