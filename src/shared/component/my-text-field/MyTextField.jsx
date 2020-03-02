import React from 'react'
import TextField from '@material-ui/core/TextField';

function MyTextField(props) {
	return <TextField
		dir="ltr"
		variant="outlined"
		required
		fullWidth
		id={props.field}
		type={props.type ? props.type : 'text'}
		label={props.label}
		name={props.field}
		autoComplete={props.field}
		onChange={props.onChange}
		autoFocus={props.autoFocus}
		margin={props.margin}
	/>
}

export default MyTextField