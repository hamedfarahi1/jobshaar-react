import React from 'react';
import Button from '@material-ui/core/Button';
import { Container, CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';



// this component is provided for testing interceptors
function Home() {

	const getUserProfile = () => {
		console.log(localStorage.getItem('user'));
		// getUserInfo();
	}
	return <Container component="main">
		<CssBaseline />
		<div>
			<Button variant="contained" onClick={getUserProfile}>Default</Button>
			<Button variant="contained" color="primary">
				Primary
</Button>
			<Button variant="contained" color="secondary">
				Secondary
</Button>
			<Button variant="contained" disabled>
				Disabled
</Button>
			<Button variant="contained" color="primary" href="#contained-buttons">
				Link
</Button>
		</div>

	</Container>
}

function mapState(state) {
	const { loggedIn } = state.authentication;
	return { loggedIn };
}

const connectedHomePage = withRouter(connect(mapState, {})(Home));
export { connectedHomePage as Home };