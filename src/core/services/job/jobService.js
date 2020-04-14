import { createRequestOption } from '../../../shared/utils/request-util';
import { store } from '../../_helpers';

const axios = require('../client');

export const jobService = {
	getJobs,
	getJobById,
	addJob,
	getSameJobById
}

function getJobs(pageIndex, pageSize, filters) {
	const { user } = store.getState().authentication;
	const filter = createFilterObj(filters)
	const query = {
		page: pageIndex,
		size: pageSize,
		filter: filter
	}
	const params = createRequestOption(query);
	return axios.get(`/api/jobs/${+user.roleTypeIndex === 1 ? 'employee' : 'employer'}`, { params: params })

	function createFilterObj(val) {
		const res = []
		Object.keys(val).forEach(key => {
			if (val[key].length > 0) res.push({
				key: key + '.in',
				value: val[key]
			})
		}
		)

		return res;
	}
}

function getJobById(id) {
	return axios.get(`/api/jobs?id=${id}`);
}

function getSameJobById(id) {
	return axios.get(`/api/jobs/same-jobs?id=${id}`);
}

function addJob(job) {
	return axios.post('/api/jobs', job)
}