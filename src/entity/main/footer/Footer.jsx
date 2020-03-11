import React from 'react'
import { userFooterStyles } from '../styles'
import { Box } from '@material-ui/core'
import Copyright from '../../../shared/component/copyright/Copyright'

function Footer() {

	const classes = userFooterStyles()

	return <div className={classes.footer}>
		<div className={classes.footerContainer}>
			<p className={classes.title}>University Job Community Service</p>
			<div className={classes.links}>
				<span>Repository</span>
				<span>Repository</span>
				<span>Repository</span>
				<span>Repository</span>
				<span>Repository</span>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</div>
	</div>
}

export { Footer }