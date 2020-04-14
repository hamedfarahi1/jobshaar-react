const axios = require('../client');

export const userService = {
	getResume,
	uploadResume,
	sendResume,
	isAppliedResume,
	getResumes,
	uploadResumeFile,
	updateResume,
	updateResumeFile,
	getResumeFile,
	getResumeFileEmployer
}

const fileConfig = {
	headers: {
		'Accept': 'multipart/form-data, application/json, text/plain, */*',
		'Content-Type': 'multipart/form-data'
	}
}

function getResume() {
	return axios.get('/api/employee/resume')
}

function getResumeFile() {
	return axios.get('/api/resume', { responseType: 'blob' })
}

function getResumeFileEmployer(id) {
	return axios.get(`/api/resume/employer?id=${id}`, { responseType: 'blob' })
}

function uploadResume(resume) {
	return axios.post('/api/resume/url', { url: resume })
}

function uploadResumeFile(formData) {
	return axios.post('/api/resume/file', formData, fileConfig)
}

function updateResume(resume) {
	return axios.put('/api/resume/url', { url: resume })
}

function updateResumeFile(formData) {
	return axios.put('/api/resume/file', formData, fileConfig)
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

