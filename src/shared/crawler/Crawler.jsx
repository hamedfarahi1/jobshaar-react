import React, { useState } from 'react';
import { useEffect } from 'react';
import { crawlService } from './crawlerService';
import { CrawlerJobsFilter } from './CrawlerJobsFilter'
import { Pagination } from '@material-ui/lab';
import { useJobsGridStyles } from '../../entity/home/styles';
import { Grid, Link, Typography, Container, LinearProgress } from '@material-ui/core';
function Crawler() {

	const classes = useJobsGridStyles();

	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);
	const [gettingJobs, setGettingJobs] = useState(false)
	const [values, setValues] = useState({
		keywords: '',
		locations: '',
		job_categories: '',
		sort: 'relevance_desc',
	})

	const handleChange = (event, value) => {
		setPage(value)
		getJobs(value);
	}
	const handleFilterChange = e => {
		const { name, value } = e.target
		if (value === -1 && values[name] === '')
			return
		setValues({ ...values, [name]: value })
	}
	const [jobs, setJobs] = useState([]);
	useEffect(() => {
		setTimeout(() => getJobs(values, page), 1000);
		// eslint-disable-next-line
	}, [])


	const getJobs = (pag) => {
		setGettingJobs(true)
		crawlService.getJobs({ ...values, page: pag ? pag : page }).then(res => {

			setJobs(res.data.data);
			const getPageCount = (e) => e % 20 === 0 ? parseInt(e / 20) : parseInt(e / 20) + 1
			setPageCount(getPageCount(res.data.totalCount));
			setGettingJobs(false);
		},
			() => setGettingJobs(false))
	}

	const search = (pag) => {
		getJobs(pag)
	}
	return <>
		<CrawlerJobsFilter handleSearch={search} values={values} handleFilterChange={handleFilterChange} />
		{
			gettingJobs && <Container>
				<LinearProgress />
			</Container>
		}
		<Container>
			<Grid container spacing={2}>
				{
					jobs.map(({ title, href }) => {
						return <Grid item sm={12} xs={12} md={12}>
							<Link href={href} target="_blank">
								<Typography>{title}</Typography>
							</Link>
						</Grid>
					})
				}
			</Grid>
		</Container>

		<div className={classes.paginatorContainer}>

			<Pagination onChange={handleChange} size="large" className={classes.paginator} count={pageCount} color="secondary" />
		</div>

	</>
}


export { Crawler }