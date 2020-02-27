import { userConstants } from '../_constants';
import * as accountService from '../services/account/accountService'
import { alertActions } from '.';
import { history } from '../_helpers';

export const userActions = {
	login,
	logout,
	register,
	delete: _delete
};

function login(username, password) {
	return dispatch => {
		dispatch(request({ username }));

		accountService.login({ username: username, password: password })
			.then(
				user => {
					dispatch(success(user));
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

		accountService.register(user)
			.then(
				(user) => {
					dispatch(success(user));
					dispatch(alertActions.success('Registration successful'));
				},
				error => {
					dispatch(failure(error.toString()));
					dispatch(alertActions.error(error.toString()));
				}
			);
	};

	function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
	function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
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