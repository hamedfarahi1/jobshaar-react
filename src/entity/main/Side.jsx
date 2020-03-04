import React, { useState } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Typography, Container, Avatar } from '@material-ui/core';
import { mainConstants } from '../../core/_constants';
import { useDrawerStyles } from './styles';
import { connect } from 'react-redux';

function Side(props) {
	const classes = useDrawerStyles();
	const theme = useTheme();

	const [user] = useState({
		username: props.user ? props.user.username : 'Guest',
		roleTypeIndex: props.user ? props.user.roleTypeIndex : 'Guest'
	});

	const handleDrawerClose = () => {
		props.handleDrawerClose();
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={props.openSide}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<Typography className={classes.drawerHeaderTitle}>{mainConstants.JOBSHAAR}</Typography>

					<IconButton className={classes.drawerHeaderButton} onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Container className={classes.userInfo}>
					<Avatar className={classes.userAvatar}></Avatar>
					<Typography className={classes.username}> {user.username} </Typography>
					<Typography className={classes.userType}> {user.roleTypeIndex ? 'کارجو' : 'کارفرما'} </Typography>
				</Container>
				<Divider />
				<List>
					{['مشاهده کار ها', 'کار های من', 'تنظیمات', 'کمپانی ها'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{['سرویس ویژه', 'پشتیبانی', 'رزومه'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: props.openSide,
				})}
			>
				{props.children}
			</main>
		</div>
	);
}

function mapState(state) {
	const { user } = state.authentication
	return { user }
}

const connectedSidePage = connect(mapState, {})(Side)
export { connectedSidePage as Side }
