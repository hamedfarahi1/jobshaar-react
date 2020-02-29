import { uiConstants } from '../_constants';

export const uiActions = {
	successSnackbar,
	errorSnackbar,
	clearSnackbar
};

function successSnackbar(message) {
	return dispatch => {
		dispatch({ type: uiConstants.SNACKBAR_SUCCESS, message });
	};
};

function errorSnackbar(message) {
	return dispatch => {
		dispatch({ type: uiConstants.SNACKBAR_ERROR, message });
	};
}

function clearSnackbar() {
	return dispatch => {
		dispatch({ type: uiConstants.SNACKBAR_CLEAR });
	};
}



