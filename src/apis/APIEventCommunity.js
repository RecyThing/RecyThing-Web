import { AxiosError } from "axios";
import { axiosInstance } from "@/configs/axios";

export const APIEventCommunity = {
  getEventCommunities: async ({ id, limit, page = 1 }) => {
    try {
      const response = await axiosInstance.get(
        `/admins/manage/event/${id}?limit=${limit}&page=${page}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },

  getEventCommunity: async (id, idevent) => {
    try {
      const response = await axiosInstance.get(
        `/admins/manage/event/${id}/${idevent}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },

  createEventCommunity: async (data, idevent) => {
    try {
      const response = await axiosInstance.post(
        `/admins/manage/event/${idevent}`,
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

  updateEventCommunity: async ({ id, idevent, data }) => {
    try {
      console.log(data);
      const response = await axiosInstance.put(
        `/admins/manage/event/${id}/${idevent}`,
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

  deleteEventCommunity: async (id, idevent) => {
    try {
      const response = await axiosInstance.delete(
        `/admins/manage/event/${id}/${idevent}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },
};
