import React, { useEffect, useState } from 'react';
import NavBar from '../../components/navbar/NavBar';
import styles from './TransactionManagement.module.scss';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Divider, Grid, Box } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useDispatch } from 'react-redux';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import RefundTransaction from '../../components/transactionsModals/RefundTransaction';
import FlagTransaction from '../../components/transactionsModals/FlagTransaction';
import LogChargeback from '../../components/transactionsModals/LogChargeback';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { TransactionManagementApiTypes } from '../../types/UserTableTypes';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';

const TransactionDetails = () => {
	const location = useLocation();

	interface ParamTypes {
		id: string;
	}
	const { id } = useParams<ParamTypes>();

	const data = {
		title: 'Flag Transaction',
		question: 'Why are you flagging this transaction?',
		buttonText: 'Flag Transaction',
	};

	const history = useHistory();

	const [apiRes, setApiRes] = useState<TransactionManagementApiTypes>();

	const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
		5
	);

	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		axios
			.get<TransactionManagementApiTypes>(
				`/admin/transactions?reference=${id}`
			)
			.then((res) => {
				setApiRes(res.data);
			});
	}, []);

	const dispatch = useDispatch();

	const handleBackToTransactions = () => {
		history.push('/transactionmgt');
	};

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

	const flagTransactionHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<div className='modalDiv'>
						<FlagTransaction data={data} />
					</div>
				),
			})
		);
	};

	const logChargebackHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<div className='modalDiv'>
						<LogChargeback />
					</div>
				),
			})
		);
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				height: '100%',
			}}>
			<NavBar name='FraudulentTransaction' />

			{/* <h1>Balance</h1> */}

			<div className={styles.transactionDetailsHeader}>
				<span className={styles.back} onClick={handleBackToTransactions}>
					<ArrowLeftIcon /> Back to transactions
				</span>

				<Box sx={{ flexGrow: 1, margin: '1rem' }}>
					<Grid container spacing={3}>
						<Grid item md={6} xs={12} lg={6}>
							<div>
								<span className={styles.headerAmount}>
									{apiRes?.transactions[0]?.order?.currency}{' '}
									{/* {apiRes?.transactions[0]?.order?.amount?.split('.')[0]} */}
									{apiRes?.transactions[0]?.order?.amount}
								</span>
								<button
									style={{
										backgroundColor:
											(apiRes?.transactions[0].code === '00' && '#27AE60') ||
											(apiRes?.transactions[0].code !== '00' &&
												apiRes?.transactions[0].code !== '09' &&
												'#F2C94C') ||
											(apiRes?.transactions[0].code === '09' && '#EB5757') ||
											'rgba(169, 170, 171, 0.22)',
										color:
											(apiRes?.transactions[0].code === '00' && '#FFFFFF') ||
											(apiRes?.transactions[0].code === '09' && '#FFFFFF') ||
											(apiRes?.transactions[0].code !== '09' && '#333333') ||
											'#002841',
									}}
									className={styles.buttonSuccessful}>
									{' '}
									{(apiRes?.transactions[0].code === '00' && 'Successful') ||
										(apiRes?.transactions[0].code === '09' && 'Failed') ||
										'Pending'}
								</button>
							</div>
						</Grid>
						<Grid item md={6} xs={12} lg={6}>
							<div className={styles.headerFlexRight}>
								<button
									className={styles.buttongrey}
									onClick={refundTransactionHandler}>
									Refund transaction
								</button>
								<button
									className={styles.buttonflag}
									onClick={flagTransactionHandler}>
									Flag as Fraudulent
								</button>
								<button
									className={styles.buttongreen}
									onClick={logChargebackHandler}>
									Log Chargeback
								</button>
							</div>
						</Grid>
					</Grid>
				</Box>
			</div>
			<Divider />

			<div className={styles.transactionDetails}>
				<div>
					<Box sx={{ flexGrow: 1, margin: '0 1rem 1rem 1rem' }}>
						<Grid container spacing={1}>
							<Grid item md={2} xs={6} lg={2}>
								<p className={styles.header}>Date / Time</p>
								<p className={styles.detail}>
									{apiRes?.transactions[0].transaction.added}
									{/* <span className={styles.header}>2:21 PM</span> */}
								</p>
							</Grid>
							<hr className={styles.dividerClass} />
							<Grid item md={3} xs={6} lg={3}>
								<p className={styles.header}>Customer</p>
								<p className={styles.detail}>
									{apiRes?.transactions[0]?.source?.customer?.email}
								</p>
							</Grid>
							<hr className={styles.dividerClass} />
							<Grid item md={2} xs={6} lg={2}>
								<p className={styles.header}>Card type</p>
								<p className={styles.detail}>
									{apiRes?.transactions[0]?.source?.customer?.card?.type}
								</p>
							</Grid>
							<hr className={styles.dividerClass} />
							<Grid item md={2} xs={6} lg={2}>
								<p className={styles.header}>Card number</p>
								<p className={styles.detail}>
									{apiRes?.transactions[0]?.source?.customer?.card?.number}
								</p>
							</Grid>
							<Grid item md={2} xs={6} lg={2}>
								<span className={styles.blacklist}>
									Blacklist customer <BlockIcon fontSize='small' />
								</span>
							</Grid>
						</Grid>
					</Box>
				</div>

				<div>
					<Box sx={{ flexGrow: 1, margin: '0 1rem 1rem 1rem' }}>
						<h4 className={styles.gridHeader}>Payment information</h4>
						<Divider />
						<div className={styles.mt1}>
							<Grid container spacing={3}>
								<Grid item md={3} xs={6} lg={3}>
									<div className={styles.inline}>
										<p className={styles.header}>Payment reference</p>
										<div className={styles.paymentflex}>
											<p className={styles.detail}>
												{apiRes?.transactions[0]?.transaction?.reference}
											</p>
											<span className={styles.copy}>
												<CopyToClipboard
													text={
														apiRes?.transactions[0]?.transaction?.reference ??
														'...'
													}>
													<ContentCopyIcon fontSize='small' />
												</CopyToClipboard>
											</span>
										</div>
									</div>
								</Grid>
								<Grid item md={2} xs={6} lg={2}>
									<p className={styles.header}>Transaction Fee</p>
									<p className={styles.detail}>
										NGN {apiRes?.transactions[0]?.order?.amount}
									</p>
								</Grid>
								<Grid item md={2} xs={6} lg={2}>
									<p className={styles.header}>Country/Region</p>
									<p className={styles.detail}>
										{apiRes?.transactions[0]?.order?.country}
									</p>
								</Grid>
								<Grid item md={2} xs={6} lg={2}>
									<p className={styles.header}>Bank name</p>
									<p className={styles.detail}></p>
								</Grid>
								<Grid item md={3} xs={6} lg={3}>
									<p className={styles.header}>ITEX Reference</p>
									<p className={styles.detail}>
										{apiRes?.transactions[0]?.transaction?.linkingreference}
									</p>
								</Grid>
							</Grid>
						</div>

						<div className={styles.mt2}>
							<Grid container spacing={3}>
								<Grid item md={3} xs={6} lg={3}>
									<p className={styles.header}>Merchant ID</p>
									<p className={styles.detail}>
										{apiRes?.transactions[0]?.business.merchantcode}
									</p>
								</Grid>
								<Grid item md={2} xs={6} lg={2}>
									<p className={styles.header}>Provider</p>
									<p className={styles.detail}></p>
								</Grid>
								<Grid item md={2} xs={6} lg={2}>
									<p className={styles.header}>Payment location</p>
									<p className={styles.detail}></p>
								</Grid>
								<Grid item md={5} xs={6} lg={5}>
									<p className={styles.header}>ITEX Reference</p>
									<p className={styles.detail}>
										{apiRes?.transactions[0]?.transaction?.linkingreference}
									</p>
								</Grid>
							</Grid>
						</div>
					</Box>
				</div>

				<div>
					<Box sx={{ flexGrow: 1, margin: '0 1rem 1rem 1rem' }}>
						<h4 className={styles.gridHeader}>Device information</h4>
						<Divider />
						<div className={styles.mt1}>
							<Grid container spacing={3}>
								<Grid item md={4} xs={12} lg={4}>
									<p className={styles.header}>Device fingerprint</p>
									<p className={styles.detail}>
										{
											apiRes?.transactions[0]?.source?.customer?.device
												?.fingerprint
										}
									</p>
								</Grid>
								<Grid item md={2} xs={12} lg={2}>
									<p className={styles.header}>IP Address</p>
									<p className={styles.detail}>
										{apiRes?.transactions[0]?.source?.customer?.device?.ip}
									</p>
								</Grid>
							</Grid>
						</div>
					</Box>
				</div>

				<div>
					<Box sx={{ flexGrow: 1, margin: '3rem 1rem 1rem 1rem' }}>
						<Grid container spacing={3}>
							<Grid item md={4} xs={12} lg={4}>
								<p>Transaction timeline</p>
							</Grid>

							<Grid item md={4} xs={12} lg={4}>
								<p>
									<span className={styles.green}>1 min 05secs </span>
									<span className={styles.text}>Time spent making payment</span>
								</p>
							</Grid>

							<Grid item md={4} xs={12} lg={4}>
								<p>
									<span className={styles.error}>1 Error </span>
									<span className={styles.text}> While making payment</span>
								</p>
							</Grid>
						</Grid>
						<Divider />
					</Box>
				</div>

				<div>
					<Box sx={{ flexGrow: 1, margin: '2rem 1rem 1rem 1rem' }}>
						<Grid container spacing={3}>
							<Grid item md={4} xs={12} lg={4}>
								<p className={styles.inline}>
									<CheckCircleOutlineIcon fontSize='small' />
									<p className={styles.ml1}>
										Payment started <br />
										<span className={styles.header}></span>
									</p>
								</p>

								<div className={styles.mt1}>
									<p className={styles.inline}>
										<DoneAllRoundedIcon
											fontSize='small'
											style={{ color: '#219653' }}
										/>
										<p className={styles.ml1}>
											Payment completed <br />
											<span className={styles.header}></span>
										</p>
									</p>
								</div>

								<p className={styles.show}>Show breakdown</p>
							</Grid>
						</Grid>
					</Box>
				</div>
			</div>
		</div>
	);
};

export default TransactionDetails;
