import React, { useEffect, useState } from 'react';
import AreChart from '../../components/areaChart/AreChart';
import BarTopFilter from '../../components/BarTopFilter/BarTopFilter';
import NavBar from '../../components/navbar/NavBar';
import PieChart2 from '../../components/pieChart2/PieChart2';
import styles from './AdminOverview.module.scss';
import ProgressBar from '../../components/progressbar/ProgressBar';
import axios from 'axios';
import { saveMe } from '../../redux/actions/me/meActions';
import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { Divider } from '@material-ui/core';
import BarTopFilterDate from '../../components/barTopFilterDate/BarTopFilterDate';
import {
	dateIT,
	sevenDaysAgo,
	thirtyDaysAgo,
	yesterday,
	startOfYear,
	convertApiDate,
	endOfYear,
} from '../../util/DateUtil';
import useCalender from '../../hooks/useCalender';
import { numberWithCommas } from '../../util/formatNumber';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import OverviewTable from '../../components/OverviewTable/OverviewTable';
import DashboardProductTable from '../../components/dashboardProductTable/DashboardProductTable';
import PieChart from '../../components/pieChart/PieChart';
import SimpleBarChart from '../../components/simpleBarChart/SimpleBarChart';
import PolarAreaChart from '../../components/polarAreaChart/PolarAreaChart';
import moment from 'moment';

interface infoTypes {
	currency: string;
	total: number;
	total_count: number;
	success: number;
	success_count: number;
	failed: number;
	failed_count: number;
	pending: number;
	pending_count: number;
}

interface businessType {
	tradingname: string;
	merchantcode: string;
	currency: string;
	transaction_amount: string;
	transaction_count: string;
}

interface failureType {
	responsecode: string;
	count: number;
}
interface currencyType {
	date: string;
	currency?: string;
	total?: number;
	success?: number;
	failed?: number;
	pending?: number;
}
interface countryType {
	country: string;
	total: number;
}

interface transactionType {
	date: string;
	total: number;
	success: number;
	failed: number;
	pending: number;
}

const AdminOverview = () => {
	const dispatch = useDispatch();
	const [info, setInfo] = useState<infoTypes[]>([]);
	const [topBusiness, setTopBusiness] = useState<businessType[]>([]);
	const [topFailure, setTopFailure] = useState<failureType[]>([]);
	const [topCurrency, setTopCurrency] = useState<currencyType[]>([]);
	const [topCountry, setTopCountry] = useState<countryType[]>([]);
	const [topTransaction, setTopTransaction] = useState<transactionType[]>([]);
	const [topCardType, setTopCardType] = useState<any>([]);
	const [topChargeType, setTopChargeType] = useState<any>([]);
	const { calender, setCalender } = useCalender();
	const [dateEvent, setDateEvent] = useState<string>('last7days');
	const [startDate, setStartDate] = useState(sevenDaysAgo);
	const [endDate, setEndDate] = useState(dateIT);
	const [newList, setNewList] = useState<any>([]);

	useEffect(() => {
		console.log('calendery', calender);
	}, [calender]);

	useEffect(() => {
		axios
			.get(`/v1/profile/me`)
			.then((res) => {
				dispatch(saveMe(res.data));
			})
			.catch((err) => console.log(err));
	}, [dispatch]);

	useEffect(() => {
		if (dateEvent === 'last7days') {
			setStartDate(sevenDaysAgo);
			setEndDate(dateIT);
		} else if (dateEvent === 'last30days') {
			setStartDate(thirtyDaysAgo);
			setEndDate(dateIT);
		} else if (dateEvent === 'lastyear') {
			setStartDate(startOfYear);
			setEndDate(endOfYear);
		} else if (
			dateEvent === 'custom' &&
			calender[0] === '' &&
			calender[1] === ''
		) {
			setStartDate(calender[0]);
			setEndDate(calender[1]);
		} else {
			return;
		}
	}, [dateEvent, calender[0], calender[1]]);

	const trendTransaction = () => {
		dispatch(openLoader());
		axios
			.get(
				`/v1/trend/transaction/summary?fromdate=${startDate}&todate=${endDate}`
			)
			.then((res: any) => {
				dispatch(closeLoader());

				setInfo(res.data.data);
			})
			.catch((err) => {
				console.log(err);
				dispatch(closeLoader());

				dispatch(
					openToastAndSetContent({
						toastContent: err?.data?.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			});
	};

	const topBusinessFn = () => {
		dispatch(openLoader());
		axios
			.get(`/v1/trend/top/business?fromdate=${startDate}&todate=${endDate}`)
			.then((res: any) => {
				dispatch(closeLoader());

				setTopBusiness(res.data.data);
			})
			.catch((err) => {
				console.log(err);
				dispatch(closeLoader());

				dispatch(
					openToastAndSetContent({
						toastContent: err?.data?.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			});
	};

	const topFailureFn = () => {
		dispatch(openLoader());
		axios
			.get(`/v1/trend/top/failure?fromdate=${startDate}&todate=${endDate}`)
			.then((res: any) => {
				dispatch(closeLoader());
				setTopFailure(res.data.data);
			})
			.catch((err) => {
				console.log(err);
				dispatch(closeLoader());

				dispatch(
					openToastAndSetContent({
						toastContent: err?.data?.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			});
	};

	const topCurrencyFn = () => {
		dispatch(openLoader());
		axios
			.get(
				`/v1/trend/transaction/chart/currency?fromdate=${startDate}&todate=${endDate}`
			)
			.then((res: any) => {
				dispatch(closeLoader());
				setTopCurrency(res.data.data);
			})
			.catch((err) => {
				console.log(err);
				dispatch(closeLoader());

				dispatch(
					openToastAndSetContent({
						toastContent: err?.data?.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			});
	};
	const topCountryFn = () => {
		dispatch(openLoader());
		axios
			.get(`/v1/trend/top/country?fromdate=${startDate}&todate=${endDate}`)
			.then((res: any) => {
				dispatch(closeLoader());
				setTopCountry(res.data.data);
			})
			.catch((err) => {
				console.log(err);
				dispatch(closeLoader());

				dispatch(
					openToastAndSetContent({
						toastContent: err?.data?.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			});
	};

	const topTransactionFn = () => {
		dispatch(openLoader());
		axios
			.get(
				`/v1/trend/transaction/chart?fromdate=${startDate}&todate=${endDate}`
			)
			.then((res: any) => {
				dispatch(closeLoader());
				setTopTransaction(res.data.data);
			})
			.catch((err) => {
				console.log(err);
				dispatch(closeLoader());

				dispatch(
					openToastAndSetContent({
						toastContent: err?.data?.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			});
	};

	const topCardTypeFn = () => {
		dispatch(openLoader());
		axios
			.get(`/v1/trend/top/cardtype?fromdate=${startDate}&todate=${endDate}`)
			.then((res: any) => {
				dispatch(closeLoader());
				setTopCardType(res.data.data);
			})
			.catch((err) => {
				console.log(err);
				dispatch(closeLoader());

				dispatch(
					openToastAndSetContent({
						toastContent: err?.data?.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			});
	};

	const topChargeTypeFn = () => {
		dispatch(openLoader());
		axios
			.get(`/v1/trend/top/chargetype?fromdate=${startDate}&todate=${endDate}`)
			.then((res: any) => {
				dispatch(closeLoader());
				setTopChargeType(res.data.data);
			})
			.catch((err) => {
				console.log(err);
				dispatch(closeLoader());

				dispatch(
					openToastAndSetContent({
						toastContent: err?.data?.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			});
	};

	useEffect(() => {
		trendTransaction();
		topBusinessFn();
		topFailureFn();
		topCurrencyFn();
		topCountryFn();
		topTransactionFn();
		topCardTypeFn();
		topChargeTypeFn();
	}, [startDate, endDate, calender]);

	const colorFalure = [
		'#3C486B',
		'#F0F0F0',
		'#F9D949',
		'#F45050',
		'#070A52',
		'#D21312',
	];

	useEffect(() => {
		const newList = topFailure.map((item: any) => {
			item['name'] = item.responsecode;
			item['value'] = item.count;
			item['color'] = colorFalure[0];
			colorFalure.shift();
			return item;
		});

		setNewList(newList);
	}, [topFailure]);

	return (
		<div className={styles.wrapper}>
			<NavBar name='overview' />
			<BarTopFilterDate
				title='Overview'
				setDateEvent={setDateEvent}
				dateEvent={dateEvent}
				calender={calender}
				setCalender={setCalender}
				showMenu={false}
			/>

			<div className={styles.detailBox}>
				<div className={styles.detailBoxCorner}>
					<h3 className={styles.detailh3}>Transaction Summary</h3>
				</div>

				<Divider style={{ color: '#CECECD' }} />
				<div
					style={{
						padding: '0 24px',
					}}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={2} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>CURRENCY</div>
								<div className={styles.detailsKey}>
									{' '}
									{info[0]?.currency || 'Not Provider'}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>TOTAL TRANSACTION</div>
								<div className={styles.detailsKey}>
									{info[0]?.currency}
									{(info[0]?.total && numberWithCommas(info[0]?.total)) || 0}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={2} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>
									TOTAL TRANSACTION COUNT
								</div>
								<div className={styles.detailsKey}>
									{info[0]?.total_count || 0}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>
									SUCCESSFUL TRANSACTION
								</div>
								<div className={styles.detailsKey}>
									{info[0]?.currency}
									{(info[0]?.success && numberWithCommas(info[0]?.success)) ||
										0}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>
									SUCCESSFUL TRANSACTION COUNT
								</div>
								<div className={styles.detailsKey}>
									{info[0]?.success_count || 0}
								</div>
							</div>
						</Grid>{' '}
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>FAILED TRANSACTION</div>
								<div className={styles.detailsKey}>
									{info[0]?.currency}
									{info[0]?.failed || 0}
								</div>
							</div>
						</Grid>{' '}
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>
									FAILED TRANSACTION COUNT
								</div>
								<div className={styles.detailsKey}>
									{info[0]?.failed_count || 0}{' '}
								</div>
							</div>
						</Grid>{' '}
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>PENDING TRANSACTION</div>
								<div className={styles.detailsKey}>
									{info[0]?.currency}
									{info[0]?.pending || 0}
								</div>
							</div>
						</Grid>{' '}
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>
									PENDING TRANSACTION COUNT
								</div>
								<div className={styles.detailsKey}>
									{info[0]?.pending_count || 0}{' '}
								</div>
							</div>
						</Grid>{' '}
					</Grid>
				</div>
			</div>

			<div
				style={{
					padding: '0 24px',
				}}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<OverviewTable title='Top Businesses'>
							<DashboardProductTable data={topBusiness} />
						</OverviewTable>
					</Grid>
					<Grid item xs={12} md={6}>
						<OverviewTable title='Top Failures'>
							{topFailure.length > 0 ? (
								<PieChart data={newList} />
							) : (
								<p
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: '100%',
										fontWeight: 'bold',
									}}>
									No Data Found
								</p>
							)}
						</OverviewTable>
					</Grid>
					<Grid item xs={12} md={6}>
						<OverviewTable title='Currencies'>
							{topCurrency.length > 0 ? (
								<SimpleBarChart data={topCurrency} identifier='date' />
							) : (
								<p
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: '100%',
										fontWeight: 'bold',
									}}>
									No Data Found
								</p>
							)}
						</OverviewTable>
					</Grid>
					<Grid item xs={12} md={6}>
						<OverviewTable title='Countries'>
							{topCountry.length > 0 ? (
								<PolarAreaChart data={topCountry} />
							) : (
								<p
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: '100%',
										fontWeight: 'bold',
									}}>
									No Data Found
								</p>
							)}
						</OverviewTable>
					</Grid>
					<Grid item xs={12} md={6}>
						<OverviewTable title='Card Type'>
							{topCardType.length > 0 ? (
								<SimpleBarChart data={topCardType} identifier='cardtype' />
							) : (
								<p
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: '100%',
										fontWeight: 'bold',
									}}>
									No Data Found
								</p>
							)}
						</OverviewTable>
					</Grid>
					<Grid item xs={12} md={6}>
						<OverviewTable title='Chargetype'>
							{topChargeType.length > 0 ? (
								<SimpleBarChart data={topChargeType} identifier='chargetype' />
							) : (
								<p
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: '100%',
										fontWeight: 'bold',
									}}>
									No Data Found
								</p>
							)}
						</OverviewTable>
					</Grid>
					<Grid item xs={12}>
						<OverviewTable title='Transactions'>
							{topTransaction.length > 0 ? (
								<SimpleBarChart data={topTransaction} identifier='date' />
							) : (
								<p
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: '100%',
										fontWeight: 'bold',
									}}>
									No Data Found
								</p>
							)}
						</OverviewTable>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default AdminOverview;
