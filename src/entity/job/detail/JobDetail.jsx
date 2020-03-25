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
import { ResumeDialog } from './ResumeDialog';
import { store } from '../../../core/_helpers';
import { uiActions } from '../../../core/_actions';


function JobDetail() {
	let { id } = useParams()
	const [job, setJob] = useState({})
	const classes = useJobDetailStyles()
	const shouldDecrese = useMediaQuery({ maxWidth: 500 })
	const [user, setUser] = useState({ username: '', email: '', roleTypeIndex: 1 })
	const [resume, setResume] = useState('')
	const [resumeExist, setResumeExist] = useState(false);
	const [resumeApplied, setResumeApplied] = useState(false);
	const [resumeList, setResumeList] = useState([]);
	const [dialogState, setDialogState] = useState(false);

	useEffect(() => {
		accountService.getUserInfo().then(usr => {
			setUser(usr)
			if (+usr.roleTypeIndex === 1) {
				getResume()
			}
			jobService.getJobById(id).then(res => {
				setJob(res);
				if (+usr.roleTypeIndex === 1) userService.isAppliedResume(res.id).then((rs) => setResumeApplied(rs))
			})
		})
		return () => {
			setResume('');
			setUser({ username: '', email: '', roleTypeIndex: 1 });
			setJob({})
		}
	}, [id])

	function getResume() {
		userService.getResume().then(res => {
			if (res.url) {
				setResume(res.url)
				setResumeExist(true)
			}
		})
	}

	function getResumes() {
		userService.getResumes(job.id).then(res => setResumeList(res))
		setDialogState(true)
	}
	const handleInputChange = e => {
		const { value } = e.target
		setResume(value)
	}

	function uploadResume() {
		userService.uploadResume(resume).then(() => {
			setResumeExist(true)
			store.dispatch(uiActions.successSnackbar('رزومه با موفقیت آپلود شد'));
		})
	}

	function sendResume() {
		userService.sendResume(job.id).then(() => {
			setResumeApplied(true);
			store.dispatch(uiActions.successSnackbar('رزومه با موفقیت ارسال شد'));
		})
	}
	function createMarkUp() {
		return { __html: job.description }
	}
	return (
		<div>
			<ResumeDialog handleClose={() => setDialogState(false)} resumeList={resumeList} open={dialogState} />
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
							<Typography className={classes.companyInfo}>
								{'اطلاعات شرکت'}
							</Typography>
							<Typography className={classes.companyInfoItem}>
								{'بیو: '}
								{job.id ? job.company.bio : ''}
							</Typography>
							<Typography className={clsx(classes.companyInfoItem, classes.companyAddress)}>
								{'آدرس: '}
								{job.id ? job.company.address : ''}
							</Typography>
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
									+user.roleTypeIndex === 0 ?
										<Typography className={clsx(classes.resumeMessage, classes.resumesShow)}>
											برای مشاهده ی رزومه ها بر روی دکمه ی زیر کلیک کنید
									</Typography> :
										!resumeExist ?
											<Typography className={clsx(classes.resumeMessage, classes.resumeAlert)}>
												شما برای ما رزومه ای ارسال نکرده اید، لطفا آدرس فایل رزومه ی خود را در کادر زیر وارد کنید
									</Typography> : ''
								}
								{
									+user.roleTypeIndex === 1 ?
										<MyTextField
											onChange={handleInputChange}
											style={{ textAlign: 'center' }}
											value={resume}
											disabled={resumeExist}
											label={'رزومه'} /> : ''
								}
								<div className={classes.resumeSubmit}>
									<Button disabled={resumeApplied} onClick={+user.roleTypeIndex === 0 ? getResumes : resumeExist ? sendResume : uploadResume} size='large' variant="contained" color="secondary">
										{
											+user.roleTypeIndex === 0 ? 'مشاهده ی رزومه ها' :
												resumeApplied ? 'رزومه ارسال شده' :
													resumeExist ? 'ارسال رزومه' : 'آپلود رزومه'}
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
