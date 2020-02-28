import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
		width: '85%',
		marginLeft: 'auto',
		marginTop: theme.spacing(3),
	},
	item: {
		width: '100%',
		marginTop: theme.spacing(2)
	}
}));

const useCardStyles = makeStyles(theme => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
}));


function Home() {

	useEffect(() => {
		accountService.setAuthInterceptor();
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


	function MyCard(props) {
		const cardClasses = useCardStyles();
		const item = props.item;
		return (
			<Card className={cardClasses.root}>
				<CardHeader
					avatar={
						<Avatar aria-label="recipe" className={cardClasses.avatar}>
							R
				</Avatar>
					}
					action={
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
					title={item.title}
					subheader={item.company.name}
				/>
				<CardMedia
					className={cardClasses.media}
					image="/assets/images/2.png"
					title="Paella dish"
				/>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{item.company.bio}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="share">
						<ShareIcon />
					</IconButton>
				</CardActions>

			</Card>
		);
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
