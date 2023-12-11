import { axiosInstance } from "@/configs";
import { AxiosError } from "axios";

export const APIDashboard = {
  getDashboardData: async (filter = "years") => {
    try {
      const response = await axiosInstance.get(`/admins/dashboard/${filter}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },
}