import { makeStyles } from '@material-ui/core';

export const useAddJobStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	paper: {
		width: '65%',
		margin: '4rem 4rem',
		minHeight: '35rem',
		padding: '4rem'
	},
	editor: {
		boxShadow: '0px 1px 2px 0px grey',
		margin: '12px',
		direction: 'rtl'
	}
}))