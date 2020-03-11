import React from 'react'
import { userFooterStyles } from '../styles'

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
		</div>
	</div>
}

export { Footer }