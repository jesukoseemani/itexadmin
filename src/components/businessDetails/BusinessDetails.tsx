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
import { BusinessDetailApiTypes } from '../../types/UserTableTypes';
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
	const [details, setDetails] = useState<BusinessDetailApiTypes>();
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
		axios.get<BusinessDetailApiTypes>(`/business/${urlId}`).then((res) => {
			setDetails(res.data);
		});
	}, [urlId]);

	// const supportEmail = details?.businesses[0].meta.filter(
	// 	(item: any) => item.name === 'supportemail'
	// );

	// const chargeBack = details?.businesses[0].meta.filter(
	// 	(item: any) => item.name === 'chargebackemail'
	// );
	// //select Variables
	// const complianceContent = ['Approved', 'Pending', 'Declined'];
	// const SettlementCycleContent = [
	// 	{ name: 'T + 1' },
	// 	{ name: 'T + 14' },
	// 	{ name: 'Others' },
	// ];
	// const CurrencyContent = [{ name: 'NGN' }, { name: 'USD' }];

	// const PaymentTypeContent = [{ name: 'Account' }];

	// const LimitEntityContent = [{ name: 'Currency' }];

	// const EntityValueContent = [
	// 	{ name: 'NGN', output: 'Nigerian Naira(NGN)' },
	// 	{ name: 'USD', output: 'United States Dolar(USD)' },
	// ];

	// const TransactionTypeContent = [
	// 	{ name: 'local card' },
	// 	{ name: 'foreign card' },
	// ];

	// const AccountTypeContent = ['Active', 'Inactive'];
	// const BusinessTypeContent = ['Individual', 'Business', 'NGO'];
	// const InternationalTypeContent = ['Enable', 'Disable'];
	// const RiskTypeContent = ['High Risk', 'Low Risk', 'Medium Risk'];

	// const authTypeContent = [
	// 	'VBVSecure Code',
	// 	'NoAuth',
	// 	'Pin + OTP',
	// 	'Tokenization',
	// ];

	// const sendMessageHandler = () => {
	// 	dispatch(
	// 		openModalAndSetContent({
	// 			modalStyles: {
	// 				padding: 0,
	// 			},
	// 			modalContent: (
	// 				<>
	// 					<MessageComplianceModal />
	// 				</>
	// 			),
	// 		})
	// 	);
	// };

	// const popUpHandler = (desc: string) => {
	// 	if (desc === 'compliance') {
	// 		dispatch(
	// 			openModalAndSetContent({
	// 				modalStyles: {
	// 					padding: 0,
	// 				},
	// 				modalContent: (
	// 					<>
	// 						<FirstReuse
	// 							title='Change compliance status'
	// 							description='Select compliance status'
	// 							content={complianceContent}
	// 						/>
	// 					</>
	// 				),
	// 			})
	// 		);
	// 	} else if (desc === 'settlement') {
	// 		dispatch(
	// 			openModalAndSetContent({
	// 				modalStyles: {
	// 					padding: 0,
	// 				},
	// 				modalContent: (
	// 					<>
	// 						<SecondReuse
	// 							title='Change settlement cycle'
	// 							desc1='Currency'
	// 							desc2='Settlement cycle'
	// 							desc3='Settlement type'
	// 							content={SettlementCycleContent}
	// 							content2={CurrencyContent}
	// 						/>
	// 					</>
	// 				),
	// 			})
	// 		);
	// 	} else if (desc === 'translimit') {
	// 		dispatch(
	// 			openModalAndSetContent({
	// 				modalStyles: {
	// 					padding: 0,
	// 				},
	// 				modalContent: (
	// 					<>
	// 						<ThirdReuse
	// 							title='Manage transaction limit'
	// 							desc1='Payment type'
	// 							desc2='Limit entity'
	// 							desc3='Entity value'
	// 							desc4='Minimum amount per transaction'
	// 							desc5='Maximum amount per transaction'
	// 							desc6='Cumulative daily'
	// 							desc7='Alias'
	// 							content={PaymentTypeContent}
	// 							content2={LimitEntityContent}
	// 							content3={EntityValueContent}
	// 						/>
	// 					</>
	// 				),
	// 			})
	// 		);
	// 	} else if (desc === 'transactionfee') {
	// 		dispatch(
	// 			openModalAndSetContent({
	// 				modalStyles: {
	// 					padding: 0,
	// 				},
	// 				modalContent: (
	// 					<>
	// 						<FourthReuse
	// 							// desc1='Currency'
	// 							desc2='Transaction Type'
	// 							desc3='Percentage Value'
	// 							desc4='Flat Value'
	// 							// desc5='Entity'
	// 							desc6='Capped At'
	// 							title='Change transaction fees'
	// 							// content={CurrencyContent}
	// 							content2={TransactionTypeContent}
	// 							// content3={PaymentTypeContent}
	// 						/>
	// 					</>
	// 				),
	// 			})
	// 		);
	// 	} else if (desc === 'merchantcategory') {
	// 		dispatch(
	// 			openModalAndSetContent({
	// 				modalStyles: {
	// 					padding: 0,
	// 				},
	// 				modalContent: (
	// 					<>
	// 						<FirstReuse
	// 							title='Change merchant category'
	// 							description='Select merchant category'
	// 							content={complianceContent}
	// 						/>
	// 					</>
	// 				),
	// 			})
	// 		);
	// 	} else if (desc === 'accountstatus') {
	// 		dispatch(
	// 			openModalAndSetContent({
	// 				modalStyles: {
	// 					padding: 0,
	// 				},
	// 				modalContent: (
	// 					<>
	// 						<FirstReuse
	// 							title='Change account status'
	// 							description='Select account status'
	// 							content={AccountTypeContent}
	// 						/>
	// 					</>
	// 				),
	// 			})
	// 		);
	// 	} else if (desc === 'businesstype') {
	// 		dispatch(
	// 			openModalAndSetContent({
	// 				modalStyles: {
	// 					padding: 0,
	// 				},
	// 				modalContent: (
	// 					<>
	// 						<FirstReuse
	// 							title='Change business type'
	// 							description='Select business type'
	// 							content={BusinessTypeContent}
	// 						/>
	// 					</>
	// 				),
	// 			})
	// 		);
	// 	} else if (desc === 'internationcard') {
	// 		dispatch(
	// 			openModalAndSetContent({
	// 				modalStyles: {
	// 					padding: 0,
	// 				},
	// 				modalContent: (
	// 					<>
	// 						<FirstReuse
	// 							title='Change internation card settings'
	// 							description='Select internation card settings'
	// 							content={InternationalTypeContent}
	// 						/>
	// 					</>
	// 				),
	// 			})
	// 		);
	// 	} else if (desc === 'authmodel') {
	// 		dispatch(
	// 			openModalAndSetContent({
	// 				modalStyles: {
	// 					padding: 0,
	// 				},
	// 				modalContent: (
	// 					<>
	// 						<FirstReuse
	// 							title='Change transaction auth model'
	// 							description='Select transaction auth model'
	// 							content={authTypeContent}
	// 						/>
	// 					</>
	// 				),
	// 			})
	// 		);
	// 	} else if (desc === 'transferfee') {
	// 		dispatch(
	// 			openModalAndSetContent({
	// 				modalStyles: {
	// 					padding: 0,
	// 				},
	// 				modalContent: (
	// 					<>
	// 						<FourthReuse
	// 							desc1='Currency'
	// 							// desc2='Transaction Type'
	// 							desc3='Percentage Value'
	// 							desc4='Flat Value'
	// 							desc5='Entity'
	// 							// desc6='Capped At'
	// 							title='Change transfer fees'
	// 							content={CurrencyContent}
	// 							// content2={TransactionTypeContent}
	// 							content3={PaymentTypeContent}
	// 						/>
	// 					</>
	// 				),
	// 			})
	// 		);
	// 	} else if (desc === 'riskcategory') {
	// 		dispatch(
	// 			openModalAndSetContent({
	// 				modalStyles: {
	// 					padding: 0,
	// 				},
	// 				modalContent: (
	// 					<>
	// 						<FirstReuse
	// 							title='Change merchant risk category'
	// 							description='Select risk category'
	// 							content={RiskTypeContent}
	// 						/>
	// 					</>
	// 				),
	// 			})
	// 		);
	// 	} else if (desc === 'transferlimit') {
	// 		dispatch(
	// 			openModalAndSetContent({
	// 				modalStyles: {
	// 					padding: 0,
	// 				},
	// 				modalContent: (
	// 					<>
	// 						<FifthReuse
	// 							title='Manage transaction limit'
	// 							desc1='Currency'
	// 							desc2='Amount per transaction'
	// 							desc3='Daily cumulative'
	// 							desc4='Frequency'
	// 							desc5='Description'
	// 							content={CurrencyContent}
	// 						/>
	// 					</>
	// 				),
	// 			})
	// 		);
	// 	} else if (desc === 'rolling_reserve') {
	// 		dispatch(
	// 			openModalAndSetContent({
	// 				modalStyles: {
	// 					padding: 0,
	// 				},
	// 				modalContent: (
	// 					<>
	// 						<SixthReuse
	// 							title='Change Rolling reserve'
	// 							description='Select rolling'
	// 						/>
	// 					</>
	// 				),
	// 			})
	// 		);
	// 	} else if (desc === 'vpc') {
	// 		dispatch(
	// 			openModalAndSetContent({
	// 				modalStyles: {
	// 					padding: 0,
	// 				},
	// 				modalContent: (
	// 					<>
	// 						<SixthReuse
	// 							title='Change VPC merchant'
	// 							description='Select VPC merchant'
	// 						/>
	// 					</>
	// 				),
	// 			})
	// 		);
	// 	} else if (desc === 'editbusiness') {
	// 		dispatch(
	// 			openModalAndSetContent({
	// 				modalStyles: {
	// 					padding: 0,
	// 				},
	// 				modalContent: (
	// 					<>
	// 						<EditBusiness />
	// 					</>
	// 				),
	// 			})
	// 		);
	// 	} else {
	// 		return null;
	// 	}
	// };

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
						{details?.business?.tradingname}
					</h1>
					<button
						className={styles.detailsHeaderLeftButton}
						style={{
							backgroundColor:
								details?.business?.status === '1' ? '#27AE60' : '#EB5757',
							color: '#FFFFFF',
						}}>
						{details?.business?.status === '0' ? 'INACTIVE' : 'ACTIVE'}
					</button>
				</div>

				<div className={styles.detailsHeaderRight}>
					<button
						// onClick={() => popUpHandler('editbusiness')}
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
						{details?.business?.merchantaccounttype ||
							'Business Type Not Provided'}
					</p>
				</div>

				<div className={styles.desc_content}>
					<span className={styles.desc_span_img}>
						<img src={locale} alt='' />
					</span>{' '}
					{details?.address ? (
						details?.address
					) : (
						<p className={styles.desc_paragraph}>
							There is no address details for this user 
						</p>
					)}
				</div>
			</div>

			<div>
				<BusinessDataTabs id={urlId} />
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
		</div>
	);
}

export default BusinessDetails;
