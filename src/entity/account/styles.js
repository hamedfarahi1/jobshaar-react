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
	loginForm: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	registerForm: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	allowExtraEmails: {
		fontSize: 'small'
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	rememberMe: {
		fontSize: 'small'
	},
	buttonGroupe: {
		float: 'right'
	}
}));
