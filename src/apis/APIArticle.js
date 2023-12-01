import { AxiosError } from "axios";
import { axiosInstance } from "../configs/axios/index";

export const APIArticle = {
  getAllArticle: async (search, limit, page = 1) => {
    try {
      const response = await axiosInstance.get(`/admins/manage/articles?search=${search}&limit=${limit}&page=${page}`);
      return response.data;
    } catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
    }
  },

  getAllCategory: async () => {
    try {
      const response = await axiosInstance.get("/admins/manage/trashes");
      return response.data;
    } catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
    }
  },

  addArticle: async (data) => {
    try {
      const response = await axiosInstance.post("/admins/manage/articles", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },

  editArticle: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/admins/manage/articles/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },

  deleteArticle: async (id) => {
    try {
      const response = await axiosInstance.delete(`/admins/manage/articles/${id}`);
      return response.data;
    } catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
    }
  },
};