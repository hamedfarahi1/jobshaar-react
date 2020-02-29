import { uiActions } from '../_actions';
import { store } from '../_helpers';
import { errorConstants } from '../_constants'

export const errorHandlerInterceptor = (error) => {

	const statusCode = error.response.status;
	createErrorMessage(statusCode);
	return Promise.reject({ ...error })
}

const createErrorMessage = (statusCode) => {
	switch (statusCode) {
		case 504:
			showErrorMessage(errorConstants.SERVER_ERROR);
			break;
		case 601:
			showErrorMessage(errorConstants.INVALID_PASSWORD);
			break;
		case 604:
			showErrorMessage(errorConstants.INVALID_USERNAME);
			break;
		case 401:
			showErrorMessage(errorConstants.UNAUTHORITY);
			break;
		default:
			showErrorMessage(errorConstants.ERROR);
	}
}

const showErrorMessage = (message) => {
	store.dispatch(uiActions.errorSnackbar(message))
}