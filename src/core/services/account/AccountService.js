const axios = require('axios').default;

export function login(credential) {
	return axios.post('/api/employer/login', {
		username: credential.username,
		password: credential.password,
		rememberMe: credential.rememberMe
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