import { AxiosError } from "axios";
import { axiosInstance } from "./../configs/axios/index";

export const getLoginAPI = {
  getLogin: async (data) => {
    try {
      const response = await axiosInstance.post("/admins/login", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(error);
    }
  },
};
