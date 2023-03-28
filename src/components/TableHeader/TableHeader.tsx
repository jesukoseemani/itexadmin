import React, { useEffect, useState } from 'react';
import styles from './Tableheader.module.scss';
import ExportButton from '../../components/ExportButton/ExportButton';
import StatusView from '../../components/StatusView/StatusView';
import { ReactComponent as DropArrow } from '../../assets/images/Icons/drop-arrow.svg';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputAdornment } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableFilter from '../TableFilter/TableFilter';

type TableHeaderProps = {
	pageName?: string;
	dataLength?: number;
	data?: any;
	newButton?: React.ReactNode;
	dropdown?: boolean;
	setDropdown?: React.Dispatch<React.SetStateAction<boolean>>;
	value?: string | React.ReactNode;
	setValue?: React.Dispatch<React.SetStateAction<string>>;
	FilterComponent?: React.ReactNode;
	handleClick?: () => void;
	entries?: boolean;
	filtering?: boolean;
	exporting?: boolean;
	placeHolder?: string;
	searchfn?: boolean;
};

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'white',
		},
		'& .MuiInput-underline:after': {
			// borderBottomColor: 'yellow',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: '#008243',
			},
			'&:hover fieldset': {
				borderColor: '#008243',
			},
			'&.Mui-focused fieldset': {
				borderColor: '#008243',
			},
		},
	},
})(TextField);

const TableHeader = ({
	pageName,
	dataLength,
	data,
	newButton,
	value,
	setValue,
	dropdown,
	setDropdown,
	placeHolder,
	FilterComponent,
	entries = true,
	filtering = true,
	exporting = true,
	searchfn = true,
	handleClick,
}: TableHeaderProps) => {
	const [isDesktop, setDesktop] = useState(window.innerWidth > 800);

	const updateMedia = () => {
		setDesktop(window.innerWidth > 800);
	};

	useEffect(() => {
		window.addEventListener('resize', updateMedia);
		return () => window.removeEventListener('resize', updateMedia);
	});

	return (
		<div className={styles.pageTop}>
			{dataLength && entries ? (
				<div className={styles.transactions}>{dataLength} entries</div>
			) : (
				<h3 className={styles.newH3}>{pageName}</h3>
			)}

			<div className={styles.actions}>
				<div className={styles.actionButtons}>
					{searchfn && (
						<Box
							sx={{
								'& > :not(style)': isDesktop
									? {
											width: '30vw',
											height: '40px',
											borderRadius: '8px',
									  }
									: { width: '40vw', height: '30px', borderRadius: '8px' },
							}}>
							<CssTextField
								style={
									isDesktop
										? {
												marginTop: '0rem',
												padding: '0.4rem',
										  }
										: { marginTop: '0rem', padding: '0.2rem' }
								}
								id='input-with-icon-textfield'
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<SearchIcon />
										</InputAdornment>
									),
								}}
								placeholder={`${placeHolder ? placeHolder : 'Search'}`}
								variant='outlined'
								margin='normal'
								size='small'
								value={value}
								onChange={
									setValue ? (e) => setValue(e.target.value) : undefined
								}
							/>
						</Box>
					)}

					{filtering && (
						<TableFilter
							dropdown={dropdown}
							setDropdown={setDropdown}
							FilterComponent={FilterComponent}
						/>
					)}
					{/* {exporting && <ExportButton data={data} fileName={pageName} />} */}
					{exporting && (
						<div>
							<button
								onClick={handleClick}
								style={{
									padding: '12px 15px',
									outline: 'none',
									borderRadius: '5px',
									marginLeft: '20px',
									border: '1px solid #ededed',
									cursor: 'pointer',
								}}>
								Download
							</button>
						</div>
					)}
				</div>
				<div className={styles.headerButton}>{newButton}</div>
			</div>
		</div>
	);
};

export default TableHeader;
