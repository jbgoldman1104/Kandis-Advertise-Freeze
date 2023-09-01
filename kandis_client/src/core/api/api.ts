import axios from "axios";
import Cookies from "js-cookie";
import { REACT_APP_API_KEY } from "../../utils/consts";

export const $host = axios.create({
	baseURL: `${REACT_APP_API_KEY}/api`,
	headers: {
		"Content-Type": "application/json",
		//Authorization: Cookies.get("token") ? `Bearer ${Cookies.get("token")}` : "",
		withCredentials: false,
	},
});

$host.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${Cookies.get("token")}`
	return config;
})
