import React, { useState, useEffect } from 'react';
import styles from './BusinessDetails.module.scss';
import NavBar from '../../components/navbar/NavBar';
import { useParams, useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import StatusView from '../StatusView/StatusView';
import { Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import BusinessConfig from './businessConfig/BusinessConfig';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import BusinessSubTab from './BusinessSubTab';
import { BusinessDetailApiTypes } from '../../types/UserTableTypes';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function BusinessDetails({
	details,
	id,
}: {
	details: BusinessDetailApiTypes | undefined;
	id: number;
}) {
	const history = useHistory();
	const dispatch = useDispatch();
	const {
		VIEW_BUSINESS,
		VIEW_BUSINESS_CUSTOMERS,
		VIEW_BUSINESS_TRANSACTION,
		VIEW_BUSINESS_USERS,
		VIEW_BUSINESS_FEES,
		VIEW_BUSINESS_LIMIT,
		VIEW_BUSINESS_PAYMENT_METHOD,
		VIEW_BUSINESS_DOCUMENT,
		VIEW_BUSINESS_SETTLEMENT_SCHEDULE,
		ADD_BUSINESS_FEE,
		ADD_BUSINESS_LIMIT,
		APPROVE_BUSINESS_FEE,
		APPROVE_BUSINESS_LIMIT,
		APPROVE_BUSINESS_DOCUMENT,
		APPROVE_BUSINESS_SETTLEMENT_SCHEDULE,
		EDIT_BUSINESS_CONFIG,
		ADD_BUSINESS_SETTLEMENT_SCHEDULE,
	} = useSelector((state) => state?.permissionPayReducer.permission);

	const editConfigHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<div className={styles.modalDiv}>
						<BusinessConfig id={details?.business.merchantaccountid} />
					</div>
				),
			})
		);
	};

	return (
		<div className={styles.containerBusiness}>
			<div className={styles.transactionsHeader}>
				<div
					style={{
						color: '#211F01',
						display: 'inline',
						cursor: 'pointer',
						fontWeight: '800px',
					}}></div>

				<button
					onClick={() => editConfigHandler()}
					className={styles.downloadbutton}>
					Config Business
				</button>
			</div>

			<div className={styles.detailBox}>
				<div className={styles.detailBoxCorner}>
					<h3 className={styles.detailh3}>OVERVIEW</h3>
				</div>

				<Divider style={{ color: '#CECECD' }} />
				<div className={styles.box}>
					<div className={styles.singleBox}>
						<p>Available Balance</p>
						<h3>{details?.balances[0]?.availablebalance || 0}</h3>
					</div>
					<div className={styles.singleBox}>
						<p>Ledger Balance</p>
						<h3>{details?.balances[0]?.ledgerbalance || 0}</h3>
					</div>
					<div className={styles.singleBox}>
						<p>Reserve Balance</p>
						<h3>{details?.balances[0]?.reservebalance || 0}</h3>
					</div>
				</div>
				<div>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={2} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Merchant ID</div>
								<div className={styles.detailsKey}>
									{details?.business?.merchantaccountid}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Merchant Code</div>
								<div className={styles.detailsKey}>
									{details?.business?.merchantcode}{' '}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={2} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Sign Up Date</div>
								<div className={styles.detailsKey}>
									{' '}
									{details?.business?.createdat}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Status</div>
								<div className={styles.detailsKey}>
									<StatusView
										status={
											details?.business?.status === '1' ? 'Active' : 'InActive'
										}
										orange='InActive'
										green='Active'
									/>
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={2} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Email Address</div>
								<div className={styles.detailsKey}>
									{details?.business?.businessemail}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Mobile Phone</div>
								<div className={styles.detailsKey}>
									{details?.business?.businessphone}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={2} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Account Type</div>
								<div className={styles.detailsKey}>
									{details?.business?.merchantaccounttype}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Country</div>
								<div className={styles.detailsKey}>
									{details?.business?.country}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={2} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Address</div>
								<div className={styles.detailsKey}>
									{details?.address
										? details?.address?.addressline1
										: 'Not provider'}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className={styles.customerInfo}>
								<div className={styles.detailsValue}>Mcc</div>
								<div className={styles.detailsKey}>
									{' '}
									{details?.business?.mcc || 'Not Provided'}
								</div>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
			<BusinessSubTab id={id} />
		</div>
	);
}

export default BusinessDetails;
