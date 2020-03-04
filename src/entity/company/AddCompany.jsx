import React from 'react';
import { Container } from '@material-ui/core';
import { companyActions } from '../../core/_actions/company.actions';
import { connect } from 'react-redux';
import { useStyles } from './styles';

function AddCompany() {

	// const classes = useStyles();
	// const [values, setValues] = useState({
	// 	username: '',
	// 	password: '',
	// 	rememberMe: false
	// })

	// const handleInputChange = e => {
	// 	const { name, value } = e.target
	// 	setValues({ ...values, [name]: value })
	// }

	// const submitForm = (event) => {
	// 	const { username, password } = values
	// 	if (!username || !password) return
	// 	props.login(username, password);
	// 	event.preventDefault();
	// }

	// const rememberMeHandleChange = e => {
	// 	const { checked } = e.target
	// 	// eslint-disable-next-line
	// 	setValues({ ...values, ['rememberMe']: checked })
	// }
	// const isNotValidForm = () => {
	// 	const { username, password } = values;
	// 	return (!username || !password);
	// }

	return (
		<Container> fuck</Container>
	)
}

function mapState(state) {
	const { loggedIn, user } = state.authentication;
	return { loggedIn, user }
}

const actionCreators = {
	addCompany: companyActions.addCompany
}

const connectedAddCompanyPage = connect(mapState, actionCreators)(AddCompany)
export { connectedAddCompanyPage as AddCompany }