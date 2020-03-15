import { makeStyles } from '@material-ui/core';

export const useJobDetailStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		marginTop: theme.spacing(10),
		'& > *': {
			margin: theme.spacing(1),
			width: theme.spacing(16),
			height: theme.spacing(16),
		}
	},
	side: {
		width: '100%',
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(8),
		marginTop: '-20rem'
	},
	decresePadding: {
		padding: theme.spacing(2),
		marginTop: '-17rem'
	},
	item: {
		width: '100%',
		minHeight: '600px',
		padding: theme.spacing(2)
	},
	attache: {
		width: '45px',
		marginTop: '-72px'
	},
	title: {
		fontSize: 'calc(1vw + 12px)',
		padding: '30px',
		marginLeft: '105px'
	},
	description: {
		padding: '3%',
		direction: 'rtl'
	},
	userInfo: {
		marginTop: theme.spacing(2)
	},
	userInfoItem: {
		padding: theme.spacing(1)
	},
	resumeTitle: {
		textAlign: 'center',
		padding: '22px',
		fontSize: '2vw',
		color: '#508cef',
		marginTop: '45px'
	},
	resumeSubmit: {
		display: ' flex',
		justifyContent: 'center',
		padding: theme.spacing(3),
		'& button': {
			width: '100%'
		}
	},
	resumeMessage: {
		textAlign: 'center',
		padding: '18px',
		fontSize: 'small'
	},
	resumeAlert: {
		color: '#fc7b45',
	},
	resumesShow: {
		color: 'black',
	}
}));


export const useChipsStyles = makeStyles(theme => ({
	chipContainer: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(4),
		'& p': {
			fontSize: 'smaller'
		}
	},
	chipRow1: {
		display: 'flex',
		marginTop: theme.spacing(2),
	},
	chipRow2: {
		display: 'flex',
		marginTop: theme.spacing(4),
	},
	item: {
		width: '50%',
		marginLeft: '15%'
	}
}));