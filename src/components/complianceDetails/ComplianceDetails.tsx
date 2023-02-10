/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import styles from './ComplianceDetails.module.scss';
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
import AcceptComplianceModal from '../acceptComplianceModal/AcceptComplianceModal';
import DeclineComplianceModal from '../declineComplianceModal/DeclineComplianceModal';
import MessageComplianceModal from '../messageComplianceModal/MessageComplianceModal';
import DeclineDocsModal from '../declineDocsModal/DeclineDocsModal';
import StatusModal from '../statusModal/StatusModal';

function ComplianceDetails() {
	const [details, setDetails] = useState<BusinessTableApiTypes>();
	const [docsDetails, setDocsDetails] = useState<any>();
	const [edit, setEdit] = useState<Boolean>(false);

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
	const [modalAptIsOpen, setAptIsOpen] = React.useState(false);
	function closeAptModal() {
		setAptIsOpen(false);
	}
	function openAptModal() {
		setAptIsOpen(true);
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

	const popUpHandler = (desc: string) => {
		if (desc === 'editbusiness') {
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

	const declineHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<>
						<DeclineComplianceModal urlId={urlId} />
					</>
				),
			})
		);
	};

	const approveHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<>
						<AcceptComplianceModal urlId={urlId} />
					</>
				),
			})
		);
	};

	const docApproveHandler = (ident: string) => {
		closeAptModal();
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<>
						<DeclineDocsModal ident={ident} />
					</>
				),
			})
		);
	};

	const docs = [
		{
			id: 1,
			image: 'https://picsum.photos/200',
			name: 'CAC Certificate',
			status: 'Pending',
			comment:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, accusantium placeat quas corporis error quibusdam odit ex nihil nam est accusamus ipsam ipsa inventore? Repudiandae, tenetur. Ab maxime a quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, facilis soluta vel facere minima nihil accusantium dolor quas excepturi nam perferendis, ad sit magni sapiente et ipsum tempore. Adipisci, natus.',
		},
		{
			id: 2,
			image: 'https://picsum.photos/200',
			name: 'First Director ID',
			status: 'Approved',
			comment:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, accusantium placeat quas corporis error quibusdam odit ex nihil nam est accusamus ipsam ipsa inventore? Repudiandae, tenetur. Ab maxime a quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
		},
		{
			id: 3,
			image: 'https://picsum.photos/200',
			name: 'MEMAT Document',
			status: 'Declined',
			comment:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, accusantium placeat quas corporis error quibusdam odit ex nihil nam est accusamus ipsam ipsa inventore? Repudiandae, tenetur. Ab maxime a quibusdam. Lorem ipsum dolor sit amet consectetur ',
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
		{
			status === 'Pending' ? setAptIsOpen(true) : setIsOpen(true);
		}
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
				<p className={styles.back_paragraph}> Back to Compliance</p>
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
						onClick={sendMessageHandler}
						className={styles.detailsHeaderRightButton}>
						Send a message
					</button>
					<button
						onClick={declineHandler}
						className={styles.detailsHeaderRightButtonDeclined}>
						Decline Merchant
					</button>
					<button
						onClick={approveHandler}
						className={styles.detailsHeaderRightButtonApproved}>
						Approve Merchant
					</button>
				</div>
			</div>

			<div className={styles.divider_wrapper}>
				<Divider />
			</div>

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
				className={styles.business_header_general}>
				<h3 className={styles.businesss_trans_h3}>Business Document</h3>
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
							{edit ? (
								<div className={styles.commentInputWrapper}>
									<textarea
										className={styles.commentInput}
										rows={4}
										cols={50}
										value={docsDetails?.comment}></textarea>
								</div>
							) : (
								<p className={styles.contentWord_p}>{docsDetails?.comment}</p>
							)}
						</div>
					</div>

					<div className={styles.contentButton}>
						<button
							onClick={() => setEdit(!edit)}
							className={styles.contentButtonBack}>
							{edit ? 'Save' : 'Add More Comment'}
						</button>
					</div>
				</div>
			</Modal>

			<Modal
				isOpen={modalAptIsOpen}
				onRequestClose={closeAptModal}
				contentLabel='Example Modal'
				style={customStyles}>
				<div className={styles.modalBody}>
					<div className={styles.modalHeader}>
						<div className={styles.background}>
							<div className={styles.linkDetails}>{docsDetails?.name}</div>
							<CloseIcon
								onClick={closeAptModal}
								style={{ cursor: 'pointer' }}
							/>
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
					</div>

					<div className={styles.contentButtonApt}>
						<button
							onClick={() => docApproveHandler('decline')}
							className={styles.contentButtonDeclineApt}>
							Decline Document
						</button>

						<button
							onClick={() => docApproveHandler('approve')}
							className={styles.contentButtonApprovedApt}>
							Approve Document
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default ComplianceDetails;
