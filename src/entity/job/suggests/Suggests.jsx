import React, { useEffect, useState } from 'react';
import { List, ListItem, Typography, Paper, Grid } from '@material-ui/core';
import { jobService } from '../../../core/services/job/jobService';
import { Link } from 'react-router-dom';
import { useSuggestStyles } from './styles';
import { job } from '../../../core/_reducers/job.reducer';

function Suggests({ id, items }) {
	const [jobs, setJobs] = useState([]);
	const classes = useSuggestStyles()
	useEffect(() => {
		if (id)
			jobService.getSameJobById(id).then(res => {
				setJobs(res);
			})
	}, [id])

	function getArr() {
		return items ? items : jobs
	}
	return <Grid container spacing={2}>
		<Grid className={classes.side} item xs={12} md={8}>
			<div style={{display: 'none'}} className="hamed"></div>
			<div className={classes.root}>
				<Typography>
					شغل های مشابه
		</Typography>
				<List id="list">
					{ 
						getArr().map(item => {
							return <Link id="list-item" to={"/job/" + item.id}>
								<Paper className={classes.sameJobs} elevation={3}>
									<ListItem>
										<Typography>
											{item.title}
										</Typography>
									</ListItem>
								</Paper>

							</Link>
						})
					}
				</List>
			</div>
		</Grid>
	</Grid>
}

export { Suggests }