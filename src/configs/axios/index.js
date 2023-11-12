/* eslint-disable no-undef */
import axios from "axios";
import { CONST } from "../../utils/constant";


export const axiosInstance = axios.create({
	baseURL: process.env.VITE_API_URL,
	baseURL: CONST.BASE_URL_API,
});
