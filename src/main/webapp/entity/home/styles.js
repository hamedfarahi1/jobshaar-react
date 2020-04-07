import { makeStyles } from '@material-ui/core/styles';

export const useCardStyles = makeStyles(theme => ({
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
		backgroundSize: '40%',
		margin: 'auto'
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