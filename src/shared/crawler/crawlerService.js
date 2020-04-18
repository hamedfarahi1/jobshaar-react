const axios = require('axios');

const axiosInstance = axios.create({
	baseURL: 'http://188.40.195.134:3000',
	/* other custom settings */
});

export const crawlService = {
	getJobs
}
function getJobs(filters) {
	return axiosInstance.get('/', { params: filters })
}