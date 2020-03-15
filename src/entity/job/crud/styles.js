import { makeStyles } from '@material-ui/core';

export const useAddJobStyles = makeStyles((theme) => ({
	container: {
		// display: 'flex',
		// justifyContent: 'space-between'
	},
	paper: {
		minHeight: '35rem',
		padding: '4rem'
	},
	editor: {
		boxShadow: '0px 1px 2px 0px grey',
		margin: '12px',
		minHeight: '20rem'
	},
	editorTitle: {
		padding: '20px',
		fontSize: 'calc(1vw + 3px)',
		color: '#508cef'
	}
}))