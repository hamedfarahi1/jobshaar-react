import './Account.scss';
import React, { useState, useEffect } from 'react';
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
	Link,
	Redirect
} from "react-router-dom";
import { connect } from 'react-redux';
import { userActions } from '../../core/_actions';

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
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function Register(props) {

	useEffect(() => {
		props.logout();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { loggedIn } = props;
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

	if (loggedIn) return <Redirect to="/home"></Redirect>;
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					ثبت نام
        </Typography>
				<form className={classes.form} onSubmit={submitForm}>
					<Grid container spacing={2}>
						<Grid item xs={12} >
							<TextField
								variant="outlined"
								required
								fullWidth
								id="ema"
								label="ایمیل"
								name="email"
								autoComplete="email"
								dir="ltr"
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="username"
								label="نام کاربری"
								name="username"
								autoComplete="username"
								onChange={handleInputChange}
								dir="ltr"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="رمز عبور"
								type="password"
								id="password"
								autoComplete="current-password"
								dir="ltr"
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox onChange={CheckBoxHandleChange} color="primary" />}
								label="میخواهم اخبار و رویداد ها به ایمیلم ارسال شود"
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
						ثبت نام
          </Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link to="/account/login" variant="body2">
								ورود به سامانه
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
	const { registering, loggedIn } = state.registration;
	return { registering, loggedIn };
}

const actionCreators = {
	register: userActions.register,
	logout: userActions.logout
}

const connectedRegisterPage = connect(mapState, actionCreators)(Register);
export { connectedRegisterPage as Register };