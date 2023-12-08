import { AxiosError } from "axios";
import { axiosInstance } from "../configs/axios/index";

export const APIMission = {
  getMissions: async ({search = "", limit = 10, page = 1}) => {
    try {
      const response = await axiosInstance.get(
        `/admins/manage/missions?search=${search}&limit=${limit}&page=${page}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },

  getMission: async ({id}) => {
    try {
      const response = await axiosInstance.get(`/admins/manage/missions/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },

  createMission: async (data) => {
    try {
      const response = await axiosInstance.post(
        "/admins/manage/missions",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },

  updateMission: async ({id, data}) => {
    try {
      const response = await axiosInstance.put(
        `/admins/manage/missions/${id}`, data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },

  deleteMission: async ({id}) => {
    try {
      const response = await axiosInstance.delete(
        `/admins/manage/missions/${id}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },
};