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

	const fetchFunction = () => {
		dispatch(openLoader());

		axios
			.get<BusinessTableApiTypes>(
				`/admin/business?perpage=${rowsPerPage}&page=${pageNumber}&fromdate=${fromDate}&todate=${toDate}&email=${email}&paymentmethod=${status}&approved=${approved}`
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
	}, [rowsPerPage, pageNumber, bearer, approved]);

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
			| 'contact_person'
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
		{ id: 'contact_person', label: 'Contact person', minWidth: 100 },
		{ id: 'country', label: 'Country', minWidth: 100 },
		{ id: 'sign_up', label: 'Sign up Date', minWidth: 100 },
	];

	const LoanRowTab = useCallback(
		(
			id: number | string,
			tradingname: string,
			approved: string,
			email: number,
			firstname: string,
			lastname: string,
			country: string,
			added: string,
			merchantcode: string
		) => ({
			business_name: tradingname,
			status: (
				<button
					className={styles.tableSpan}
					style={{
						backgroundColor:
							(approved === 'APPROVED' && '#25AC60') ||
							(approved === 'DECLINED' && '#D92418') ||
							(approved === 'PENDING' && '#CEA528') ||
							'rgba(169, 170, 171, 0.22)',
						color:
							(approved === 'APPROVED' && '#FFFFFF') ||
							(approved === 'DECLINED' && '#FFFFFF') ||
							(approved === 'PENDING' && '#FFFFFF') ||
							'#FFFFFF',
					}}>
					{approved.toLocaleLowerCase()}
				</button>
			),
			email_address: email,
			contact_person: (
				<div>
					{firstname ? firstname : ''} {lastname ? lastname : ''}
				</div>
			),
			country: country === 'NG' ? 'Nigeria' : 'null',
			sign_up: `${format(parseISO(added), 'MMMM dd, yyyy')}`,
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
						each.country,
						each.added,
						each.merchantcode
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
					setEmail={setEmail}
					setStatus={setStatus}
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
						<div className={styles.selectwrapper}>
							<button
								className={styles.filterbutton}
								onClick={() => setIsFilterModalOpen(true)}>
								<span className={styles.filterbutton_span_left}>Filter </span>

								<span className={styles.filterbutton_span_right}>
									<ArrowDropDownIcon />
								</span>
							</button>
						</div>
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

				<div className={styles.box}>
					{boxData?.map(({ title, number, identifier }) => (
						<div
							onClick={() => setApproved(identifier)}
							className={styles.singleBox}>
							<p>{title}</p>
							<h3>{number}</h3>
						</div>
					))}
				</div>

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
