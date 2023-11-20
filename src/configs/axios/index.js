/* eslint-disable no-undef */
import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: process.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

axiosInstance.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
	return config;
});
