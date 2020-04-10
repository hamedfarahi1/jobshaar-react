import { uiConstants } from '../_constants';


export function ui(state = {}, action) {
	switch (action.type) {
		case uiConstants.SNACKBAR_SUCCESS:
			return {
				...state,
				successSnackbarOpen: true,
				errorSnackbarMessage: null,
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
				successSnackbarMessage: null,
				errorSnackbarMessage: action.message
			};
		default:
			return state;
	}
};
