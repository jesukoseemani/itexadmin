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

function EditBusiness() {
	const [desc, setDesc] = useState('');
	const [address, setAddress] = useState('');

	const classes = useStyles();

	return (
		<div className={styles.general2}>
			<h3 className={styles.generalh3}>Edit Business</h3>
			<Divider />

			<div className={styles.selectinput3}>
				<p className={styles.selectinputp}>Business Description</p>
				<TextField
					id='demo-simple-select'
					value={desc}
					InputProps={{ style: { height: 40 } }}
					className={classes.select}
					fullWidth
					onChange={(e) => setDesc(e.target.value)}
				/>
			</div>

			<div className={styles.selectinput3}>
				<p className={styles.selectinputp}>Address</p>
				<TextField
					id='demo-simple-select'
					value={address}
					InputProps={{ style: { height: 40 } }}
					className={classes.select}
					fullWidth
					onChange={(e) => setAddress(e.target.value)}
				/>
			</div>

			<button className={styles.button2}>Submit</button>
		</div>
	);
}

export default EditBusiness;
