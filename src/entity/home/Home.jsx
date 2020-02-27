import React from 'react';
import Button from '@material-ui/core/Button';
import { Container, CssBaseline } from '@material-ui/core';
import { getUserInfo } from '../../core/services/account/accountService';



// this component is provided for testing interceptors
function Home() {

	const getUserProfile = () => {
		getUserInfo();
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

export default Home;