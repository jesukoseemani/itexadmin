import React, { useState, useEffect, useCallback } from 'react';
import styles from './Businesses.module.scss';
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
import aYAxios from '../../components/axiosInstance';
import SearchComp from '../../components/searchComponent/SearchComp';

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

function Businesses() {
	const [filter, setFilter] = useState('filter');
	const classes = useStyles();
	const [rows, setRows] = useState<any[]>([]);
	const [apiRes, setApiRes] = useState<BusinessTableApiTypes>();
	const [pageNumber, setPageNumber] = useState<number>(1);

	const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
		10
	);
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
	const [query, setQuery] = useState('');
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
		setQuery('');
		setBearer(true);
		setIsFilterModalOpen(false);
	};

	const dispatch = useDispatch();

	const changePage = (value: number) => {
		setPageNumber(value);
	};
	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	const fetchFunction = () => {
		dispatch(openLoader());

		axios
			.get<BusinessTableApiTypes>(
				`/business?perpage=${rowsPerPage}&page=${pageNumber}&fromdate=${fromDate}&todate=${toDate}&search=${query}`
			)
			.then((res) => {
				setApiRes(res.data);
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
	}, [rowsPerPage, pageNumber, bearer, query]);

	const modalFunc = () => {
		setReset(true);
	};

	useEffect(() => {
		if (apiRes && apiRes?.businesses.length) {
			setTotalRows(apiRes._metadata?.totalcount);
		}
	}, [apiRes]);

	useEffect(() => {
		if (open2 && dataValue2 !== null) history.push(`/businesses/${dataValue2}`);
	}, [dataValue2, open2]);

	const editBusinessHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<div className={styles.modalDiv}>
						<AccountType title='Business' />
					</div>
				),
			})
		);
	};

	const boxData = [
		{
			title: 'Active Businesses',
			number: 5,
			identifier: 'active',
		},
		{
			title: 'Pending Businesses',
			number: 5,
			identifier: 'pending',
		},
		{
			title: 'Inactive Businesses',
			number: 5,
			identifier: 'inactive',
		},
	];

	//ENDS FUNCTIONS

	interface Column {
		id:
			| 'status'
			| 'merchantcode'
			| 'business_name'
			| 'email_address'
			| 'business_type'
			| 'country'
			| 'sign_up'
			| 'actions';

		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'status', label: 'Status', minWidth: 100 },
		{ id: 'merchantcode', label: 'Merchant Code', minWidth: 100 },
		{ id: 'business_name', label: 'Business name', minWidth: 100 },
		{
			id: 'email_address',
			label: 'Email address',
			align: 'center',
			minWidth: 100,
		},
		{ id: 'business_type', label: 'Business Type', minWidth: 100 },
		{ id: 'country', label: 'Country', minWidth: 100 },
		{ id: 'sign_up', label: 'Sign up Date', minWidth: 100 },
	];

	const LoanRowTab = useCallback(
		(
			id: number,
			tradingname: string,
			status: string,
			businessemail: string,
			merchantaccounttype: string,
			country: string,
			createdat: string,
			merchantcode: string,
			merchantaccountid: number
		) => ({
			business_name: tradingname,
			status: (
				<button
					className={styles.tableSpan}
					style={{
						backgroundColor: status === '1' ? '#25AC60' : '#D92418',
						color: '#FFFFFF',
					}}>
					{status === '1' ? 'ACTIVE' : 'INACTIVE'}
				</button>
			),
			email_address: businessemail,
			business_type: merchantaccounttype,
			country: country === 'NG' ? 'Nigeria' : country,
			sign_up: createdat,
			merchantcode: merchantcode,
			merchantaccountid,
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
						each.status,
						each.businessemail,
						each.merchantaccounttype,
						each.country,
						each.createdat,
						each.merchantcode,
						each.merchantaccountid
					)
				)
			);
		setRows(newRowOptions);
	}, [apiRes, LoanRowTab]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<div className={styles.container}>
				<FilterModal
					isOpen={isFilterModalOpen}
					handleClose={() => setIsFilterModalOpen(false)}
					setEvent={setEvent}
					setFromDate={setFromDate}
					setToDate={setToDate}
					eventDate={event}
					clearHandler={clearHandler}
					setBearer={setBearer}
					name='business'
					filterFunction={modalFunc}
					changePage={changePage}
				/>
				<NavBar name='business' />
				<div className={styles.header}>
					<div className={styles.header_left}>
						<h1 className={styles.header_left_h1}>
							{apiRes?._metadata.totalcount} Businesses
						</h1>
					</div>
					<div className={styles.header_right}>
						{/* <div className={styles.selectwrapper}>
							<button
								className={styles.filterbutton}
								onClick={() => setIsFilterModalOpen(true)}>
								<span className={styles.filterbutton_span_left}>Filter </span>

								<span className={styles.filterbutton_span_right}>
									<ArrowDropDownIcon />
								</span>
							</button>
						</div> */}

						<SearchComp setSearch={setQuery} />
						<div className={styles.button_business}>
							<button
								onClick={editBusinessHandler}
								className={styles.button_business_button}>
								<span className={styles.button_business_span}>+</span> &nbsp;
								New business
							</button>
						</div>
					</div>
				</div>

				{/* <div className={styles.box}>
					{boxData?.map(({ title, number, identifier }) => (
						<div
							// onClick={() => setApproved(identifier)}
							className={styles.singleBox}>
							<p>{title}</p>
							<h3>{number}</h3>
						</div>
					))}
				</div> */}

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
		</div>
	);
}

export default Businesses;
