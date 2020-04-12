import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import { LinearProgress } from '@material-ui/core';
import queryString from 'query-string'
import { history } from '../../core/_helpers';

function ChangePassword(props) {

	useEffect(() => {
		if (isResetPage) {
			props.logout();
			const values = queryString.parse(props.location.search)
			if (values.key)
				localStorage.setItem('auth', JSON.stringify({
					token: values.key
				}));
			else if (isResetPage) history.push('/account/forgot-password');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const classes = useStyles();
	const [values, setValues] = useState({ oldPass: undefined, newPass: '', repeatNewPass: '' })
	const { isResetPage } = props

	const handleInputChange = e => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}

	const submitForm = (event) => {
		isResetPage ?
			props.resetPass(values) :
			props.changePass(values);
		event.preventDefault();

	}

	const isNotValidForm = () => {
		const { oldPass, newPass, repeatNewPass } = values;
		return (!newPass || !repeatNewPass) || (!isResetPage && !oldPass);
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
						accountPropConstants.FORGOT_PASSWORD
					}
				</Typography>
				<form className={classes.form} onSubmit={submitForm}>
					{
						!isResetPage &&
						<MyTextField
							value={values.oldPass}
							style={{ textAlign: 'left' }}
							required={true}
							field='oldPass'
							type='password'
							label={userFieldConstants.OLD_PASSWORD}
							onChange={handleInputChange}
							margin='normal'

						/>
					}
					<MyTextField
						value={values.newPass}
						style={{ textAlign: 'left' }}
						required={true}
						field='newPass'
						type='password'
						label={userFieldConstants.NEW_PASSWORD}
						onChange={handleInputChange}
						margin='normal'

					/>
					<MyTextField
						value={values.repeatNewPass}
						style={{ textAlign: 'left' }}
						required={true}
						field='repeatNewPass'
						type='password'
						label={userFieldConstants.NEW_PASSWORD_REPEAT}
						onChange={handleInputChange}
						margin='normal'

					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						className={classes.submit}
						disabled={isNotValidForm() || props.resetingPass}
					>
						{accountPropConstants.CHANGE_PASSWORD}
					</Button>
					{props.resetingPass && <LinearProgress />}
					{
						isResetPage && <Grid className={classes.link} container justify="flex-end">
							{
								<>
									<Grid item xs>
										<Link to="/account/login" variant="body2">
											{accountPropConstants.LOGIN_IN_SITE}
										</Link>
									</Grid>
									<Grid item>
										<Link to="/account/register" variant="body2">
											{accountPropConstants.REGISTER_IN_SITE}
										</Link>
									</Grid></>
							}
						</Grid>
					}
				</form>
			</div>
		</Container>
	);

}

function mapState(state) {
	const { resetingPass } = state.resetingPassword;
	return { resetingPass }
}

const actionCreators = {
	changePass: userActions.changePass,
	resetPass: userActions.resetPass,
	logout: userActions.logout
}

const connectedChangePasswordPage = connect(mapState, actionCreators)(ChangePassword);
export { connectedChangePasswordPage as ChangePassword }