import React, { useState, useEffect, useCallback } from 'react';
import styles from './Users.module.scss';
import { makeStyles } from '@material-ui/core';
import NavBar from '../../components/navbar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import OperantTableItexPay from '../../components/tableItexPay/OperantTableItexPay';
import axios from 'axios';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import AccountType from '../../components/ModalsReuse/AccountType';
import { useHistory } from 'react-router';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPenToSquare,
	faClockRotateLeft,
	faTrashCan,
	faUnlock,
	faKey,
} from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Trash } from '../../assets/images/trash-2.svg';
import { ReactComponent as Edit } from '../../assets/images/edit-3.svg';
import { ReactComponent as Change } from '../../assets/images/refresh-outline.svg';
import { ReactComponent as Key } from '../../assets/images/key-outline.svg';

import UserModal from '../../components/ModalsReuse/UserModal';
import moment from 'moment';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import UserRoleChangeModal from '../../components/ModalsReuse/UserRoleChangeModal';
import PermissionModal from '../../components/ModalsReuse/PermissionModal';

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

interface userRoleTypes {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	users: [
		{
			id: number;
			userRole: {
				id: number;
				userRoleName: string;
				roleDescription: string;
				status: boolean;
				createdBy: null | string;
				createdAt: string;
				deletedAt: null | string;
				isDeleted: boolean;
			};
			firstname: string;
			lastname: string;
			email: string;
			phoneNumber: string;
			institution: null | string;
			username: string;
			userStatus: boolean;
			forcePasswordChange: number;
			lastLogin: null | string;
			lastLoginIp: null | string;
			createdBy: number;
			approvedBy: null | string;
			approvedOn: string;
			createdAt: string;
			updatedAt: string;
			deletedAt: null | string;
			isDeleted: boolean;
		}
	];
	code: string;
	message: string;
}

const UsersPermission = () => {
	const classes = useStyles();
	const [rows, setRows] = useState<any[]>([]);
	const [apiRes, setApiRes] = useState<userRoleTypes>();
	const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

	// const [singleData, setSingleData] = useState<userRoleTypes>({
	// 	id: '',
	// 	first_name: '',
	// 	last_name: '',
	// 	username: '',
	// 	role: '',
	// 	status: '',
	// 	added_on: '',
	// });
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
		10
	);
	const [dataValue, setDataValue] = useState<number | string>(0);
	const history = useHistory();

	const [totalRows, setTotalRows] = useState<number>(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
		setDataValue(event.currentTarget.getAttribute('data-value'));
	};

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
			.get<userRoleTypes>(
				`/usermgt/users?perpage=${rowsPerPage}&page=${pageNumber}&fromdate=${fromDate}&todate=${toDate}`
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
	}, [rowsPerPage, pageNumber, bearer]);

	const modalFunc = () => {
		setReset(true);
	};

	useEffect(() => {
		if (apiRes && apiRes?.users.length) {
			setTotalRows(apiRes._metadata?.totalcount);
		}
	}, [apiRes]);

	const editBusinessHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					maxWidth: '539px',
					height: '700px',
					width: '100%',
				},
				modalContent: (
					<div className={styles.modalDiv}>
						<UserModal
							link='/auth/user/create'
							title='Add a new user'
							setBearer={setBearer}
						/>
					</div>
				),
			})
		);
	};
	const editHandler = (
		id: number | string,
		firstname: string,
		lastname: string,
		userRole: any,
		email: string,
		phoneNumber: string,
		institution: string
	) => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					maxWidth: '539px',
					height: '700px',
					width: '100%',
				},
				modalContent: (
					<div className={styles.modalDiv}>
						<UserModal
							editDetails={{
								id,
								firstname,
								lastname,
								userRole,
								email,
								phoneNumber,
								institution,
							}}
							title='Edit user'
							setBearer={setBearer}
							link='/'
						/>
					</div>
				),
			})
		);
	};
	const deleteHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					maxWidth: '653px',
					height: '254px',
					width: '100%',
				},
				modalContent: (
					<div className={styles.modalDiv}>
						<div className={styles.account_wrap}>
							<h1 className={styles.account_h1}>Remove user</h1>
						</div>

						<div className={styles.buttonModalwrap}>
							<p className={styles.removeModal_p}>
								Are you sure want to remover this user. This user will no longer
								have access to the platform permissions. Click on ‘Remove’ to
								remove this user.
							</p>

							<div className={styles.buttonModal}>
								<button
									style={{ background: '#E0E0E0', color: '#333333' }}
									className={styles.removeModal}>
									Cancel
								</button>
								<button className={styles.removeModal}>Remove</button>
							</div>
						</div>
					</div>
				),
			})
		);
	};

	const changeHandler = (id: number, firstname: string) => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					maxWidth: '653px',
					height: '400px',
					width: '100%',
				},
				modalContent: (
					<UserRoleChangeModal
						id={id}
						firstname={firstname}
						setBearer={setBearer}
					/>
				),
			})
		);
	};

	const permissionHandler = (id: number, email: string) => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					maxWidth: '653px',
					minHeight: '600px',
					width: '100%',
				},
				modalContent: (
					<PermissionModal
						id={id}
						target={email}
						setBearer={setBearer}
						link1='/usermgt/user'
						link2='/usermgt/user/assign/modules'
						title='User Permission'
					/>
				),
			})
		);
	};

	//ENDS FUNCTIONS

	interface Column {
		id:
			| 'first_name'
			| 'last_name'
			| 'username'
			| 'role'
			| 'status'
			| 'added_on'
			| 'actions';

		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'first_name', label: 'Firstname', minWidth: 100 },
		{ id: 'last_name', label: 'Lastname', minWidth: 100 },
		{
			id: 'username',
			label: 'Username',
			align: 'center',
			minWidth: 100,
		},
		{ id: 'role', label: 'Role', minWidth: 100 },
		{ id: 'status', label: 'Status', minWidth: 100 },
		{ id: 'added_on', label: 'Added On', minWidth: 100 },
		{ id: 'actions', label: 'Action(s)', align: 'left', minWidth: 100 },
	];

	const LoanRowTab = useCallback(
		(
			id: number,
			firstname: string,
			lastname: string,
			username: string,
			userRole: any,
			userStatus: string,
			createdAt: string,
			email: string,
			phoneNumber: string,
			institution: string
		) => ({
			first_name: firstname,
			last_name: lastname,
			username: username,
			role: userRole?.userRoleName,
			status: (
				<span
					className={styles.tableSpan}
					style={{
						backgroundColor: userStatus ? '#27AE60' : '#EB5757',

						color: userStatus ? '#FFFFFF' : '#FFFFFF',
					}}>
					{userStatus ? 'Active' : 'InActive'}
				</span>
			),
			added_on: moment(createdAt).format('YYYY-MM-DD'),
			actions: (
				<div
					id='basic-button'
					data-value={id}
					aria-controls='basic-menu'
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
					className={styles.tableVertIcon}>
					<div
						onClick={() =>
							editHandler(
								id,
								firstname,
								lastname,
								userRole,
								email,
								phoneNumber,
								institution
							)
						}
						className={styles.icons}>
						<Edit />
					</div>
					<div onClick={() => deleteHandler()} className={styles.icons}>
						<Trash />
					</div>
					<div
						onClick={() => changeHandler(id, firstname)}
						className={styles.icons}>
						<Change />
					</div>
					<div
						onClick={() => permissionHandler(id, email)}
						className={styles.icons}>
						<Key />
					</div>
				</div>
			),
		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiRes?.users?.map((each: any) =>
				newRowOptions.push(
					LoanRowTab(
						each.id,
						each.firstname,
						each.lastname,
						each.username,
						each.userRole,
						each.userStatus,
						each.createdAt,
						each.email,
						each.phoneNumber,
						each.institution
					)
				)
			);
		setRows(newRowOptions);
	}, [apiRes, LoanRowTab]);

	// const handleUserProfile = (e: any) => {
	// 	history.push(`/business/${dataValue}`);

	// 	handleClose();
	// };

	return (
		<>
			<div className={styles.container}>
				<NavBar name='User' />
				<div className={styles.header}>
					<div className={styles.header_left}>
						<h1 className={styles.header_left_h1}>Users</h1>
					</div>
					<div className={styles.header_right}>
						<div className={styles.selectwrapper}>Download</div>
						<div className={styles.button_business}>
							<button
								onClick={editBusinessHandler}
								className={styles.button_business_button}>
								<span className={styles.button_business_span}>+</span> &nbsp;
								New User
							</button>
						</div>
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
					{/* <Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						classes={{
							list: classes.list,
							paper: classes.paper,
							root: classes.rootCard,
						}}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}>
						<MuiMenuItem
							onMouseEnter={(e: any) =>
								(e.target.style.backgroundColor = '#d9e9f1')
							}
							onMouseLeave={(e: any) => (e.target.style.backgroundColor = '')}
							onClick={handleUserProfile}>
							View Profile
						</MuiMenuItem>
					</Menu> */}
				</div>
			</div>
		</>
	);
};

export default UsersPermission;
