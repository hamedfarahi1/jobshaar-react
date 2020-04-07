import { createRequestOption } from '../../../shared/utils/request-util';
import { store } from '../../_helpers';

const axios = require('axios').default;

export const jobService = {
	getJobs,
	getJobById,
	addJob
}

function getJobs(pageIndex, pageSize, filter) {
	const { user } = store.getState().authentication;
	const query = {
		page: pageIndex,
		size: pageSize,
		filter: filter
	}
	const params = createRequestOption(query);
	return axios.get(`/api/jobs/${+user.roleTypeIndex === 1 ? 'employee' : 'employer'}`, { params: params })
}

function getJobById(id) {
	return axios.get(`/api/jobs?id=${id}`);
}

function addJob(job) {
	return axios.post('/api/jobs', job)
}