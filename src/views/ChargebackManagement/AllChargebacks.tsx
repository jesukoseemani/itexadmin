import React, { useState, useEffect, useCallback } from 'react';
import styles from './ChargebackManagement.module.scss';
import { makeStyles } from '@material-ui/core';
import NavBar from '../../components/navbar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import OperantTableItexPay from '../../components/tableItexPay/OperantTableItexPay';
import axios from 'axios';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useHistory } from 'react-router';
import Divider from '@mui/material/Divider';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterModal from '../../components/filterConfig/FilterModal';
import SingleChargeRequest from '../../components/ModalsReuse/businessDetailsModal/SingleChargeRequest';
import BulkChargeRequest from '../../components/ModalsReuse/businessDetailsModal/BulkChargeRequest';
import moment from 'moment';
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

	rootMenu: {
		'&:hover': {
			background: 'none',
		},
	},
	listMenu: {
		backgroundColor: '#ffffff',
		// width: '10rem',
		overflow: 'hidden',
		color: 'rgba(0, 40, 65, 0.8)',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		padding: '0 10px',
	},
	primaryMenu: {
		fontSize: '212px',
	},
	paperMenu: {
		boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.2)',
	},
});

function AllChargebacks() {
	const [filter, setFilter] = useState('filter');
	const classes = useStyles();
	const [rows, setRows] = useState<any[]>([]);
	const [apiRes, setApiRes] = useState<dataTypes[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
		10
	);
	const [dataValue, setDataValue] = useState<number | string>(0);
	const [selected, setSelected] = useState<any>([]);
	const [selectedId, setSelectedId] = useState<{ id: string; type: string }>({
		id: '',
		type: '',
	});
	const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
	const history = useHistory();
	const [totalRows, setTotalRows] = useState<number>(0);
	const [gotopage, setGotopage] = useState<boolean>(false);

	interface dataTypes {
		id: string;
		amount: string;
		status: string;
		business_name: number;
		transaction_ref: string;
		date_created: string;
		date_due: string;
	}

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
		const [anchorElDownload, setAnchorElDownload] =
			useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [openDownload, setOpenDownload] = useState<boolean>(false);
	const showDownload = Boolean(anchorElDownload);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleMenuDownloadClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		setAnchorElDownload(event.currentTarget);
	};
	const handleMenuDownloadClose = () => {
		setAnchorElDownload(null);
	};

	// const handleClick = (event: any) => {
	// 	setAnchorEl(event.currentTarget);
	// 	setDataValue(event.currentTarget.getAttribute('data-value'));
	// };

	// const handleClose = () => {
	// 	setAnchorEl(null);
	// };

	const dispatch = useDispatch();

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
	const [reset, setReset] = useState<boolean>(false);

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

	const changePage = (value: number) => {
		setPageNumber(value);
	};
	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	const { access_token } = useSelector((state) => state?.authPayReducer?.auth);
	useEffect(() => {
		if (gotopage) history.push('/chargebackmgt/upload');
	}, [gotopage, history]);

	// useEffect(() => {
	// 	axios
	// 		.get<PendingComplianceTypes>(
	// 			`https://staging.itex-pay.com/ipg/api/v1/admin/business/compliance/pending?perpage=${rowsPerPage}&page=${pageNumber}`,
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${access_token}`,
	// 				},
	// 			}
	// 		)
	// 		.then((res) => {
	// 			setApiRes(res.data);
	// 		});
	// }, [rowsPerPage, pageNumber, access_token]);

	// useEffect(() => {
	// 	setTotalRows(Number(apiRes?._metadata.totalcount));
	// }, [apiRes]);

	useEffect(() => {
		axios
			.get<dataTypes[]>(`/axiosCall/chargebackrequest.json`, { baseURL: '' })
			.then((res) => {
				setApiRes(res.data);
			});
	}, []);

	useEffect(() => {
		setTotalRows(Number(apiRes?.length));
		console.log(apiRes);
	}, [apiRes]);

		const modalFunc = () => {
			setReset(true);
		};

	useEffect(() => {
		const { id, type } = selectedId;
		if (type === 'add') {
			if (!selected.includes(id)) {
				setSelected((prev: any) => [...prev, id]);
			}
		} else {
			const elems = selected?.filter((elem: any) => elem !== id);
			setSelected(elems);
		}
	}, [selectedId]);

	// const editBusinessHandler = () => {
	// 	dispatch(
	// 		openModalAndSetContent({
	// 			modalStyles: {
	// 				padding: 0,
	// 				maxWidth: '539px',
	// 				height: '661px',
	// 				width: '100%',
	// 			},
	// 			modalContent: (
	// 				<div className={styles.modalDiv}>
	// 					<AccountType />
	// 				</div>
	// 			),
	// 		})
	// 	);
	// };

	//ENDS FUNCTIONS

	interface Column {
		id:
			| 'amount'
			| 'status'
			| 'business_name'
			| 'transaction_ref'
			| 'date_created'
			| 'date_due';

		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	const columns: Column[] = [
		{ id: 'amount', label: 'Amount', minWidth: 100 },
		{ id: 'status', label: 'status', align: 'center', minWidth: 100 },
		{
			id: 'business_name',
			label: 'Business name',
			align: 'center',
			minWidth: 100,
		},
		{ id: 'transaction_ref', label: 'Transaction reference', minWidth: 100 },
		{
			id: 'date_created',
			label: 'Date created',
			align: 'center',
			minWidth: 100,
		},
		{ id: 'date_due', label: 'Due date', minWidth: 100 },
	];

	const LoanRowTab = useCallback(
		(
			id: string,
			amount: string,
			status: number | string,
			business_name: number,
			transaction_ref: string,
			date_created: string,
			date_due: string
		) => ({
			id: id,
			amount: `NGN ${amount}`,
			status: (
				<span
					className={styles.tableSpan}
					style={{
						backgroundColor:
							(status === 'Won' && '#27AE60') ||
							(status === 'Failed' && '#EB5757') ||
							(status === 'Pending' && '#F2C94C') ||
							'rgba(169, 170, 171, 0.22)',
						color:
							(status === 'Won' && '#FFFFFF') ||
							(status === 'Failed' && '#FFFFFF') ||
							(status === 'Pending' && '#12122C') ||
							'#FFFFFF',
					}}>
					{status}
				</span>
			),
			business_name: business_name,
			transaction_ref: transaction_ref,
			date_created: date_created,
			date_due: date_due,
		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiRes?.map((each: any) =>
				newRowOptions.push(
					LoanRowTab(
						each.id,
						each.amount,
						each.status,
						each.business_name,
						each.transaction_ref,
						each.date_created,
						each.date_due
					)
				)
			);
		setRows(newRowOptions);
	}, [apiRes, LoanRowTab]);

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
						<BulkChargeRequest setGotopage={setGotopage} />
					</>
				),
			})
		);
	};
	return (
		<div style={{ paddingTop: '10px', width: '100%' }}>
			

			<NavBar name='All ChargeBack' />
			<div className={styles.header}>
				<div className={styles.header_left}>
					<h1 className={styles.header_left_h1}>
						{apiRes?.length} chargebacks
					</h1>
				</div>
				<div className={styles.header_right}>
					<div
						onClick={() => setIsFilterModalOpen(true)}
						className={styles.button_business}>
						<button className={styles.button_business_button}>
							All Chargebacks{' '}
							<span className={styles.button_business_span}>
								<ArrowDropDownIcon
									sx={{
										width: '15px',
										height: '10px',
										color: '#4F4F4F',
										marginLeft: '10px',
									}}
								/>
							</span>{' '}
							&nbsp;
						</button>
					</div>
					<div className={styles.button_business}>
						<button
							id='download-menu'
							aria-controls={openDownload ? 'download-menu' : undefined}
							aria-haspopup='true'
							aria-expanded={openDownload ? 'true' : undefined}
							onClick={handleMenuDownloadClick}
							className={styles.button_business_button}>
							Download{' '}
							<span className={styles.button_business_span}>
								<CloudUploadIcon
									sx={{
										width: '15px',
										height: '10px',
										color: '#4F4F4F',
										marginLeft: '10px',
									}}
								/>
							</span>{' '}
							&nbsp;
						</button>
						<Menu
							id='download-menu'
							anchorEl={anchorElDownload}
							open={showDownload}
							onClose={handleMenuDownloadClose}
							MenuListProps={{
								'aria-labelledby': 'log-refund-button',
							}}
							PaperProps={{
								style: {
									width: '150px',
									padding: '.25rem',
									textAlign: 'center',
								},
							}}>
							<MenuItem>
								<p style={{ padding: '.4rem', fontSize: '0.7rem' }}>CSV</p>
							</MenuItem>
							<Divider />
							<MenuItem>
								<p style={{ padding: '.4rem', fontSize: '0.7rem' }}>Excel</p>
							</MenuItem>
							<Divider />
							<MenuItem>
								<p style={{ padding: '.4rem', fontSize: '0.7rem' }}>Pdf</p>
							</MenuItem>
						</Menu>
					</div>

					<div className={styles.button_mark}>
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
					</div>
				</div>
			</div>

			{/* TABLE */}
			<div className={styles.maintable}>
				{apiRes?.length && (
					<OperantTableItexPay
						columns={columns}
						rows={rows}
						totalRows={totalRows}
						changePage={changePage}
						limit={limit}
					/>
				)}
			</div>
		</div>
	);
}

export default AllChargebacks;
