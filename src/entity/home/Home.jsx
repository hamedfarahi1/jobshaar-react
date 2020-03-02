import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { jobService } from '../../core/services/job/jobService';
import { makeStyles } from '@material-ui/core/styles';
import { MyCard } from './MyCard';
import { useMediaQuery } from 'react-responsive'

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	list: {
		marginTop: theme.spacing(3),
	},
	deskList: {
		width: '85%',
		marginTop: theme.spacing(3),
	},
	item: {
		width: '100%',
	}
}));


function Home() {

	useEffect(() => {
		getJobs();
	}, []);

	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-device-width: 1224px)'
	})
	const classes = useStyles();
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
				<div className={isDesktopOrLaptop ? classes.deskList : classes.list}>
					<MyGrid />
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
