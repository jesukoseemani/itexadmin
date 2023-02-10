import React, { useState } from 'react';
import styles from './BarTopFilter.module.scss';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
import MuiMenuItem from '@material-ui/core/MenuItem';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
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
			backgroundColor: '#F2F2F2',
		},
		'& .MuiInputLabel-root.Mui-focused': {
			color: '#E0E0E0',
		},
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
			border: '1px solid #E0E0E0',
		},
		'& .MuiOutlinedInput-root.MuiInputBase-root': {
			height: '35px',
			width: '129px',
			lineHeight: 1.5,
		},
	},
});

// <h4 style={styledh4}>{label && moment(label).format('ddd, MMM d')}</h4>;

function BarTopFilter({ title }: { title?: string }) {
	const [value, setValue] = useState<Date | null>(new Date());
	const [valueTo, setValueTo] = useState<Date | null>(new Date());
	const [duration, setDuration] = useState('today');
	const [currency, setCurrency] = useState('USD');

	const handleChangeFrom = (newValue: Date | null) => {
		setValue(newValue);
	};
	const handleChangeTo = (newValue: Date | null) => {
		setValueTo(newValue);
	};

	const classes = useStyles();
	return (
		<div className={styles.wrapper}>
			<div className={styles.selectwrapper}>
				{title ? (
					title
				) : (
					<TextField
						id='demo-simple-select'
						value={duration}
						className={classes.select}
						onChange={(e) => setDuration(e.target.value)}
						select>
						<MuiMenuItem value='today'>Today</MuiMenuItem>
						<MuiMenuItem value='last7days'>Last 7 days</MuiMenuItem>
						<MuiMenuItem value='lastweek'>Last 30days</MuiMenuItem>
						<MuiMenuItem value='lastmonth'>Last year</MuiMenuItem>
					</TextField>
				)}
			</div>
			<div className={styles.right}>
				<div className={styles.datewrapper}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<MobileDatePicker
							label=''
							inputFormat='MM/dd/yyyy'
							value={value}
							onChange={handleChangeFrom}
							renderInput={(params) => (
								<TextField className={classes.root} {...params} />
							)}
						/>

						<hr className={styles.horizontal} />

						<MobileDatePicker
							label=''
							inputFormat='MM/dd/yyyy'
							value={valueTo}
							onChange={handleChangeTo}
							renderInput={(params) => (
								<TextField className={classes.root} {...params} />
							)}
						/>
					</LocalizationProvider>
				</div>
				<div className={styles.currency}>
					<TextField
						id='demo-simple-select'
						value={currency}
						size='small'
						className={classes.select}
						onChange={(e) => setCurrency(e.target.value)}
						select>
						<MuiMenuItem value='USD'>USD</MuiMenuItem>
						<MuiMenuItem value='Naira'>Naira</MuiMenuItem>
					</TextField>
				</div>
			</div>
		</div>
	);
}

export default BarTopFilter;
