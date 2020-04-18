import React from 'react';
import { Container, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Grid, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useJobsFilterStyles } from '../../entity/home/styles';
import MyTextField from '../component/my-text-field/MyTextField';

function CrawlerJobsFilter({ handleSearch, handleFilterChange, values }) {

	const classes = useJobsFilterStyles();
	// const [jobKeyValue] = useState(jobKeyValues)
	const { keywords, locations, job_categories } = values
	// const { keywords, locations, job_categories, sort } = values
	// const inputLabel = useRef(null);
	// const [labelWidth, setLabelWidth] = useState(0);
	// useEffect(() => {
	// 	setLabelWidth(inputLabel.current.offsetWidth);
	// }, []);

	// function MySelect({ name, value, label, list }) {
	// 	return <FormControl fullWidth variant="outlined">
	// 		<InputLabel ref={inputLabel} id="select-outlined-label">
	// 			{label}
	// 		</InputLabel>
	// 		<Select
	// 			variant="standard"
	// 			color='secondary'
	// 			labelId="select-outlined-label"
	// 			id="select-outlined"
	// 			name={name}
	// 			value={value}
	// 			onChange={handleFilterChange}
	// 			labelWidth={labelWidth}
	// 			displayEmpty
	// 		>
	// 			{Object.keys(list).map(
	// 				key => <MenuItem key={key} value={list[key]}>{list[key]}</MenuItem>
	// 			)}
	// 		</Select>
	// 	</FormControl>
	// }

	return <Container>
		<ExpansionPanel style={{ marginTop: '40px' }}>
			<ExpansionPanelSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography >فیلتر ها</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Grid container spacing={1}>
					<Grid item sm={12} xs={12} md={6}>
						<MyTextField autoFocus={true} className={classes.textField} onChange={handleFilterChange} value={keywords} field={'keywords'} placeholder={'جاوا، پایتون'} label={'... عنوان شغل'}></MyTextField>
					</Grid>
					<Grid item sm={12} xs={12} md={6}>
						<MyTextField autoFocus={true} className={classes.textField} onChange={handleFilterChange} value={locations} field={'locations'} placeholder={'تهران، مشهد'} label={' ...  نام شهر، نام استان'}></MyTextField>
					</Grid>
					<Grid item sm={12} xs={12} md={6}>
						<MyTextField autoFocus={true} className={classes.textField} onChange={handleFilterChange} value={job_categories} field={'job_categories'} placeholder={'طراحی، مدیریت'} label={' ... دسته بندی     '}></MyTextField>
					</Grid>
					{/* <Grid item sm={6} xs={12} md={4}>
						<MySelect name={'locations'} value={locations} label={'دسته شغلی'} list={jobKeyValue.jobCategoryObj} />
					</Grid>
					<Grid item sm={6} xs={12} md={4}>
						<MySelect name={'job_categories'} value={job_categories} label={'جنسیت'} list={jobKeyValue.genderObj} />
					</Grid>
					<Grid item sm={6} xs={12} md={4}>
						<MySelect name={'sort'} value={sort} label={'تایم کاری'} list={jobKeyValue.cooperationTypeObj} />
					</Grid> */}
					<Grid item sm={12} xs={12} md={12}>
						<Button size='large' variant="contained" color='primary' onClick={handleSearch}>
							جست و جو
					</Button>
					</Grid>
				</Grid>

			</ExpansionPanelDetails>
		</ExpansionPanel >

	</Container >
}

export { CrawlerJobsFilter };