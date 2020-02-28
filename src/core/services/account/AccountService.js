const axios = require('axios').default;

export const accountService = {
	login,
	logout,
	register,
	getUserToken,
	getUserInfo,
	setAuthInterceptor
}
function login(credential) {
	return axios.post('/api/employer/login', {
		username: credential.username,
		password: credential.password
	}).then(handleResponse).then(res => {
		localStorage.setItem('user', JSON.stringify(res));
		return res;
	});
}

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem('user');
}

function register(credential) {
	return axios.post('/api/employer/register', {
		username: credential.username,
		password: credential.password,
		email: credential.email,
		allowExtraEmails: credential.allowExtraEmails
	}).then(handleResponse).then(
		res => {
			localStorage.setItem('user', JSON.stringify(res));
			return res;
		}
	);
}

function setAuthInterceptor() {
	const user = JSON.parse(localStorage.getItem("user"));
	if (user && user.token) {
		const Token = user.token;
		axios.interceptors.request.use(request => {
			request.headers['Authorization'] = 'Bearer ' + Token;
			return request;
		})
	}
}

function getUserToken() {
	return localStorage.getItem("Token");
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