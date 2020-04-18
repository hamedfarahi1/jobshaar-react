const axios = require('axios');

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3001',
	/* other custom settings */
});

export const crawlService = {
	getJobs
}
function getJobs(filters) {
	return axiosInstance.get('/', { params: filters })
}