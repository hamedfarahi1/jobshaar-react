import React from 'react';
import { Switch } from 'react-router-dom';
import { AddJob } from './crud/AddJob';
import { JobDetail } from './detail/JobDetail';
import { PrivateRoute } from '../../shared/component/private-route/PrivateRoute';

function Job() {
	return (
		<div>
			<Switch>
				<PrivateRoute path="/job/add" roleFlag roleTypeIndex={'0'} component={AddJob} />
				<PrivateRoute path="/job/:id" component={JobDetail} />
			</Switch>
		</div>
	);

}

export { Job }