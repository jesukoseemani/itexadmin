import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';

const OtherSelectWrapper = ({ name, options, ...otherProps }) => {
	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(name);

	const handleChange = (evt) => {
		const { value } = evt.target;
		setFieldValue(name, value);
	};

	const configSelect = {
		...field,
		...otherProps,
		select: true,
		variant: 'outlined',
		fullWidth: true,
		onChange: handleChange,
	};

	if (meta && meta.touched && meta.error) {
		configSelect.error = true;
		configSelect.helperText = meta.error;
	}

	return (
		<TextField {...configSelect}>
			{options?.map((item, i) => {
				return (
					<MenuItem key={i} value={item?.id.toString()}>
						{/* {options[item]} */}
						{item?.name}
					</MenuItem>
				);
			})}
		</TextField>
	);
};

export default OtherSelectWrapper;
