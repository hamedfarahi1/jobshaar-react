import React, { useEffect, useState } from 'react';
import { Grid, Container, LinearProgress } from '@material-ui/core';
import { MyCard } from './MyCard';
import { useJobsGridStyles } from '../styles';
import Pagination from '@material-ui/lab/Pagination';
import { jobActions } from '../../../core/_actions';
import { connect } from 'react-redux';


function JobsGrid(props) {

	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);

	useEffect(() => {
		setTimeout(() => getJobs(page), 500);
		// eslint-disable-next-line
	}, [page]);

	const classes = useJobsGridStyles();
	const [jobs, setJobs] = useState([]);

	const getJobs = (pageIndex) => {
		props.getJobs(+pageIndex - 1, 12, []).then(res => {
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
	if (props.gettingJobs)
		return <Container>
			<LinearProgress />
		</Container>
	return (
		<Container classes={{
			root: classes.root
		}} >
			<MyGrid />
			<div className={classes.paginatorContainer}>
				<Pagination onChange={handleChange} size="large" className={classes.paginator} count={pageCount} color="secondary" />
			</div>
		</Container>
	);
}
function mapState(state) {
	const { gettingJobs } = state.job;
	return { gettingJobs }
}
const actionCreators = {
	getJobs: jobActions.getJobs
}

const connectedJobsGridPage = connect(mapState, actionCreators)(JobsGrid)

export { connectedJobsGridPage as JobsGrid };
