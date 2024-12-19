import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://91.217.177.179:8112/api/',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default axiosInstance;
