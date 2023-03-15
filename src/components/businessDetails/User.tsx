import React, { useEffect, useState } from 'react';
import styles from './BusinessDetails.module.scss';
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
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import {
	BusinessUserModuleData,
	ColumnBusinessUserModule,
} from '../../types/BusinessModule';
import PaginationTable from '../../components/paginatedTable/pagination-table';
import TableHeader from '../../components/TableHeader/TableHeader';
import StatusView from '../../components/StatusView/StatusView';
import { useHistory } from 'react-router-dom';

function User({ id }: { id: number | undefined }) {
	const [tableRow, setTableRow] = useState<any[]>();
	const [businesses, setBusinesses] = useState<any>();
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
				`/business/${id}/customers?status=${status}&date=${toDate}&search=${value}&perpage=${rowsPerPage}&page=${pageNumber}`
			);
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
		setPageNumber(businesses?._metadata?.page || 1);
	}, [businesses]);

	const dataBusinesses = () => {
		const tempArr: BusinessUserModuleData[] = [];
		businesses?.businessUsers
			?.slice(0)
			.reverse()
			.forEach((business: any, index: number) => {
				return tempArr.push({
					firstname: business.firstnane,
					email: business.email,
					bvn: business.bvn,
					phonenumber: business.phonenumber,
					country: business.country,
					status: (
						<StatusView
							status={business?.status}
							green='Active'
							red='InActive'
						/>
					),
					createdat: business.createdat,
					nin: business.nin,
					lastlogin: business.lastlogin,
				});
			});
		return tempArr;
	};

	useEffect(() => {
		setTableRow(dataBusinesses());
	}, [businesses?.businessUsers]);

	return (
		<div className={styles.containerHeader}>
			<TableHeader
				pageName=''
				data={businesses?.businessUsers}
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
				columns={ColumnBusinessUserModule ? ColumnBusinessUserModule : []}
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
				clickAction={false}
				setContentAction={setContentAction}
			/>
		</div>
	);
}

export default User;
