import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { useJobDetailStyles } from './styles';
import { Grid } from '@material-ui/core';
import { jobService } from '../../../core/services/job/jobService';

function JobDetail() {
	let { id } = useParams()
	useEffect(() => {
		jobService.getJobById(id).then(res => {
			console.log(res);
		})
	}, [id])
	const classes = useJobDetailStyles()
	return (
		<div className={classes.paper}>
			<Grid container spacing={2}>
				<Grid className={classes.side} item xs={12} md={8}>
					<Paper className={classes.item} elevation={3}>

					</Paper>
				</Grid>
				<Grid className={classes.side} item xs={12} md={4}>
					<Paper className={classes.item} elevation={3}>

					</Paper>
				</Grid>
			</Grid>

		</div>
	)
}

export { JobDetail }