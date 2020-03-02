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
	}
}));

export const useHomeStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	item: {
		width: '100%',
	}
}));