import React from 'react';
import { Link } from 'react-router-dom'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon'
import { connect } from 'react-redux';
import { userActions } from '../../../core/_actions';
import { usePaperMenuStyles } from '../styles';


function PaperMenu(props) {
	const classes = usePaperMenuStyles();

	function logout() {
		props.logout();
		props.setOpen(false);
	}
	return <Paper className={classes.paper} >
		<ClickAwayListener onClickAway={props.handlePaperClose}>
			{
				props.loggedIn ?
					<MenuList autoFocusItem={props.open} id="menu-list-grow" onKeyDown={props.handleListKeyDown}>
						<Link to="#" className={classes.link}>
							<MenuItem onClick={props.handlePaperClose}>
								<Icon>account_circle</Icon>
								<Typography className={classes.itemText}>پروفایل</Typography>
							</MenuItem>
						</Link>
						<Divider />
						<Link to="#" className={classes.link}>
							<MenuItem onClick={props.handlePaperClose}>
								<Icon>person_outline</Icon>
								<Typography className={classes.itemText}>اکانت</Typography>
							</MenuItem>
						</Link>
						<Divider />
						<MenuItem onClick={logout}>
							<Icon>clear</Icon>
							<Typography className={classes.itemText}>خروج</Typography>
						</MenuItem>
					</MenuList>

					:
					<MenuList autoFocusItem={props.open} id="menu-list-grow" onKeyDown={props.handleListKeyDown}>
						<Link className={classes.link} to="/account/login">
							<MenuItem onClick={props.handlePaperClose}>
								<Icon>vpn_key</Icon>
								<Typography className={classes.itemText}>ورود</Typography>
							</MenuItem>
						</Link>
						<Link className={classes.link} to="/account/register">
							<MenuItem onClick={props.handlePaperClose}>
								<Icon>add_circle</Icon>
								<Typography className={classes.itemText}>ثبت نام</Typography>
							</MenuItem>
						</Link>
					</MenuList>
			}
		</ClickAwayListener>
	</Paper>
}

function mapState(state) {
	const { loggedIn } = state.authentication;
	return { loggedIn };
}

const actionCreators = {
	logout: userActions.logout
};
const connectedPaperMenu = connect(mapState, actionCreators)(PaperMenu);

export { connectedPaperMenu as PaperMenu }