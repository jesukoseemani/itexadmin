import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MuiMenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({

    root: {
		'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			border: 'none',
		},
		'& .MuiOutlinedInput-input.MuiInputBase-input.MuiInputBase-input.MuiOutlinedInput-input':
			{
				textAlign: 'center',
				padding: '8.1px 14px',
			},
            '& .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select' :
            {
                padding: '8px 8px',
            },
	},

	select: {
		'&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			outline: 'none',
		},
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
			backgroundColor: '#ffffff',
		},
		'& .MuiInputLabel-root.Mui-focused': {
			color: '#E0E0E0',
		},
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
			border: '1px solid #E0E0E0',
		},
	},
});


const ReusableSelect = ({
	content
}: {
	content: string[];
}) => {
	const [value, setValue] = useState(`${content[0]}`);
	const classes = useStyles();
	return (
		<div>
				<TextField
					id='demo-simple-select'
					value={value}
					size='small'
					className={classes.select}
					fullWidth
					onChange={(e) => setValue(e.target.value)}
					select>
					{content.map((item, i) => (
						<MuiMenuItem key={i} value={item}>
							&nbsp;&nbsp; {item}
						</MuiMenuItem>
					))}
				</TextField>
			</div>

		
	);
}

export default ReusableSelect;
