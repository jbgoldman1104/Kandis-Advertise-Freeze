import axios from "axios";
import Cookies from "js-cookie";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;
export const $host = axios.create({
	baseURL: `${API_KEY}/api`,
	headers: {
		"Content-Type": "application/json",
		//Authorization: Cookies.get("token") ? `Bearer ${Cookies.get("token")}` : "",
		withCredentials: true,
	},
});

$host.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${Cookies.get("token")}`
	return config;
})
