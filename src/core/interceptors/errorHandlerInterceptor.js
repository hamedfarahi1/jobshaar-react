import { uiActions } from '../_actions';
import { store } from '../_helpers';


export const errorHandlerInterceptor = (error) => {

	const statusCode = error.response.status;
	switch (statusCode) {
		case 504:
			errorMessage("خطا در اتصال به سرور")
			break;
		default:
			errorMessage("خطا")

	}
	return Promise.reject({ ...error })
}

const errorMessage = (message) => {
	store.dispatch(uiActions.errorSnackbar(message))
}