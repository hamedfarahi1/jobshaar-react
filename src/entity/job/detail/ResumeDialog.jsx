import React from 'react';
import { Dialog, TableHead, TableContainer, Table, TableRow, TableCell, TableBody, withStyles, Button } from '@material-ui/core';
import { useResumeDialogStyle } from './styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

const StyledDialog = withStyles((theme) => ({
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
		backgroundColor: '#508cef',
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14
	}
}))(StyledTableCellBody);


function ResumeDialog(props) {

	const classes = useResumeDialogStyle()
	const { resumeList, open, handleClose } = props
	return (
		<StyledDialog className={classes.container} onClose={handleClose} open={open}>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<StyledTableCell align="right">Email</StyledTableCell>
							<StyledTableCell align="right">Url</StyledTableCell>
							<StyledTableCell align="right">Actions</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{

							resumeList.map(resume => (
								<TableRow key={resume.id}>
									<StyledTableCellBody>{resume.email}</StyledTableCellBody>
									<StyledTableCellBody>{resume.url}</StyledTableCellBody>
									<StyledTableCellBody align="center">
										<Button>
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