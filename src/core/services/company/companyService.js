const axios = require('../client');

export const companyService = {
	addCompany
}

function addCompany(company) {
	return axios.post('/api/company', company)
}