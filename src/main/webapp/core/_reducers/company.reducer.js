import { companyConstants } from '../_constants';

export function companyAdding(state = {}, action) {
	switch (action.type) {
		case companyConstants.COMPANY_ADD_REQUEST:
			return { addingCompany: true };
		case companyConstants.COMPANY_ADD_SUCCESS:
			return {};
		case companyConstants.COMPANY_ADD_FAILURE:
			return {};
		default:
			return state
	}
}