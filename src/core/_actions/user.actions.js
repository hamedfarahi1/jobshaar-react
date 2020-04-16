import { userConstants } from '../_constants';
import { accountService } from '../services/account/accountService'
import { alertActions } from '.';
import { history } from '../_helpers';
import { uiActions } from './ui.actions';

export const userActions = {
	login,
	logout,
	register,
	resetPasswordSendUsername,
	resetPass,
	changePass,
	delete: _delete
};

function login(user) {
	return dispatch => {
		dispatch(request({ username: user.username }));
		const credential = { username: user.username, roleTypeIndex: user.roleTypeIndex }
		accountService.login(user)
			.then(
				() => {
					dispatch(success(credential));
					history.push('/home');
				},
				error => {
					dispatch(failure(error.toString()));
					dispatch(alertActions.error(error.toString()));
				}
			);
	};

	function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
	function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
	function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
	accountService.logout();
	return { type: userConstants.LOGOUT };
}

function register(user) {
	return dispatch => {
		dispatch(request(user));
		const userInfo = { username: user.username, roleTypeIndex: user.roleTypeIndex }
		accountService.register(user)
			.then(
				() => {
					dispatch(success());
					dispatch(alertActions.success('Registration successful'));
					dispatch(login(userInfo));
					history.push(+user.roleTypeIndex === 1 ? '/home' : '/company/add');
				},
				error => {
					dispatch(failure(error.toString()));
					dispatch(alertActions.error(error.toString()));
				}
			);
	};

	function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
	function success() { return { type: userConstants.REGISTER_SUCCESS } }
	function login(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
	function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function resetPasswordSendUsername(username) {
	return dispatch => {
		dispatch(request());
		accountService.resetPasswordSendUsername(username).then(
			() => {
				dispatch(success());
				dispatch(uiActions.successSnackbar('لینک تغییر رمز عبور به ایمیل شما ارسال گردید، در صورت عدم دریافت لینک دوباره تلاش کنید'))
			},
			err => dispatch(failure(err))
		)
	}

	function request() { return { type: userConstants.FORGOT_PASSWORD_REQUEST } }
	function success() { return { type: userConstants.FORGOT_PASSWORD_SUCCESS } }
	function failure(error) { return { type: userConstants.FORGOT_PASSWORD_FAILURE, error } }
}

function changePass(values) {
	return dispatch => {
		dispatch(request());
		accountService.changePass(values).then(
			() => {
				dispatch(success());
				dispatch(uiActions.successSnackbar('رمز عبور با موفقیت تغییر کرد'))
				history.push('/home')
			},
			err => {
				dispatch(failure(err))
				dispatch(uiActions.errorSnackbar(err.response.data))
			}
		)
	}

	function request() { return { type: userConstants.CHANGE_PASSWORD_REQUEST } }
	function success() { return { type: userConstants.CHANGE_PASSWORD_SUCCESS } }
	function failure(error) { return { type: userConstants.CHANGE_PASSWORD_FAILURE, error } }
}

function resetPass(values, key) {
	return dispatch => {
		dispatch(request());
		accountService.resetPass(values, key).then(
			() => {
				dispatch(success());
				dispatch(uiActions.successSnackbar('رمز عبور با موفقیت تغییر کرد'))
				history.push('/account/login')
			},
			err => {
				dispatch(failure(err))
				dispatch(uiActions.errorSnackbar(err.response.data))
			}
		)
	}

	function request() { return { type: userConstants.RESET_PASSWORD_REQUEST } }
	function success() { return { type: userConstants.RESET_PASSWORD_SUCCESS } }
	function failure(error) { return { type: userConstants.RESET_PASSWORD_FAILURE, error } }
}
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
	return dispatch => {
		dispatch(request(id));

		accountService._delete(id)
			.then(
				user => dispatch(success(id)),
				error => dispatch(failure(id, error.toString()))
			);
	};

	function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
	function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
	function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}