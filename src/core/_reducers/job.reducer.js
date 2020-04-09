import { jobConstants } from '../_constants';

export function job(state = {}, action) {
	switch (action.type) {
		case jobConstants.JOB_ADD_REQUEST:
			return { addingJob: true };
		case jobConstants.JOB_ADD_SUCCESS:
			return {};
		case jobConstants.JOB_ADD_FAILURE:
			return {};
		case jobConstants.GET_JOBS_REQUEST:
			return { gettingJobs: true };
		case jobConstants.GET_JOBS_SUCCESS:
			return {};
		case jobConstants.GET_JOBS_FAILURE:
			return {};
		case jobConstants.GET_JOB_BY_ID_REQUEST:
			return { gettingJob: true };
		case jobConstants.GET_JOB_BY_ID_SUCCESS:
			return {};
		case jobConstants.GET_JOB_BY_ID_FAILURE:
			return {};
		default:
			return state
	}
}