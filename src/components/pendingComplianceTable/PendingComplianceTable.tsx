import React, { useState, useEffect, useCallback } from 'react';
import styles from './PendingComplianceTable.module.scss';
import { Checkbox, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import OperantTableItexPay from '../tableItexPay/OperantTableItexPay';
import { PendingComplianceTypes } from '../../types/UserTableTypes';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import { useHistory } from 'react-router';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { ExportToXLS } from '../../helpers/ExportToExcel';

import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';

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

function PendingComplianceTable() {
	const [filter, setFilter] = useState('filter');
	const classes = useStyles();
	const [rows, setRows] = useState<any[]>([]);
	const [apiRes, setApiRes] = useState<PendingComplianceTypes>();
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
	const history = useHistory();
	const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

	const [totalRows, setTotalRows] = useState<number>(0);
	const [activeChecked, setActiveChecked] = useState<boolean | undefined>(
		false
	);

	const [anchorEl, setAnchorEl] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const [doReload, setDoReload] = useState<Boolean>(false);
	const open = Boolean(anchorEl);

	const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
	const open2 = Boolean(anchorEl2);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl2(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl2(null);
	};

	const downloadHandler = () => {
		ExportToXLS(rows, 'COMPLIANCE INIT TABLEDATA');
	};

	// const handleClick = (event: any) => {
	// 	setAnchorEl(event.currentTarget);
	// 	setDataValue(event.currentTarget.getAttribute('data-value'));
	// };

	// const handleClose = () => {
	// 	setAnchorEl(null);
	// };

	const dispatch = useDispatch();

	const changePage = (value: number) => {
		setPageNumber(value);
	};
	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	useEffect(() => {
		dispatch(openLoader());

		axios
			.get<PendingComplianceTypes>(
				`/admin/business/compliance/pending?perpage=${rowsPerPage}&page=${pageNumber}&approvalstatus=PENDING`
			)
			.then((res) => {
				setApiRes(res.data);
				dispatch(closeLoader());
			})
			.catch((err) => {
				console.log(err);
				dispatch(closeLoader());
			});
	}, [rowsPerPage, pageNumber, refresh]);

	useEffect(() => {
		setTotalRows(Number(apiRes?._metadata.totalcount));
	}, [apiRes]);

	// const checkChangeHandler = (
	// 	event: React.ChangeEvent<HTMLInputElement>,
	// 	id: string | number,
	// 	state: any
	// ) => {
	// 	event.preventDefault();
	// 	console.log('====================================');
	// 	console.log(state, selected);
	// 	console.log('====================================');
	// 	const { value, checked } = event.target;
	// 	if (checked) {
	// 		if (!selected.includes(value)) {
	// 			setSelected((prev) => [...prev, value]);
	// 		}
	// 	} else {
	// 		const newElem = state?.filter((elem: any) => elem !== value);
	// 		setSelected(newElem);
	// 	}
	// };

	const approvalHandler = () => {
		// console.log('burna:', selected)
		dispatch(openLoader());

		axios
			.put(
				`/admin/business/compliance?actionid=${selected[0]}`,
				{
					action: 'APPROVED',
				}
			)
			.then((res: any) => {
				dispatch(closeLoader());
				dispatch(
					openToastAndSetContent({
						toastContent: res.data.message,
						toastStyles: {
							backgroundColor: 'green',
						},
					})
				);
				setRefresh(true);
				setSelected([]);
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
				setRefresh(true);
			});
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
			| 'actions'
			| 'compliancestatus'
			| 'business_name'
			| 'email_address'
			| 'initiator'
			| 'initiated_date'
			| 'reason';

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

		{ id: 'compliancestatus', label: 'Status', minWidth: 100 },
		{ id: 'business_name', label: 'Business name', minWidth: 100 },
		{
			id: 'email_address',
			label: 'Email address',
			align: 'center',
			minWidth: 100,
		},
		{ id: 'initiator', label: 'Initiated By', minWidth: 100 },
		{ id: 'initiated_date', label: 'Submission Date', minWidth: 100 },
		{ id: 'reason', label: 'Reason', minWidth: 100 },
	];

	const LoanRowTab = useCallback(
		(
			id: number | string,
			actionid: string,
			compliancestatus: string,
			initiatedby: string,
			initiatedat: string,

			reason: string,
			activeChecked: boolean | undefined
		) => ({
			actions: (
				<>
					{!activeChecked && (
						<Checkbox
							value={actionid}
							key={Math.random()}
							onChange={checkChangeHandler}
						/>
					)}
					{activeChecked && <Checkbox checked={true} />}
				</>
			),
			compliancestatus: (
				<span
					className={styles.tableSpan}
					style={{
						backgroundColor:
							(compliancestatus === 'APPROVED' && '#27AE60') ||
							(compliancestatus === 'PENDING' && '#EB5757') ||
							(compliancestatus === 'DECLINED' && '#F2C94C') ||
							'rgba(169, 170, 171, 0.22)',
						color:
							(compliancestatus === 'APPROVED' && '#FFFFFF') ||
							(compliancestatus === 'PENDING' && '#FFFFFF') ||
							(compliancestatus === 'DECLINED' && '#12122C') ||
							'#FFFFFF',
					}}>
					{compliancestatus}
				</span>
			),
			business_name: 'no data',
			email_address: 'no data',
			initiator: initiatedby,
			initiated_date: `${format(parseISO(initiatedat), 'dd MMM yyyy')}`,
			reason: reason,
		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiRes?.compliance.map((each: any) =>
				newRowOptions.push(
					LoanRowTab(
						each.id,
						each.actionid,
						each.compliancestatus,

						each?.initiatedby,

						each.initiatedat,
						each.reason,

						activeChecked
					)
				)
			);
		setRows(newRowOptions);
	}, [apiRes, LoanRowTab, activeChecked]);

	return (
		<div style={{ paddingTop: '10px' }}>
			{/* <FilterModal
				isOpen={isFilterModalOpen}
				handleClose={() => setIsFilterModalOpen(false)}
			/> */}
			<div className={styles.header}>
				<div className={styles.header_left}>
					<h1 className={styles.header_left_h1}>
						{apiRes?._metadata.totalcount} Businesses
					</h1>
				</div>
				<div className={styles.header_right}>
					{activeChecked && (
						<div className={styles.button_business}>
							<button className={styles.button_business_button_selected}>
								All Approved Selected Business
							</button>
						</div>
					)}
					{selected.length > 0 && !activeChecked && (
						<div className={styles.button_business} onClick={approvalHandler}>
							<button className={styles.button_business_button_selected}>
								{selected.length} Approved Selected Business
							</button>
						</div>
					)}

					{/* <div className={styles.selectwrapper}>
						<Button
							className={styles.filterbutton}
							onClick={() => setIsFilterModalOpen(true)}>
							Filter <ArrowDropDownIcon />
						</Button>
					</div> */}
					<div className={styles.button_business}>
						<button
							className={styles.button_business_button}
							onClick={downloadHandler}>
							Download{' '}
							<span className={styles.button_business_span}>
								<CloudUploadIcon
									sx={{
										width: '15px',
										height: '10px',
										color: '#ffffff',
										marginLeft: '10px',
									}}
								/>
							</span>{' '}
							&nbsp;
						</button>
					</div>
				</div>
			</div>

			{/* TABLE */}
			<div className={styles.maintable}>
				{apiRes?.compliance.length ? (
					<OperantTableItexPay
						columns={columns}
						rows={rows}
						totalRows={totalRows}
						changePage={changePage}
						limit={limit}
					/>
				) : (
					'THERE IS NO DATA TO POPULATE...'
				)}
			</div>
		</div>
	);
}

export default PendingComplianceTable;
