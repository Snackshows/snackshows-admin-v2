import { envConfig } from '@/config/config';
import axios from 'axios';


///////////////////////////////////////////////////////////////////////////////////////
// Dont Change anything here If change It breaks the File Upload feature and post api//
///////////////////////////////////////////////////////////////////////////////////////
const { api } = envConfig();

console.log('Api Data', api);

const apiClient = axios.create({
	baseURL: api,
	withCredentials: true,
});

// Automatically attach token on every request
apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem('auth_token');
	const user = localStorage.getItem('user')?.toString();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
		if (user) {
			const parsedUser = JSON.parse(user);
			const verifierId = parsedUser?.roleId?.toString();
			config.headers['verifier'] = verifierId ?? '';
		}
	}

	// ✅ Set Content-Type per request type
	if (config.data instanceof FormData) {
		// Let axios auto-set: multipart/form-data; boundary=...
		delete config.headers['Content-Type'];
	} else {
		// Explicitly set JSON for all other requests
		config.headers['Content-Type'] = 'application/json';
	}

	return config;
});

apiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.log(error);
		const { status, config } = error.response;

		if (status === 401) {
			if (!config.url.includes('/user/login')) {
				localStorage.clear();
				window.location.replace('/');
			}
		}
		return Promise.reject(error);
	}
);

export default apiClient;
