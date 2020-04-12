import React from 'react'
import TextField from '@material-ui/core/TextField';

function MyTextField({
	className,
	dir,
	variant,
	disabled,
	required,
	value,
	style,
	type,
	label,
	field,
	onChange,
	autoFocus,
	margin,
	placeholder
}) {
	return <TextField
		className={className}
		dir={dir ? dir : 'ltr'}
		variant={variant ? variant : 'outlined'}
		disabled={disabled}
		required={required}
		fullWidth
		value={value}
		inputProps={{ style: { textAlign: 'right', ...style } }}
		id={field}
		type={type ? type : 'text'}
		label={label}
		name={field}
		autoComplete={field}
		onChange={onChange}
		autoFocus={autoFocus}
		margin={margin}
		placeholder={placeholder}
	/>
}

export default MyTextField