import { AxiosError } from "axios";
import { axiosInstance } from "../configs/axios/index";

export const APIAdmin = {
  createAdmins: async (data) => {
    try {
      const response = await axiosInstance.post("/admins", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },

  getAdmins: async ({ search = "", limit = 10, page = 1 }) => {
    try {
      const response = await axiosInstance.get(
        `/admins?search=${search}&limit=${limit}&page=${page}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },

  getAdmin: async (id) => {
    try {
      const response = await axiosInstance.get(`/admins/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },

  updateAdmin: async ({ id, data }) => {
    try {
      const response = await axiosInstance.put(`/admins/${id}`, data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },

  deleteAdmin: async (id) => {
     try {
      const response = await axiosInstance.delete(`/admins/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },
};
