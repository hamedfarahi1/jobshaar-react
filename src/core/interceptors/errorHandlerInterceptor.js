import { uiActions } from '../_actions';
import { store } from '../_helpers';


export const errorHandlerInterceptor = (error) => {
	store.dispatch(uiActions.success('fuck uuu'))
	const statusCode = error.response.status;
	console.log(statusCode);
	return Promise.reject({ ...error })
}