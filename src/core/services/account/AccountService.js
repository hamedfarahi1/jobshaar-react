const axios = require('axios').default;

export const accountService = {
	login,
	logout,
	register,
	getUserInfo,
	setAuthInterceptor
}
function login(credential) {
	return axios.post('/api/employer/login', {
		username: credential.username,
		password: credential.password
	}).then(handleResponse).then(res => {
		return submitUser(res)
	});
}

function logout() {
	// remove user from local storage to log user out
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
			return submitUser(res)
		}
	);
}

function submitUser(res) {
	localStorage.setItem('auth', JSON.stringify(res));
	setAuthInterceptor()
	return getUserInfo().then(res => {
		localStorage.setItem('user', JSON.stringify(res.data));
		return res.data
	});
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