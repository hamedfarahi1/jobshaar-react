import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { useJobDetailStyles } from './styles';
import { Grid, Divider } from '@material-ui/core';
import { jobService } from '../../../core/services/job/jobService';
import { Typography } from "@material-ui/core";
import './styles.scss'
import { Chips } from './Chips';
import { useMediaQuery } from 'react-responsive';
import MyTextField from '../../../shared/component/my-text-field/MyTextField';
import { userFieldConstants } from '../../../core/_constants';
import { accountService } from '../../../core/services/account/accountService';
import clsx from 'clsx';


function JobDetail() {
	let { id } = useParams()
	const [job, setJob] = useState({})
	const classes = useJobDetailStyles()
	const shouldDecrese = useMediaQuery({ maxWidth: 500 })
	const [user, setUser] = useState({ username: '', email: '', roleTypeIndex: 1 })
	useEffect(() => {
		accountService.getUserInfo().then(res => setUser(res.data))
		jobService.getJobById(id).then(res => {
			setJob(res.data);
		})
	}, [id])

	function createMarkUp() {
		return { __html: job.description }
	}
	return (
		<div>
			<Paper elevation={3} className={'backImgAnimate'}>
				<Typography className={classes.title} variant='h5'>{job.title}</Typography>
			</Paper>
			<div className={clsx(classes.paper, { [classes.decresePadding]: shouldDecrese })}>
				<Grid container spacing={2}>
					<Grid className={classes.side} item xs={12} md={8}>
						<Paper className={classes.item} elevation={3}>
							<img className={classes.attache} alt='' src={require('../../../assest/attache-png-6.png')} />
							<Chips job={job} />
							<Divider />
							<div className={classes.description} dangerouslySetInnerHTML={createMarkUp()}></div>
						</Paper>
					</Grid>
					<Grid className={classes.side} item xs={12} md={4}>
						<Paper className={classes.item} elevation={3}>
							<div className={classes.userInfo}>
								<MyTextField
									className={classes.userInfoItem}
									style={{ textAlign: 'center' }}
									disabled
									value={user.username}
									label={userFieldConstants.USERNAME} />

								<MyTextField
									style={{ textAlign: 'center' }}
									className={classes.userInfoItem}
									disabled
									value={user.email}
									label={userFieldConstants.EMAIL} />
							</div>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}

export { JobDetail }
