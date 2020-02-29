import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { ui } from './ui.reducer';

const rootReducer = combineReducers({
	authentication,
	registration,
	alert,
	ui
});

export default rootReducer;