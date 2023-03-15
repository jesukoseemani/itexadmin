import React, { useState, useEffect, useCallback } from 'react';
import styles from './Bank.module.scss';
import { makeStyles } from '@material-ui/core';
import NavBar from '../../components/navbar/NavBar';
import { useDispatch } from 'react-redux';
import OperantTableItexPay from '../../components/tableItexPay/OperantTableItexPay';
import { BusinessTableApiTypes } from '../../types/UserTableTypes';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import AccountType from '../../components/ModalsReuse/AccountType';
import moment from 'moment';
import { useHistory } from 'react-router';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import FilterModal from '../../components/filterConfig/FilterModal';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import AddBankModal from '../../components/AddBankModal/AddBankModal';
import { Divider } from '@mui/material';
import { ReactComponent as DownloadNew } from '../../assets/images/downloadnew.svg';

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

const Mocked = [
	{
		id: 1,
		amount: 200000,
		status: 'Successful',
		customerId: 'debra.holt@example.com',
		paymentType: 'Card',
		date: 'August 13, 2020',
	},
	{
		id: 2,
		amount: 200000,
		status: 'Pending',
		customerId: 'debra.holt@example.com',
		paymentType: 'Card',
		date: 'August 13, 2020',
	},
	{
		id: 3,
		amount: 200000,
		status: 'Failed',
		customerId: 'debra.holt@example.com',
		paymentType: 'Card',
		date: 'August 13, 2020',
	},
	{
		id: 4,
		amount: 200000,
		status: 'Successful',
		customerId: 'debra.holt@example.com',
		paymentType: 'Card',
		date: 'August 13, 2020',
	},
];

function Bank() {
	const [filter, setFilter] = useState('filter');
	const classes = useStyles();
	const [rows, setRows] = useState<any[]>([]);
	const [apiRes, setApiRes] = useState<any>(Mocked);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [approved, setApproved] = useState<string>('');

	const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
		10
	);
	const [dataValue, setDataValue] = useState<number | string>(0);
	const [reset, setReset] = useState<boolean>(false);

	const history = useHistory();

	const [totalRows, setTotalRows] = useState<number>(0);
	const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const [dataValue2, setDataValue2] = useState<number | string>(0);

	const [open2, setOpen2] = useState<boolean>(false);

	// DATE CONVERTION
	const now = new Date();
	const dateNow = moment().format('YYYY-MM-DD');
	const sevenDaysAgo = moment().subtract(7, 'day').format('YYYY-MM-DD');
	const thirtyDaysAgo = moment().subtract(30, 'day').format('YYYY-MM-DD');
	const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
	const endOfYear = moment().endOf('year').format('YYYY-MM-DD');

	// FOR FILTER METHOD

	const [fromDate, setFromDate] = useState('');
	const [toDate, setToDate] = useState('');
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState('');
	const [event, setEvent] = useState('');
	const [bearer, setBearer] = useState<boolean>(false);

	useEffect(() => {
		if (event === 'today') {
			setFromDate(dateNow);
			setToDate(dateNow);
		} else if (event === 'last7days') {
			setFromDate(sevenDaysAgo);
			setToDate(dateNow);
		} else if (event === 'last30days') {
			setFromDate(thirtyDaysAgo);
			setToDate(dateNow);
		} else if (event === 'oneyear') {
			setFromDate(startOfYear);
			setToDate(endOfYear);
		} else {
			setFromDate('');
			setToDate('');
		}
	}, [event]);

	const clearHandler = () => {
		setEvent('');
		setFromDate('');
		setToDate('');
		setStatus('');
		setEmail('');
		setBearer(true);
		setIsFilterModalOpen(false);
	};

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
		setDataValue(event.currentTarget.getAttribute('data-value'));
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const dispatch = useDispatch();

	const changePage = (value: number) => {
		setPageNumber(value);
	};
	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	// const fetchFunction = () => {
	// 	dispatch(openLoader());

	// 	axios
	// 		.get<BusinessTableApiTypes>(
	// 			`/admin/business?perpage=${rowsPerPage}&page=${pageNumber}&fromdate=${fromDate}&todate=${toDate}&email=${email}&paymentmethod=${status}&approved=${approved}`
	// 		)
	// 		.then((res) => {
	// 			setApiRes(res.data);
	// 			setBearer(false);
	// 			dispatch(closeLoader());
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			dispatch(closeLoader());
	// 		})
	// 		.finally(() => {
	// 			setIsFilterModalOpen(false);
	// 		});
	// };

	// useEffect(() => {
	// 	fetchFunction();
	// }, [rowsPerPage, pageNumber, bearer, approved]);

	const modalFunc = () => {
		setReset(true);
	};

	useEffect(() => {
		if (apiRes && apiRes?.length) {
			setTotalRows(apiRes?.length);
		}
	}, [apiRes]);

	useEffect(() => {
		if (open2 && dataValue2 !== null) history.push(`/bank/${dataValue2}`);
	}, [dataValue2, open2]);

	const editBusinessHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<div className={styles.modalDiv}>
						<AddBankModal />
					</div>
				),
			})
		);
	};

	//ENDS FUNCTIONS

	interface Column {
		id: 'amount' | 'status' | 'customerId' | 'paymentType' | 'date';

		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'amount', label: 'Amount', minWidth: 100 },
		{ id: 'status', label: 'Status', minWidth: 100 },
		{ id: 'customerId', label: 'Customer ID', minWidth: 200 },
		{
			id: 'paymentType',
			label: 'Payment type',
			align: 'center',
			minWidth: 100,
		},
		{ id: 'date', label: 'Date', minWidth: 100 },
	];

	const LoanRowTab = useCallback(
		(
			id: number | string,
			amount: string,
			status: string,
			customerId: any,
			paymentType: string,
			date: string
		) => ({
			amount: amount,
			status: (
				<button
					className={styles.tableSpan}
					style={{
						backgroundColor:
							(status === 'Successful' && '#25AC60') ||
							(status === 'Failed' && '#D92418') ||
							(status === 'Pending' && '#CEA528') ||
							'rgba(169, 170, 171, 0.22)',
						color:
							(status === 'Successful' && '#FFFFFF') ||
							(status === 'Failed' && '#FFFFFF') ||
							(status === 'Pending' && '#FFFFFF') ||
							'#FFFFFF',
					}}>
					{status.toLocaleLowerCase()}
				</button>
			),
			customerId: customerId,
			paymentType: paymentType,
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
						each?.id,
						each?.amount,
						each?.status,
						each?.customerId,
						each?.paymentType,
						each?.date
					)
				)
			);
		setRows(newRowOptions);
	}, [apiRes, LoanRowTab]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<div className={styles.container}>
			
				<NavBar name='business' />
				<div className={styles.header}>
					<div className={styles.header_left}>
						<h1 className={styles.header_left_h1}>Transactions</h1>
					</div>
					<div className={styles.header_right}>
						<div className={styles.selectwrapper}>
							<button className={styles.filterbutton}>
								<span className={styles.filterbutton_span_left}>
									Download &nbsp;&nbsp;
									<DownloadNew />
								</span>
							</button>
						</div>
						<div
							style={{ marginLeft: '20px' }}
							className={styles.selectwrapper}>
							<button
								className={styles.filterbutton}
								onClick={() => setIsFilterModalOpen(true)}>
								<span className={styles.filterbutton_span_left}>Filter </span>

								<span className={styles.filterbutton_span_right}>
									<ArrowDropDownIcon />
								</span>
							</button>
						</div>
					</div>
				</div>

				<Divider />

				{/* TABLE */}
				<div className={styles.maintable}>
					<OperantTableItexPay
						columns={columns}
						rows={rows}
						totalRows={totalRows}
						changePage={changePage}
						limit={limit}
						// setDataValue2={setDataValue2}
						// setOpen2={setOpen2}
					/>
				</div>
			</div>
		</div>
	);
}

export default Bank;
