import React, { useState, useEffect } from 'react';
import styles from './BusinessDetails.module.scss';
import NavBar from '../../components/navbar/NavBar';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Divider } from '@material-ui/core';
import danger from '../../assets/images/danger.svg';
import locale from '../../assets/images/locale.svg';
import Grid from '@mui/material/Grid';
import BusinessDataTabs from '../businessTabs/BusinessDataTabs';
import { useLocation, useHistory } from 'react-router';
import { BusinessTableApiTypes } from '../../types/UserTableTypes';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import FirstReuse from '../ModalsReuse/businessDetailsModal/FirstReuse';
import SecondReuse from '../ModalsReuse/businessDetailsModal/SecondReuse';
import ThirdReuse from '../ModalsReuse/businessDetailsModal/ThirdReuse';
import FourthReuse from '../ModalsReuse/businessDetailsModal/FourthReuse';
import FifthReuse from '../ModalsReuse/businessDetailsModal/fifthReuse';
import SixthReuse from '../ModalsReuse/businessDetailsModal/SixthReuse';
import EditBusiness from '../ModalsReuse/businessDetailsModal/EditBusiness';
import { ReactComponent as PendingIcon } from '../../assets/images/alert-circle.svg';
import { ReactComponent as DangerIcon } from '../../assets/images/close-circle.svg';
import { ReactComponent as ApprovedIcon } from '../../assets/images/checkmark-circle.svg';
import Modal from 'react-modal';
import { customStyles } from '../../helpers/modalStyles';
import { ReactComponent as CloseIcon } from '../../assets/images/modalclose.svg';
import MessageComplianceModal from '../messageComplianceModal/MessageComplianceModal';

function BusinessDetails() {
	const [details, setDetails] = useState<BusinessTableApiTypes>();
	const [docsDetails, setDocsDetails] = useState<any>();

	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const [modalIsOpen, setIsOpen] = React.useState(false);
	function closeModal() {
		setIsOpen(false);
	}
	function openModal() {
		setIsOpen(true);
	}

	const urlId = location.pathname.split('/')[2];
	interface addressTypes {
		line1: string;
		line2: string;
		city: string;
		state: string;
	}

	useEffect(() => {
		axios
			.get<BusinessTableApiTypes>(`/admin/business?merchantcode=${urlId}`)
			.then((res) => {
				setDetails(res.data);
				console.log('getbusiness:', res.data);
			});
	}, [urlId]);

	const supportEmail = details?.businesses[0].meta.filter(
		(item) => item.name === 'supportemail'
	);

	const chargeBack = details?.businesses[0].meta.filter(
		(item) => item.name === 'chargebackemail'
	);
	//select Variables
	const complianceContent = ['Approved', 'Pending', 'Declined'];
	const SettlementCycleContent = [
		{ name: 'T + 1' },
		{ name: 'T + 14' },
		{ name: 'Others' },
	];
	const CurrencyContent = [{ name: 'NGN' }, { name: 'USD' }];

	const PaymentTypeContent = [{ name: 'Account' }];

	const LimitEntityContent = [{ name: 'Currency' }];

	const EntityValueContent = [
		{ name: 'NGN', output: 'Nigerian Naira(NGN)' },
		{ name: 'USD', output: 'United States Dolar(USD)' },
	];

	const TransactionTypeContent = [
		{ name: 'local card' },
		{ name: 'foreign card' },
	];

	const AccountTypeContent = ['Active', 'Inactive'];
	const BusinessTypeContent = ['Individual', 'Business', 'NGO'];
	const InternationalTypeContent = ['Enable', 'Disable'];
	const RiskTypeContent = ['High Risk', 'Low Risk', 'Medium Risk'];

	const authTypeContent = [
		'VBVSecure Code',
		'NoAuth',
		'Pin + OTP',
		'Tokenization',
	];

	const sendMessageHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<>
						<MessageComplianceModal />
					</>
				),
			})
		);
	};

	const popUpHandler = (desc: string) => {
		if (desc === 'compliance') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<FirstReuse
								title='Change compliance status'
								description='Select compliance status'
								content={complianceContent}
							/>
						</>
					),
				})
			);
		} else if (desc === 'settlement') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<SecondReuse
								title='Change settlement cycle'
								desc1='Currency'
								desc2='Settlement cycle'
								desc3='Settlement type'
								content={SettlementCycleContent}
								content2={CurrencyContent}
							/>
						</>
					),
				})
			);
		} else if (desc === 'translimit') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<ThirdReuse
								title='Manage transaction limit'
								desc1='Payment type'
								desc2='Limit entity'
								desc3='Entity value'
								desc4='Minimum amount per transaction'
								desc5='Maximum amount per transaction'
								desc6='Cumulative daily'
								desc7='Alias'
								content={PaymentTypeContent}
								content2={LimitEntityContent}
								content3={EntityValueContent}
							/>
						</>
					),
				})
			);
		} else if (desc === 'transactionfee') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<FourthReuse
								// desc1='Currency'
								desc2='Transaction Type'
								desc3='Percentage Value'
								desc4='Flat Value'
								// desc5='Entity'
								desc6='Capped At'
								title='Change transaction fees'
								// content={CurrencyContent}
								content2={TransactionTypeContent}
								// content3={PaymentTypeContent}
							/>
						</>
					),
				})
			);
		} else if (desc === 'merchantcategory') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<FirstReuse
								title='Change merchant category'
								description='Select merchant category'
								content={complianceContent}
							/>
						</>
					),
				})
			);
		} else if (desc === 'accountstatus') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<FirstReuse
								title='Change account status'
								description='Select account status'
								content={AccountTypeContent}
							/>
						</>
					),
				})
			);
		} else if (desc === 'businesstype') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<FirstReuse
								title='Change business type'
								description='Select business type'
								content={BusinessTypeContent}
							/>
						</>
					),
				})
			);
		} else if (desc === 'internationcard') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<FirstReuse
								title='Change internation card settings'
								description='Select internation card settings'
								content={InternationalTypeContent}
							/>
						</>
					),
				})
			);
		} else if (desc === 'authmodel') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<FirstReuse
								title='Change transaction auth model'
								description='Select transaction auth model'
								content={authTypeContent}
							/>
						</>
					),
				})
			);
		} else if (desc === 'transferfee') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<FourthReuse
								desc1='Currency'
								// desc2='Transaction Type'
								desc3='Percentage Value'
								desc4='Flat Value'
								desc5='Entity'
								// desc6='Capped At'
								title='Change transfer fees'
								content={CurrencyContent}
								// content2={TransactionTypeContent}
								content3={PaymentTypeContent}
							/>
						</>
					),
				})
			);
		} else if (desc === 'riskcategory') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<FirstReuse
								title='Change merchant risk category'
								description='Select risk category'
								content={RiskTypeContent}
							/>
						</>
					),
				})
			);
		} else if (desc === 'transferlimit') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<FifthReuse
								title='Manage transaction limit'
								desc1='Currency'
								desc2='Amount per transaction'
								desc3='Daily cumulative'
								desc4='Frequency'
								desc5='Description'
								content={CurrencyContent}
							/>
						</>
					),
				})
			);
		} else if (desc === 'rolling_reserve') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<SixthReuse
								title='Change Rolling reserve'
								description='Select rolling'
							/>
						</>
					),
				})
			);
		} else if (desc === 'vpc') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<SixthReuse
								title='Change VPC merchant'
								description='Select VPC merchant'
							/>
						</>
					),
				})
			);
		} else if (desc === 'editbusiness') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<EditBusiness />
						</>
					),
				})
			);
		} else {
			return null;
		}
	};

	const docs = [
		{
			id: 1,
			image: 'https://picsum.photos/200',
			name: 'CAC Certificate',
			status: 'Pending',
			comment: 'CAC Certificate is a useful piece',
		},
		{
			id: 2,
			image: 'https://picsum.photos/200',
			name: 'First Director ID',
			status: 'Approved',
			comment: 'Director ID is a useful piece',
		},
		{
			id: 3,
			image: 'https://picsum.photos/200',
			name: 'MEMAT Document',
			status: 'Declined',
			comment: 'MEMAT Document is a useful piece',
		},
		{
			id: 4,
			image: 'https://picsum.photos/200',
			name: 'Lincense',
			status: 'Approved',
			comment: 'Document is a useful piece',
		},
	];

	const back = '<< Back';
	const next = 'Next >>';
	const imageViewerHandler = (
		image: string,
		name: string,
		status: string,
		comment: string,
		id: number
	) => {
		setDocsDetails({ image, name, status, comment, id });
		setIsOpen(true);
	};

	const moveHandler = (identify: string) => {
		setIsOpen(false);

		if (identify === 'back') {
			const filterdata = docs.filter((item) => item.id === docsDetails.id - 1);
			setDocsDetails(filterdata[0]);
		}

		if (identify === 'next') {
			const filterdata = docs.filter((item) => item.id === docsDetails.id + 1);
			setDocsDetails(filterdata[0]);
		}

		setTimeout(() => {
			setIsOpen(true);
		}, 100);
	};

	return (
		<div className={styles.container}>
			<NavBar name='business' />

			<div onClick={() => history.goBack()} className={styles.back}>
				<span className={styles.back_span}>
					<ArrowLeftIcon />
				</span>{' '}
				<p className={styles.back_paragraph}> Back to business</p>
			</div>

			<div className={styles.detailsHeader}>
				<div className={styles.detailsHeaderLeft}>
					<h1 className={styles.detailsHeaderLeftH1}>
						{details?.businesses[0].tradingname}
					</h1>
					<button
						className={styles.detailsHeaderLeftButton}
						style={{
							backgroundColor:
								(details?.businesses[0].approved === 'APPROVED' && '#27AE60') ||
								(details?.businesses[0].approved === 'DECLINED' && '#EB5757') ||
								(details?.businesses[0].approved === 'PENDING' && '#F2C94C') ||
								'rgba(169, 170, 171, 0.22)',
							color:
								(details?.businesses[0].approved === 'APPROVED' && '#FFFFFF') ||
								(details?.businesses[0].approved === 'DECLINED' && '#FFFFFF') ||
								(details?.businesses[0].approved === 'PENDING' && '#FFFFFF') ||
								'#FFFFFF',
						}}>
						{details?.businesses[0].approved}
					</button>
				</div>

				<div className={styles.detailsHeaderRight}>
					<button
						onClick={() => popUpHandler('editbusiness')}
						className={styles.detailsHeaderRightButton}>
						Edit business details
					</button>
				</div>
			</div>

			<div className={styles.divider_wrapper}>
				<Divider />
			</div>

			<div className={styles.desc}>
				<div className={styles.desc_content}>
					<span className={styles.desc_span_img}>
						<img src={danger} alt='' />
					</span>
					<p className={styles.desc_paragraph}>
						{details?.businesses[0].businesstype ||
							'Business Type Not Provided'}
					</p>
				</div>

				<div className={styles.desc_content}>
					<span className={styles.desc_span_img}>
						<img src={locale} alt='' />
					</span>{' '}
					{details?.businesses[0].address.length !== 0 ? (
						details?.businesses[0].address.map((item: addressTypes) => (
							<p className={styles.desc_paragraph}>
								`${item.line1} ${item.line2} ${item.city} ${item.state}`
							</p>
						))
					) : (
						<p className={styles.desc_paragraph}>
							There is no address details for this user
						</p>
					)}
				</div>
			</div>

			<div className={styles.businesss_trans}>
				<h3 className={styles.businesss_trans_h3}>
					Business transactions details
				</h3>
			</div>

			<div className={styles.divider_wrapper_2}>
				<Divider />
			</div>

			<div className={styles.gridFeatures}>
				<Grid container spacing={2}>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Transactions count
							</h1>
							<p className={styles.gridFeatureBusinessP}>0</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusinessh}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Transactions value
							</h1>
							<p className={styles.gridFeatureBusinessP}>0</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusinessh}>
							<h1 className={styles.gridFeatureBusinessH1}>Revenue</h1>
							<p className={styles.gridFeatureBusinessP}>0</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusinessh}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Successful transactions
							</h1>
							<p className={styles.gridFeatureBusinessP}>0</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusinessh}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Failed transactions
							</h1>

							<p
								style={{ color: '#EB5757' }}
								className={styles.gridFeatureBusinessP}>
								0
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusinessh}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Pending transactions
							</h1>
							<p
								style={{ color: '#F59607' }}
								className={styles.gridFeatureBusinessP}>
								0
							</p>
						</div>
					</Grid>
				</Grid>
			</div>

			<div className={styles.business_header_general}>
				<h3 className={styles.businesss_trans_h3}>Ledger Balances</h3>
			</div>

			<div className={styles.divider_wrapper_3}>
				<Divider />
			</div>

			<div className={styles.gridFeatures}>
				<Grid container spacing={2}>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Ledger balance</h1>
							<p className={styles.gridFeatureBusinessP}>0</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>NGN balance</h1>
							<p className={styles.gridFeatureBusinessP}>0</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>USD Balance</h1>
							<p className={styles.gridFeatureBusinessP}>0</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>GHS Balance</h1>
							<p className={styles.gridFeatureBusinessP}>0</p>
						</div>
					</Grid>
				</Grid>
			</div>

			<div className={styles.business_header_general}>
				<h3 className={styles.businesss_trans_h3}>Available Balances</h3>
			</div>

			<div className={styles.divider_wrapper_3}>
				<Divider />
			</div>

			<div className={styles.gridFeatures}>
				<Grid container spacing={2}>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Ledger balance</h1>
							<p className={styles.gridFeatureBusinessP}>0</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>NGN balance</h1>
							<p className={styles.gridFeatureBusinessP}>0</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>USD Balance</h1>
							<p className={styles.gridFeatureBusinessP}>0</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>GHS Balance</h1>
							<p className={styles.gridFeatureBusinessP}>0</p>
						</div>
					</Grid>
				</Grid>
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
				className={styles.business_header_general}>
				<h3 className={styles.businesss_trans_h3}>Business Document</h3>
				<button
					onClick={sendMessageHandler}
					className={styles.detailsHeaderRightButton}>
					Send Merchant a message
				</button>
			</div>

			<div className={styles.divider_wrapper_3}>
				<Divider />
			</div>

			<div className={styles.docsWrapper}>
				{docs.map(({ image, name, status, comment, id }) => (
					<div
						key={id}
						onClick={() => imageViewerHandler(image, name, status, comment, id)}
						className={styles.singleDocs}>
						<p>{name}</p>
						<div className={styles.singleDocsImage}>
							<img src={image} alt='' />
							<span>
								{status === 'Approved' ? (
									<ApprovedIcon />
								) : status === 'Pending' ? (
									<PendingIcon />
								) : (
									<DangerIcon />
								)}
							</span>
						</div>
					</div>
				))}
			</div>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel='Example Modal'
				style={customStyles}>
				<div className={styles.modalBody}>
					<div className={styles.modalHeader}>
						<div className={styles.background}>
							<div className={styles.linkDetails}>{docsDetails?.name}</div>
							<CloseIcon onClick={closeModal} style={{ cursor: 'pointer' }} />
						</div>
					</div>

					<Divider />

					<div className={styles.contentWrap}>
						<h3>Compliant Status</h3>
						<button
							style={{
								backgroundColor:
									(docsDetails?.status === 'Approved' && '#27AE60') ||
									(docsDetails?.status === 'Declined' && '#EB5757') ||
									(docsDetails?.status === 'Pending' && '#F2C94C') ||
									'rgba(169, 170, 171, 0.22)',
								color:
									(docsDetails?.status === 'Approved' && '#FFFFFF') ||
									(docsDetails?.status === 'Declined' && '#FFFFFF') ||
									(docsDetails?.status === 'Pending' && '#FFFFFF') ||
									'#FFFFFF',
							}}>
							{docsDetails?.status}
						</button>
					</div>
					<div className={styles.contentoverflow}>
						<div className={styles.contentImage}>
							<img src={docsDetails?.image} alt='' />
						</div>
						<div className={styles.contentWord}>
							<h3>Compliant Comment</h3>
							<Divider style={{ margin: '0px', padding: '0px' }} />
							<p className={styles.contentWord_p}>{docsDetails?.comment}</p>
						</div>
					</div>

					<div className={styles.contentButton}>
						<button
							disabled={docsDetails?.id <= 1}
							onClick={() => moveHandler('back')}
							className={styles.contentButtonBack}>
							{back}
						</button>
						<button
							disabled={docsDetails?.id >= docs?.length}
							onClick={() => moveHandler('next')}
							className={styles.contentButtonNext}>
							{next}
						</button>
					</div>
				</div>
			</Modal>
			{/* 
			<div className={styles.business_header_general}>
				<h3 className={styles.businesss_trans_h3}>Business information</h3>
			</div>

			<div className={styles.divider_wrapper_3}>
				<Divider />
			</div>

			<div className={styles.gridFeatures}>
				<Grid container spacing={8}>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Signup date</h1>
							<p className={styles.gridFeatureBusinessP}>
								{details?.businesses[0].added &&
									format(parseISO(details?.businesses[0].added), 'MM MMM yyyy')}
								&nbsp;&nbsp;
								{details?.businesses[0].added &&
									format(parseISO(details?.businesses[0].added), 'h aaa')}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Merchant ID</h1>
							<p className={styles.gridFeatureBusinessP}>
								{details?.businesses[0].merchantcode}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Payvice ID</h1>
							<p className={styles.gridFeatureBusinessP}></p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Account email</h1>
							<p className={styles.gridFeatureBusinessP}>
								{' '}
								{details?.businesses[0].email}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Compliance status
							</h1>
							<div className={styles.gridFeatureBusinessDiv}>
								<button
									className={styles.gridFeatureBusinessButton}
									style={{
										backgroundColor:
											(details?.businesses[0].approved === 'APPROVED' &&
												'#27AE60') ||
											(details?.businesses[0].approved === 'DECLINED' &&
												'#EB5757') ||
											(details?.businesses[0].approved === 'PENDING' &&
												'#F2C94C') ||
											'rgba(169, 170, 171, 0.22)',
										color:
											(details?.businesses[0].approved === 'APPROVED' &&
												'#FFFFFF') ||
											(details?.businesses[0].approved === 'DECLINED' &&
												'#FFFFFF') ||
											(details?.businesses[0].approved === 'PENDING' &&
												'#FFFFFF') ||
											'#FFFFFF',
									}}>
									{details?.businesses[0].approved}
								</button>
								<p
									onClick={() => popUpHandler('compliance')}
									className={styles.gridFeatureBusinessPE}>
									Edit
								</p>
							</div>
						</div>
					</Grid>

					<Grid item xs={6} md={2}></Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Country</h1>
							<p className={styles.gridFeatureBusinessP}>
								{' '}
								{details?.businesses[0].user[0].country === 'NG'
									? 'Nigeria'
									: 'Nigeria'}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Merchant Category
							</h1>
							<div className={styles.gridFeatureBusinessDiv}>
								<p className={styles.gridFeatureBusinessP1}>Ecommerce</p>
								<p
									onClick={() => popUpHandler('merchantcategory')}
									className={styles.gridFeatureBusinessPE}>
									Edit
								</p>
							</div>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Referral code</h1>
							<p className={styles.gridFeatureBusinessP}></p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Account status</h1>
							<div className={styles.gridFeatureBusinessDiv}>
								<button className={styles.gridFeatureBusinessButton}>
									{details?.businesses[0]?.settlement?.account[0]?.status}
								</button>

								<p
									onClick={() => popUpHandler('accountstatus')}
									style={{ color: '#27AE60', cursor: 'pointer' }}
									className={styles.gridFeatureBusinessPE}>
									Edit
								</p>
							</div>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Payment ID</h1>
							<p className={styles.gridFeatureBusinessP}></p>
						</div>
					</Grid>

					<Grid item xs={6} md={2}></Grid>

					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Business email</h1>
							<p className={styles.gridFeatureBusinessP}>
								{' '}
								{details?.businesses[0].email}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Phone number</h1>
							<p className={styles.gridFeatureBusinessP}>
								{' '}
								{details?.businesses[0].phonenumber}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Support email</h1>
							<p className={styles.gridFeatureBusinessP}>
								{' '}
								{supportEmail && supportEmail[0]?.value}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>VPC merchant</h1>
							<div className={styles.gridFeatureBusinessDiv}>
								<p className={styles.gridFeatureBusinessP1}></p>

								<p
									className={styles.gridFeatureBusinessPE}
									onClick={() => popUpHandler('vpc')}>
									Edit
								</p>
							</div>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Chargeback email</h1>
							<p className={styles.gridFeatureBusinessP}>
								{chargeBack && chargeBack[0]?.value}
							</p>
						</div>
					</Grid>

					<Grid item xs={6} md={2}></Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Settlement account number
							</h1>
							<p className={styles.gridFeatureBusinessP}></p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Business type</h1>
							<div className={styles.gridFeatureBusinessDiv}>
								<p className={styles.gridFeatureBusinessP1}>Individual</p>

								<p
									onClick={() => popUpHandler('businesstype')}
									className={styles.gridFeatureBusinessPE}>
									Edit
								</p>
							</div>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>
								International card{' '}
							</h1>
							<div className={styles.gridFeatureBusinessDiv}>
								<p className={styles.gridFeatureBusinessP1}>Enabled</p>

								<p
									onClick={() => popUpHandler('internationcard')}
									className={styles.gridFeatureBusinessPE}>
									Edit
								</p>
							</div>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Contact person</h1>
							<p className={styles.gridFeatureBusinessP}>
								{' '}
								{details?.businesses[0].user[0].firstname}
								{details?.businesses[0].user[0].lastname}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Settlement Destination
							</h1>
							<p className={styles.gridFeatureBusinessP}>Bank account</p>
						</div>
					</Grid>

					<Grid item xs={6} md={2}></Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Authentication model
							</h1>
							<div className={styles.gridFeatureBusinessDiv}>
								<p className={styles.gridFeatureBusinessP1}>
									VBVSECURECODE (NORMAL)
								</p>

								<p
									onClick={() => popUpHandler('authmodel')}
									className={styles.gridFeatureBusinessPE}>
									Edit
								</p>
							</div>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Transfer fees</h1>
							<p className={styles.gridFeatureBusinessP}>
								<div className={styles.gridFeatureBusinessDiv}>
									<p className={styles.gridFeatureBusinessP1}>2% (NGN) </p>

									<p
										onClick={() => popUpHandler('transferfee')}
										className={styles.gridFeatureBusinessPE}>
										Edit
									</p>
								</div>
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Rolling reserve</h1>
							<div className={styles.gridFeatureBusinessDiv}>
								<p className={styles.gridFeatureBusinessP1}>5%</p>
								<p
									onClick={() => popUpHandler('rolling_reserve')}
									className={styles.gridFeatureBusinessPE}>
									Edit
								</p>
							</div>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Settlement cycle</h1>
							<p className={styles.gridFeatureBusinessP}>
								<div className={styles.gridFeatureBusinessDiv}>
									<p className={styles.gridFeatureBusinessP1}>T+5 </p>
									<p
										onClick={() => popUpHandler('settlement')}
										className={styles.gridFeatureBusinessPE}>
										Edit
									</p>
								</div>
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Merchants payment modal
							</h1>
							<p className={styles.gridFeatureBusinessP}>Open payment modal</p>
						</div>
					</Grid>

					<Grid item xs={6} md={2}></Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Transaction fees</h1>
							<p className={styles.gridFeatureBusinessP}>
								<div className={styles.gridFeatureBusinessDiv}>
									<p className={styles.gridFeatureBusinessP1}>
										Using default fees
									</p>

									<p
										onClick={() => popUpHandler('transactionfee')}
										className={styles.gridFeatureBusinessPE}>
										Edit
									</p>
								</div>
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={8}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Transaction limits
							</h1>
							<p className={styles.gridFeatureBusinessP}>
								<div className={styles.gridFeatureBusinessDiv}>
									<p className={styles.gridFeatureBusinessP1}>
										Mininum/TXN: Unlimited | Maximum/TXN: NGN2,000,000.00 |
										Daily Cumulative: NGN10,000,000.00
									</p>
									<p
										onClick={() => popUpHandler('translimit')}
										className={styles.gridFeatureBusinessPE}>
										Edit
									</p>
								</div>
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}></Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Risk category</h1>
							<p className={styles.gridFeatureBusinessP}>
								{' '}
								<p className={styles.gridFeatureBusinessP}>
									<div className={styles.gridFeatureBusinessDiv}>
										<p className={styles.gridFeatureBusinessP1}>Low risk</p>

										<p
											onClick={() => popUpHandler('riskcategory')}
											className={styles.gridFeatureBusinessPE}>
											Edit
										</p>
									</div>
								</p>
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Transfer limits</h1>
							<p className={styles.gridFeatureBusinessP}>
								{' '}
								<p className={styles.gridFeatureBusinessP}>
									<div className={styles.gridFeatureBusinessDiv}>
										<p className={styles.gridFeatureBusinessP1}>
											Default limits
										</p>

										<p
											onClick={() => popUpHandler('transferlimit')}
											className={styles.gridFeatureBusinessPE}>
											Edit
										</p>
									</div>
								</p>
							</p>
						</div>
					</Grid>
				</Grid>
			</div> */}
			{/* <BusinessDataTabs id={urlId} /> */}
		</div>
	);
}

export default BusinessDetails;
