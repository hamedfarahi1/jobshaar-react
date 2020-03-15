import React, { useEffect } from 'react';
import { Paper, Grid, Select, InputLabel, FormControl, MenuItem, Typography, Button } from '@material-ui/core';
import { useAddJobStyles } from './styles'
import MyTextField from '../../../shared/component/my-text-field/MyTextField';
import { useRef } from 'react';
import { useState } from 'react';
import { jobKeyValues } from '../../../shared/key-value/job-key-value'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { jobService } from '../../../core/services/job/jobService';
import './styles.scss'
import { history, store } from '../../../core/_helpers';
import { uiActions } from '../../../core/_actions';

function AddJob() {
	const classes = useAddJobStyles()

	const [values, setValues] = useState({
		title: '',
		categoryTypeIndex: '0',
		cooperationTypeIndex: '0',
		requiredGenderTypeIndex: '0',
		description: ''
	})

	const [editorState, setEditorState] = useState(
		EditorState.createWithContent(
			ContentState.createFromBlockArray(
				convertFromHTML('<p>متن معرفی شغل و شرکت خود را وارد کنید ...</p>')
			)
		),
	);
	const [jobKeyValue] = useState(jobKeyValues)
	const inputLabel = useRef(null);
	const [labelWidth, setLabelWidth] = useState(0);
	useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	const handleEditorChange = (content) => {
		let editorSourceHTML = draftToHtml(convertToRaw(content.getCurrentContent()));
		setValues({ ...values, description: editorSourceHTML })
		setEditorState(content)

	}

	const handleInputChange = e => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}

	const isNotValidForm = () => {
		const { description, title } = values;
		return (!description || !title) || description.length <= 500;
	}

	const addJob = () => {
		if (!isNotValidForm())
			jobService.addJob(values).then((res) => {
				store.dispatch(uiActions.successSnackbar('عملیات ثبت شغل با موفقیت انجام شد'));
				history.push('/job/' + res.id);
			})
	}

	function MySelect({ name, value, label, list }) {
		return <FormControl fullWidth variant="outlined">
			<InputLabel ref={inputLabel} id="select-outlined-label">
				{label}
			</InputLabel>
			<Select
				labelId="select-outlined-label"
				id="select-outlined"
				name={name}
				value={value}
				onChange={handleInputChange}
				labelWidth={labelWidth}
			>
				{Object.keys(list).map(
					key => <MenuItem key={key} value={key}>{list[key]}</MenuItem>
				)}
			</Select>
		</FormControl>
	}
	return (
		<div className={classes.container}>
			<Paper className={classes.paper}>
				<Grid container spacing={3}>
					<Grid item sm={6} xs={12} md={6}>
						<MyTextField onChange={handleInputChange} value={values.title} field={'title'} label={'عنوان'}></MyTextField>
					</Grid>
					<Grid item sm={6} xs={12} md={6}>
						<MySelect name={'categoryTypeIndex'} value={values.categoryTypeIndex} label={'دسته شغلی'} list={jobKeyValue.jobCategoryObj} />
					</Grid>
					<Grid item sm={6} xs={12} md={6}>
						<MySelect name={'requiredGenderTypeIndex'} value={values.requiredGenderTypeIndex} label={'جنسیت'} list={jobKeyValue.genderObj} />
					</Grid>
					<Grid item sm={6} xs={12} md={6}>
						<MySelect name={'cooperationTypeIndex'} value={values.cooperationTypeIndex} label={'تایم کاری'} list={jobKeyValue.cooperationTypeObj} />
					</Grid>
					<Typography className={classes.editorTitle}>در ویرایشگر متنی زیر زیر اطلاعات مربوطه به شغل مورد نظر و شرکت خود را وارد نمایید</Typography>
					<Grid className={classes.editor} item sm={12} xs={12} md={12}>
						<Editor
							toolbar={
								{
									options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'history']
								}}
							defaultEditorState={editorState}
							toolbarClassName="toolbarClassName"
							wrapperClassName="wrapperClassName"
							editorClassName="editorClassName"
							onEditorStateChange={handleEditorChange}
						/>
					</Grid>
					<Grid item sm={12} xs={12} md={12}>
						<Button disabled={isNotValidForm()} variant="contained" onClick={addJob}>ثبت شغل</Button>
					</Grid>
				</Grid>
			</Paper>
		</div>
	)
}

export { AddJob }