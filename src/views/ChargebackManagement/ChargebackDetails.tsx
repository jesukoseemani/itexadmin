import React, { useState, useEffect } from 'react';
import styles from './ChargebackManagement.module.scss';
import { useParams, useHistory } from 'react-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import moment from 'moment';
import { Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import StatusView from '../../components/StatusView/StatusView';
import NavBar from '../../components/navbar/NavBar';

interface props {
	id: number;
	chargebackid: number;
	responsefrom: string;
	fromid: null | number;
	response: string;
	proof1: null | string;
	proof2: null | string;
	createdat: string;
	updatedat: null | string;
}

const ChargebackDetailsNew = () => {
	const [chargebackDetails, setChargebackDetails] = useState<any>();
	const { id } = useParams<{ id: any }>();
	const dispatch = useDispatch();
	const history = useHistory();

	const fetchData = async () => {
		dispatch(openLoader());
		try {
			const res: any = await axios.get(`/v1/chargeback/${id}`);
			setChargebackDetails(res.data);
			console.log(res);
			dispatch(closeLoader());
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

	useEffect(() => {
		fetchData();
	}, [id]);

	return (
		<div>
			<NavBar name='Chargeback' />
			<div
				onClick={() => history.goBack()}
				className={styles.transactionsHeader}>
				{'<'} Chargeback Details
			</div>

			<div className={styles.detailBox}>
				<h3 className={styles.detailh3}>
					{chargebackDetails?.chargeback?.merchantaccount?.tradingname}
				</h3>
				<Divider />
				<div style={{ padding: '0 24px' }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={2} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Linking reference</div>
								<div className={styles.detailsKey}>
									{chargebackDetails?.chargeback?.linkingreference}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Payment ID</div>
								<div className={styles.detailsKey}>
									{chargebackDetails?.chargeback?.paymentid}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={2} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Amount</div>
								<div className={styles.detailsKey}>
									{chargebackDetails?.chargeback?.currency}{' '}
									{chargebackDetails?.chargeback?.amount}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Chargeback reason</div>
								<div className={styles.detailsKey}>
									{chargebackDetails?.chargeback?.chargebackreason}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Status</div>
								<div className={styles.detailsKey}>
									<StatusView
										status={chargebackDetails?.chargeback?.status}
										green='won'
										red='lost'
										orange='pending'
									/>
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Due Date</div>
								<div className={styles.detailsKey}>
									{chargebackDetails?.chargeback?.duedate}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Created At</div>
								<div className={styles.detailsKey}>
									{chargebackDetails?.chargeback?.createdat}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Updated At</div>
								<div className={styles.detailsKey}>
									{chargebackDetails?.chargeback?.updatedat}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Response Status</div>
								<div className={styles.detailsKey}>
									{chargebackDetails?.chargeback?.responsestatus}
								</div>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>

			{/* <div className={styles.detailBox}>
				<h3 className={styles.detailh3}>Chargeback Responses</h3>
				<Divider />
				<div style={{ padding: '0 24px' }}>
					{chargebackDetails?.chargebackResponses?.map(
						(item: props, i: number) => (
							<div style={{ display: 'flex' }}>
								From: {item.responsefrom} {'==>'} Response: {item.response}{' '}
								{'==>'}
								CreatedAt: {item.createdat}
							</div>
						)
					)}
				</div>
			</div> */}
		</div>
	);
};

export default ChargebackDetailsNew;
