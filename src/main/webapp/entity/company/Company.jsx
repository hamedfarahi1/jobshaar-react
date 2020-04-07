import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AddCompany } from './AddCompany';

export default function Company() {
	return (
		<Switch>
			<Route path="/company/add">
				<AddCompany></AddCompany>
			</Route>
		</Switch>
	)
}
