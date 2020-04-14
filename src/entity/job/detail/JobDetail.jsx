import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { useJobDetailStyles } from './styles';
import { Grid, Divider } from '@material-ui/core';
import { Typography } from "@material-ui/core";
import './styles.scss'
import { Chips } from './Chips';
import { useMediaQuery } from 'react-responsive';
import { accountService } from '../../../core/services/account/accountService';
import clsx from 'clsx';
import { userService } from '../../../core/services/user/userService';
import { jobActions } from '../../../core/_actions';
import { connect } from 'react-redux';
import { ResumeSide } from './ResumeSide';
import { Suggests } from '../suggests/Suggests';


function JobDetail(props) {
	const { id } = useParams()
	const [job, setJob] = useState({})
	const classes = useJobDetailStyles()
	const shouldDecrese = useMediaQuery({ maxWidth: 500 })
	const [user, setUser] = useState({ username: '', email: '', roleTypeIndex: 1 })
	const [resume, setResume] = useState('')
	const [resumeExist, setResumeExist] = useState(false);
	const [resumeFile, setResumeFile] = useState(null)
	const [resumeFileExist, setResumeFileExist] = useState(false);
	const [resumeApplied, setResumeApplied] = useState(false);
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

	function getResume() {
		userService.getResume().then(res => {
			if (res.url) {
				setResume(res.url)
				setResumeExist(true)
			}
			if (res.uuid) {
				setResumeFileExist(true)
			}
		});
	}

	function createMarkUp() {
		// this is bug
		// fix it later
		return { __html: ('' + job.description).split('&nbsp;').join('') }
	}
	return (
		<div className={props.gettingJob && 'getting-job'}>
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
					<ResumeSide
						user={user}
						resume={resume}
						resumeExist={resumeExist}
						resumeFile={resumeFile}
						resumeFileExist={resumeFileExist}
						resumeApplied={resumeApplied}
						job={job}
						setResume={setResume}
						setResumeExist={setResumeExist}
						setResumeFile={setResumeFile}
						setResumeFileExist={setResumeFileExist}
						setResumeApplied={setResumeApplied}
					/>
				</Grid>

				<Suggests id={job.id} />

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
