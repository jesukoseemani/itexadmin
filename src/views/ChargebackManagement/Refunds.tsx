import React, { useState, useEffect, useCallback } from 'react';
import ActivityTypes from '../../types/ActivityTypes';
import styles from './ChargebackManagement.module.scss';
import NavBar from '../../components/navbar/NavBar';
import { useDispatch } from 'react-redux';
import OperantTable from '../../components/table/OperantTable';
import axios from 'axios';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import { RefundApiTypes, DownloadRefundRes } from '../../types/UserTableTypes';
import moment from 'moment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useHistory } from 'react-router';
import Divider from '@mui/material/Divider';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SingleRefundModal from './SingleRefundModal';
import BulkChargeRequest from '../../components/ModalsReuse/businessDetailsModal/BulkChargeRequest';
import RefundTransaction from '../../components/transactionsModals/RefundTransaction';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';

interface tranprops {
	transaction: {
		merchantreference: string | number;
		reference: string | number;
		linkingreference: string | number;
		added: string | number;
	};
	order: {
		amount: string | number;
		description: string;
		currency: string;
		fee: {};
	};
	source: {
		customer: {
			email: string;
		};
	};
	code: string | number;
	message: string;
}

const Refunds = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const [rows, setRows] = useState<ActivityTypes[]>([]);
	const [apiRes, setApiRes] = useState<tranprops[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [totalRows, setTotalRows] = useState<number>(0);

	const [dataValue, setDataValue] = useState<number | string>(0);

	const [tableOpen, setTableOpen] = useState<boolean>(false);

	const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

	const [gotopage, setGotopage] = useState<boolean>(false);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	// const [refunds, setRefunds] = useState<RefundItem[]>([]);
	const currentDate = moment(new Date()).format('YYYY-MM-DD');

	const [fixedToDate, setFixedToDate] = useState(currentDate);
	const [dateInterval, setDateInterval] = useState<string | undefined>();

	const [filters, setFilters] = useState({
		email: '',
		fromdate: '',
		todate: '',
		paymentmethod: '',
		responsecode: '',
	});

	const [filtersApplied, setFiltersApplied] = useState<boolean>(false);

	const [isSingleModalOpen, setIsSingleModalOpen] = useState<boolean>(false);
	const [refundLogged, setRefundLogged] = useState<boolean>(false);

	const refundTransactionHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<div className='modalDiv'>
						<RefundTransaction />
					</div>
				),
			})
		);
	};

	const dispatch = useDispatch();

	const history = useHistory();

	const changePage = (value: number) => {
		setPageNumber(value);
	};

	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	useEffect(() => {
		if (gotopage) history.push('/chargebackmgt/upload');
	}, [gotopage, history]);

	useEffect(() => {
		dispatch(openLoader());
		axios
			.get<RefundApiTypes>(
				`/admin/refunds?perpage=${rowsPerPage}&page=${pageNumber}`
			)
			.then((res) => {
				dispatch(closeLoader());
				const { transactions, _metadata } = res?.data;
				if (transactions.length) {
					setApiRes(transactions);
					setTotalRows(_metadata?.totalcount);
				}
			})
			.catch((err) => {
				console.log(err);
				dispatch(closeLoader());
			});
	}, [rowsPerPage, pageNumber, filtersApplied, refundLogged]);

	// useEffect(() => {
	// 	setTotalRows(Number(apiRes?._metadata.totalcount));
	// }, [apiRes]);

	interface Column {
		id:
			| 'id'
			| 'business_name'
			| 'status'
			| 'amount'
			| 'charged'
			| 'transaction_ref'
			| 'merchant_id'
			| 'date';
		label: string;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'business_name', label: 'Business Name', minWidth: 100 },
		{ id: 'status', label: 'Status', minWidth: 100 },
		{ id: 'amount', label: 'Amount Refunded', minWidth: 100 },
		{ id: 'charged', label: 'Amount Charged', minWidth: 100 },
		{ id: 'transaction_ref', label: 'Transaction Reference', minWidth: 100 },
		{ id: 'merchant_id', label: 'Merchant ID', minWidth: 100 },
		{ id: 'date', label: 'Date', minWidth: 100 },
	];
	const TransactionRowTab = useCallback(
		(
			merchantreference: number | string,
			email: string | number,
			code: string,
			amount: string | number,
			linkingreference: string | number,
			reference: string | number,
			added: string
		) => ({
			id: merchantreference,
			business_name: email,
			status: (
				<span
					className={styles.tableSpan}
					style={{
						backgroundColor:
							(code === '00' && '#27AE60') ||
							(code !== '00' && code !== '09' && '#F2C94C') ||
							(code === '09' && '#EB5757') ||
							'rgba(169, 170, 171, 0.22)',
						color:
							(code === '00' && '#FFFFFF') ||
							(code === '09' && '#FFFFFF') ||
							(code !== '09' && '#333333') ||
							'#002841',
					}}>
					{(code === '00' && 'Completed') ||
						(code === '09' && 'Failed') ||
						'Pending'}
				</span>
			),
			amount: amount,
			charged: amount,
			transaction_ref: linkingreference,
			merchant_id: reference,
			date: added,
		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiRes?.map((each: any) =>
				newRowOptions.push(
					TransactionRowTab(
						each?.transaction.merchantreference,
						each?.source.customer.email,
						each?.code,
						each?.order.currency + parseInt(each.order.amount),
						each?.transaction.reference,
						each?.transaction.linkingreference,
						each?.transaction.added
					)
				)
			);
		setRows(newRowOptions);
	}, [apiRes, TransactionRowTab]);

	const downloadRefunds = async () => {
		dispatch(openLoader());
		try {
			const res = await axios.get<DownloadRefundRes>(`/admin/refunds/download`);
			const { transaction } = res?.data;
			if (transaction.redirecturl) {
				window.open(transaction.redirecturl, '_blank');
			}
			dispatch(closeLoader());
		} catch (err) {
			console.log(err);
			dispatch(closeLoader());
			dispatch(
				openToastAndSetContent({
					toastContent: 'Failed to download transactions',
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
		}
	};

	const singleChargeHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<div className='modalDiv'>
						<RefundTransaction />
					</div>
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
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<div className='container'>
				<NavBar name='Refunds' />
				

				<SingleRefundModal
					isOpen={isSingleModalOpen}
					handleClose={() => setIsSingleModalOpen(false)}
					setRefundLogged={setRefundLogged}
				/>
				<div className={styles.header}>
					<div className={styles.header_left}>
						<h1 className={styles.header_left_h1}>{totalRows} refunds</h1>
					</div>
					<div className={styles.header_right}>
						<div className={styles.button_business}>
							<button
								className={styles.button_business_button}
								onClick={() => setIsFilterModalOpen(true)}>
								All Refunds
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
								className={styles.button_business_button}
								onClick={downloadRefunds}>
								Download
								<span className={styles.button_business_span}>
									<CloudUploadIcon
										sx={{
											width: '15px',
											height: '10px',
											color: '#4F4F4F',
											marginLeft: '10px',
										}}
									/>
								</span>
								&nbsp;
							</button>
						</div>

						<div className={styles.button_mark}>
							<button
								className={styles.button_mark_button}
								onClick={handleClick}>
								Log Refund
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
									Single Refund
								</MenuItem>
								<Divider />
								<MenuItem
									onClick={bulkChargeHandler}
									style={{ padding: '0px 30px' }}>
									Bulk Refund
								</MenuItem>
							</Menu>
						</div>
					</div>
				</div>
			</div>
			{/* TABLE */}
			<div className={styles.m1}>
				<OperantTable
					columns={columns}
					rows={rows}
					totalRows={totalRows}
					changePage={changePage}
					limit={limit}
					setDataValue={setDataValue}
					setOpen={setTableOpen}
				/>
			</div>
		</div>
	);
};

export default Refunds;
