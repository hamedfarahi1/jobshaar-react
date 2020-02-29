import { uiConstants } from '../_constants';

export const uiActions = {
	success,
	error,
	clear
};

function success(message) {
	return dispatch => {
		dispatch({ type: uiConstants.SUCCESS, message });
	};
};

function clear() {
	return dispatch => {
		dispatch({ type: uiConstants.CLEAR });
	};
};

function error() { }