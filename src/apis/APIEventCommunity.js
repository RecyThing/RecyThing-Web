import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axios";

export const APIEventCommunity = {
	getEventCommunities: async ({ id, limit = 10, page = 1 }) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/event/${id}?limit=${limit}&page=${page}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

	getEventCommunity: async ({ communityId, eventId }) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/event/${communityId}/${eventId}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
		}
	},

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
