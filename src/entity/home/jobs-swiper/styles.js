import { makeStyles } from '@material-ui/core';

export const useJobsSwiperStyles = makeStyles((theme) => ({
	grid: {
		display: 'grid',
		width: '100%',
		minHeight: '110px',
		marginBottom: theme.spacing(3)
	}
}))