import React from 'react';
import { Dialog, TableHead, TableContainer, Table, TableRow, TableCell, TableBody, withStyles, Button, DialogTitle, Typography } from '@material-ui/core';
import { useResumeDialogStyle } from './styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { userService } from '../../../core/services/user/userService';
import FileSaver from 'file-saver';
import { store } from '../../../core/_helpers';
import { uiActions } from '../../../core/_actions';

const StyledDialog = withStyles(() => ({
	paperWidthSm: {
		maxWidth: '700px'
	}
}))(Dialog)

const StyledTableCellBody = withStyles(() => ({
	root: {
		fontSize: 'calc(0.9vw + 3px)'
	}
}))(TableCell)

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
		fontSize: 'calc(0.9vw + 3px)'
	},
	body: {
		fontSize: 14
	}
}))(TableCell);


function ResumeDialog(props) {

	const classes = useResumeDialogStyle()
	const { resumeList, open, handleClose } = props

	function getResume(resume) {
		if (resume.uuid)
			userService.getResumeFileEmployer(resume.id).then((res) => {
				const blobURL = URL.createObjectURL(res);
				FileSaver.saveAs(blobURL, 'resume.pdf');
				store.dispatch(uiActions.successSnackbar('رزومه با موفقیت دانلود شد'))
			},
				() =>
					store.dispatch(uiActions.errorSnackbar('خطا هنگام عملیات دانلود')))
		else if (resume.url)
			window.location.href = resume.url;
	}
	return (
		<StyledDialog className={classes.container} onClose={handleClose} open={open}>
			<DialogTitle className={classes.title}>رزومه های ارسالی</DialogTitle>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<StyledTableCell align="left">ایمیل</StyledTableCell>
							<StyledTableCell align="left">آدرس</StyledTableCell>
							<StyledTableCell align="center">دانلود</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{

							resumeList.map(resume => (
								<TableRow key={resume.id}>
									<StyledTableCellBody>{resume.email}</StyledTableCellBody>
									<StyledTableCellBody onClick={() => getResume(resume)}>{
										<Typography style={{ cursor: 'pointer' }}>
											{resume.uuid ? 'دانلود رزومه' : resume.url}
										</Typography>
									}</StyledTableCellBody>
									<StyledTableCellBody onClick={() => getResume(resume)} align="center">
										<Button color='secondary'>
											<ArrowDownwardIcon color='primary'></ArrowDownwardIcon>
										</Button>
									</StyledTableCellBody>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
			</TableContainer>
		</StyledDialog>
	)
}

export { ResumeDialog }