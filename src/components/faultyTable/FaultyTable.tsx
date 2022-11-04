import React, { useState, useEffect, useCallback } from 'react';
import styles from './FaultyTable.module.scss';
import { Checkbox, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import OperantTableItexPay from '../tableItexPay/OperantTableItexPay';
import axios from 'axios';
import { useHistory } from 'react-router';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterModal from '../filterConfig/FilterModal';

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

function FaultyTable() {
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
	const history = useHistory();
	const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

	const [totalRows, setTotalRows] = useState<number>(0);
	const [activeChecked, setActiveChecked] = useState<boolean | undefined>(
		false
	);

	const [anchorEl, setAnchorEl] = useState(null);
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

	interface dataTypes {
		id: string;
		business_name: string;
		state: string;
		number_of_terminal: number;
		date: string;
		status: string;
	}

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

	const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

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
		axios.get<dataTypes[]>(`/axiosCall/faultyterminal.json`, { baseURL: '' }).then((res) => {
			setApiRes(res.data);
		});
	}, []);

	useEffect(() => {
		setTotalRows(Number(apiRes?.length));
		console.log(apiRes);
	}, [apiRes]);

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
			| 'status'
			| 'request_id'
			| 'business_name'
			| 'state'
			| 'number_of_terminals'
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
		{ id: 'status', label: 'Status', minWidth: 100 },
		{ id: 'request_id', label: 'Request ID', align: 'center', minWidth: 100 },
		{
			id: 'business_name',
			label: 'Business name',
			align: 'center',
			minWidth: 100,
		},
		{ id: 'state', label: 'State', minWidth: 100 },
		{
			id: 'number_of_terminals',
			label: 'Number of terminals',
			align: 'center',
			minWidth: 100,
		},
		{ id: 'date', label: 'Request date', minWidth: 100 },
	];

	const LoanRowTab = useCallback(
		(
			status: string,
			id: number | string,
			business_name: number,
			state: string,
			number_of_terminal: string,
			date: string,
			activeChecked: boolean | undefined
		) => ({
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
			status: (
				<span
					className={styles.tableSpan}
					style={{
						backgroundColor:
							(status === 'LIVE' && '#27AE60') ||
							(status === 'Faulty' && '#EB5757') ||
							(status === 'New Request' && '#F2C94C') ||
							'rgba(169, 170, 171, 0.22)',
						color:
							(status === 'LIVE' && '#FFFFFF') ||
							(status === 'Faulty' && '#FFFFFF') ||
							(status === 'New Request' && '#12122C') ||
							'#FFFFFF',
					}}>
					{status}
				</span>
			),
			request_id: id,
			business_name: business_name,
			state: state,
			number_of_terminals: number_of_terminal,
			date: date,
		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiRes?.map((each: any) =>
				newRowOptions.push(
					LoanRowTab(
						each.status,
						each.id,
						each.business_name,
						each.state,
						each.number_of_terminal,
						each.date,
						activeChecked
					)
				)
			);
		setRows(newRowOptions);
	}, [apiRes, LoanRowTab, activeChecked]);

	return (
		<div style={{ paddingTop: '10px' }}>
			<FilterModal
				isOpen={isFilterModalOpen}
				handleClose={() => setIsFilterModalOpen(false)}
			/>
			<div className={styles.header}>
				<div className={styles.header_left}>
					<h1 className={styles.header_left_h1}>{apiRes?.length} new terminal requests</h1>
				</div>
				<div className={styles.header_right}>
					{selected.length > 0 || activeChecked ? (
						<>
							<div className={styles.button_business}>
								<button className={styles.button_business_button}>
									All requests{' '}
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
								<button className={styles.button_business_button}>
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
							</div>
							<div className={styles.button_mark}>
								<button className={styles.button_delete_button}>
									Delete terminals
								</button>
							</div>
						</>
					) : (
						''
					)}

					{activeChecked && (
						<div className={styles.button_mark}>
							<button className={styles.button_mark_button}>
								Move to available terminals
							</button>
						</div>
					)}
					{selected.length > 0 && !activeChecked && (
						<div className={styles.button_mark}>
							<button className={styles.button_mark_button}>
								{selected.length} Move to available terminals
							</button>
						</div>
					)}
				</div>
			</div>

			{/* TABLE */}
			<div className={styles.maintable}>
				<OperantTableItexPay
					columns={columns}
					rows={rows}
					totalRows={totalRows}
					changePage={changePage}
					limit={limit}
				/>
			</div>
		</div>
	);
}

export default FaultyTable;
