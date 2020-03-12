import { createRequestOption } from '../../../shared/utils/request-util';

const axios = require('axios').default;

export const jobService = {
	getJobs,
	getJobById
}

function getJobs(pageIndex, pageSize, filter) {
	const query = {
		page: pageIndex,
		size: pageSize,
		filter: filter
	}
	const params = createRequestOption(query);
	return axios.get('/api/jobs/employee', { params: params })
}

function getJobById(id) {
	return axios.get(`/api/jobs?id=${id}`);
}