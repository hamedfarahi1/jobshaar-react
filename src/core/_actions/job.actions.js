import { alertActions } from './alert.actions'
import { history } from '../_helpers'
import { jobService } from '../services/job/jobService'
import { uiActions } from './ui.actions'
import { jobConstants } from '../_constants'

export const jobActions = {
	addJob,
	getJobs,
	getJobById
}

function addJob(job) {

	return dispatch => {
		dispatch(request(job.title))
		jobService.addJob(job)
			.then((res) => {
				dispatch(success(res));
				dispatch(uiActions.successSnackbar('عملیات ثبت شغل با موفقیت انجام شد'));
				history.push('/job/' + res.id);
			})
			.catch((error) => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()))
			})
	}

	function request(job) { return { type: jobConstants.JOB_ADD_REQUEST, job } }
	function success(job) { return { type: jobConstants.JOB_ADD_SUCCESS, job } }
	function failure(error) { return { type: jobConstants.JOB_ADD_FAILURE, error } }
}

function getJobs(pageIndex, pageSize, filter) {

	return async dispatch => {
		dispatch(request())
		return jobService.getJobs(pageIndex, pageSize, filter)
			.then((res) => {
				dispatch(success());
				return res;
			})
			.catch((error) => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()))
			})
	}

	function request() { return { type: jobConstants.GET_JOBS_REQUEST } }
	function success() { return { type: jobConstants.GET_JOBS_SUCCESS } }
	function failure(error) { return { type: jobConstants.GET_JOBS_FAILURE, error } }
}

function getJobById(id) {

	return async dispatch => {
		dispatch(request())
		return jobService.getJobById(id)
			.then((res) => {
				dispatch(success());
				return res;
			})
			.catch((error) => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()))
			})
	}

	function request() { return { type: jobConstants.GET_JOB_BY_ID_REQUEST } }
	function success() { return { type: jobConstants.GET_JOB_BY_ID_SUCCESS } }
	function failure(error) { return { type: jobConstants.GET_JOB_BY_ID_FAILURE, error } }
}