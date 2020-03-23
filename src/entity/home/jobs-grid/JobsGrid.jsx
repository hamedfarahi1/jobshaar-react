import React, { useEffect, useState } from 'react';
import { Grid, Container } from '@material-ui/core';
import { jobService } from '../../../core/services/job/jobService';
import { MyCard } from './MyCard';
import { useJobsGridStyles } from '../styles';
import Pagination from '@material-ui/lab/Pagination';


function JobsGrid() {

	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);

	useEffect(() => {
		setTimeout(() => getJobs(page), 500);
	}, [page]);

	const classes = useJobsGridStyles();
	const [jobs, setJobs] = useState([]);


	const getJobs = (pageIndex) => {
		jobService.getJobs(+pageIndex - 1, 12, []).then(res => {
			setJobs(res.data);
			const getPageCount = (e) => e % 12 === 0 ? parseInt(e / 12) : parseInt(e / 12) + 1
			setPageCount(getPageCount(res.totalCount));
		});
	}

	const handleChange = (event, value) => {
		setPage(value)
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
		<Container>
			<MyGrid />
			<div className={classes.paginatorContainer}>
				<Pagination onChange={handleChange} size="large" className={classes.paginator} count={pageCount} color="secondary" />
			</div>
		</Container>
	);
}

export { JobsGrid };
