import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { jobService } from '../../core/services/job/jobService';
import { accountService } from '../../core/services/account/accountService';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	list: {
		width: '70%', // Fix IE 11 issue.
		marginLeft: 'auto',
		marginRight: '30px',
		marginTop: theme.spacing(3),
	},
	item: {
		height: '150px',
		marginTop: theme.spacing(1),
		backgroundColor: '#e6e4e4'
	}
}));

// this component is provided for testing interceptors
function Home() {

	useEffect(() => {
		accountService.setAuthInterceptor();
		getJobs();
	}, []);

	const classes = useStyles();
	const [jobs, setJobs] = useState([]);
	const getJobs = () => {
		jobService.getJobs(0, 10, []).then(res => {
			if (res) setJobs(res.data);
		})
	}
	return <Container component="main">
		<CssBaseline />
		<div className={classes.paper}>
			<div className={classes.list}>
				<Grid container spacing={2}>
					{
						jobs.map(item => <Grid className={classes.item} item xs={12}> {item.title} </Grid>)
					}
				</Grid>
			</div>
		</div>
	</Container>
}

function mapState(state) {
	const { loggedIn } = state.authentication;
	return { loggedIn };
}

const connectedHomePage = withRouter(connect(mapState, {})(Home));
export { connectedHomePage as Home };