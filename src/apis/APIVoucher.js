import { axiosInstance } from "@/configs";
import { AxiosError } from "axios";

export const APIVoucher = {
	getVouchers: async ({ search, limit, page }) => {
		try {
			const response = await axiosInstance.get(
				`/admins/manage/vouchers?search=${search}&limit=${limit}&page=${page}`
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},
};
