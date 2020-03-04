import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../../core/_actions';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const isRightRole = () => {
		if (rest.roleFlag)
			return rest.roleTypeIndex == rest.user.roleTypeIndex
		return true;
	}
	return (
		<Route {...rest} render={props => (
			rest.loggedIn && isRightRole()
				? <Component {...props} />
				: <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />
		)} />
	)
}

function mapState(state) {
	const { loggedIn, user } = state.authentication;
	return { loggedIn, user }
}

const connectedPrivateRoutePage = connect(mapState, {})(PrivateRoute)
export { connectedPrivateRoutePage as PrivateRoute }