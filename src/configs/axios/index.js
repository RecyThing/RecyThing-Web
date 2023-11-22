/* eslint-disable no-undef */
import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
	baseURL: process.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

axiosInstance.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
	return config;
});
