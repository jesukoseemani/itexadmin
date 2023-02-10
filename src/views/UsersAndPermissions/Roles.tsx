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
import UserModal from '../../components/ModalsReuse/UserModal';
import RoleModal from '../../components/ModalsReuse/RoleModal';

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
	id: string | number;
	role_name: string;
	role_description: string;
	added_on: string;
}

const Roles = () => {
	const classes = useStyles();
	const [rows, setRows] = useState<any[]>([]);
	const [apiRes, setApiRes] = useState<userRoleTypes[]>([]);
	const [singleData, setSingleData] = useState<userRoleTypes>({
		id: '',
		role_name: '',
		role_description: '',
		added_on: '',
	});
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

	const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

	useEffect(() => {
		axios
			.get<userRoleTypes[]>('/axiosCall/rolesData.json', { baseURL: '' })
			.then((res) => {
				setApiRes(res.data);
			});
	}, []);

	// useEffect(() => {
	// 	axios
	// 		.get<BusinessTableApiTypes>(
	// 			`https://staging.itex-pay.com/ipg/api/v1/admin/business?perpage=${rowsPerPage}&page=${pageNumber}`,
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

	useEffect(() => {
		setTotalRows(Number(apiRes?.length));
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
						<RoleModal title='Add custom role' />
					</div>
				),
			})
		);
	};

	const editHandler = (
		id: number | string,
		role_name: string,
		role_description: string,
		added_on: string
	) => {
		setSingleData({
			id,
			role_name,
			role_description,
			added_on,
		});
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
						<RoleModal title='Edit role & permission' />
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
							<h1 className={styles.account_h1}>Remove role</h1>
						</div>

						<div className={styles.buttonModalwrap}>
							<p className={styles.removeModal_p}>
								Are you sure want to remove this role. This role will no longer
								appear on the platform unless added. Click on ‘Remove’ to delete
								this role.
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

	//ENDS FUNCTIONS

	interface Column {
		id: 'role_name' | 'role_description' | 'added_on' | 'actions';

		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'role_name', label: 'Role Name', minWidth: 100 },
		{
			id: 'role_description',
			label: 'Role Description',
			minWidth: 100,
		},
		{ id: 'added_on', label: 'Added On', minWidth: 100 },
		{ id: 'actions', label: 'Action(s)', align: 'left', minWidth: 100 },
	];

	const LoanRowTab = useCallback(
		(
			id: number | string,
			role_name: string,
			role_description: string,
			added_on: string
		) => ({
			role_name: role_name,
			role_description: role_description,
			added_on: added_on,
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
							editHandler(id, role_name, role_description, added_on)
						}
						className={styles.icons}>
						<Edit />
					</div>
					<div onClick={() => deleteHandler()} className={styles.icons}>
						<Trash />
					</div>
				</div>
			),
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
						each.role_name,
						each.role_description,
						each.added_on
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
						<h1 className={styles.header_left_h1}>
							Roles & Permissions Management
						</h1>
					</div>
					<div className={styles.header_right}>
						<div className={styles.selectwrapper}>Download</div>
						<div className={styles.button_business}>
							<button
								onClick={editBusinessHandler}
								className={styles.button_business_button}>
								<span className={styles.button_business_span}>+</span> &nbsp;
								Add custom role
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

export default Roles;
