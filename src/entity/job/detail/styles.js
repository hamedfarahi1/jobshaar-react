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
		fontSize: 'calc(2vw + 10px)',
		color: theme.palette.primary.main,
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
	},
	companyInfoItem: {
		paddingLeft: '50px',
		fontSize: 'small',
		fontWeight: '500',
	},
	companyAddress: {
		marginBottom: '16px'
	},
	companyInfo: {
		padding: '12px',
		fontSize: 'medium',
		fontWeight: '500'
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

export const useResumeDialogStyle = makeStyles((theme) => ({
	title: {
		backgroundColor: theme.palette.primary.main,
		color: 'white',
		textAlign: 'center'
	}
}))
