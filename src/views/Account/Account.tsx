import React, { useState } from 'react';
import NavBar from '../../components/navbar/NavBar';
import styles from './Account.module.scss';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import StatusView from '../../components/StatusView/StatusView';
import {
	closeModal,
	openModalAndSetContent,
} from '../../redux/actions/modal/modalActions';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import QRCode from 'react-qr-code';
import { saveMe } from '../../redux/actions/me/meActions';

function Account() {
	const { me } = useSelector((state) => state.mePayReducer);
	const [qr, setQr] = useState<any>();
	const dispatch = useDispatch();

	const fetchme = async () => {
		await axios
			.get(`/v1/profile/me`)
			.then((res) => {
				dispatch(saveMe(res.data));
			})
			.catch((err) => console.log(err));
	};

	const BoxComponent = () => {
		return (
			<div className={styles.outerbox}>
				<div
					style={{
						width: '100%',
						height: '400px',
						border: '1px solid black',
					}}>
					{qr?.qrcodeUrl ? (
						<QRCode
							style={{ height: 'auto', width: '100%' }}
							value={qr?.qrcodeUrl}
						/>
					) : (
						'Something went wrong'
					)}
				</div>
				<button
					onClick={enabledHandler}
					style={{
						backgroundColor: '#27AE60',
						fontFamily: 'Roboto',
						fontStyle: 'normal',
						fontWeight: 'bold',
						fontSize: '16px',
						lineHeight: '19px',
						textAlign: 'center',
						border: 'none',
						outline: 'none',
						width: '100%',
						color: '#FFFFFF',
						padding: '13.39px 0',
						borderRadius: '4px',
						marginTop: '30px',
						cursor: 'pointer',
					}}>
					Enable
				</button>
			</div>
		);
	};

	const enabledHandler = async () => {
		dispatch(openLoader());
		try {
			const { data }: any = await axios.get(`/v1/profile/2fa/enable`);
			dispatch(closeLoader());
			dispatch(
				openToastAndSetContent({
					toastContent: data?.message,
					toastStyles: {
						backgroundColor: 'green',
					},
				})
			);
			fetchme();
			dispatch(closeModal());
		} catch (error: any) {
			dispatch(closeLoader());
			const { message } = error.response.data;
			dispatch(
				dispatch(
					openToastAndSetContent({
						toastContent: message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				)
			);
		}
	};

	const generateQR = async () => {
		dispatch(openLoader());
		try {
			const { data } = await axios.get(`/v1/profile/2fa/qrcode`);

			setQr(data);
			dispatch(closeLoader());
			editConfigHandler();
		} catch (error: any) {
			dispatch(closeLoader());
			const { message } = error.response.data;
			dispatch(
				dispatch(
					openToastAndSetContent({
						toastContent: message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				)
			);
		}
	};
	const editConfigHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<div className={styles.modalDiv}>
						<BoxComponent />
					</div>
				),
			})
		);
	};
	return (
		<div style={{ padding: '20px' }}>
			<NavBar name='Account' />
			<div className={styles.transactionsHeader}>
				<div
					style={{
						color: '#211F01',
						display: 'inline',
						cursor: 'pointer',
						fontWeight: '800px',
					}}></div>
				{!me?.user?.twofaSetup && (
					<button
						onClick={() => generateQR()}
						className={styles.downloadbutton}>
						Generate QR
					</button>
				)}
			</div>
			<div>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<div className={styles.customerInfo}>
							<div className={styles.detailsValue}>First Name</div>
							<div className={styles.detailsKey}>{me?.user?.firstname}</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<div className={styles.customerInfo}>
							<div className={styles.detailsValue}>Last Name</div>
							<div className={styles.detailsKey}>{me?.user?.lastname}</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<div className={styles.customerInfo}>
							<div className={styles.detailsValue}>Email Address</div>
							<div className={styles.detailsKey}>{me?.user?.email}</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<div className={styles.customerInfo}>
							<div className={styles.detailsValue}>Role</div>
							<div className={styles.detailsKey}>
								{me?.user?.userRole?.userRoleName}
							</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<div className={styles.customerInfo}>
							<div className={styles.detailsValue}>Role Desc.</div>
							<div className={styles.detailsKey}>
								{me?.user?.userRole?.roleDescription}
							</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<div className={styles.customerInfo}>
							<div className={styles.detailsValue}>Phone Number</div>
							<div className={styles.detailsKey}>{me?.user?.phoneNumber}</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<div className={styles.customerInfo}>
							<div className={styles.detailsValue}>Username</div>
							<div className={styles.detailsKey}>{me?.user?.username}</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<div className={styles.customerInfo}>
							<div className={styles.detailsValue}>Status</div>
							<div className={styles.detailsKey}>
								<StatusView
									status={me?.user?.userStatus ? 'true' : 'false'}
									green='true'
									orange='false'
								/>
							</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<div className={styles.customerInfo}>
							<div className={styles.detailsValue}>TwoFaSetup</div>
							<div className={styles.detailsKey}>
								<StatusView
									status={me?.user?.twofaSetup ? 'true' : 'false'}
									green='true'
									orange='false'
								/>
							</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<div className={styles.customerInfo}>
							<div className={styles.detailsValue}>Last Login</div>
							<div className={styles.detailsKey}>{me?.user?.lastLogin}</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<div className={styles.customerInfo}>
							<div className={styles.detailsValue}>Last Login IP</div>
							<div className={styles.detailsKey}>{me?.user?.lastLoginIp}</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<div className={styles.customerInfo}>
							<div className={styles.detailsValue}>Approved On</div>
							<div className={styles.detailsKey}>{me?.user?.approvedOn}</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<div className={styles.customerInfo}>
							<div className={styles.detailsValue}>Created At</div>
							<div className={styles.detailsKey}>{me?.user?.createdAt}</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<div className={styles.customerInfo}>
							<div className={styles.detailsValue}>Updated At</div>
							<div className={styles.detailsKey}>{me?.user?.updatedAt}</div>
						</div>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default Account;
