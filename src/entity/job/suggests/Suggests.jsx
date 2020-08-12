import React, { useEffect, useState } from 'react';
import { List, ListItem, Typography, Paper, Grid } from '@material-ui/core';
import { jobService } from '../../../core/services/job/jobService';
import { Link } from 'react-router-dom';
import { useSuggestStyles } from './styles';

function Suggests({ id }) {

	const [jobs, setJobs] = useState([]);
	const classes = useSuggestStyles()
	useEffect(() => {
		if (id)
			jobService.getSameJobById(id).then(res => {
				setJobs(res);
			})
	}, [id])
	return <Grid container spacing={2}>
		<Grid className={classes.side} item xs={12} md={8}>
			<div className={classes.root}>
				<Typography>
					شغل های مشابه
		</Typography>
				<List>
					{
						jobs.map(item => {
							return <Link to={"/job/" + item.id}>
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