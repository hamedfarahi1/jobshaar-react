const axios = require('axios').default;

export function login() {
	return axios.post('localhost:8080/')
}