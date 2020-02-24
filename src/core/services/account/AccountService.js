const axios = require('axios').default;

export function login(credential) {
	return axios.post('api/employer/login', {
		username: credential.username,
		password: credential.password,
		rememberMe: true
	});
}