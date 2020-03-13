import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { jobService } from '../../../core/services/job/jobService';
import { MyCard } from './MyCard';
import { useJobsGridStyles } from '../styles';

function JobsGrid() {

	useEffect(() => {
		getJobs();
	}, []);

	const classes = useJobsGridStyles();
	const [jobs, setJobs] = useState([]);


	const getJobs = () => {
		jobService.getJobs(0, 12, []).then(res => res ? setJobs(res) : null);
	}


	function Item(props) {
		return (
			<Grid className={classes.item} item xs={12} sm={6} md={4}>
				<MyCard item={props.item}></MyCard>
			</Grid>)
	}

	function MyGrid() {
		return (
			<Grid container spacing={2}>
				{
					jobs.map(item => <Item key={item.id} item={item}></Item>)
				}
			</Grid>
		)
	}

	return (
		<MyGrid />
	);
}

export { JobsGrid };
