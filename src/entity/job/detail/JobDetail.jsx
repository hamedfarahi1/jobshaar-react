import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { useJobDetailStyles } from './styles';
import { Grid } from '@material-ui/core';
import { jobService } from '../../../core/services/job/jobService';
import { Typography } from "@material-ui/core";
import './styles.scss'
import { Chips } from './Chips';
import classNames from 'classnames/bind';
import { useMediaQuery } from 'react-responsive';

function JobDetail() {
	let { id } = useParams()
	const [job, setJob] = useState({})
	const classes = useJobDetailStyles()
	const shouldDecrese = useMediaQuery({ maxWidth: 500 })

	useEffect(() => {
		jobService.getJobById(id).then(res => {
			setJob(res.data);
		})
	}, [id])

	return (
		<div>
			<Paper elevation={3} className={'backImgAnimate'}>
				<Typography className={classes.title} variant='h5'>{job.title}</Typography>
			</Paper>
			<div className={classNames(classes.paper, { [classes.decresePadding]: shouldDecrese })}>
				<Grid container spacing={2}>
					<Grid className={classes.side} item xs={12} md={8}>
						<Paper className={classes.item} elevation={3}>
							<img className={classes.attache} alt='' src={require('../../../assest/attache-png-6.png')} />
							<Chips job={job} />
						</Paper>
					</Grid>
					<Grid className={classes.side} item xs={12} md={4}>
						<Paper className={classes.item} elevation={3}>
							{/* <img className={classes.attache} alt='' src={require('../../../assest/attache-png-6.png')} /> */}
						</Paper>
					</Grid>
				</Grid>

			</div>
		</div>
	)
}

export { JobDetail }