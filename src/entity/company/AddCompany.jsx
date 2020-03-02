import React from 'react';
import { Container } from '@material-ui/core';
import { userActions } from '../../core/_actions';
import { companyActions } from '../../core/_actions/company.actions';

function AddCompany() {
	return (
		<Container></Container>
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