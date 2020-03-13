import { errorHandlerInterceptor } from './errorHandlerInterceptor';
import { accountService } from '../services/account/accountService'

const axios = require('axios').default;

export function interceptorsSetter() {
	axios.interceptors.response.use(response => response, error => errorHandlerInterceptor(error));
	axios.interceptors.response.use(response => response.data);
	accountService.setAuthInterceptor();
}

