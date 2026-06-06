import { envConfig } from '@/config/config';
import axios from 'axios';

const baseURL = envConfig().api;



// Create axios instance with default config
const apiClient = axios.create({
	baseURL: baseURL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Function to set store ID in the headers

// // Initialize with no store ID
// setStoreId(null);

// Add store ID in every request automatically
// apiClient.interceptors.request.use((config) => {
// 	if (currentStoreId) {
// 		config.headers['X-Store-ID'] = currentStoreId;
// 	} else {
// 		delete config.headers['X-Store-ID'];
// 	}
// 	return config;
// });

apiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		console.log('Error betwwen Api response=====>>>>>', error);
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				await generateRefreshToken();
				return apiClient(originalRequest);
			} catch (refreshError) {
				window.location.href = '/login';
				console.log('Token refresh failed:', refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export const generateRefreshToken = async () => {
	try {
		const response = await apiClient('/auth/refresh-token', {
			withCredentials: true,
		});
		console.log('Get new accesstoken', response);
		return response.data;
	} catch (error) {
		console.error(error);
		// toast.error(error?.response?.data?.error.message);
	}
};

export default apiClient;

