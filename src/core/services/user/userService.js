const axios = require('../client');

export const userService = {
	getResume,
	uploadResume,
	sendResume,
	isAppliedResume,
	getResumes
}

function getResume() {
	return axios.get('/api/employee/resume')
}

function uploadResume(resume) {
	return axios.post('/api/resume/employee', { url: resume })
}

function sendResume(jobId) {
	return axios.post(`/api/employee/apply-job?jobId=${jobId}`)
}

function isAppliedResume(jobId) {
	return axios.get(`/api/employee/is-applied?jobId=${jobId}`)
}

function getResumes(jobId) {
	return axios.get(`/api/employer/resume?jobId=${jobId}`)
}

