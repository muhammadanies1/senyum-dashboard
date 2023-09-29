import axios from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.API_BFF_URL,
});

axiosInstance.interceptors.request.use(
	function (config) {
		console.log(config);
		return config;
	},
	function (error) {
		console.log(error);
	},
);

axiosInstance.interceptors.response.use(
	function (response) {
		console.log(response);
		return response;
	},
	function (error) {
		console.log(error);
		return Promise.reject(error);
	},
);

export default axiosInstance;
