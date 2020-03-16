import React, { useState } from 'react';
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
import { accountPropConstants, userFieldConstants } from '../../core/_constants';
import { useStyles } from './styles';
import MyTextField from '../../shared/component/my-text-field/MyTextField';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'

function Register(props) {

	const classes = useStyles();
	const [values, setValues] = useState({ email: '', username: '', password: '', allowExtraEmails: false, roleTypeIndex: '1' })

	const handleInputChange = e => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}

	const handleToggleInputChange = (e, value) => {
		setValues({ ...values, roleTypeIndex: value })
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
							<MyTextField
								style={{ textAlign: 'left' }}
								required={true}
								field='email'
								label={userFieldConstants.EMAIL}
								onChange={handleInputChange}
								autoFocus={true}
							/>
						</Grid>
						<Grid item xs={12}>
							<MyTextField
								style={{ textAlign: 'left' }}
								required={true}
								field='username'
								label={userFieldConstants.USERNAME}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<MyTextField
								style={{ textAlign: 'left' }}
								required={true}
								field='password'
								type='password'
								label={userFieldConstants.PASSWORD}
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