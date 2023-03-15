import React, { useState, useEffect, useCallback } from 'react';
import styles from './NewTerminalRequestTable.module.scss';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import OperantTableItexPay from '../tableItexPay/OperantTableItexPay';
import axios from 'axios';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import AccountType from '../ModalsReuse/AccountType';
import { useHistory } from 'react-router';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterModal from '../filterConfig/FilterModal';
import RequestTerminal from '../ModalsReuse/businessDetailsModal/RequestTerminal';

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

function NewTerminalRequestTable() {
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

	const [dataValue2, setDataValue2] = useState<number | string>(0);

	const [open2, setOpen2] = useState<boolean>(false);
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

	useEffect(() => {
		if (open2 && dataValue2 !== null)
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<RequestTerminal />
						</>
					),
				})
			);
		setOpen2(false);
	}, [dataValue2, open2]);

	const changePage = (value: number) => {
		setPageNumber(value);
	};
	const limit = (value: number) => {
		setRowsPerPage(value);
	};


	// const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

	useEffect(() => {
		axios
			.get<dataTypes[]>(`/axiosCall/terminalrequest.json`, { baseURL: '' })
			.then((res) => {
				setApiRes(res.data);
			});
	}, []);

	useEffect(() => {
		setTotalRows(Number(apiRes?.length));
	}, [apiRes, rows]);

	const editBusinessHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<div className={styles.modalDiv}>
						<AccountType title='' />
					</div>
				),
			})
		);
	};

	//ENDS FUNCTIONS

	interface Column {
		id:
			| 'status'
			| 'request_id'
			| 'business_name'
			| 'state'
			| 'number_of_terminals'
			| 'date';

		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'status', label: 'Status', minWidth: 100 },
		{ id: 'request_id', label: 'Request ID', align: 'center', minWidth: 100 },
		{
			id: 'business_name',
			label: 'Business name',
			align: 'center',
			minWidth: 100,
		},
		{ id: 'state', label: 'State', minWidth: 100 },
		{
			id: 'number_of_terminals',
			label: 'Number of terminals',
			align: 'center',
			minWidth: 100,
		},
		{ id: 'date', label: 'Request date', minWidth: 100 },
	];

	const LoanRowTab = useCallback(
		(
			status: string,
			id: number | string,
			business_name: number,
			state: string,
			number_of_terminal: string,
			date: string
		) => ({
			status: (
				<span
					className={styles.tableSpan}
					style={{
						backgroundColor:
							(status === 'LIVE' && '#27AE60') ||
							(status === 'INACTIVE' && '#EB5757') ||
							(status === 'New Request' && '#F2C94C') ||
							'rgba(169, 170, 171, 0.22)',
						color:
							(status === 'LIVE' && '#FFFFFF') ||
							(status === 'INACTIVE' && '#FFFFFF') ||
							(status === 'New Request' && '#12122C') ||
							'#FFFFFF',
					}}>
					{status}
				</span>
			),
			request_id: id,
			business_name: business_name,
			state: state,
			number_of_terminals: number_of_terminal,
			date: date,
		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiRes?.map((each: any) =>
				newRowOptions.push(
					LoanRowTab(
						each.status,
						each.id,
						each.business_name,
						each.state,
						each.number_of_terminal,
						each.date
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
						{apiRes?.length} new terminal requests
					</h1>
				</div>
				<div className={styles.header_right}>
					<div className={styles.button_business}>
						<button
							className={styles.button_business_button}>
							All requests{' '}
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
					setDataValue2={setDataValue2}
					setOpen2={setOpen2}
				/>
			</div>
		</div>
	);
}

export default NewTerminalRequestTable;
