const axios = require('axios').default;

export function login(credential) {
	console.log(credential);
	return axios.post('/api/employer/login', {
		username: credential.username,
		password: credential.password
	}).then(handleResponse).then(res => {
		localStorage.setItem('user', JSON.stringify(res));
		return res;
	});
}

export function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem('user');
}

export function register(credential) {
	return axios.post('/api/employer/register', {
		username: credential.username,
		password: credential.password,
		firstName: credential.firstName,
		lastName: credential.lastName,
		allowExtraEmails: credential.allowExtraEmails
	}).then(handleResponse);
}

export function getUserToken() {
	return localStorage.getItem("Token");
}

// const setAuthInterceptor = (res) => {
// 	let Token = res.data.token;
// 	localStorage.setItem("Token", Token);
// 	axios.interceptors.request.use(request => {
// 		request.headers['Authorization'] = 'Bearer ' + Token;
// 		return request;
// 	})
// }

export const getUserInfo = () => {
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