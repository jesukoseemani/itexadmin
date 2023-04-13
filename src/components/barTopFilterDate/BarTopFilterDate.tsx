import React from 'react';
import styles from './BarTopFilterDate.module.scss';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Popover } from 'antd';
import Calender from '../Calender';
import arrowdown from '../../assets/icons/newicons/angle-down.svg';

type TitleProps = {
	title: string;
	setDateEvent: React.Dispatch<React.SetStateAction<string>>;
	dateEvent: string;
	calender?: any;
	setCalender?: any;
	showMenu?: boolean;
};

function BarTopFilterDate({
	title,
	setDateEvent,
	dateEvent,
	calender,
	setCalender,
	showMenu = true,
}: TitleProps) {
	const [anchoredEl, setAnchoredEl] = React.useState<null | HTMLElement>(null);
	const ITEM_HEIGHT = 48;
	const opened = Boolean(anchoredEl);

	const handledClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchoredEl(event.currentTarget);
	};

	const handledClose = () => {
		setAnchoredEl(null);
	};

	const options = ['Export to CSV', 'Export to XLS', 'Export to JPEG'];

	const clickHandler = (option: string) => {
		handledClose();
	};

	const handleClick = (event: any) => {
		setDateEvent(event.currentTarget.getAttribute('data-value'));
		// setDataValue(event.target.getAttribute('data-value'));
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.topHead}>
				<h4 className={styles.topHeadh4}>{title}</h4>
			</div>

			<div className={styles.topOptions}>
				<div
					data-value='last7days'
					style={{
						borderRadius: dateEvent === 'last7days' ? '4px' : '',
						border: dateEvent === 'last7days' ? '0.6px solid #CCE6D7' : '',
						backgroundColor: dateEvent === 'last7days' ? '#CCE6D7' : '',
						color: dateEvent === 'last7days' ? '#005525;' : '',
					}}
					onClick={handleClick}
					className={styles.content}>
					<h5 className={styles.contenth5}>Last 7 days</h5>
				</div>
				<div
					data-value='last30days'
					style={{
						borderRadius: dateEvent === 'last30days' ? '4px' : '',
						border: dateEvent === 'last30days' ? '0.6px solid #CCE6D7' : '',
						backgroundColor: dateEvent === 'last30days' ? '#CCE6D7' : '',
						color: dateEvent === 'last30days' ? '#005525;' : '',
					}}
					onClick={handleClick}
					className={styles.content}>
					<h5 className={styles.contenth5}>Last Month</h5>
				</div>
				<div
					data-value='lastyear'
					style={{
						borderRadius: dateEvent === 'lastyear' ? '4px' : '',
						border: dateEvent === 'lastyear' ? '0.6px solid #CCE6D7' : '',
						backgroundColor: dateEvent === 'lastyear' ? '#CCE6D7' : '',
						color: dateEvent === 'lastyear' ? '#005525;' : '',
					}}
					onClick={handleClick}
					className={styles.content}>
					<h5 className={styles.contenth5}>This Year</h5>
				</div>

				<div className={styles.line}></div>
				<div
					data-value='custom'
					onMouseEnter={handleClick}
					className={styles.content}>
					<Calender calender={calender} setCalender={setCalender} />
				</div>
				{showMenu && (
					<div className={styles.vertIcon}>
						{/* <MoreVertIcon style={{ fontSize: '25px' }} /> */}
						<IconButton
							aria-label='more'
							id='long-button'
							aria-controls='long-menu'
							aria-expanded={opened ? 'true' : undefined}
							aria-haspopup='true'
							onClick={handledClick}>
							<MoreVertIcon />
						</IconButton>
						<Menu
							id='long-menu'
							MenuListProps={{
								'aria-labelledby': 'long-button',
							}}
							anchorEl={anchoredEl}
							open={opened}
							onClose={handledClose}
							PaperProps={{
								style: {
									maxHeight: ITEM_HEIGHT * 4.5,
									width: '20ch',

									borderRadius: '4px',
								},
							}}>
							{options.map((option) => (
								<MenuItem key={option} onClick={() => clickHandler(option)}>
									{option}
								</MenuItem>
							))}
						</Menu>
					</div>
				)}
			</div>
		</div>
	);
}

export default BarTopFilterDate;
