import { axiosInstance } from '@/configs/axios/index'
import {AxiosError} from 'axios'

export const APITransaksiReward = {
    getTransaksis: async ({limit,page})=>{
        try {
            const params = {};
            if (limit) params["limit"] - limit;
            if (page) params["page"] = page;
            const result = await axiosInstance.get("/admin/manage-users", { params });
			return result.data;
        } catch (err) {
            if (err instanceof AxiosError) {
				const {
					data: { error },
				} = err.response;
				throw new AxiosError(error);
			}
			throw new Error(err);
        }
    },
}