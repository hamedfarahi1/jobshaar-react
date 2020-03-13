import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { useJobDetailStyles } from './styles';
import { Grid, Divider, Button } from '@material-ui/core';
import { jobService } from '../../../core/services/job/jobService';
import { Typography } from "@material-ui/core";
import './styles.scss'
import { Chips } from './Chips';
import { useMediaQuery } from 'react-responsive';
import MyTextField from '../../../shared/component/my-text-field/MyTextField';
import { userFieldConstants } from '../../../core/_constants';
import { accountService } from '../../../core/services/account/accountService';
import clsx from 'clsx';
import { userService } from '../../../core/services/user/userService';


function JobDetail() {
	let { id } = useParams()
	const [job, setJob] = useState({})
	const classes = useJobDetailStyles()
	const shouldDecrese = useMediaQuery({ maxWidth: 500 })
	const [user, setUser] = useState({ username: '', email: '', roleTypeIndex: 1 })
	const [resume, setResume] = useState('')
	const [resumeExist, setResumeExist] = useState(false);
	const [resumeApplied, setResumeApplied] = useState(false);

	useEffect(() => {
		accountService.getUserInfo().then(res => setUser(res))
		jobService.getJobById(id).then(res => {
			setJob(res);
			userService.isAppliedResume(res.id).then((rs) => setResumeApplied(rs))
		})
		userService.getResume().then(res => {
			if (res.url) {
				setResume(res.url)
				setResumeExist(true)
			}
		})
	}, [id])

	const handleInputChange = e => {
		const { value } = e.target
		setResume(value)
	}

	function uploadResume() {
		userService.uploadResume(resume).then(() => setResumeExist(true))
	}

	function sendResume() {
		userService.sendResume(job.id).then(() => setResumeApplied(true))
	}
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
							<div>
								<Typography className={classes.resumeTitle}>رزومه</Typography>
								{
									!resumeExist ? <Typography className={classes.resumeAlert}>
										شما برای ما رزومه ای ارسال نکرده اید، لطفا آدرس فایل رزومه ی خود را در کادر زیر وارد کنید
									</Typography> : ''
								}
								<MyTextField
									onChange={handleInputChange}
									style={{ textAlign: 'center' }}
									value={resume}
									disabled={resumeExist}
									label={'رزومه'} />
								<div className={classes.resumeSubmit}>
									<Button disabled={resumeApplied} onClick={resumeExist ? sendResume : uploadResume} size='large' variant="contained" color="primary">
										{resumeApplied ? 'رزومه ارسال شده' : resumeExist ? 'ارسال رزومه' : 'آپلود رزومه'}
									</Button>
								</div>
							</div>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}

export { JobDetail }
