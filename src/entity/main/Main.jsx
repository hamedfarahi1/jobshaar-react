import React from 'react';
import './Main.scss';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import Account from '../account/Account';

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Home from '../home/Home';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	link: {
		textDecoration: 'none'
	},
	linkButton: {
		color: '#f6f6f6',
	},
	appBar: {
		backgroundColor: '#508cef'
	}
}));


function Main() {
	const classes = useStyles();
	return (
		<Router>
			<AppBar position="static" className={classes.appBar}>
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						جابشار
    					</Typography>
					<Link className={classes.link} to="/account">
						<Button className={classes.linkButton}>ورود</Button>
					</Link>
				</Toolbar>
			</AppBar>
			<Switch>
				<Route path="/account">
					<Account></Account>
				</Route>
				<Route path="/home">
					<Home></Home>
				</Route>
			</Switch>
		</Router>
	);
}

export default Main;