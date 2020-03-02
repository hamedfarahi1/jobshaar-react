import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { jobService } from '../../core/services/job/jobService';
import { MyCard } from './MyCard';
import { useHomeStyles } from './styles';

function Home(props) {

	useEffect(() => {
		getJobs();
	}, []);

	const classes = useHomeStyles();
	const [jobs, setJobs] = useState([]);


	const getJobs = () => {
		jobService.getJobs(0, 12, []).then(res => res ? setJobs(res.data) : null);
	}


	function Item(props) {
		return (
			<Grid className={classes.item} item xs={12} sm={6} md={4}>
				<MyCard item={props.item}></MyCard>
			</Grid>)
	}

	function MyGrid() {
		return (
			<Grid container spacing={2}>
				{
					jobs.map(item => <Item key={item.id} item={item}></Item>)
				}
			</Grid>
		)
	}

	return (
		<Container component="main">
			<CssBaseline />
			<div className={classes.paper}>
				<MyGrid />
			</div>
		</Container>
	);
}

function mapState(state) {
	const { loggedIn, user } = state.authentication;
	return { loggedIn, user };
}

const connectedHomePage = withRouter(connect(mapState, {})(Home));
export { connectedHomePage as Home };
