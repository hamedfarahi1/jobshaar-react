import React from 'react';
import { Dialog, TableHead, TableContainer, Table, TableRow, TableCell, TableBody, withStyles, Button, DialogTitle } from '@material-ui/core';
import { useResumeDialogStyle } from './styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

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
									<StyledTableCellBody>{resume.url}</StyledTableCellBody>
									<StyledTableCellBody align="center">
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