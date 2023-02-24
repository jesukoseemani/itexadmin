import React, { useState } from 'react';
// import { ReactComponent as SortIcon } from '../assets/images/sortIcon.svg';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';
import styles from './TableElement.module.scss';

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
	},
});

const StyledMenu = styled((props: MenuProps) => (
	<Menu elevation={0} {...props} />
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		width: '303px',
		height: '380px',
		color:
			theme.palette.mode === 'light'
				? 'rgb(55, 65, 81)'
				: theme.palette.grey[300],
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			// padding: '4px 0',
		},
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			'&:active': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

function TableElementSymbol() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [duration, setDuration] = useState('today');
	const [type, setType] = useState('Volume');

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const classes = useStyles();
// onClick = { handleClick };
	return (
		<>
			<div
				id='demo-customized-button'
				aria-controls={open ? 'demo-customized-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				style={{ cursor: 'pointer' }}
				>
				<FilterListIcon />
			</div>
			<StyledMenu
				id='demo-customized-menu'
				MenuListProps={{
					'aria-labelledby': 'demo-customized-button',
				}}
				anchorEl={anchorEl}
				className={styles.menu}
				open={open}
				onClose={handleClose}>
				<div
					style={{
						display: 'flex',
						alignItems: 'flex-end',
						padding: '26px 26px 18px 26px',
					}}>
					<h5 className={styles.header}>Filter</h5>
					{/* <div className={styles.arrow_design}></div> */}
					{/* <div className={styles.arrow_design}> */}
					{/* <KeyboardArrowUpIcon
						fontSize='large'
						sx={{
							color: 'red',
							fontSize: '100px',
							position: 'absolute',
							top: '-28px',
							right: '55px',
							background: 'green',
							zIndex: '100',
						}}
					/> */}
					{/* </div> */}
				</div>
				<Divider />
				<div className={styles.Select_top}>
					<p className={styles.header1}>Date</p>
					<TextField
						id='demo-simple-select'
						value={duration}
						size='small'
						fullWidth
						className={classes.select}
						onChange={(e) => setDuration(e.target.value)}
						select>
						<MuiMenuItem value='today'>Today</MuiMenuItem>
						<MuiMenuItem value='last7days'>Last 7 days</MuiMenuItem>
						<MuiMenuItem value='lastweek'>Last 30days</MuiMenuItem>
						<MuiMenuItem value='lastmonth'>Last year</MuiMenuItem>
					</TextField>
				</div>

				<div className={styles.Select_bottom}>
					<p className={styles.header1}>Type</p>
					<TextField
						id='demo-simple-select'
						value={type}
						size='small'
						fullWidth
						className={classes.select}
						onChange={(e) => setType(e.target.value)}
						select>
						<MuiMenuItem value='Volume'>Volume</MuiMenuItem>
						<MuiMenuItem value='Value'>Value</MuiMenuItem>
					</TextField>
				</div>

				<Divider />

				<div className={styles.Button}>
					<button className={styles.Button_clear}>Clear filter</button>
					<button className={styles.Button_apply}>Apply filter</button>
				</div>
			</StyledMenu>
		</>
	);
}

export default TableElementSymbol;
