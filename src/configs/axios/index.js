/* eslint-disable no-undef */
import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: process.env.VITE_API_URL,
});
