import React from 'react';
import { Dialog, DialogTitle, List, ListItem } from '@material-ui/core';

function ResumeDialog(props) {
	const { resumeList, open, handleClose } = props
	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>لیست رزومه های ارسالی</DialogTitle>
			<List>
				{
					resumeList.map(resume => (
						<ListItem key={resume.id}>
							{resume.url}
						</ListItem>
					))
				}
			</List>
		</Dialog>
	)
}

export { ResumeDialog }