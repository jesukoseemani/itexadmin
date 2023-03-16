import React, { useEffect, useState } from 'react';
import styles from './ChargebackManagement.module.scss';
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
	ColumnChargeBackModule,
	ChargebackModuleData,
} from '../../types/ChargebackModule';
import PaginationTable from '../../components/paginatedTable/pagination-table';
import TableHeader from '../../components/TableHeader/TableHeader';
import StatusView from '../../components/StatusView/StatusView';
import { useHistory } from 'react-router-dom';
import SingleChargeRequest from '../../components/ModalsReuse/businessDetailsModal/SingleChargeRequest';
import BulkChargeRequest from '../../components/ModalsReuse/businessDetailsModal/BulkChargeRequest';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material';

function AllChargebacks() {
	const [tableRow, setTableRow] = useState<any[]>();
	const [businesses, setBusinesses] = useState<any>();
	const [contentAction, setContentAction] = useState<any>({});
	const history = useHistory();

	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
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
				`/chargeback?status=${status}&date=${toDate}&search=${value}&perpage=${rowsPerPage}&page=${pageNumber}`
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
		const tempArr: ChargebackModuleData[] = [];
		businesses?.chargebacks
			?.slice(0)
			.reverse()
			.forEach((business: any, index: number) => {
				return tempArr.push({
					amount: business?.amount,
					status: (
						<span
							className={styles.tableSpan}
							style={{
								backgroundColor:
									(business?.status === 'won' && '#27AE60') ||
									(business?.status === 'failed' && '#EB5757') ||
									(business?.status === 'pending' && '#F2C94C') ||
									'rgba(169, 170, 171, 0.22)',
								color:
									(business?.status === 'won' && '#FFFFFF') ||
									(business?.status === 'failed' && '#FFFFFF') ||
									(business?.status === 'pending' && '#12122C') ||
									'#FFFFFF',
							}}>
							{business?.status}
						</span>
					),
					business_name: business?.business?.tradingname,
					customeremail: business?.customeremail,
					transaction_ref: business?.linkingreference,
					reason: business?.chargebackreason,
					date_created: business?.createdat,
					date_due: business?.duedate,
					action: (
						<div className={styles.actionWrapper}>
							<button className={styles.actionButtonResolve}>
							Resolve
						</button>
						<button className={styles.actionButtonDetails}>
							Details
						</button>
						</div>
						
					),
					id: business?.id,
				});
			});
		return tempArr;
	};

	useEffect(() => {
		setTableRow(dataBusinesses());
	}, [businesses?.chargebacks]);

	const singleChargeHandler = () => {
		handleClose();
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<>
						<SingleChargeRequest />
					</>
				),
			})
		);
	};

	const bulkChargeHandler = () => {
		handleClose();
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<>
						<BulkChargeRequest />
					</>
				),
			})
		);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<NavBar name='business' />
			<div className={styles.container}>
				<TableHeader
					pageName='Chargeback'
					data={businesses?.chargebacks}
					dataLength={businesses?._metadata.totalcount}
					value={value}
					setValue={setValue}
					dropdown={dropdown}
					setDropdown={setDropdown}
					placeHolder='Search'
					newButton={
						<>
							<button className={styles.button_mark_button} onClick={handleClick}>
							Log chargeback
						</button>
						<Menu
							id='basic-menu'
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
							style={{ margin: '10px 0px' }}>
							<MenuItem
								onClick={singleChargeHandler}
								style={{ padding: '0px 30px' }}>
								Single chargeback
							</MenuItem>
							<Divider />
							<MenuItem
								onClick={bulkChargeHandler}
								style={{ padding: '0px 30px' }}>
								Bulk chargeback
							</MenuItem>
						</Menu>
						</>
					}
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
					columns={ColumnChargeBackModule ? ColumnChargeBackModule : []}
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
				/>
			</div>
		</div>
	);
}

export default AllChargebacks;
