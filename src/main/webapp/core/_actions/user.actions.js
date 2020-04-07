import { userConstants } from '../_constants';
import { accountService } from '../services/account/accountService'
import { alertActions } from '.';
import { history } from '../_helpers';

export const userActions = {
	login,
	logout,
	register,
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