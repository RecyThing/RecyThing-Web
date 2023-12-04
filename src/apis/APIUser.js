import { axiosInstance } from "@/configs";
import { AxiosError } from "axios";

export const APIUser = {
<<<<<<< HEAD
  getUsers: async () => {
    try {
      const response = await axiosInstance.get("/admins/manage/users");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },
=======
	getUsers: async ({ search = "", limit = 10, page = 1 }) => {
		try {
			const response = await axiosInstance.get(
				`/admins/manage/users?search=${search}&limit=${limit}&page=${page}`
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError)
				throw new Error(error.response.data.message);
		}
	},
>>>>>>> 70f0ecfb44ecf9a9f00990365d334a5926e31d3f

  getUser: async (id) => {
    try {
      const response = await axiosInstance.get(`/admins/manage/users/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await axiosInstance.delete(`/admins/manage/users/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response.data.message);
    }
  },
};
