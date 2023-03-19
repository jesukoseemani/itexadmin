import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';

const SelectWrapper = ({ name, options, ...otherProps }:any) => {
	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(name);

	const handleChange = (evt:any) => {
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
			{options?.map((item:any, i:number) => {
				return (
					<MenuItem key={i} value={item?.name}>
						{/* {options[item]} */}
						{item?.name}
					</MenuItem>
				);
			})}
		</TextField>
	);
};

export default SelectWrapper;
