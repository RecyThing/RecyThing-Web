import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axios";

export const APIApprovalMission = {
	getApprovals: async ({ search = "", page = 1, limit = 10, filter }) => {
		try {
			const response = await axiosInstance.get(
				`/admins/manage/missions/approvals?search=${search}&page=${page}&limit=${limit}${
					filter ? `&filter=${filter}` : ""
				}`
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	getApproval: async (id) => {
		try {
			const response = await axiosInstance.get(
				`/admins/manage/missions/approvals/${id}`
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	updateApproval: async ({ id, data }) => {
		try {
			console.log(id, data);
			const response = await axiosInstance.put(
				`/admins/manage/missions/approvals/${id}`,
				data
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},
};
