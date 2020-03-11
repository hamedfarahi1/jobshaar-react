import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {
	Link
} from "react-router-dom";
import { connect } from 'react-redux';

import { userActions } from '../../core/_actions';
import { userFieldConstants, accountPropConstants } from '../../core/_constants'
import { useStyles } from './styles';
import MyTextField from '../../shared/component/my-text-field/MyTextField';

function Login(props) {

	useEffect(() => {
		props.logout();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const classes = useStyles();
	const [values, setValues] = useState({ username: '', password: '', rememberMe: false, roleTypeIndex: '0' })

	const handleInputChange = e => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}

	const submitForm = (event) => {
		const { username, password } = values
		if (!username || !password) return
		props.login(values);
		event.preventDefault();
	}

	const rememberMeHandleChange = e => {
		const { checked } = e.target
		// eslint-disable-next-line
		setValues({ ...values, ['rememberMe']: checked })
	}
	const isNotValidForm = () => {
		const { username, password } = values;
		return (!username || !password);
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{accountPropConstants.LOGIN_IN_SITE}
				</Typography>
				<form onSubmit={submitForm} className={classes.loginForm}>
					<MyTextField
						field='username'
						label={userFieldConstants.USERNAME}
						onChange={handleInputChange}
						autoFocus={true}
						margin='normal'
					/>
					<MyTextField
						field='password'
						label={userFieldConstants.PASSWORD}
						onChange={handleInputChange}
						type='password'
						margin='normal'
					/>
					<FormControlLabel
						control={<Checkbox onChange={rememberMeHandleChange} color="primary" />}
						label={<Typography className={classes.rememberMe}>{accountPropConstants.REMEMBER_ME}</Typography>}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={isNotValidForm()}
					>
						{accountPropConstants.LOGIN}
					</Button >
					<Grid container>
						<Grid item xs>
							<Link to="#" variant="body2">
								{accountPropConstants.FORGOT_PASSWORD}
							</Link>
						</Grid>
						<Grid item>
							<Link to="/account/register" variant="body2">
								{accountPropConstants.REGISTER_IN_SITE}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}


function mapState(state) {
	const { loggingIn } = state.authentication;
	return { loggingIn };
}

const actionCreators = {
	login: userActions.login,
	logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(Login);
export { connectedLoginPage as Login };