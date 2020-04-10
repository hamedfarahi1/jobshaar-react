import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { ui } from './ui.reducer';
import { companyAdding } from './company.reducer'
import { job } from './job.reducer';
import { resetingPassword } from './resetingPassword.reducer';

const rootReducer = combineReducers({
	authentication,
	registration,
	alert,
	ui,
	companyAdding,
	job,
	resetingPassword
});

export default rootReducer;