import React from 'react'
import TextField from '@material-ui/core/TextField';

function MyTextField(props) {
	return <TextField
		className={props.className}
		dir={props.dir ? props.dir : 'ltr'}
		variant={props.variant ? props.variant : 'outlined'}
		disabled={props.disabled}
		required={props.required}
		fullWidth
		value={props.value}
		inputProps={{ style: props.style }}
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