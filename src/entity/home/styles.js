import { makeStyles } from '@material-ui/core/styles';

export const useCardStyles = makeStyles(theme => ({
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
		margin: 'auto',
		backgroundSize: '40% !important'
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	root: {
		'& a': {
			textDecoration: 'none',
			color: '#4c4c4c'
		}
	}
}));

export const useHomeStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(5),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	}
}));

export const useJobsGridStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		boxSizing: 'border-box',
		marginRight: 'auto',
		marginLeft: 'auto',
		marginTop: '24px'
	},
	rootMobile: {
		paddingRight: '0',
		paddingLeft: '0'
	},
	item: {
		width: '100%',
	},
	paginator: {
		direction: 'rtl',
		margin: 'auto'
	},
	paginatorContainer: {
		display: 'flex',
		marginTop: theme.spacing(5)
	}
}))

export const useJobsFilterStyles = makeStyles((theme) => ({
	mobile: {
		marginRight: '-16px !important',
		marginLeft: '-16px !important'
	},
	textField: {
		marginBottom: '32px'
	},
	setFixed: {
		position: 'fixed',
		zIndex: 10,
		marginTop: '-330px'
	},
	setFixedMobile: {
		position: 'fixed',
		zIndex: 10,
		marginTop: '-40px'
	}
}))