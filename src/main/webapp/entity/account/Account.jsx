import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useStyles } from './styles';
import { AccountForm } from './AccountForm';

function Account() {
	const classes = useStyles();
	return <div className={classes.container}>
		<Switch>
			<Redirect exact from="/account" to="/account/login">
			</Redirect>
			<Route path="/account/login" render={props => <AccountForm {...props} isLoginForm></AccountForm>} />
			<Route path="/account/register" render={props => <AccountForm {...props} isLoginForm={false}></AccountForm>} />
		</Switch>
	</div>
}

export default Account;