import { axiosInstance } from "@/configs";
import { AxiosError } from "axios";

export const APIDataReporting = {
    getDatasRepoting: async ({ search = "", limit = 10, page = 1 }) => {
		try {
			const response = await axiosInstance.get(
				`/admins/manage/reports?search=${search}&limit=${limit}&page=${page}`
			);
			return response.data;
		} catch (error) {

			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	getDataReporting: async (id) => {
		try {
			const response = await axiosInstance.get(`/admins/manage/reports/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},

	patchDataReporting: async ({id,data}) => {
		try {
			const response = await axiosInstance.patch(
				`/admins/manage/reports/${id}`,
				data,
				{
					headers : {
						"Content-Type": "application/json",
					},
				}
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},
};