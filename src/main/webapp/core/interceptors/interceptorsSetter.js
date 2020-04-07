import { errorHandlerInterceptor } from './errorHandlerInterceptor';
import { accountService } from '../services/account/accountService'

const axios = require('axios').default;

export function interceptorsSetter() {
	axios.interceptors.response.use(response => response, error => errorHandlerInterceptor(error));
	axios.interceptors.response.use(response => {
		let totalCount = response.headers['total-count']
		return totalCount ? { totalCount, data: response.data } : response.data
	});
	accountService.setAuthInterceptor();
}

