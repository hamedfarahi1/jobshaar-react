import { errorHandlerInterceptor } from './errorHandlerInterceptor';

const axios = require('axios').default;

export function interceptorsSetter() {
	axios.interceptors.response.use(response => response, error => errorHandlerInterceptor(error));
}