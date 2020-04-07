import { uiConstants } from '../_constants';


export function ui(state = {}, action) {
	switch (action.type) {
		case uiConstants.SNACKBAR_SUCCESS:
			return {
				...state,
				successSnackbarOpen: true,
				successSnackbarMessage: action.message
			};
		case uiConstants.SNACKBAR_CLEAR:
			return {
				...state,
				successSnackbarOpen: false,
				errorSnackbarOpen: false,
				infoSnackbarOpen: false
			};
		case uiConstants.SNACKBAR_ERROR:
			return {
				...state,
				errorSnackbarOpen: true,
				errorSnackbarMessage: action.message
			};
		default:
			return state;
	}
};
