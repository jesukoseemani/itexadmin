import React, { useState, useEffect, useCallback } from 'react';
import styles from './LegalCardTable.module.scss';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import OperantTableItexPay from '../tableItexPay/OperantTableItexPay';
import axios from 'axios';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import { useHistory } from 'react-router';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterModal from '../filterConfig/FilterModal';
import UploadBulkModal from '../ModalsReuse/businessDetailsModal/UploadBulkModal';

const useStyles = makeStyles({
	root: {
		'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			border: 'none',
		},
		'& .MuiOutlinedInput-input.MuiInputBase-input.MuiInputBase-input.MuiOutlinedInput-input':
			{
				textAlign: 'center',
				padding: '8.1px 70px',
				fontSize: '4px',
			},
		// '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input.MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input.MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input':
		// 	{
		// 		paddingRight: '50px',
		// 	},
	},
	select: {
		'& .MuiOutlinedInput-input.MuiInputBase-input.MuiInputBase-input.MuiOutlinedInput-input':
			{
				textAlign: 'center',
				padding: '5px 40px',
				fontSize: '15px',
			},
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
	rootCard: {
		position: 'absolute',
		left: '-7% !important',
		top: '-1% !important',
	},
	list: {
		backgroundColor: '#ffffff',
		width: '15rem',
		overflow: 'hidden',
		color: 'rgba(0, 40, 65, 0.8)',
	},
	primary: {
		fontSize: '212px',
	},
	paper: {
		boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.2)',
	},
});

interface dataTypes {
	id: string;
	business_name: string;
	state: string;
	number_of_terminal: number;
	date: string;
	status: string;
}

function LegalCardTable() {
	const [filter, setFilter] = useState('filter');
	const classes = useStyles();
	const [rows, setRows] = useState<any[]>([]);
	const [apiRes, setApiRes] = useState<dataTypes[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
		10
	);
	const [dataValue, setDataValue] = useState<number | string>(0);
	const history = useHistory();

	const dispatch = useDispatch();
	const [totalRows, setTotalRows] = useState<number>(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

	const open = Boolean(anchorEl);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
		setDataValue(event.currentTarget.getAttribute('data-value'));
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const changePage = (value: number) => {
		setPageNumber(value);
	};
	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	// const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

	useEffect(() => {
		axios
			.get<dataTypes[]>(`/axiosCall/legalParnerBanking.json`, { baseURL: '' })
			.then((res) => {
				setApiRes(res.data);
			});
	}, []);

	useEffect(() => {
		setTotalRows(Number(apiRes?.length));
	}, [apiRes, rows]);

	const documentUploadHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<div className={styles.modalDiv}>
						<UploadBulkModal />
					</div>
				),
			})
		);
	};

	//ENDS FUNCTIONS

	interface Column {
		id: 'card_scheme' | 'integration_status' | 'created_by' | 'created_date';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'card_scheme', label: 'Card scheme name', minWidth: 100 },
		{
			id: 'integration_status',
			label: 'Integration status',
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'created_by',
			label: 'Created by',
			align: 'left',
			minWidth: 100,
		},
		{ id: 'created_date', label: 'Creation date', minWidth: 100 },
	];

	const LoanRowTab = useCallback(
		(
			provider_name: string,
			integration_status: string,
			created_by: string,
			created_date: string
		) => ({
			card_scheme: provider_name,
			integration_status: (
				<span
					className={styles.tableSpan}
					style={{
						backgroundColor:
							(integration_status === 'Won' && '#27AE60') ||
							(integration_status === 'Lost' && '#EB5757') ||
							(integration_status === 'Pending' && '#F2C94C') ||
							'rgba(169, 170, 171, 0.22)',
						color:
							(integration_status === 'Won' && '#FFFFFF') ||
							(integration_status === 'Lost' && '#FFFFFF') ||
							(integration_status === 'Pending' && '#12122C') ||
							'#FFFFFF',
					}}>
					{integration_status}
				</span>
			),
			created_by: created_by,
			created_date: created_date,
		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiRes?.map((each: any) =>
				newRowOptions.push(
					LoanRowTab(
						each.provider_name,
						each.integration_status,
						each.created_by,
						each.created_date
					)
				)
			);
		setRows(newRowOptions);
	}, [apiRes, LoanRowTab]);

	return (
		<div style={{ paddingTop: '10px' }}>
		
			<div className={styles.header}>
				<div className={styles.header_left}>
					<h1 className={styles.header_left_h1}>
						{apiRes?.length} card schemes
					</h1>
				</div>
				<div className={styles.header_right}>
					<div className={styles.button_business}>
						<button className={styles.button_business_button}>
							All documents{' '}
							<span className={styles.button_business_span}>
								<ArrowDropDownIcon
									sx={{
										width: '15px',
										height: '10px',
										color: '#4F4F4F',
										marginLeft: '10px',
									}}
								/>
							</span>{' '}
							&nbsp;
						</button>
					</div>
					<div className={styles.button_business}>
						<button
							onClick={documentUploadHandler}
							className={styles.header_right_button}>
							Upload
						</button>
					</div>
				</div>
			</div>

			{/* TABLE */}
			<div className={styles.maintable}>
				<OperantTableItexPay
					columns={columns}
					rows={rows}
					totalRows={totalRows}
					changePage={changePage}
					limit={limit}
				/>
			</div>
		</div>
	);
}

export default LegalCardTable;
