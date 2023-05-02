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

import { useParams } from 'react-router-dom';
import { ComplianceModuleData } from '../../types/ComplianceTypes';
import { Box } from '@mui/material';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import VerifyCompliance from './VerifyCompliance';
import ValidateDoc from './ValidateDoc';
import CompleteApproval from '../../components/complianceDetails/CompleteApproval';

function ComplianceDetails() {
	const [details, setDetails] = useState<any>();
	// const [docsDetails, setDocsDetails] = useState<any>();
	// const [edit, setEdit] = useState<Boolean>(false);

	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();

	const { id }: any = useParams();
	const [business, setBusiness] = useState<any>();
	const [document, setDocument] = useState<any>();

	const fetchDoc = async () => {
		try {
			const { data } = await axios.get<any>(
				`/v1/compliance/business/${id}/docs`
			);
			console.log(data);
			setBusiness(data);
			// setDocument(business?.documents)
		} catch (error: any) {
			dispatch(
				openToastAndSetContent({
					toastContent: error.message,
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
		}
	};

	useEffect(() => {
		fetchDoc();
	}, [id]);

	const handleValidate = async (doc: any) => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<Box>
						<ValidateDoc doc={doc} fn={fetchDoc}/>
					</Box>
				),
			})
		);
	};

	const handleVerify = (doc: any) => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<Box>
						<VerifyCompliance doc={doc} fn={fetchDoc} />
					</Box>
				),
			})
		);
	};

	const enlargeDoc = (doc: any) => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<Box>
						<img width='450px' height='450px' src={doc} alt='' />
					</Box>
				),
			})
		);
	};

	const handleApproval = (business: any) => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<Box>
						<CompleteApproval id={business} />
					</Box>
				),
			})
		);
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

			<div className={styles.businessbutton}>
				<button onClick={() => handleApproval(id)}>Business Approval</button>
			</div>

			{/* <div className={styles.detailsHeader}>
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
			</div> */}

			<div className={styles.divider_wrapper}>
				<Divider />
			</div>

			<div className={styles.gridFeatures}>
				<Grid container spacing={2}>
					<Grid item xs={6} md={4}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Business email</h1>
							<p className={styles.gridFeatureBusinessP}>
								{business?.business?.businessemail}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={4}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Merchantcode</h1>
							<p className={styles.gridFeatureBusinessP}>
								{business?.business?.merchantcode}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={4}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Business phone</h1>
							<p className={styles.gridFeatureBusinessP}>
								{business?.business?.businessphone}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={4}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Trading name</h1>
							<p className={styles.gridFeatureBusinessP}>
								{business?.business?.tradingname}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={4}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>country</h1>
							<p className={styles.gridFeatureBusinessP}>
								{business?.business?.country}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={4}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>islive</h1>
							<p className={styles.gridFeatureBusinessP}>
								{business?.business?.lively ? 'True' : 'False'}
							</p>
						</div>
					</Grid>
				</Grid>
			</div>

			<Box>
				<Grid container spacing={3} px={4}>
					{business?.documents?.map((x: any) => (
						<Grid item xs={12} sm={6} md={4} key={x?.id}>
							<Box className={styles.imgBox}>
								<Box
									onClick={() => enlargeDoc(x?.idurl)}
									className={styles.imgList}>
									<img src={x?.idurl} alt='docurl' />
								</Box>
								<Box className={styles.btn}>
									{x?.status !== 'APPROVE' && (
										<button onClick={() => handleValidate(x)}>Validate</button>
									)}
									{x?.verifiedstatus !== 'VERIFIED' && (
										<button onClick={() => handleVerify(x)}>Verify</button>
									)}
								</Box>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>

			{/* 
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
			</Modal>*/}
		</div>
	);
}

export default ComplianceDetails;
