import React, { useState } from 'react';
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

function ForgotPassword(props) {

	const classes = useStyles();
	const [email, setEmail] = useState('')
	const handleInputChange = e => {
		const { value } = e.target
		setEmail(value)
	}

	const submitForm = (event) => {
		props.sendEmail(email);
		event.preventDefault();

	}

	const isNotValidForm = () => {
		return !email;
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
					<MyTextField
						value={email}
						style={{ textAlign: 'left' }}
						required={true}
						field='email'
						label={userFieldConstants.EMAIL}
						onChange={handleInputChange}
						margin='normal'

					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						className={classes.submit}
						disabled={isNotValidForm() || props.sendingEmail}
					>
						{accountPropConstants.SEND_EMAIL}
					</Button>
					{props.sendingEmail && <LinearProgress />}
					<Grid className={classes.link} container justify="flex-end">
						{
							<Grid item xs>
								<Link to="#" variant="body2">
									{accountPropConstants.FORGOT_PASSWORD}
								</Link>
							</Grid>
						}
					</Grid>
				</form>
			</div>
		</Container>
	);

}

function mapState(state) {
	const { sendingEmail } = state.resetingPassword;
	return { sendingEmail }
}

const actionCreators = {
	sendEmail: userActions.resetPasswordSendEmail,
}

const connectedForgotPasswordPage = connect(mapState, actionCreators)(ForgotPassword);
export { connectedForgotPasswordPage as ForgotPassword }