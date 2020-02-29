import React from 'react'
import { useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { Icon } from "@material-ui/core";
import { uiActions } from "../../../core/_actions/ui.actions";
import { store } from '../../../core/_helpers';

export default function MySnackbar() {

	const { successSnackbarMessage, successSnackbarOpen } = useSelector(
		state => state.ui
	);

	function handleClose() {
		store.dispatch(uiActions.clear());
	}

	return (
		<Snackbar
			anchorOrigin={{
				vertical: "top",
				horizontal: "center"
			}}
			open={successSnackbarOpen}
			autoHideDuration={4000}
			onClose={handleClose}
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar">
					<Icon>check_circle</Icon>
					{successSnackbarMessage}
				</span>
			}
			action={[
				<IconButton
					key="close"
					aria-label="close"
					color="inherit"
					onClick={handleClose}
				>
					<Icon>close</Icon>
				</IconButton>
			]}
		/>
	);
}