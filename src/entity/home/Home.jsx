import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { useHomeStyles } from './styles';
import { JobsGrid } from './jobs-grid/JobsGrid';

function Home(props) {

	const classes = useHomeStyles();

	return (
		<Container component="main">
			<CssBaseline />
			<div className={classes.paper}>
				<JobsGrid />
			</div>
		</Container>
	);
}

export { Home };
