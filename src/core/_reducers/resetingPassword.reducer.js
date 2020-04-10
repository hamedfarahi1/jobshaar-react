import { userConstants } from '../_constants';

export function resetingPassword(state = {}, action) {
	switch (action.type) {
		case userConstants.FORGOT_PASSWORD_REQUEST:
			return { sendingEmail: true };
		case userConstants.FORGOT_PASSWORD_SUCCESS:
			return {};
		case userConstants.FORGOT_PASSWORD_FAILURE:
			return {};
		default:
			return state
	}
}