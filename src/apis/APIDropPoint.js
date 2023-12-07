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
  },

  addDataDropPoint: async (data) => {
    try {
      const response = await axiosInstance.post("/admins/manage/drop-points", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },
  
  updateDataDropPoint: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/admins/manage/drop-points/${id}`, data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },

  deleteDataDropPoint: async (id) => {
    try {
      const response = await axiosInstance.delete(`/admins/manage/drop-points/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  }
}