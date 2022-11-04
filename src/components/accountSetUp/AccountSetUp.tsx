import React, { useState, useEffect } from 'react';
import styles from './AccountSettings.module.scss';
import Box from '@mui/material/Box';
import AccountSvg from '../../assets/images/account.svg';
import NotificationSvg from '../../assets/images/notifications.svg';
import List from '@mui/material/List';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import BusinessContent from './BusinessSetUpModal';
import BankAccount from './BankAccountModal';
import DocumentUpload from './DocumentUpload';
import AddBankAccount from '../accountSetupModal/AddBankAccount';
import AddBusinessSetup from '../accountSetupModal/AddBusinessSetup';
import Snackbar from './Snackbar/Snackbar';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions/auth/authActions';
import { saveLoading } from '../../redux/actions/loadingState/loadingStateActions';

interface AccountSetUpTypes {
	data: {
		title: string;
		id: string;
		button: string;
		icon: string;
		completed: boolean;
	}[];
}

const AccountSetUp = ({ data }: AccountSetUpTypes) => {
	const [isDesktop, setDesktop] = useState(window.innerWidth > 900);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const dispatch = useDispatch();
	const history = useHistory();
	const selectedIDHandler = (id: string) => {
		if (id === 'IBI') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<div className='modalDiv'>
							<AddBusinessSetup />
						</div>
					),
				})
			);
		} else if (id === 'IBA') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<div className='modalDiv'>
							<AddBankAccount />
						</div>
					),
				})
			);
		} else if (id === 'BBI') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<div className='modalDiv'>
							<BusinessContent />
						</div>
					),
				})
			);
		} else if (id === 'BBD') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<DocumentUpload />
						</>
					),
				})
			);
		} else {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<BankAccount />
						</>
					),
				})
			);
		}
	};

	const updateMedia = () => {
		setDesktop(window.innerWidth > 900);
	};

	useEffect(() => {
		window.addEventListener('resize', updateMedia);
		return () => window.removeEventListener('resize', updateMedia);
	});

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const signOutHandler = () => {
		localStorage.clear();
		dispatch(logOut());
		dispatch(saveLoading(false));
		history.push('/signIn');
		setAnchorEl(null);
	};

	return (
		<div className={styles.container}>
			<div
				style={{ display: 'flex', justifyContent: 'space-between' }}
				className={styles.navbar}>
				<Snackbar text='Your account is currently in Test mode because your business is not yet verified' />
				{isDesktop ? (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							width: '60px',
							justifyContent: 'space-between',
						}}>
						<img src={NotificationSvg} alt='bell icon' />
						<img onClick={signOutHandler} src={AccountSvg} alt='account icon' />
					</Box>
				) : (
					<div>
						{' '}
						<IconButton
							aria-label='more'
							aria-controls='long-menu'
							aria-haspopup='true'
							onClick={handleClick}>
							<MoreVertIcon />
						</IconButton>
						<Menu
							id='basic-menu'
							anchorEl={anchorEl}
							keepMounted
							open={open}
							onClose={handleClose}
							PaperProps={{
								style: {
									width: '20ch',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								},
							}}>
							<MenuItem onClick={handleClose}>
								<div
									style={{ display: 'flex', justifyContent: 'space-between' }}>
									{' '}
									<div className={styles.bell}>
										<img src={NotificationSvg} alt='bell icon' />
									</div>
									<div className={styles.account}>
										<img src={AccountSvg} alt='account icon' />
									</div>
								</div>
							</MenuItem>
						</Menu>
					</div>
				)}
			</div>
			<div className={styles.mainContent} style={{ margin: '0 auto' }}>
				<div className={styles.content}>
					<h2>Hey James, Let’s setup your account</h2>
					<p>
						Your business is currently in Test Mode - this means there’re a
						couple more things to finish up before customers can start paying
						you online. The guides below will show you how to do this.
					</p>
				</div>
				<div
					style={{
						// display: "flex",
						background: 'rgba(248, 248, 248, 1)',
						// justifyContent: "center",
						// alignItems: "center",
						marginTop: '2rem',
						//  height: "250px",
					}}
					className={styles.box}>
					<div className={styles.wrapper}>
						{data?.map((item) => (
							<List key={item.id} className={styles.list}>
								<div className={styles.contentWrapper}>
									<div>
										<img src={item.icon} alt='icon' />
									</div>
									<div className={styles.mt1}>{item.title}</div>
									<div className={styles.mt1}>
										<button
											onClick={() => selectedIDHandler(item.id)}
											className={styles.button_key}
											disabled={item.completed ? true : false}>
											{item.button}
										</button>
									</div>
								</div>
							</List>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountSetUp;
