import React, { useEffect, useState } from 'react';
import styles from './TransactionManagement.module.scss';
import NavBar from '../../components/navbar/NavBar';
import FilterModal from '../../components/filterConfig/FilterModal';
import dayjs, { Dayjs } from 'dayjs';
import {
	dateNow,
	sevenDaysAgo,
	thirtyDaysAgo,
	startOfYear,
	endOfYear,
} from '../../util/datefunction';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import {
	ColumnTransactionModule,
	TransactionModuleData,
} from '../../types/TransactionModule';
import PaginationTable from '../../components/paginatedTable/pagination-table';
import TableHeader from '../../components/TableHeader/TableHeader';
import StatusView from '../../components/StatusView/StatusView';
import { useHistory } from 'react-router-dom';
import useDownload from '../../interfaces/Download';
import { useAsyncDebounce } from 'react-table';

function TransactionManagement() {
	const [tableRow, setTableRow] = useState<any[]>();
	const [transaction, setTransaction] = useState<any>();
	const [contentAction, setContentAction] = useState<any>({});
	const history = useHistory();

	const dispatch = useDispatch();
	//PAGINATION
	const [pageNumber, setPageNumber] = React.useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
	const [nextPage, setNextPage] = useState<number | null>(null);
	const [previousPage, setPreviousPage] = useState<number | null>(null);

	//FILTERING
	const [value, setValue] = useState('');
	const [dropdown, setDropdown] = useState(false);
	const [eventDate, setEventDate] = useState('');
	const [fromDate, setFromDate] = useState<Dayjs | null | string>('');
	const [toDate, setToDate] = useState<Dayjs | null | string>('');
	const [country, setCountry] = useState('');
	const [status, setStatus] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('');
	const [ref, setRef] = useState('');

	const [bearer, setBearer] = useState(false);

	const clearHandler = () => {
		setEventDate('');
		setFromDate('');
		setToDate('');
		setCountry('');
		setStatus('');
		setDropdown(false);
		setBearer(true);
	};

	useEffect(() => {
		if (eventDate === 'today') {
			setFromDate(dateNow);
			setToDate(dateNow);
		} else if (eventDate === 'last7days') {
			setFromDate(sevenDaysAgo);
			setToDate(dateNow);
		} else if (eventDate === 'last30days') {
			setFromDate(thirtyDaysAgo);
			setToDate(dateNow);
		} else if (eventDate === 'oneyear') {
			setFromDate(startOfYear);
			setToDate(endOfYear);
		} else {
			setFromDate('');
			setToDate('');
		}
	}, [eventDate]);

	const filteredArray = [
		{
			name: 'Status',
			value: status,
			setValue: setStatus,
			selective: [
				{ name: 'approved' },
				{ name: 'pending' },
				{ name: 'declined' },
			],
		},
		{
			name: 'Payment Method',
			value: paymentMethod,
			setValue: setPaymentMethod,
		},
		{
			name: 'Reference',
			value: ref,
			setValue: setRef,
		},
	];

	const fetchBusinesses = async () => {
		dispatch(openLoader());
		try {
			const { data } = await axios.get(
				`/v1/transaction?fromdate=${fromDate}&todate=${toDate}&perpage=${rowsPerPage}&page=${pageNumber}`
			);
			setTransaction(data);
			dispatch(closeLoader());
			setBearer(false);
			// console.log(transaction)
		} catch (error: any) {
			dispatch(closeLoader());
			const { message } = error.response.data;
			dispatch(
				dispatch(
					openToastAndSetContent({
						toastContent: message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				)
			);
		}
	};

	useEffect(() => {
		fetchBusinesses();
	}, [bearer, value, pageNumber, rowsPerPage]);

	useEffect(() => {
		setPageNumber(transaction?._metadata?.page || 1);
	}, [transaction]);

	useEffect(() => {
		Object.values(contentAction).length > 0 &&
			history.push(`/transactionmgt/${contentAction?.paymentid}`);
		console.log(contentAction);
	}, [contentAction]);

	const dataBusinesses = () => {
		const tempArr: TransactionModuleData[] = [];
		transaction?.transactions
			?.slice(0)
			.reverse()
			.forEach((transaction: any, index: number) => {
				return tempArr.push({
					merchant_id: transaction.business.merchantcode,
					merchant_name: transaction.business.tradingname,
					transaction_ref: transaction.paymentid,
					amount: `${transaction.currency}${transaction.amount.toFixed(2)}`,
					payment_type: transaction.merchantcode,
					paymentid: transaction.paymentid,
					status: (
						<StatusView
							status={
								transaction?.responsecode === '00'
									? 'Successful'
									: transaction?.responsecode === '09'
									? 'Pending'
									: 'Failed'
							}
							green='Successful'
							red='Failed'
							orange='Pending'
						/>
					),
					date: transaction.timein,
					id: transaction.business.merchantaccountid,
				});
			});
		return tempArr;
	};

	useEffect(() => {
		setTableRow(dataBusinesses());
	}, [transaction?.transactions]);
	
const { calDownload } = useDownload(
	{ url: 'https://staging.itex-pay.com/ipgadmin/api/v1/transaction/download', filename: 'transactions' }
);
	const downloadHandler = async() => {
		try {
			dispatch(openLoader());
			await calDownload();
			dispatch(closeLoader());
		} catch (error) {
			dispatch(closeLoader());
		}
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<NavBar name='business' />
			<div className={styles.container}>
				<TableHeader
					pageName='Transactions'
					data={transaction?.transactions}
					dataLength={transaction?._metadata.totalcount}
					value={value}
					setValue={setValue}
					dropdown={dropdown}
					setDropdown={setDropdown}
					placeHolder='Search'
					handleClick={downloadHandler}
					FilterComponent={
						<FilterModal
							eventDate={eventDate}
							setEventDate={setEventDate}
							dropdown={dropdown}
							setDropdown={setDropdown}
							setFromDate={setFromDate}
							setToDate={setToDate}
							fromDate={fromDate}
							toDate={toDate}
							setBearer={setBearer}
							clearHandler={clearHandler}
							filteredArray={filteredArray}
						/>
					}
				/>

				<PaginationTable
					data={tableRow ? tableRow : []}
					columns={ColumnTransactionModule ? ColumnTransactionModule : []}
					emptyPlaceHolder={
						transaction?._metadata?.totalcount == 0
							? 'You currently do not have any data'
							: 'Loading...'
					}
					value={value}
					total={transaction?._metadata.totalcount}
					totalPage={transaction?._metadata.pagecount}
					pageNumber={pageNumber}
					setPageNumber={setPageNumber}
					nextPage={nextPage}
					setNextPage={setNextPage}
					previousPage={previousPage}
					setPreviousPage={setPreviousPage}
					rowsPerPage={rowsPerPage}
					setRowsPerPage={setRowsPerPage}
					clickAction={true}
					setContentAction={setContentAction}
				/>
			</div>
		</div>
	);
}

export default TransactionManagement;
