import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { jobService } from '../../core/services/job/jobService';
import { makeStyles } from '@material-ui/core/styles';
import { MyCard } from './MyCard';


const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	list: {
		width: '85%',
		marginLeft: 'auto',
		marginTop: theme.spacing(3),
	},
	item: {
		width: '100%',
		marginTop: theme.spacing(2)
	}
}));


function Home() {

	useEffect(() => {
		getJobs();
	}, []);

	const classes = useStyles();
	const [jobs, setJobs] = useState([]);


	const getJobs = () => {
		jobService.getJobs(0, 10, []).then(res => res ? setJobs(res.data) : null);
	}


	function Item(props) {
		return (
			<Grid className={classes.item} item xs={4}>
				<MyCard item={props.item}></MyCard>
			</Grid>);
	}

	return (
		<Container component="main">
			<CssBaseline />
			<div className={classes.paper}>
				<div className={classes.list}>
					<Grid container spacing={2}>
						{
							jobs.map(item => <Item key={item.id} item={item}></Item>)
						}
					</Grid>
				</div>
			</div>
		</Container>
	);
}

function mapState(state) {
	const { loggedIn } = state.authentication;
	return { loggedIn };
}

const connectedHomePage = withRouter(connect(mapState, {})(Home));
export { connectedHomePage as Home };
