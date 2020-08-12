import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useStyles } from './styles';
import { AccountForm } from './AccountForm';
import { ForgotPassword } from './ForgotPassword';
import { ChangePassword } from './ChangePassword';

function Account() {
	const classes = useStyles();
	return <div className={classes.container}>
		<Switch>
			<Redirect exact from="/account" to="/account/login">
			</Redirect>
			<Route path="/account/login" render={props => <AccountForm {...props} isLoginForm></AccountForm>} />
			<Route path="/account/register" render={props => <AccountForm {...props} isLoginForm={false}></AccountForm>} />
			<Route path="/account/forgot-password" render={props => <ForgotPassword {...props}></ForgotPassword>} />
			<Route path="/account/reset-password" render={props => <ChangePassword {...props} isResetPage></ChangePassword>} />
			<Route path="/account/change-password" render={props => <ChangePassword {...props} isResetPage={false}></ChangePassword>} />
		</Switch>
	</div>
}

export default Account;