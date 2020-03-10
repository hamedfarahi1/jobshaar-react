import { companyConstants } from '../_constants'
import { companyService } from '../services/company/companyService'
import { alertActions } from './alert.actions'
import { history } from '../_helpers'

export const companyActions = {
	addCompany
}

function addCompany(company) {

	return dispatch => {
		dispatch(request(company.name))
		companyService.addCompany(company)
			.then(() => {
				dispatch(success(company));
				history.push('/home')
			})
			.catch((error) => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()))
			})
	}

	function request(company) { return { type: companyConstants.COMPANY_ADD_REQUEST, company } }
	function success(company) { return { type: companyConstants.COMPANY_ADD_SUCCESS, company } }
	function failure(error) { return { type: companyConstants.COMPANY_ADD_FAILURE, error } }
}