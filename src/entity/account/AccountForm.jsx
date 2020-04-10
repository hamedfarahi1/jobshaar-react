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
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { LinearProgress } from '@material-ui/core';

function AccountForm(props) {

	useEffect(() => {
		props.logout();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const classes = useStyles();
	const { isLoginForm } = props
	const [values, setValues] = useState({ email: '', username: '', password: '', roleTypeIndex: '1' })
	const handleInputChange = e => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}

	const handleToggleInputChange = (e, value) => {
		setValues({ ...values, roleTypeIndex: value })
	}

	const submitForm = (event) => {
		isLoginForm ?
			props.login({ ...values, username: values.username.toLowerCase() }) :
			props.register({ ...values, username: values.username.toLowerCase() });
		event.preventDefault();

	}

	const CheckBoxHandleChange = e => {
		const { checked } = e.target
		// eslint-disable-next-line
		setValues({
			...values, [`${isLoginForm ? 'rememberMe' : 'allowExtraEmails'}`]: checked,
			[`${!isLoginForm ? 'rememberMe' : 'allowExtraEmails'}`]: undefined
		})
	}

	const isNotValidForm = () => {
		const { username, password, email } = values;
		return (!username || !password || (!isLoginForm && !email));
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{
						isLoginForm ?
							accountPropConstants.LOGIN_IN_SITE :
							accountPropConstants.REGISTER_IN_SITE
					}
				</Typography>
				<form className={classes.form} onSubmit={submitForm}>
					{
						!isLoginForm &&
						<MyTextField
							value={values.email}
							style={{ textAlign: 'left' }}
							required={true}
							field='email'
							label={userFieldConstants.EMAIL}
							onChange={handleInputChange}
							autoFocus={true}
							margin='normal'

						/>
					}
					<MyTextField
						value={values.username}
						style={{ textAlign: 'left' }}
						required={true}
						field='username'
						label={userFieldConstants.USERNAME}
						onChange={handleInputChange}
						margin='normal'

					/>
					<MyTextField
						value={values.password}
						style={{ textAlign: 'left' }}
						required={true}
						field='password'
						type='password'
						label={userFieldConstants.PASSWORD}
						onChange={handleInputChange}
						margin='normal'

					/>
					<FormControlLabel
						control={<Checkbox onChange={CheckBoxHandleChange} color="primary" />}
						label={<Typography className={classes.checkBox}>{
							isLoginForm ?
								accountPropConstants.REMEMBER_ME :
								accountPropConstants.ALLOW_EXTRA_EMAILS
						}</Typography>}
					/>
					<ToggleButtonGroup className={classes.buttonGroupe} value={values.roleTypeIndex} exclusive onChange={handleToggleInputChange}>
						<ToggleButton key='0' value='0'>کارفرما</ToggleButton>
						<ToggleButton key='1' value='1'>کارجو</ToggleButton>
					</ToggleButtonGroup>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						className={classes.submit}
						disabled={isNotValidForm() || props.registering || props.loggingIn}
					>
						{
							isLoginForm ?
								accountPropConstants.LOGIN :
								accountPropConstants.REGISTER
						}
					</Button>
					{(props.registering || props.loggingIn) && <LinearProgress />}
					<Grid className={classes.link} container justify="flex-end">
						{
							isLoginForm &&
							<Grid item xs>
								<Link to="/account/forgot-password" variant="body2">
									{accountPropConstants.FORGOT_PASSWORD}
								</Link>
							</Grid>
						}
						<Grid item>
							<Link
								to={isLoginForm ? "/account/register" : "/account/login"} variant="body2">
								{
									isLoginForm ?
										accountPropConstants.REGISTER_IN_SITE :
										accountPropConstants.LOGIN_IN_SITE
								}
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
	const { registering } = state.registration;

	return { loggingIn, registering }
}

const actionCreators = {
	register: userActions.register,
	login: userActions.login,
	logout: userActions.logout
}

const connectedAccountFormPage = connect(mapState, actionCreators)(AccountForm);
export { connectedAccountFormPage as AccountForm }