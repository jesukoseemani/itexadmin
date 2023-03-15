import React, { Fragment, useState } from 'react';
import styles from './Exportbutton.module.scss';
import { ReactComponent as DropArrow } from '../../assets/images/drop-arrow.svg';
import { exportToXLS } from '../../util/exportToExcel';
import { CSVLink, CSVDownload } from 'react-csv';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const ExportButton = ({ data, fileName, headers }: any) => {
	const handleClick = () => {
		exportToXLS(data, fileName);
	};

	const [dropdown, setDropdown] = useState(false);

	const handleDropdown = () => {
		setDropdown(!dropdown);
	};

	const handleClickAway = () => {
		setDropdown(false);
	};

	return (
		<Fragment>
			<ClickAwayListener onClickAway={handleClickAway}>
				<div className={styles.exportMenu}>
					<div className={styles.export} onClick={handleDropdown}>
						Export <DropArrow className={styles.dropArrow} />
					</div>

					{dropdown && (
						<div className={styles.exportDropdown}>
							<div onClick={handleClick} style={{ cursor: 'pointer' }}>
								Export as .xls
							</div>
							<CSVLink
								data={data ? data : []}
								//   headers={headers}
								filename={fileName}
								className={styles.csv}>
								Export to .csv
							</CSVLink>
						</div>
					)}
				</div>
			</ClickAwayListener>
		</Fragment>
	);
};

export default ExportButton;
