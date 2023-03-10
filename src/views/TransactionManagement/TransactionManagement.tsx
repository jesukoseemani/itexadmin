import styles from './TransactionManagement.module.scss';
import { useState, useEffect, useCallback } from 'react';
import ActivityTypes from '../../types/ActivityTypes';
import { useDispatch, useSelector } from 'react-redux';
import OperantTable from '../../components/table/OperantTable';
import { TransactionManagementApiTypes } from '../../types/UserTableTypes';
import { format, parseISO } from 'date-fns';
import moment from 'moment';
import axios from 'axios';
import NavBar from '../../components/navbar/NavBar';
import * as React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useHistory } from 'react-router-dom';
import FilterModal from '../../components/filterConfig/FilterModal';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { ExportToXLS } from '../../helpers/ExportToExcel';
import { CSVLink } from 'react-csv';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import Button from '@mui/material/Button';
import NumberFormat from 'react-number-format';
import aYAxios from '../../components/axiosInstance';
import OperantTableItexPay from '../../components/tableItexPay/OperantTableItexPay';

const TransactionManagement = () => {
	const [value, setValue] = React.useState(0);
	const [download, setDownload] = useState([]);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const [rows, setRows] = useState<ActivityTypes[]>([]);
	const [apiRes, setApiRes] = useState<TransactionManagementApiTypes>();
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);
	const [totalRows, setTotalRows] = useState<number>(0);
	const [reset, setReset] = useState<boolean>(false);
	const [dataValue, setDataValue] = useState<number | string>(0);
	const [search, setSearch] = useState<string>('');

	const [open, setOpen] = useState<boolean>(false);

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
	const [ref, setRef] = useState('');
	const [status, setStatus] = useState('');
	const [payment, setPayment] = useState('');
	const [event, setEvent] = useState('');
	const [bearer, setBearer] = useState<boolean>(false);

	const dispatch = useDispatch();

	const history = useHistory();

	useEffect(() => {
		console.log(fromDate, toDate);
	}, [fromDate, toDate]);

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
		setRef('');
		setBearer(true);
		setIsFilterModalOpen(false);
	};

	const changePage = (value: number) => {
		setPageNumber(value);
		setReset(false);
	};

	const limit = (value: number) => {
		setRowsPerPage(value);
		setReset(false);
	};

	useEffect(() => {
		if (open) history.push(`/transactionmgt/${dataValue}`);
	}, [dataValue, open]);

	const fetchFunction = () => {
		dispatch(openLoader());
		axios
			.get<TransactionManagementApiTypes>(
				`/transaction?perpage=${rowsPerPage}&page=${pageNumber}&fromdate=${fromDate}&todate=${toDate}`
			)
			.then((res) => {
				setApiRes(res?.data);
				setBearer(false);
				dispatch(closeLoader());
			})
			.catch((err) => {
				console.log(err);
				dispatch(closeLoader());
			})
			.finally(() => {
				setIsFilterModalOpen(false);
			});
	};

	useEffect(() => {
		fetchFunction();
	}, [rowsPerPage, pageNumber, bearer]);

	const modalFunc = () => {
		setReset(true);
	};

	useEffect(() => {
		if (apiRes && apiRes?.transactions.length) {
			setTotalRows(apiRes._metadata?.totalcount);
		}
	}, [apiRes]);

	interface Column {
		id:
			| 'merchant_id'
			| 'merchant_name'
			| 'transaction_ref'
			| 'amount'
			| 'status'
			| 'payment_type'
			| 'date';
		label: string;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'merchant_id', label: 'Merchant ID', minWidth: 80 },
		{ id: 'merchant_name', label: 'Merchant Name', minWidth: 80 },
		{ id: 'transaction_ref', label: 'Transaction Reference', minWidth: 80 },
		{ id: 'amount', label: 'Amount', minWidth: 80 },
		{ id: 'status', label: 'Status', minWidth: 80 },
		{ id: 'payment_type', label: 'Payment Type', minWidth: 80 },
		{ id: 'date', label: 'Date', minWidth: 80 },
	];
	const TransactionRowTab = useCallback(
		(
			id: number | string,
			merchantcode: string | number,
			tradingname: string,
			reference: string | number,
			amount: string | number,
			responsecode: string,
			authoption: string | number,
			timein: string,
			linkingreference: string | number
		) => ({
			merchant_id: merchantcode,
			merchant_name: tradingname,
			transaction_ref: reference,
			amount: (
				<NumberFormat
					value={amount}
					thousandSeparator={true}
					prefix={'₦'}
					displayType='text'
				/>
			),
			status: (
				<span
					className={styles.tableSpan}
					style={{
						backgroundColor:
							(responsecode === '00' && '#27AE60') ||
							(responsecode !== '00' && responsecode !== '09' && '#EB5757') ||
							(responsecode === '09' && '#F2C94C') ||
							'rgba(169, 170, 171, 0.22)',
						color: '#FFFFFF',
					}}>
					{(responsecode === '00' && 'Successful') ||
						(responsecode === '09' && 'Pending') ||
						'Failed'}
				</span>
			),
			payment_type: authoption,
			date: timein,
			linkingreference,
		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiRes?.transactions.map((each: any) =>
				newRowOptions.push(
					TransactionRowTab(
						each.id,
						each.business.merchantcode,
						each.business.tradingname,
						each.reference,
						each.currency + parseInt(each.amount),
						each.responsecode,
						each.authoption,
						each.timein,
						each.linkingreference
					)
				)
			);
		setRows(newRowOptions);
	}, [apiRes, TransactionRowTab]);

	// useEffect(() => {
	// 	aYAxios
	// 		.get(`/admin/transactions/download`)
	// 		.then((res: any) => {
	// 			setDownload(res.data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			dispatch(
	// 				openToastAndSetContent({
	// 					toastContent: 'Failed to download transactions',
	// 					toastStyles: {
	// 						backgroundColor: 'red',
	// 					},
	// 				})
	// 			);
	// 		});
	// }, []);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<NavBar name='Transaction Management' />

			<div className={styles.container}>
				<FilterModal
					isOpen={isFilterModalOpen}
					handleClose={() => setIsFilterModalOpen(false)}
					setEvent={setEvent}
					setFromDate={setFromDate}
					setToDate={setToDate}
					setRef={setRef}
					setStatus={setStatus}
					setPayment={setPayment}
					eventDate={event}
					clearHandler={clearHandler}
					setBearer={setBearer}
					status={status}
					payment={payment}
					name='transaction'
					filterFunction={modalFunc}
					changePage={changePage}
				/>
				<div className={styles.tableHeader}>
					<div className={styles.tableHeaderLeft}>
						<h4>{apiRes?._metadata?.totalcount} Transactions</h4>
					</div>
					<div className={styles.tableHeaderRight}>
						<div className={styles.buttonDiv}>
							<button
								className={styles.filterbutton}
								onClick={() => setIsFilterModalOpen(true)}>
								<span className={styles.filterbutton_span_left}>Filter </span>

								<span className={styles.filterbutton_span_right}>
									<ArrowDropDownIcon />
								</span>
							</button>

							<div className={styles.button_business}>
								<CSVLink
									data={download}
									filename={'transactionadmin.csv'}
									className={styles.button_business_button}>
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
								</CSVLink>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.m1}>
					<OperantTableItexPay
						columns={columns}
						rows={rows}
						totalRows={totalRows}
						changePage={changePage}
						limit={limit}
						setDataValue2={setDataValue}
						setOpen2={setOpen}
					/>
				</div>
			</div>
		</div>
	);
};

export default TransactionManagement;
