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

function DeclineTerminalRequest() {
	const content = [
		'Declined for not being compliant',
		'In Review',
		'Not Approved',
		'Rejected/Declined',
	];
	const [value, setValue] = useState(`${content[0]}`);
	const classes = useStyles();

	return (
		<div className={styles.declineRequest}>
			<h3 className={styles.terminal_h1}>Decline Request</h3>
			<Divider />
			<div className={styles.content_wrapper}>
				<p className={styles.content_wrapper_paragraph}>
					You are about to decline this terminal request. Select a reason to
					inform the business why their request was declined.
				</p>
			</div>

			<div className={styles.content_wrap}>
				<p className={styles.selectinputp}>Select reason</p>
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
			<div className={styles.content_wrapper_2}>
				<button className={styles.button_decline}>
					Decline Terminal Request
				</button>
			</div>
		</div>
	);
}

export default DeclineTerminalRequest;
