import React, { useEffect, useState } from 'react';
import styles from './BusinessDetails.module.scss';
import NavBar from '../navbar/NavBar';
import FilterModal from '../filterConfig/FilterModal';
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
	ColumnBusinessFeeModule,
	BusinessFeeModuleData,
} from '../../types/BusinessModule';
import PaginationTable from '../paginatedTable/pagination-table';
import TableHeader from '../TableHeader/TableHeader';
import StatusView from '../StatusView/StatusView';
import { useHistory } from 'react-router-dom';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import BusinessFee from './businessFee/BusinessFee';
import NotPermitted from '../NotPermitted';

function Fee({ id }: { id: number | undefined }) {
	const [tableRow, setTableRow] = useState<any[]>();
	const [businesses, setBusinesses] = useState<any>();
	const [contentAction, setContentAction] = useState<any>({});
	const history = useHistory();

	const dispatch = useDispatch();
	const { modalOpened } = useSelector((state) => state.modal);
	const { VIEW_BUSINESS_FEES, ADD_BUSINESS_FEE } = useSelector(
		(state) => state?.permissionPayReducer.permission
	);

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
	const [email, setEmail] = useState('');

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
			selective: [{ name: 'YES' }, { name: 'NO' }],
		},
	];

	const fetchBusinesses = async () => {
		dispatch(openLoader());
		try {
			const { data } = await axios.get(`/v1/business/${id}/fees`);
			setBusinesses(data);
			dispatch(closeLoader());
			setBearer(false);
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
		Object.values(contentAction).length > 0 && editConfigHandler('Edit');
	}, [contentAction]);

	useEffect(() => {
		if (!modalOpened) setContentAction({});
	}, [modalOpened]);

	const dataBusinesses = () => {
		const tempArr: BusinessFeeModuleData[] = [];
		businesses?.fees
			?.slice(0)
			.reverse()
			.forEach((business: any, index: number) => {
				return tempArr.push({
					category: business?.industrycategory,
					transactiontype: business?.transactiontype,
					auth: business?.authoption,
					fee: business?.feesetting,
					min: `${business?.feecurrency} ${business?.feemin}`,
					max: `${business?.feecurrency} ${business?.feecap}`,
					status: (
						<StatusView
							status={business?.status === '0' ? 'InActive' : 'Active'}
							orange='InActive'
							green='Active'
						/>
					),
					createdat: business?.createdat,
					timein: business?.timeapproved,
					payment: business?.paymentmethod,
					transactionlocale: business?.transactionlocale,
					cumulativeTransactionLimit: business?.cumulativeTransactionLimit,
					id: business.id,
				});
			});
		return tempArr;
	};

	useEffect(() => {
		setTableRow(dataBusinesses());
	}, [businesses?.fees]);

	const editConfigHandler = (identifier: string) => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<div className={styles.modalDiv}>
						<BusinessFee
							id={id}
							content={contentAction}
							identifier={identifier}
						/>
					</div>
				),
			})
		);
	};

	return (
		<div className={styles.containerHeader}>
			{ADD_BUSINESS_FEE && (
				<div className={styles.buttonmove}>
					<button
						onClick={() => editConfigHandler('Add')}
						className={styles.downloadbutton}>
						Add Fee
					</button>
				</div>
			)}

			{VIEW_BUSINESS_FEES ? (
				<PaginationTable
					data={tableRow ? tableRow : []}
					columns={ColumnBusinessFeeModule ? ColumnBusinessFeeModule : []}
					emptyPlaceHolder={
						businesses?.fees?.length == 0
							? 'You currently do not have any data'
							: 'Loading...'
					}
					value={value}
					total={businesses?.fees?.length}
					totalPage={businesses?.fees?.length}
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
					recent={false}
				/>
			) : (
				<NotPermitted title='BUSINESS FEE' />
			)}
		</div>
	);
}

export default Fee;
