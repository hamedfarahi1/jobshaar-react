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
			<Route path="/account/login" render={props => <Login {...props}></Login>} />
			<Route path="/account/register" render={props => <Register {...props}></Register>} />
		</Switch>
	</div>
}

export default Account;