import React from 'react';
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
import { Typography, Container, Avatar, Icon } from '@material-ui/core';
import { mainConstants } from '../../../core/_constants';
import { useDrawerStyles } from '../styles';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom';

function Side(props) {
	const classes = useDrawerStyles();
	const theme = useTheme();
	const shouldShift = !useMediaQuery({ maxWidth: 900 })
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
				open={props.openSide && props.user !== undefined}
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
					<Typography className={classes.username}> {props.user ? props.user.username : ''} </Typography>
					{props.user !== undefined ?
						<Typography className={classes.userType}> {+props.user.roleTypeIndex ? 'کارجو' : 'کارفرما'} </Typography>
						: ''
					}
				</Container>
				<Divider />
				<List>
					{[
						{ title: 'صفحه ی اصلی', link: '/home', icon: 'home' }
						, { title: 'کار های من', link: '#', icon: 'work' }
						, { title: 'مشاهده کار ها', link: '#', icon: 'format_list_numbered_ltr' }
						, { title: 'افزودن کار', link: '/job/add', icon: 'add' }
					].map((item, index) => (
						<Link key={index} to={item.link}>
							<ListItem onClick={props.handleDrawerClose} button>
								<ListItemIcon><Icon>{item.icon}</Icon></ListItemIcon>
								<ListItemText primary={item.title} />
							</ListItem>
						</Link>
					))}
				</List>
				<Divider />
				<List>
					{['سرویس ویژه'].map((item, index) => (
						<ListItem onClick={props.handleDrawerClose} button key={item}>
							<ListItemIcon><Icon>settings_applications</Icon></ListItemIcon>
							<ListItemText primary={item} />
						</ListItem>
					))}
				</List>
			</Drawer>
			<main
				className={clsx(classes.content, shouldShift ? {
					[classes.contentShift]: props.openSide && props.user
				} : {})}
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
