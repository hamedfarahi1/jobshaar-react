import React, { useRef, useState, useEffect } from 'react';
import { Icon, Container, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Grid, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useMediaQuery } from 'react-responsive';
import { useJobsFilterStyles } from '../styles'
import MyTextField from '../../../shared/component/my-text-field/MyTextField';
import { jobKeyValues } from '../../../shared/key-value/job-key-value';
function JobsFilter(props) {

	const classes = useJobsFilterStyles();
	const isMobile = useMediaQuery({ maxWidth: 500 })
	const [scrolled, setScrolled] = useState(false)
	const [expand, setExpand] = useState(false);
	const [jobKeyValue] = useState(jobKeyValues)

	const inputLabel = useRef(null);
	const [labelWidth, setLabelWidth] = useState(0);
	useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
		window.onscroll = () => {
			if (props.resultCount > 3) {
				if ((isMobile && window.pageYOffset > 160) || window.pageYOffset > 620)
					expandPanel();
				setScrolled(props.resultCount > 3 &&
					((isMobile && window.pageYOffset > 140) || window.pageYOffset > 600))
			}
			else setScrolled(false)

		}
	}, [isMobile, props.resultCount]);

	function expandPanel() {
		setTimeout(setExpand(false), 2000)
	}
	function MySelect({ name, value, label, list }) {
		return <FormControl fullWidth variant="outlined">
			<InputLabel ref={inputLabel} id="select-outlined-label">
				{label}
			</InputLabel>
			<Select
				variant="standard"
				color='secondary'
				labelId="select-outlined-label"
				id="select-outlined"
				name={name}
				value={value}
				onChange={props.handleFilterChange}
				labelWidth={labelWidth}
				displayEmpty
			>
				<MenuItem value={-1}>انتخاب همه</MenuItem>
				{Object.keys(list).map(
					key => <MenuItem key={key} value={key}>{list[key]}</MenuItem>
				)}
			</Select>
		</FormControl>
	}

	return <Container id="container-filter" className={scrolled && isMobile ? classes.setFixedMobile : scrolled ? classes.setFixed : ''}>
		<Grid container justify="space-around">
			<Grid item xs="11">
				<ExpansionPanel expanded={expand} onChange={(e, exp) => setExpand(exp)} className={
					isMobile ? classes.mobile : ''
				}>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography >فیلتر ها</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Grid container spacing={3}>
							<Grid item sm={12} xs={12} md={12}>
								<MyTextField disabled autoFocus={true} className={classes.textField} onChange={''
									// props.handleFilterChange
								} value={props.values.title} field={'title'} placeholder={' ... عنوان شغل، نام شهر، نام استان'} label={'جستجو'}></MyTextField>
							</Grid>
							<Grid item sm={6} xs={12} md={4}>
								<MySelect name={'categoryTypeIndex'} value={props.values.categoryTypeIndex} label={'دسته شغلی'} list={jobKeyValue.jobCategoryObj} />
							</Grid>
							<Grid item sm={6} xs={12} md={4}>
								<MySelect name={'requiredGenderTypeIndex'} value={props.values.requiredGenderTypeIndex} label={'جنسیت'} list={jobKeyValue.genderObj} />
							</Grid>
							<Grid item sm={6} xs={12} md={4}>
								<MySelect name={'cooperationTypeIndex'} value={props.values.cooperationTypeIndex} label={'تایم کاری'} list={jobKeyValue.cooperationTypeObj} />
							</Grid>
						</Grid>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</Grid>
			<Grid style={{
				textAlign: 'center',
				margin: 'auto'
			}} item xs="1">
				<Button onClick={props.refresh}>
					<Icon>refresh
				</Icon>
				</Button>
			</Grid>
		</Grid>
	</Container>
}

export { JobsFilter };