import React, { useState, useRef, useEffect } from 'react';
import {
	Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";
import { connect } from 'react-redux';
import { alertActions } from '../../core/_actions';
import Account from '../account/Account';
import { history } from '../../core/_helpers';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Home } from '../home/Home';
import { PrivateRoute } from '../../shared/component/private-route/PrivateRoute';
import { mainConstants } from '../../core/_constants';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import { PaperMenu } from './paper-menu/PaperMenu';
import { Side } from './side/Side';
import { useMainStyles } from './styles';
import Company from '../company/Company';
import { Footer } from './footer/Footer';
import { Job } from '../job/Job';

function Main(props) {
	const classes = useMainStyles();
	useEffect(() => {
		history.listen(() => props.clearAlerts());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const anchorRef = useRef(null);

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};
	const [open, setOpen] = useState(false);
	const [openSide, setOpenSide] = React.useState(false);


	const handlePaperClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	const handleDrawerOpen = () => {
		setOpenSide(true);
	};

	const handleDrawerClose = () => {
		setOpenSide(false);
	};

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open);
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	function Menu() {

		return (
			<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
					>
						<PaperMenu
							handlePaperClose={handlePaperClose}
							handleListKeyDown={handleListKeyDown}
							setOpen={setOpen}
							open={open}
						></PaperMenu>
					</Grow>
				)}
			</Popper>
		)
	}


	return (
		<Router history={history}>
			<AppBar position="sticky" className={clsx(classes.appBar, {
				[classes.appBarShift]: openSide && props.loggedIn,
			})}>
				<Toolbar>
					{props.loggedIn ?
						<IconButton
							onClick={handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, openSide && props.loggedIn && classes.hide)}
							color="inherit" aria-label="menu">
							<MenuIcon />
						</IconButton> : ''}
					<Typography variant="h6" className={classes.title}>
						{mainConstants.JOBSHAAR}
					</Typography>
					<div>
						{alert.message &&
							<div className={`alert ${alert.type}`}>{alert.message}</div>
						}
					</div>
					<Button
						ref={anchorRef}
						aria-controls={open ? 'menu-list-grow' : undefined}
						aria-haspopup="true"
						onClick={handleToggle}
						className={classes.linkButton}>
						<Icon>account_box</Icon>
					</Button>
					<Menu></Menu>
				</Toolbar>
			</AppBar>
			<Side openSide={openSide} handleDrawerClose={handleDrawerClose}>
				<Switch>
					<Redirect exact from="/" to="/home"> </Redirect>
					<Route path="/account">
						<Account></Account>
					</Route>
					<Route path="/job">
						<Job></Job>
					</Route>
					<PrivateRoute path="/company" roleFlag roleTypeIndex={'0'} component={Company} />
					<PrivateRoute path="/home" component={Home} />
					<Redirect exact from="*" to="/home"> </Redirect>
				</Switch>
			</Side>
			<Footer />
		</Router>
	);
}

function mapState(state) {
	const { alert } = state;
	const { loggedIn } = state.authentication
	return { alert, loggedIn };
}

const actionCreators = {
	clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(Main);
export { connectedApp as Main };