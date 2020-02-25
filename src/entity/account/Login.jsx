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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
	Link
} from "react-router-dom";
import './Account.scss';

import { login } from '../../core/services/account/accountService';

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

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function Login() {
	const classes = useStyles();
	const [values, setValues] = useState({ username: '', password: '', rememberMe: false })

	const handleInputChange = e => {
		const { name, value } = e.target
		console.log(e.target.checked);
		setValues({ ...values, [name]: value })
	}

	const submitForm = (event) => {
		const { username, password } = values
		if (!username || !password) return
		login(values).then(() => {
			//
		})
		event.preventDefault();

	}

	const rememberMeHandleChange = e => {
		const { checked } = e.target
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
					ورود به سامانه
		  </Typography>
				<form onSubmit={submitForm} className={classes.form}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="نام کاربری"
						name="username"
						autoFocus
						onChange={handleInputChange}
						value={values.username}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="رمز عبور"
						type="password"
						id="password"
						onChange={handleInputChange}
						value={values.password}
					/>
					<FormControlLabel
						control={<Checkbox onChange={rememberMeHandleChange} color="primary" />}
						label="مرا به خاطر بسپار"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={isNotValidForm()}
					>
						ورود
			</Button >
					<Grid container>
						<Grid item xs>
							<Link to="#" variant="body2">
								فراموشی رمز عبور
				</Link>
						</Grid>
						<Grid item>
							<Link to="/account/register" variant="body2">
								{"ثبت نام در سایت"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}

export default Login;