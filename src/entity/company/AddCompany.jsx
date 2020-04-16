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
import { store } from '../../core/_helpers';
import { uiActions } from '../../core/_actions';

function AddCompany(props) {

	const classes = useStyles();
	const [values, setValues] = useState({
		name: '',
		categoryTypeIndex: 0,
		bio: '',
		address: '',
		logoDataUrl: ''
	})

	const inputLabel = React.useRef(null);
	const fileInputRef = React.useRef();
	function selectFile() {
		fileInputRef.current.click();
	}
	const [imgSrc, setImgSrc] = useState('')
	const [labelWidth, setLabelWidth] = useState(0);
	const [companyCategoryTypeMenuItems] = useState(companyKeyValues.companyTypeKeyValue)
	useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	const handleInputChange = e => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}

	const fileInputOnChange = (e) => {
		const f = e.target.files[0];
		if (!f) return
		if (('' + f.name).endsWith('png')) {
			if (f.size > 50000) return store.dispatch(uiActions.errorSnackbar('حجم فایل انتخابی باید کمتر 50 کیلوبایت باشد'));
			setLogoFile(f)
		}
		else {
			store.dispatch(uiActions.errorSnackbar('پسوند فایل انتخابی باید pdf باشد'));
		}

	}

	function setLogoFile(f) {
		let idCardBase64 = '';
		getBase64(f, (result) => {
			idCardBase64 = result;
			setImgSrc(idCardBase64);
			setValues({ ...values, logoDataUrl: idCardBase64 });
		});
		function getBase64(file, cb) {
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function () {
				cb(reader.result)
			};
			reader.onerror = function (error) {
				console.log('Error: ', error);
			};
		}
	}

	const submitForm = (event) => {
		if (isNotValidForm()) return
		props.addCompany(values);
		event.preventDefault();
	}

	const selectHandleChange = e => {
		const { value } = e.target
		// eslint-disable-next-line
		setValues({ ...values, ['categoryTypeIndex']: value })
	}

	const isNotValidForm = () => {
		const { name, bio, address } = values
		return (!name || !bio || !address)
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
							onChange={selectHandleChange}
							labelWidth={labelWidth}
						>
							{Object.keys(companyCategoryTypeMenuItems).map(
								key => <MenuItem key={key} value={key}>{companyCategoryTypeMenuItems[key]}</MenuItem>
							)}
						</Select>
					</FormControl>
					<MyTextField
						field='bio'
						label={companyFieldContants.BIO}
						onChange={handleInputChange}
						margin='normal'
					/>
					<MyTextField
						field='address'
						label={companyFieldContants.ADDRESS}
						onChange={handleInputChange}
						margin='normal'
					/>
					<div className={classes.imgContainer}>
						<Button className={classes.logoBtn} onClick={selectFile} size='large' variant="contained" color="primary">
							انتخاب لوگو
						</Button>
						<input ref={fileInputRef} style={{ display: 'none' }} onChange={fileInputOnChange} type='file' label='انتخاب فایل' placeholder='فایلی انتخاب نکردید' />
						{
							imgSrc && <img className={classes.img} alt='logo' src={imgSrc} />
						}
					</div>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						className={classes.submit}
						disabled={isNotValidForm() || props.addingCompany}
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
	const { addingCompany } = state.companyAdding;
	return { user, addingCompany }
}

const actionCreators = {
	addCompany: companyActions.addCompany
}

const connectedAddCompanyPage = connect(mapState, actionCreators)(AddCompany)
export { connectedAddCompanyPage as AddCompany }