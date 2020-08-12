import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { useHomeStyles } from './styles';
import { JobsGrid } from './jobs-grid/JobsGrid';
import { JobsSwiper } from './jobs-swiper/JobsSwiper';

function Home() {

	const classes = useHomeStyles();

	return (
		<Container id="container-home" component="main">
			<CssBaseline />
			<div className={classes.paper}>
				<JobsSwiper />
				<JobsGrid />
			</div>
		</Container>
	);
}

export { Home };
