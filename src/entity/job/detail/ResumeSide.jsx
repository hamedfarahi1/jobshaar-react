import React, { useState, useRef } from 'react';
import Paper from '@material-ui/core/Paper';
import { useJobDetailStyles } from './styles';
import { Grid, Button } from '@material-ui/core';
import { Typography } from "@material-ui/core";
import './styles.scss'
import MyTextField from '../../../shared/component/my-text-field/MyTextField';
import { userFieldConstants } from '../../../core/_constants';
import clsx from 'clsx';
import { userService } from '../../../core/services/user/userService';
import { ResumeDialog } from './ResumeDialog';
import { store } from '../../../core/_helpers';
import { uiActions } from '../../../core/_actions';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import FileSaver from 'file-saver';

function ResumeSide({
	user,
	resume,
	resumeExist,
	resumeApplied,
	job,
	setResume,
	setResumeExist,
	setResumeApplied,
	resumeFile,
	setResumeFile,
	resumeFileExist,
	setResumeFileExist
}) {

	const classes = useJobDetailStyles()

	const [resumeList, setResumeList] = useState([]);
	const [dialogState, setDialogState] = useState(false);
	const fileInputRef = useRef();
	const [uploadResumeType, setUploadResumeType] = useState('0');
	const handleToggleInputChange = (e, value) => {
		setUploadResumeType(value);
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

	const fileInputOnChange = (e) => {
		const f = e.target.files[0];
		if (('' + f.name).endsWith('pdf'))
			setResumeFile(f)
		else {
			store.dispatch(uiActions.errorSnackbar('پسوند فایل انتخابی باید pdf باشد'));
		}
	}

	function openFile() {
		userService.getResumeFile().then((res) => {
			const blobURL = URL.createObjectURL(res);
			FileSaver.saveAs(blobURL, 'resume.pdf');
			store.dispatch(uiActions.successSnackbar('رزومه با موفقیت دانلود شد'))
		},
			() =>
				store.dispatch(uiActions.errorSnackbar('خطا هنگام عملیات دانلود')))
	}

	function getSubmitButton() {
		return +user.roleTypeIndex === 0 ? 'مشاهده ی رزومه ها' :
			resumeApplied ? 'رزومه ارسال شده' : getResumeExistTitle()

		function getResumeExistTitle() {
			if (+user.roleTypeIndex === 0) return 'مشاهده ی رزومه ها'
			else if (!resumeExist && !resumeFileExist) return 'آپلود رزومه'
			else if (+uploadResumeType === 0)
				return resumeFileExist ? 'ارسال رزومه' : 'آپلود رزومه'
			else if (+uploadResumeType === 1)
				return resumeExist ? 'ارسال رزومه' : 'آپلود رزومه'
		}

	}

	function uploadResume() {
		+uploadResumeType === 1 ? userService.uploadResume(resume).then(() => {
			setResumeExist(true)
			store.dispatch(uiActions.successSnackbar('رزومه با موفقیت آپلود شد'));
		}) : uploadFile()

		function uploadFile() {
			const formData = new FormData();
			formData.append('file', resumeFile);
			userService.uploadResumeFile(formData).then(() => {
				setResumeFileExist(true)
				store.dispatch(uiActions.successSnackbar('رزومه با موفقیت آپلود شد'));
			})
		}
	}

	function getSubmitFunc() {
		if (+user.roleTypeIndex === 0) return getResumes;
		else if (!resumeExist && !resumeFileExist) return uploadResume
		else if (+uploadResumeType === 0)
			return resumeFileExist ? sendResume : uploadResume
		else if (+uploadResumeType === 1)
			return resumeExist ? sendResume : uploadResume
	}

	function sendResume() {
		userService.sendResume(job.id).then(() => {
			setResumeApplied(true);
			store.dispatch(uiActions.successSnackbar('رزومه با موفقیت ارسال شد'));
		})
	}
	return <>
		<ResumeDialog handleClose={() => setDialogState(false)} resumeList={resumeList} open={dialogState} />

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
							!(resumeExist || resumeFileExist) ?
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
										<Button onClick={!resumeFileExist ? selectFile : openFile} size='large' variant="contained" color="primary">
											{
												!resumeFileExist ? 'انتخاب فایل' : 'دانلود ی رزومه ارسالی'

											}
										</Button>
										<Typography style={{ marginTop: '8px', color: '#d46a1e' }}>
											{fileInputRef.current && fileInputRef.current.files[0] ? fileInputRef.current.files[0].name : ''}
										</Typography>
										<input
											onChange={fileInputOnChange}
											ref={fileInputRef} style={{ display: 'none' }} type='file' label='انتخاب فایل' placeholder='فایلی انتخاب نکردید' /></>
								}
							</div> : ''
					}

					<div className={classes.resumeSubmit}>
						<Button disabled={resumeApplied} onClick={getSubmitFunc()}
							size='large' variant="contained" color="secondary">
							{getSubmitButton()}
						</Button>
					</div>
				</div>
			</Paper>
		</Grid>
	</>
}

export { ResumeSide }