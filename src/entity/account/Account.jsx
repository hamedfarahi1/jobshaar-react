import React from 'react';
import { Login } from './Login'
import { Switch, Route, Redirect } from 'react-router-dom';
import { Register } from './Register';
import { useStyles } from './styles';

function Account() {
	const classes = useStyles();
	return <div className={classes.container}>
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