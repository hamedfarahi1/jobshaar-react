import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Container, CssBaseline, Typography, Icon, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { companyActions } from '../../core/_actions/company.actions';
import { connect } from 'react-redux';
import { useStyles } from './styles';
import Copyright from '../../shared/component/copyright/Copyright';
import MyTextField from '../../shared/component/my-text-field/MyTextField';
import { companyFieldContants, companyFormConstants } from '../../core/_constants';
import { companyKeyValues } from '../../shared/key-value/company-key-value';

function AddCompany(props) {

	const classes = useStyles();
	const [values, setValues] = useState({
		name: '',
		categoryTypeIndex: 0,
		bio: '',
		address: ''
	})

	const inputLabel = React.useRef(null);

	const [labelWidth, setLabelWidth] = useState(0);
	const [companyCategoryTypeMenuItems] = useState(companyKeyValues.companyTypeKeyValue)
	useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	const handleInputChange = e => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}

	const submitForm = (event) => {
		const { username, password } = values
		if (!username || !password) return
		props.login(username, password);
		event.preventDefault();
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
					<Icon>business</Icon>
				</Avatar>
				<Typography component="h1" variant="h5">
					{companyFormConstants.COMPANY_INFO}
				</Typography>
				<form onSubmit={submitForm} className={classes.companyForm}>
					<MyTextField
						field='name'
						label={companyFieldContants.COMPANY_NAME}
						onChange={handleInputChange}
						autoFocus={true}
						margin='normal'
					/>
					<FormControl fullWidth variant="outlined" className={classes.selectFormControl}>
						<InputLabel ref={inputLabel} id="select-outlined-label">
							Age
        				</InputLabel>
						<Select
							labelId="select-outlined-label"
							id="select-outlined"
							value={values.categoryTypeIndex}
							onChange={handleInputChange}
							labelWidth={labelWidth}
						>
							{companyCategoryTypeMenuItems.map(
								item => <MenuItem key={item.key} value={item.key}>{item.value}</MenuItem>
							)}
						</Select>
					</FormControl>
					<MyTextField
						field='bio'
						label={companyFieldContants.BIO}
						onChange={handleInputChange}
						autoFocus={true}
						margin='normal'
					/>
					<MyTextField
						field='address'
						label={companyFieldContants.ADDRESS}
						onChange={handleInputChange}
						autoFocus={true}
						margin='normal'
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={isNotValidForm()}
					>
						{companyFormConstants.SUBMIT_COMPANY}
					</Button >
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	)
}

function mapState(state) {
	const { user } = state.authentication;
	return { user }
}

const actionCreators = {
	addCompany: companyActions.addCompany
}

const connectedAddCompanyPage = connect(mapState, actionCreators)(AddCompany)
export { connectedAddCompanyPage as AddCompany }