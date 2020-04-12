import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { useJobDetailStyles } from './styles';
import { Grid, Divider, Button } from '@material-ui/core';
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
import { uiActions, jobActions } from '../../../core/_actions';
import { connect } from 'react-redux';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';


function JobDetail(props) {
	const { id } = useParams()
	const [job, setJob] = useState({})
	const classes = useJobDetailStyles()
	const shouldDecrese = useMediaQuery({ maxWidth: 500 })
	const [user, setUser] = useState({ username: '', email: '', roleTypeIndex: 1 })
	const [resume, setResume] = useState('')
	const [resumeExist, setResumeExist] = useState(false);
	const [resumeApplied, setResumeApplied] = useState(false);
	const [resumeList, setResumeList] = useState([]);
	const [dialogState, setDialogState] = useState(false);
	const fileInputRef = useRef();

	useEffect(() => {
		accountService.getUserInfo().then(usr => {
			setUser(usr)
			if (+usr.roleTypeIndex === 1) {
				getResume()
			}
			props.get(id).then(res => {
				setJob(res);
				if (+usr.roleTypeIndex === 1) userService.isAppliedResume(res.id).then((rs) => setResumeApplied(rs))
			})
		})
		return () => {
			setResume('');
			setUser({ username: '', email: '', roleTypeIndex: 1 });
			setJob({})
		}
		// eslint-disable-next-line
	}, [id])


	const [uploadResumeType, setUploadResumeType] = useState('0');
	const handleToggleInputChange = (e, value) => {
		setUploadResumeType(value);
	}

	function getResume() {
		userService.getResume().then(res => {
			if (res.url) {
				setResume(res.url)
				setResumeExist(true)
			}
		})
	}

	function selectFile() {
		fileInputRef.current.click();
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
		// this is bug
		// fix it later
		return { __html: ('' + job.description).split('&nbsp;').join('') }
	}
	return (
		<div className={props.gettingJob && 'getting-job'}>
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
							<div style={{ textAlign: 'center' }}>
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
								<ToggleButtonGroup value={uploadResumeType} exclusive onChange={handleToggleInputChange} style={{ width: '86%' }}>
									<ToggleButton style={{ width: '50%' }} key='0' value='0'>انتخاب فایل</ToggleButton>
									<ToggleButton style={{ width: '50%' }} key='1' value='1'>وارد کردن آدرس</ToggleButton>
								</ToggleButtonGroup>
								{
									+user.roleTypeIndex === 1 ?
										<div className={classes.resumeSubmit}>
											{+uploadResumeType === 1 ? <MyTextField
												onChange={handleInputChange}
												style={{ textAlign: 'center' }}
												value={resume}
												disabled={resumeExist}
												label={'رزومه'} /> :
												<>
													<Button onClick={selectFile} size='large' variant="contained" color="primary">
														انتخاب فایل
												</Button>
													<input ref={fileInputRef} style={{ display: 'none' }} type='file' label='انتخاب فایل' placeholder='فایلی انتخاب نکردید' /></>
											}
										</div> : ''
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

function mapState(state) {
	const { gettingJob } = state.job;
	return { gettingJob }
}

const jobCreators = {
	get: jobActions.getJobById
}

const connectedJobDetailsPage = connect(mapState, jobCreators)(JobDetail)
export { connectedJobDetailsPage as JobDetail }
