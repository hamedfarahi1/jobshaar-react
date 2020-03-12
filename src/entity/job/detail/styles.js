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
		height: '600px',
		margin: 'auto',
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(8)
	},
	item: {
		width: '100%',
		height: '100%',
		padding: theme.spacing(2)
	}
}));