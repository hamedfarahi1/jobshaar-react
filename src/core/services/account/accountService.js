const axios = require('../client');

export const accountService = {
	login,
	logout,
	register,
	getUserInfo,
	setAuthInterceptor,
	resetPasswordSendUsername,
	resetPass,
	changePass
}
function login(credential) {
	return axios.post(`/api/${+credential.roleTypeIndex === 1 ? 'employee' : 'employer'}/login`, {
		username: credential.username,
		password: credential.password
	}).then(res => {
		return submitUser(res, credential)
	});
}

function logout() {
	// remove user from local storage to log user out
	axios.interceptors.request.use(request => {
		request.headers['Authorization'] = null;
		return request;
	})
	localStorage.removeItem('user');
	localStorage.removeItem('auth');
}

function register(credential) {
	return axios.post(`/api/${+credential.roleTypeIndex === 1 ? 'employee' : 'employer'}/register`, {
		username: credential.username,
		password: credential.password,
		email: credential.email,
		allowExtraEmails: credential.allowExtraEmails
	}).then(
		res => {
			return submitUser(res, credential)
		}
	);
}

function submitUser(res, credential) {
	const user = { username: credential.username, roleTypeIndex: credential.roleTypeIndex }
	localStorage.setItem('auth', JSON.stringify(res));
	localStorage.setItem('user', JSON.stringify(user));
	setAuthInterceptor()
	return res
}

function resetPasswordSendUsername(username) {
	return axios.post(`/api/account/forget-password?username=${username}`)
}

function resetPass(values) {
	return axios.put('/api/account/reset-password', values)
}

function changePass(values) {
	return axios.put('/api/account/change-password', values)
}

function setAuthInterceptor() {
	function getToken() {
		const auth = JSON.parse(localStorage.getItem("auth"));
		try { return auth.token }
		catch (e) { return null }
	}
	axios.interceptors.request.use(request => {
		let tkn = getToken();
		request.headers['Authorization'] = tkn ? 'Bearer ' + tkn : '';
		return request;
	})

}

function getUserInfo() {
	return axios.get("/api/account");
}

export function _delete() { }