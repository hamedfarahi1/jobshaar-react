const axios = require('axios').default;

export const accountService = {
	login,
	logout,
	register,
	getUserInfo,
	setAuthInterceptor
}
function login(credential) {
	return axios.post('/api/employee/login', {
		username: credential.username,
		password: credential.password
	}).then(handleResponse).then(res => {
		return submitUser(res, credential)
	});
}

function logout() {
	// remove user from local storage to log user out
	axios.interceptors.request.use(request => {
		request.headers['Authorization'] = undefined;
		return request;
	})
	localStorage.removeItem('user');
	localStorage.removeItem('auth');
}

function register(credential) {
	return axios.post('/api/employer/register', {
		username: credential.username,
		password: credential.password,
		email: credential.email,
		allowExtraEmails: credential.allowExtraEmails
	}).then(handleResponse).then(
		res => {
			return submitUser(res, credential)
		}
	);
}

function submitUser(res, credential) {
	const user = { username: credential.username, roleTypeIndex: credential.roleTypeIndex }
	localStorage.setItem('auth', JSON.stringify(res));
	localStorage.setItem('user', JSON.stringify(user));
	setAuthInterceptor();
	return
}

function setAuthInterceptor() {
	const auth = JSON.parse(localStorage.getItem("auth"));
	if (auth && auth.token) {
		const Token = auth.token;
		axios.interceptors.request.use(request => {
			request.headers['Authorization'] = 'Bearer ' + Token;
			return request;
		})
	}
}

function getUserInfo() {
	return axios.get("/api/account")
}

function handleResponse(response) {
	if (response.status !== 200) {
		if (response.status === 401) {
			logout();
			window.location.reload(true);
		}
		const error = response.statusText;
		return Promise.reject(error)
	}

	return response.data;
}

export function _delete() { }