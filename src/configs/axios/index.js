/* eslint-disable no-undef */
import axios from "axios";
import { authService } from "../auth";

export const axiosInstance = axios.create({
	baseURL: process.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

axiosInstance.interceptors.request.use((config) => {
	if (authService.isAuthorized()) {
		const token = authService.getToken();
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
