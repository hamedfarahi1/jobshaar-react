import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const isRightRole = () => {
		if (rest.roleFlag)
			return +rest.roleTypeIndex === +rest.user.roleTypeIndex
		return true;
	}
	return (
		<Route {...rest} render={props => {
			if (rest.loggedIn && isRightRole())
				return <Component {...props} />
			else if (rest.loggedIn)
				return <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
			else
				return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />
		}} />
	)
}

function mapState(state) {
	const { loggedIn, user } = state.authentication;
	return { loggedIn, user }
}

const connectedPrivateRoutePage = connect(mapState, {})(PrivateRoute)
export { connectedPrivateRoutePage as PrivateRoute }