import React, { useEffect, useState } from 'react';
import styles from './Businesses.module.scss';
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
	ColumnBusinessModule,
	BusinessModuleData,
} from '../../types/BusinessModule';
import PaginationTable from '../../components/paginatedTable/pagination-table';
import TableHeader from '../../components/TableHeader/TableHeader';
import StatusView from '../../components/StatusView/StatusView';
import { useHistory } from 'react-router-dom';
import NotPermitted from '../../components/NotPermitted';

function Businesses() {
	const [tableRow, setTableRow] = useState<any[]>();
	const [businesses, setBusinesses] = useState<any>();
	const [contentAction, setContentAction] = useState<any>({});
	const history = useHistory();

	const {
		VIEW_BUSINESS,
	
	} = useSelector((state) => state?.permissionPayReducer.permission);

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
			const { data } = await axios.get(
				`/v1/business?status=${status}&date=${toDate}&search=${value}&perpage=${rowsPerPage}&page=${pageNumber}`
			);
			setBusinesses(data);
			dispatch(closeLoader());
			setBearer(false);
			console.log(data, 'data');
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
		setPageNumber(businesses?._metadata?.page || 1);
	}, [businesses]);

	useEffect(() => {
		Object.values(contentAction).length > 0 &&
			history.push(`/businesses/${contentAction?.id}`);
	}, [contentAction]);

	const dataBusinesses = () => {
		const tempArr: BusinessModuleData[] = [];
		businesses?.businesses
			?.slice(0)
			.reverse()
			.forEach((business: any, index: number) => {
				return tempArr.push({
					tradingname: business?.tradingname,
					businessemail: business?.businessemail,
					country: business?.country,
					merchantaccounttype: business?.merchantaccounttype,
					merchantcode: business?.merchantcode,
					status: (
						<StatusView
							status={business?.status === 0 ? 'InActive' : 'Active'}
							green='Active'
							red='InActive'
						/>
					),
					createdat: business?.createdat,
					id: business?.merchantaccountid,
				});
			});
		return tempArr;
	};

	useEffect(() => {
		setTableRow(dataBusinesses());
	}, [businesses?.businesses]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<NavBar name='business' />
			{VIEW_BUSINESS ? (
				<div className={styles.container}>
					<TableHeader
						pageName='Businesses'
						data={businesses?.businesses}
						dataLength={businesses?._metadata.totalcount}
						value={value}
						setValue={setValue}
						dropdown={dropdown}
						setDropdown={setDropdown}
						placeHolder='Search'
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
						columns={ColumnBusinessModule ? ColumnBusinessModule : []}
						emptyPlaceHolder={
							businesses?._metadata?.totalcount == 0
								? 'You currently do not have any data'
								: 'Loading...'
						}
						value={value}
						total={businesses?._metadata.totalcount}
						totalPage={businesses?._metadata.pagecount}
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
			) : (
			<NotPermitted title='BUSINESS'/>
			)}
		</div>
	);
}

export default Businesses;
