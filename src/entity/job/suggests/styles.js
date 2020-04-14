import { makeStyles } from '@material-ui/core';

export const useSuggestStyles = makeStyles((theme) => ({
	root: {
		'& a': {
			textDecoration: 'none'
		}
	},
	side: {
		marginTop: theme.spacing(4),
		width: '100%',
	},
	sameJobs: {
		width: '100%',
		padding: theme.spacing(2)
	},
}))