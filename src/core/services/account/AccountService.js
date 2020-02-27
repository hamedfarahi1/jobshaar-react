const axios = require('axios').default;

export function login(credential) {
	return axios.post('/api/employer/login', {
		username: credential.username,
		password: credential.password,
		rememberMe: credential.rememberMe
	}).then(res => {
		setAuthInterceptor(res);
	});
}

export function register(credential) {
	return axios.post('/api/employer/register', {
		username: credential.username,
		password: credential.password,
		firstName: credential.firstName,
		lastName: credential.lastName,
		allowExtraEmails: credential.allowExtraEmails
	});
}

export function getUserToken() {
	return localStorage.getItem("Token");
}

const setAuthInterceptor = (res) => {
	let Token = res.data.token;
	localStorage.setItem("Token", Token);
	axios.interceptors.request.use(request => {
		request.headers['Authorization'] = 'Bearer ' + Token;
		return request;
	})
}

export const getUserInfo = () => {
	return axios.get("/api/account")
}