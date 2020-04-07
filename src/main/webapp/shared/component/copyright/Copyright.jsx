import React from 'react'
import Typography from '@material-ui/core/Typography';
import {
	Link
} from "react-router-dom";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" to="#" >
				Hamed Farahi
      </Link>{' '}
			{new Date().getFullYear()}
		</Typography>
	);
}

export default Copyright