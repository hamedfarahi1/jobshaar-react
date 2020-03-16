import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

export const useDrawerStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		'& a': {
			textDecoration: 'none',
			color: '#4c4c4c'
		}
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
		backgroundColor: theme.palette.primary.main,
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
	},
	appBarBody: {
		display: 'flex',
		justifyContent: 'space-between',
		height: '18rem',
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
		backgroundColor: theme.palette.primary.main
	},
	appBarBodyImg: {
		height: '90%',
		float: 'right'
	},
	appBarText: {
		padding: '8rem',
		color: 'white'
	},
	marginAuto: {
		margin: 'auto'
	},
	buttonGroup: {
		display: 'block',
		padding: theme.spacing(4),
		'& span': {
			color: '#ffffff',
			fontWeight: '400'
		}
	},
	bookImg1: {
		width: '30%',
		transform: 'scaleX(-1)'
	},
	bookImg2: {
		width: '15%'
	}
}));


export const userFooterStyles = makeStyles((theme) => ({
	footer: {
		width: '100%',
		height: '22rem',
		backgroundColor: theme.palette.primary.dark,
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