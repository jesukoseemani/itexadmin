import React, { useState, useEffect, useCallback } from 'react';
import styles from './PendingInitComplianceTable.module.scss';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import OperantTableItexPay from '../tableItexPay/OperantTableItexPay';
import { BusinessTableApiTypes } from '../../types/UserTableTypes';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import AccountType from '../ModalsReuse/AccountType';
import { useHistory } from 'react-router';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterModal from '../filterConfig/FilterModal';
import Button from '@mui/material/Button';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { ExportToXLS } from '../../helpers/ExportToExcel';
import aYAxios from '../axiosInstance';

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

function PendingInitComplianceTable() {
	const [filter, setFilter] = useState('filter');
	const classes = useStyles();
	const [rows, setRows] = useState<any[]>([]);
	const [apiRes, setApiRes] = useState<BusinessTableApiTypes>();
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
		10
	);
	const [dataValue, setDataValue] = useState<number | string>(0);
	const history = useHistory();

	const [dataValue2, setDataValue2] = useState<number | string>(0);

	const [open2, setOpen2] = useState<boolean>(false);
	const [bearer, setBearer] = useState<boolean>(false);

	const [totalRows, setTotalRows] = useState<number>(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

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

	useEffect(() => {
		console.log('fromDate:', fromDate);
		console.log('toDate:', toDate);
	}, [fromDate, toDate]);

	useEffect(() => {
		if (event === 'today') {
			setFromDate(dateNow);
			setToDate(dateNow);
		} else if (event === 'last7days') {
			setFromDate(dateNow);
			setToDate(sevenDaysAgo);
		} else if (event === 'last30days') {
			setFromDate(dateNow);
			setToDate(thirtyDaysAgo);
		} else {
			setFromDate(startOfYear);
			setToDate(endOfYear);
		}
	}, [event]);

	const open = Boolean(anchorEl);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
		setDataValue(event.currentTarget.getAttribute('data-value'));
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const clearHandler = () => {
		setEvent('');
		setFromDate('');
		setToDate('');
		setStatus('');
		setEmail('');
	};

	const dispatch = useDispatch();

	const changePage = (value: number) => {
		setPageNumber(value);
	};
	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	const downloadHandler = () => {
		ExportToXLS(rows, 'COMPLIANCE PENDING TABLEDATA');
	};

	useEffect(() => {
		dispatch(openLoader());

		aYAxios
			.get<BusinessTableApiTypes>(
				`/admin/business?perpage=${rowsPerPage}&page=${pageNumber}&fromdate=${fromDate}&todate=${toDate}&email=${email}&compliancestatus=PENDING_REVIEW`
			)
			.then((res) => {
				dispatch(closeLoader());

				setApiRes(res.data);
				setBearer(false);
				clearHandler();
				setIsFilterModalOpen(false);
			})
			.catch((err) => {
				console.log(err);
				dispatch(closeLoader());
				setIsFilterModalOpen(false);
			});
	}, [rowsPerPage, pageNumber, bearer]);

	useEffect(() => {
		setTotalRows(Number(apiRes?._metadata.totalcount));
	}, [apiRes]);

	useEffect(() => {
		if (open2 && dataValue2 !== null) history.push(`/compliance/${dataValue2}`);
	}, [dataValue2, open2]);

	// useEffect(() => {
	// 	console.log('kosh:', rows);
	// }, [rows]);

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
			| 'business_name'
			| 'email_address'
			| 'contact_person'
			| 'sign_up'
			| 'added_up';

		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'status', label: 'Status', minWidth: 100 },
		{ id: 'business_name', label: 'Business name', minWidth: 100 },
		{
			id: 'email_address',
			label: 'Email address',
			align: 'center',
			minWidth: 100,
		},
		{ id: 'contact_person', label: 'Contact person', minWidth: 100 },
		{ id: 'sign_up', label: 'Submission Date', minWidth: 100 },
		{ id: 'added_up', label: 'Sign up Date', minWidth: 100 },
	];

	const LoanRowTab = useCallback(
		(
			id: number | string,
			tradingname: string,
			approved: string,
			email: number,
			firstname: string,
			lastname: string,
			added: string,
			merchantcode: string
		) => ({
			status: (
				<span
					className={styles.tableSpan}
					style={{
						backgroundColor:
							(approved === 'APPROVED' && '#27AE60') ||
							(approved === 'DECLINED' && '#EB5757') ||
							(approved === 'PENDING' && '#F2C94C') ||
							'rgba(169, 170, 171, 0.22)',
						color:
							(approved === 'APPROVED' && '#FFFFFF') ||
							(approved === 'DECLINED' && '#FFFFFF') ||
							(approved === 'PENDING' && '#FFFFFF') ||
							'#FFFFFF',
					}}>
					{approved}
				</span>
			),
			business_name: `${tradingname || 'Nil'}`,
			email_address: email,
			contact_person: (
				<div>
					{firstname ? firstname : ''} {lastname ? lastname : ''}
				</div>
			),
			sign_up: `${format(parseISO(added), 'dd MMM yyyy')}`,
			added_up: `${format(parseISO(added), 'dd MMM yyyy')}`,
			merchantcode: merchantcode,
		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiRes?.businesses.map((each: any) =>
				newRowOptions.push(
					LoanRowTab(
						each.id,
						each.tradingname,
						each.approved,
						each.email,
						each?.user[0]?.firstname,
						each?.user[0]?.lastname,
						each.added,
						each.merchantcode
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
						{apiRes?._metadata.totalcount} Businesses
					</h1>
				</div>
				<div className={styles.header_right}>
					<div className={styles.selectwrapper}>
						<Button
							className={styles.filterbutton}
							onClick={() => setIsFilterModalOpen(true)}>
							Filter <ArrowDropDownIcon />
						</Button>
					</div>
					<div className={styles.button_business}>
						<button
							className={styles.button_business_button}
							onClick={downloadHandler}>
							Download{' '}
							<span className={styles.button_business_span}>
								<CloudUploadIcon
									sx={{
										width: '15px',
										height: '10px',
										color: '#ffffff',
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
				{apiRes?.businesses.length && (
					<OperantTableItexPay
						columns={columns}
						rows={rows}
						totalRows={totalRows}
						changePage={changePage}
						limit={limit}
						setDataValue2={setDataValue2}
						setOpen2={setOpen2}
					/>
				)}
			</div>
		</div>
	);
}

export default PendingInitComplianceTable;
