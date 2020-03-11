import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

export const useDrawerStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	drawerHeaderTitle: {
		marginRight: 'auto'
	},
	content: {
		flexGrow: 1,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	userInfo: {
		textAlign: 'center',
		marginTop: '1rem',
		marginBottom: '1rem',
		fontSize: 'large',
	},
	userAvatar: {
		width: theme.spacing(7),
		height: theme.spacing(7),
		margin: 'auto'
	},
	username: {
		marginTop: theme.spacing(1)
	},
	userType: {
		marginTop: theme.spacing(1),
		fontSize: 'x-small'
	}
}));

export const usePaperMenuStyles = makeStyles(theme => ({
	paper: {
		minWidth: '140px'
	},
	itemText: {
		marginLeft: 'auto',
		fontSize: 'small'
	},
	link: {
		textDecoration: 'none',
		color: 'inherit'
	}
}));

export const useMainStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	appBar: {
		backgroundColor: '#508cef',
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
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
	paper: {
		minWidth: '140px'
	},
	itemText: {
		marginLeft: 'auto',
		fontSize: 'smaller'
	}
}));


export const userFooterStyles = makeStyles((theme) => ({
	footer: {
		width: '100%',
		height: '22rem',
		backgroundColor: '#4175cb',
		marginBottom: 0,
		marginTop: '5rem'
	},
	footerContainer: {
		paddingTop: '3rem'
	},
	title: {
		textAlign: 'center',
		padding: '2rem',
		fontSize: 'x-large',
		fontWeight: 700,
		color: '#fafafa',
	},
	links: {
		fontSize: '90%',
		textAlign: 'center',
		'& span': {
			padding: '2%'
		}
	}
}))