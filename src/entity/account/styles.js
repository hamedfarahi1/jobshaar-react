import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
	container: {
		marginTop: '50px',
		'& a': {
			textDecoration: 'none',
			color: '#3f51b5'
		}
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: '24px 0 16px !important',
	},
	checkBox: {
		fontSize: 'small !important'
	},
	buttonGroupe: {
		float: 'right',
	}
}));
