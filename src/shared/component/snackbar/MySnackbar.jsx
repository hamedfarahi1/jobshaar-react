import React from 'react'
import { useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import { uiActions } from "../../../core/_actions/ui.actions";
import { store } from '../../../core/_helpers';
import MuiAlert from '@material-ui/lab/Alert';



export default function MySnackbar() {

	const { errorSnackbarMessage, errorSnackbarOpen } = useSelector(
		state => state.ui
	);

	function Alert(props) {
		return <MuiAlert
			elevation={6} variant="filled" {...props} />;
	}
	function handleClose() {
		store.dispatch(uiActions.clearSnackbar());
	}

	return (
		<Snackbar
			anchorOrigin={{
				vertical: "top",
				horizontal: "center"
			}}
			onClose={handleClose}
			autoHideDuration={4000}
			open={errorSnackbarOpen}
			aria-describedby="client-snackbar"
		>
			<Alert severity="error">{errorSnackbarMessage}</Alert>
		</Snackbar>
	);
}