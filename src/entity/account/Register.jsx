import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {
	Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { userActions } from '../../core/_actions';
import { accountPropConstants, userFieldConstants } from '../../core/_constants';
import { useStyles } from './styles';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" to="#">
				Hamed Farahi
      </Link>{' '}
			{new Date().getFullYear()}
		</Typography>
	);
}



function Register(props) {

	const classes = useStyles();
	const [values, setValues] = useState({ email: '', username: '', password: '', allowExtraEmails: false })

	const handleInputChange = e => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}

	const submitForm = (event) => {
		props.register(values);
		event.preventDefault();

	}

	const CheckBoxHandleChange = e => {
		const { checked } = e.target
		// eslint-disable-next-line
		setValues({ ...values, ['allowExtraEmails']: checked })
	}
	const isNotValidForm = () => {
		const { username, password, email } = values;
		return (!username || !password || !email);
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{accountPropConstants.REGISTER_IN_SITE}
				</Typography>
				<form className={classes.registerForm} onSubmit={submitForm}>
					<Grid container spacing={2}>
						<Grid item xs={12} >
							<TextField
								dir="ltr"
								variant="outlined"
								required
								fullWidth
								id="ema"
								label={userFieldConstants.EMAIL}
								name="email"
								autoComplete="email"
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								dir="ltr"
								variant="outlined"
								required
								fullWidth
								id="username"
								label={userFieldConstants.USERNAME}
								name="username"
								autoComplete="username"
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								dir="ltr"
								variant="outlined"
								required
								fullWidth
								name="password"
								label={userFieldConstants.PASSWORD}
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox onChange={CheckBoxHandleChange} color="primary" />}
								label={<Typography className={classes.allowExtraEmails}>{accountPropConstants.ALLOW_EXTRA_EMAILS}</Typography>}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={isNotValidForm()}
					>
						{accountPropConstants.REGISTER}
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link to="/account/login" variant="body2">
								{accountPropConstants.LOGIN_IN_SITE}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}

function mapState(state) {
	const { registering } = state.registration;
	return { registering };
}

const actionCreators = {
	register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(Register);
export { connectedRegisterPage as Register };