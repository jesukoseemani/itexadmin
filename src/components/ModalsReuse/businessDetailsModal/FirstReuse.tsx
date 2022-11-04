import React, { useState } from 'react';
import { Divider } from '@material-ui/core';
import styles from './BusinessStyle.module.scss';
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

function FirstReuse({
	title,
	description,
	content,
}: {
	title: string;
	description: string;
	content: string[];
}) {
	const [value, setValue] = useState(`${content[0]}`);
	const classes = useStyles();

	return (
		<div className={styles.general}>
			<h3 className={styles.generalh3}>{title}</h3>
			<Divider />

			<div className={styles.selectinput}>
				<p className={styles.selectinputp}>{description}</p>
				<TextField
					id='demo-simple-select'
					value={value}
					// size='small'
					className={classes.select}
					InputProps={{style: {height: 40 }}}
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

			<button className={styles.button}>Submit</button>
		</div>
	);
}

export default FirstReuse;
