import { uiConstants } from '../_constants';


export function ui(state = {}, action) {
	switch (action.type) {
		case uiConstants.SUCCESS:
			return {
				...state,
				successSnackbarOpen: true,
				successSnackbarMessage: action.message
			};
		case uiConstants.CLEAR:
			return {
				...state,
				successSnackbarOpen: false,
				errorSnackbarOpen: false,
				infoSnackbarOpen: false
			};
		default:
			return state;
	}
};
