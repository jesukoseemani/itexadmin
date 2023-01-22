import styles from './Settlement.module.scss';
import { useState, useEffect, useCallback } from 'react';
import ActivityTypes from '../../types/ActivityTypes';
import { useDispatch, useSelector } from 'react-redux';
import OperantTable from '../../components/table/OperantTable';
import axios from 'axios';
import NavBar from '../../components/navbar/NavBar';
import { TabPanel } from '../../components/Tabs/Tabs';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Divider, Menu, MenuItem } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FailedSettlements from './FailedSettlements';
import ReviewedSettlements from './ReviewedSettlements';
import Report from './Report';
import { useHistory } from 'react-router-dom';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import SingleSettlementModal from './SingleSettlementModal';
import { Checkbox } from '@material-ui/core';
import BulkSettlement from './BulkSettlement';
import FilterModal from '../../components/filterConfig/FilterModal';
import moment from 'moment';

interface data {
	open: boolean;
}

interface dataTypes {
	id: string;
	amount: string;
	status: string;
	business_name: number;
	destination: string;
	merchant_id: string;
	date: string;
}

const Settlements = () => {
	const [value, setValue] = React.useState(0);
	const [settlementLogged, setSettlementLogged] = useState<boolean>(false);
	const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const [isSingleModalOpen, setIsSingleModalOpen] = useState<boolean>(false);
	const [isBulkModalOpen, setIsBulkModalOpen] = useState<boolean>(false);
	const [rows, setRows] = useState<ActivityTypes[]>([]);
	const [apiRes, setApiRes] = useState<dataTypes[]>();
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);
	const [totalRows, setTotalRows] = useState<number>(0);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [anchorElDownload, setAnchorElDownload] = useState<null | HTMLElement>(
		null
	);
	const [activeChecked, setActiveChecked] = useState<boolean | undefined>(
		false
	);
	const [dataValue, setDataValue] = useState<number | string>(0);
	const [selected, setSelected] = useState<any>([]);
	const [selectedId, setSelectedId] = useState<{ id: string; type: string }>({
		id: '',
		type: '',
	});
	const [open, setOpen] = useState<boolean>(false);
	const [openDownload, setOpenDownload] = useState<boolean>(false);

	const [gotopage, setGotopage] = useState<boolean>(false);

	const show = Boolean(anchorEl);
	const showDownload = Boolean(anchorElDownload);

	const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
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

	const HandleAllChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setActiveChecked(true);
			setSelected([]);
		} else {
			setActiveChecked(false);
			setSelected([]);
		}
	};

	useEffect(() => {
		if (gotopage) history.push('/settlement');
	}, [gotopage]);

	const checkChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = event.target;
		if (checked) {
			setSelectedId({ id: value, type: 'add' });
		} else {
			setSelectedId({ id: value, type: 'remove' });
		}
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

	const openSingleModal = () => {
		setIsSingleModalOpen(true);
		handleMenuClose();

		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<div className='modalDiv'>
						<SingleSettlementModal />
					</div>
				),
			})
		);
	};

	const openBulkModal = () => {
		setIsBulkModalOpen(true);
		handleMenuClose();

		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<div className='modalDiv'>
						<BulkSettlement title='Bulk Settlement' setGotopage={setGotopage} />
					</div>
				),
			})
		);
	};

	const history = useHistory();

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

	useEffect(() => {
		if (open && dataValue !== null) {
			history.push(`/settlement/${dataValue}`);
		}
	}, [dataValue, open]);

	const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

	useEffect(() => {
		axios
			.get<dataTypes[]>(`/axiosCall/settlement.json`, { baseURL: '' })
			.then((res) => {
				setApiRes(res.data);
			});
	}, []);

	useEffect(() => {
		setTotalRows(Number(apiRes?.length));
	}, [apiRes, rows]);

	const modalFunc = () => {
		setReset(true);
	};

	interface Column {
		id:
			| 'id'
			| 'actions'
			| 'amount_due'
			| 'status'
			| 'business_name'
			| 'destination'
			| 'merchant_id'
			| 'date';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{
			id: 'actions',
			label: <Checkbox onChange={HandleAllChecked} />,
			minWidth: 100,
		},
		{ id: 'amount_due', label: 'Amount Due', minWidth: 100 },
		{ id: 'status', label: 'Status', minWidth: 100 },
		{ id: 'business_name', label: 'Business Name', minWidth: 100 },
		{ id: 'destination', label: 'Destination', minWidth: 100 },
		{ id: 'merchant_id', label: 'Merchant ID', minWidth: 100 },
		{ id: 'date', label: 'Transaction Date', minWidth: 100 },
	];
	const SettlementsRowTab = useCallback(
		(
			id: number | string,
			amount: string,
			status: string,
			business_name: string,
			destination: string | number,
			merchant_id: string,
			date: string,
			activeChecked: boolean | undefined
		) => ({
			id: id,
			actions: (
				<>
					{!activeChecked && (
						<Checkbox
							value={id}
							key={Math.random()}
							onChange={checkChangeHandler}
						/>
					)}
					{activeChecked && <Checkbox checked={true} />}
				</>
			),
			amount_due: amount,
			status: (
				<span
					className={styles.tableSpan}
					style={{
						backgroundColor:
							(status === 'Due' && '#27AE60') ||
							(status === 'Failed' && '#EB5757') ||
							(status === 'Pending Approval' && '#F2C94C') ||
							'rgba(169, 170, 171, 0.22)',
						color:
							(status === 'Due' && '#FFFFFF') ||
							(status === 'Failed' && '#FFFFFF') ||
							(status === 'Pending Approval' && '#12122C') ||
							'#FFFFFF',
					}}>
					{status}
				</span>
			),
			business_name: business_name,
			destination: destination,
			merchant_id: merchant_id,
			date: date,
		}),
		[]
	);

	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiRes
				?.filter((item: dataTypes) => item.status === 'Due')
				.map((each: any) =>
					newRowOptions.push(
						SettlementsRowTab(
							each.id,
							each.amount,
							each.status,
							each.business_name,
							each.destination,
							each.merchant_id,
							each.date,
							activeChecked
						)
					)
				);
		setRows(newRowOptions);
	}, [apiRes, SettlementsRowTab, activeChecked]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<NavBar name='' />

			<Box sx={{ width: '100%', marginTop: '1rem' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						style={{ padding: '0 1rem', margin: '0' }}
						value={value}
						onChange={handleChange}
						aria-label='basic tabs example'
						TabIndicatorProps={{
							style: {
								background: '#27AE60',
								borderRadius: '8px',
								height: '4px',
							},
						}}>
						<Tab
							label='Settlements due'
							style={{
								margin: '0 1rem',
								textTransform: 'capitalize',
								color: value === 0 ? '#27AE60' : '#333333',
							}}
						/>
						<Tab
							label='Reviewed settlements'
							style={{
								textTransform: 'capitalize',
								margin: '0 1rem',
								color: value === 1 ? '#27AE60' : '#333333',
							}}
						/>
						<Tab
							label='Failed settlements'
							style={{
								textTransform: 'capitalize',
								margin: '0 1rem',
								color: value === 2 ? '#27AE60' : '#333333',
							}}
						/>
						<Tab
							label='Reports'
							style={{
								textTransform: 'capitalize',
								margin: '0 1rem',
								color: value === 3 ? '#27AE60' : '#333333',
							}}
						/>
					</Tabs>
				</Box>
				<div className={styles.tableHeader}>
					<div className={styles.tableHeaderLeft}>
						<p className={styles.tableTitle}>
							{
								apiRes?.filter((item: dataTypes) => item.status === 'Due')
									.length
							}{' '}
							{value === 0
								? 'settlement due fees'
								: value === 1
								? 'Reviewed settlements'
								: value === 2
								? 'Failed settlements'
								: 'Reports'}
						</p>
					</div>
					<div className={styles.tableHeaderRight}>
						<div>
							<button
								onClick={() => setIsFilterModalOpen(true)}
								className={styles.button1}>
								<span className={styles.buttonSpan}>
									All Settlements
									<ArrowDropDownIcon />
								</span>
							</button>

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

							<button
								className={styles.button1}
								id='download-menu'
								aria-controls={openDownload ? 'download-menu' : undefined}
								aria-haspopup='true'
								aria-expanded={openDownload ? 'true' : undefined}
								onClick={handleMenuDownloadClick}>
								<p className={styles.buttonSpan}>
									Download
									<span className={styles.mlhalf}>
										<CloudDownloadIcon style={{ fontSize: 15 }} />
									</span>
								</p>
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

							<button
								className={styles.buttonAdd}
								id='log-refund-button'
								aria-controls={open ? 'refund-menu' : undefined}
								aria-haspopup='true'
								aria-expanded={open ? 'true' : undefined}
								onClick={handleMenuClick}>
								Log settlement
							</button>
							<Menu
								id='refund-menu'
								anchorEl={anchorEl}
								open={show}
								onClose={handleMenuClose}
								MenuListProps={{
									'aria-labelledby': 'log-refund-button',
								}}
								PaperProps={{
									style: {
										maxWidth: '150px',
										padding: '.25rem',
									},
								}}>
								<MenuItem onClick={openSingleModal}>
									<p style={{ padding: '.4rem', fontSize: '0.7rem' }}>
										Single settlement
									</p>
								</MenuItem>
								<Divider />
								<MenuItem onClick={openBulkModal}>
									<p style={{ padding: '.4rem', fontSize: '0.7rem' }}>
										Bulk settlement
									</p>
								</MenuItem>
							</Menu>
						</div>
					</div>
				</div>
				<TabPanel value={value} index={0}>
					<div className={styles.m1}>
						<OperantTable
							columns={columns}
							rows={rows}
							totalRows={totalRows}
							changePage={changePage}
							limit={limit}
							setDataValue={setDataValue}
							setOpen={setOpen}
						/>
					</div>
				</TabPanel>

				<TabPanel value={value} index={1}>
					<ReviewedSettlements />
				</TabPanel>

				<TabPanel value={value} index={2}>
					<FailedSettlements />
				</TabPanel>

				<TabPanel value={value} index={3}>
					<Report />
				</TabPanel>
			</Box>
		</div>
	);
};

export default Settlements;
