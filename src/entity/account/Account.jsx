import React from 'react';
import './Account.scss';
import { Login } from './Login'
import { Switch, Route, Redirect } from 'react-router-dom';
import { Register } from './Register';

function Account() {
	return <div className="container">
		<Switch>
			<Redirect exact from="/account" to="/account/login">
			</Redirect>
			<Route path="/account/login">
				<Login></Login>
			</Route>
			<Route path="/account/register">
				<Register></Register>
			</Route>
		</Switch>
	</div>
}

export default Account;