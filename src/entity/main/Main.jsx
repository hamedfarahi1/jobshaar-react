import React from 'react';
import './Main.scss';
import {
	Router,
	Switch,
	Route,
	Link,
	Redirect
} from "react-router-dom";
import { connect } from 'react-redux';

import { alertActions } from '../../core/_actions';
import Account from '../account/Account';
import { makeStyles } from '@material-ui/core/styles';
import { history } from '../../core/_helpers';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Home } from '../home/Home';
import { PrivateRoute } from '../../shared/component/private-route/PrivateRoute';
import { useEffect } from 'react';


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

function Main(props) {
	const classes = useStyles();
	useEffect(() => {
		history.listen(() => props.clearAlerts());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<Router history={history}>
			<AppBar position="static" className={classes.appBar}>
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						جابشار
    					</Typography>
					<div>
						{alert.message &&
							<div className={`alert ${alert.type}`}>{alert.message}</div>
						}
					</div>
					<Link className={classes.link} to="/account">
						<Button className={classes.linkButton}>ورود</Button>
					</Link>
				</Toolbar>
			</AppBar>
			<Switch>
				<Redirect exact from="/" to="/home"></Redirect>
				<Route path="/account">
					<Account></Account>
				</Route>
				<PrivateRoute path="/home" component={Home} />
			</Switch>
		</Router>
	);
}

function mapState(state) {
	const { alert } = state;
	return { alert };
}

const actionCreators = {
	clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(Main);
export { connectedApp as Main };