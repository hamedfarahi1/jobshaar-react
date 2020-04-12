import { uiActions } from '../_actions';
import { store, history } from '../_helpers';
import { errorConstants } from '../_constants'
import { accountService } from '../services/account/accountService';

export const errorHandlerInterceptor = (error) => {
	const statusCode = error.response.status;
	createErrorMessage(statusCode);
	if (statusCode === 401 && !history.location.pathname.startsWith('/account')) {
		accountService.logout();
		window.location.reload(true);
	}
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
		case 607:
			showErrorMessage(errorConstants.STUDENT_DOES_NOT_EXIST);
			break;
		default:
			showErrorMessage(errorConstants.ERROR);
	}
}

const showErrorMessage = (message) => {
	store.dispatch(uiActions.errorSnackbar(message))
}