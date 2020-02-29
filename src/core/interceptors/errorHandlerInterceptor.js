import { uiActions } from '../_actions';
import { store } from '../_helpers';


export const errorHandlerInterceptor = (error) => {

	const statusCode = error.response.status;
	createErrorMessage(statusCode);
	return Promise.reject({ ...error })
}

const createErrorMessage = (statusCode) => {
	switch (statusCode) {
		case 504:
			showErrorMessage("خطا در اتصال به سرور");
			break;
		case 601:
			showErrorMessage("پسوورد اشتباه وارد شده است");
			break;
		case 604:
			showErrorMessage("نام کاربری نا معتبر است");
			break;
		case 401:
			showErrorMessage("احراز هویت با موفقیت انجام نشد");
			break;
		default:
			showErrorMessage("خطا");
	}
}

const showErrorMessage = (message) => {
	store.dispatch(uiActions.errorSnackbar(message))
}