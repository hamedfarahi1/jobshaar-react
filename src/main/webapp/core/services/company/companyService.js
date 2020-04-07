const axios = require('axios').default;

export const companyService = {
	addCompany
}

function addCompany(company) {
	return axios.post('/api/company', company)
}