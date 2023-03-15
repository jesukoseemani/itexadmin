import React, { useState, Fragment } from 'react';
import styles from './Tablefilter.module.scss';
import { ReactComponent as DropArrow } from '../../assets/images/drop-arrow.svg';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const TableFilter = ({
	FilterComponent,
	dropdown,
	setDropdown,
}: {
	FilterComponent: React.ReactNode;
	dropdown?: boolean;
	setDropdown?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}) => {
	const handleDropdown = () => {
		setDropdown && setDropdown(!dropdown);
	};

	const handleClickAway = () => {
		setDropdown && setDropdown(false);
	};
	return (
		<Fragment>
			<ClickAwayListener onClickAway={handleClickAway}>
				<div className={styles.exportMenu}>
					<div onClick={handleDropdown} className={styles.filter}>
						Filter{' '}
						<span>
							<DropArrow className={styles.dropArrow} />
						</span>
					</div>

					{dropdown && (
						<div className={styles.exportDropdown}>{FilterComponent}</div>
					)}
				</div>
			</ClickAwayListener>
		</Fragment>
	);
};

export default TableFilter;
