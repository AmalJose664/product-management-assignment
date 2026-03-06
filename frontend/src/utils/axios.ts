import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const BaseUrl = import.meta.env.VITE_API_URL
export const axiosInstance = axios.create({
	baseURL: BaseUrl,
	withCredentials: true,
});

const tokenExemptedRoutes = ["/auth/login", "/auth/signup"]
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const url = config.url as string
	if (tokenExemptedRoutes.indexOf(url) !== -1) {
		return config
	}
	const accessToken = localStorage.getItem("access_token");
	if (accessToken) {
		config.headers = config.headers || {};
		config.headers['Authorization'] = `Bearer ${accessToken}`;
	}
	return config
}, (error) => Promise.reject(error))

axiosInstance.interceptors.response.use((response) => response,
	async (error) => {
		return Promise.reject(error)
	}
)
