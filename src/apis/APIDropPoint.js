import { axiosInstance } from "@/configs";
import { AxiosError } from "axios";

export const APIDropPoint = {
  getAllDataDropPoint: async (search, limit, page = 1) => {
    try {
      const response = await axiosInstance.get(`/admins/manage/drop-points?search=${search}&limit=${limit}&page=${page}`);
      return response.data;
    } catch (error) {
			if (error instanceof AxiosError) throw new Error(error.response.data.message);
    }
  }
}