import { AxiosError } from "axios";
import { axiosInstance } from "../configs/axios/index";

export const APIAchievements = {
  getAchievements: async () => {
    try {
      const response = await axiosInstance.get("/admins/manage/achievements");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },
  patchAchievements: async ({ id, data }) => {
    try {
      const response = await axiosInstance.patch(
        `/admins/manage/achievements/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },
};
