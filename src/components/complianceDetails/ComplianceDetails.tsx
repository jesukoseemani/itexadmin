import React, { useState, useEffect } from 'react';
import styles from './ComplianceDetails.module.scss';
import NavBar from '../navbar/NavBar';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Divider } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import { useLocation, useHistory } from 'react-router';
import { BusinessTableApiTypes } from '../../types/UserTableTypes';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import AcceptComplianceModal from '../acceptComplianceModal/AcceptComplianceModal';
import DeclineComplianceModal from '../declineComplianceModal/DeclineComplianceModal';
import MessageComplianceModal from '../messageComplianceModal/MessageComplianceModal';

function ComplianceDetails() {
	const [details, setDetails] = useState<BusinessTableApiTypes>();
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();

	const bankData = useSelector((state) => state?.countryReducer?.country.banks); 

	const urlId = location.pathname.split('/')[2];

	interface addressTypes {
		line1: string;
		line2: string;
		city: string;
		state: string;
	}

	interface identifyTypes {
		type: string;
		number: string;
		url: string;
		added: string;
		status: string;
		verified: string;
	}

	useEffect(() => {
		axios
			.get<BusinessTableApiTypes>(
				`/admin/business?merchantcode=${urlId}`
			)
			.then((res) => {
				setDetails(res.data);
			});
	}, [urlId]);

	useEffect(() => {
		console.log('details', details);
	}, [details]);

	// const supportEmail = details?.businesses[0].meta.filter(
	// 	(item) => item.name === 'supportemail'
	// );

	// const chargeBack = details?.businesses[0].meta.filter(
	// 	(item) => item.name === 'chargebackemail'
	// );
	//select Variables

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

	const website = details?.businesses[0]?.meta.filter(
		(item) => item.name === 'websiteurl'
	);

	const rcnumber = details?.businesses[0]?.identification.filter(
		(item) => item.type === 'rcnumber'
	);


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
						{details?.businesses[0].tradingname ||
							details?.businesses[0].user[0].firstname}
					</h1>
					<button className={styles.detailsHeaderLeftButton}>
						{details?.businesses[0].approved}
					</button>
				</div>
				{details?.businesses[0].approved !== 'APPROVED' && (
					<div className={styles.detailsHeaderRight}>
						<button
							onClick={sendMessageHandler}
							className={styles.detailsHeaderRightButtonMessage}>
							Send Message
						</button>
						<button
							onClick={declineHandler}
							className={styles.detailsHeaderRightButtonDecline}>
							Decline
						</button>
						<button
							onClick={approveHandler}
							className={styles.detailsHeaderRightButtonApprove}>
							Approve
						</button>
					</div>
				)}
			</div>

			<div className={styles.divider_wrapper}>
				<Divider />
			</div>

			<div className={styles.businesss_trans}>
				<h3 className={styles.businesss_trans_h3}>Compliance details</h3>
			</div>

			<div className={styles.divider_wrapper_2}>
				<Divider />
			</div>

			<div className={styles.gridFeatures}>
				<Grid container spacing={2}>
					<Grid item xs={6} md={3}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Business name</h1>
							<p className={styles.gridFeatureBusinessP}>
								{details?.businesses[0].tradingname}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={3}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Contact Person</h1>
							<p className={styles.gridFeatureBusinessP}>
								{' '}
								{details?.businesses[0].user[0].firstname}
								{details?.businesses[0].user[0].middlename || ''}
								{details?.businesses[0].user[0].lastname || ''}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={3}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Phone Number</h1>

							<p className={styles.gridFeatureBusinessP}>
								{details?.businesses[0].user[0].phonenumber}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={3}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Email Address</h1>
							<p className={styles.gridFeatureBusinessP}>
								{' '}
								{details?.businesses[0].user[0].email}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={3}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>BVN</h1>

							<p className={styles.gridFeatureBusinessP}>
								{details?.businesses[0].user[0].bvn}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={3}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>website</h1>

							<p className={styles.gridFeatureBusinessP}>
								{website && website[0]?.value}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={3}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Account Type</h1>

							<p className={styles.gridFeatureBusinessP}>
								{details?.businesses[0].account.type}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={3}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Industry</h1>
							<p className={styles.gridFeatureBusinessP}>
								{' '}
								{details?.businesses[0].businessindustrycategory}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={3}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>RC number</h1>
							<p className={styles.gridFeatureBusinessP}>
								{rcnumber && rcnumber[0]?.number}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={3}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>NIN number</h1>
							<p className={styles.gridFeatureBusinessP}>
								{' '}
								{details?.businesses[0].user[0]?.nin}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={6}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Business Address</h1>
							<p className={styles.gridFeatureBusinessP}>
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
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={6}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Description</h1>
							<p className={styles.gridFeatureBusinessP}>
								{details?.businesses[0].businesstype}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={6}></Grid>
				</Grid>
			</div>

			<div className={styles.business_header_general}>
				<h3 className={styles.businesss_trans_h3}>Documents</h3>
			</div>

			<div className={styles.divider_wrapper_3}>
				<Divider />
			</div>

			<div className={styles.gridFeatures}>
				<Grid container spacing={2}>
					{details?.businesses[0].identification.map((item, i) => (
						<Grid key={i} item xs={12} md={12}>
							<div className={styles.gridFeatureBusiness}>
								<h1 className={styles.gridFeatureBusinessH1}>{item.type}</h1>
								<p className={styles.gridFeatureBusinessP}>{item.url}</p>
							</div>
						</Grid>
					))}

					{/* <Grid item xs={6} md={3}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Director ID</h1>
							<p className={styles.gridFeatureBusinessP}>
								https://filephotoupload.com/lkn876
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={3}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Operating Licence
							</h1>
							<p className={styles.gridFeatureBusinessP}>
								https://filephotoupload.com/lkn876
							</p>
						</div>
					</Grid> */}
					<Grid item xs={6} md={3}></Grid>
				</Grid>
			</div>

			<div className={styles.business_header_general}>
				<h3 className={styles.businesss_trans_h3}>
					Approvals and verifications
				</h3>
			</div>

			<div className={styles.divider_wrapper_3}>
				<Divider />
			</div>
			{/* 
			<div className={styles.gridFeatures}>
				<Grid container spacing={2}>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Compliance request date
							</h1>
							<p className={styles.gridFeatureBusinessP}>Aug 13 2020 2:21 PM</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Last processed date
							</h1>
							<p className={styles.gridFeatureBusinessP}>Aug 13 2020 2:21 PM</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Approval date</h1>
							<p className={styles.gridFeatureBusinessP}>Aug 13 2020 2:21 PM</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>
								BVN verification date
							</h1>
							<p className={styles.gridFeatureBusinessP}>Aug 13 2020 2:21 PM</p>
						</div>
					</Grid>
				</Grid>
			</div> */}

			<div className={styles.business_header_general}>
				<h3 className={styles.businesss_trans_h3}>Settlement information</h3>
			</div>

			<div className={styles.divider_wrapper_3}>
				<Divider />
			</div>

			<div className={styles.gridFeatures}>
				<Grid container spacing={8}>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Bank</h1>
							{details?.businesses[0]?.settlement.account[0]?.bankname}
							<p className={styles.gridFeatureBusinessP}> </p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Account name</h1>
							<p className={styles.gridFeatureBusinessP}>
								{' '}
								{details?.businesses[0]?.settlement.account[0]?.accountname}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Account number</h1>
							<p className={styles.gridFeatureBusinessP}>
								{' '}
								{details?.businesses[0]?.settlement.account[0]?.accountnumber}
							</p>
						</div>
					</Grid>
				</Grid>
			</div>

			<div className={styles.business_header_general}>
				<h3 className={styles.businesss_trans_h3}>BVN information</h3>
			</div>

			<div className={styles.divider_wrapper_3}>
				<Divider />
			</div>

			<div className={styles.gridFeatures}>
				<Grid container spacing={8}>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>First name</h1>
							<p className={styles.gridFeatureBusinessP}>
								{' '}
								{details?.businesses[0]?.user[0].firstname}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Last name</h1>

							<p className={styles.gridFeatureBusinessP}>
								{details?.businesses[0]?.user[0].lastname}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Phone number</h1>
							<p className={styles.gridFeatureBusinessP}>
								{details?.businesses[0]?.user[0].phonenumber}
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Last checked by</h1>
							<p className={styles.gridFeatureBusinessP}></p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Last checked on</h1>
							<p className={styles.gridFeatureBusinessP}></p>
						</div>
					</Grid>
				</Grid>
			</div>

			<div className={styles.business_header_general_flex}>
				<h3 className={styles.businesss_trans_h3}>Comments</h3>

				<button className={styles.comment_button}>
					<span className={styles.comment_span}>+</span>
					Add Comment
				</button>
			</div>

			<div className={styles.divider_wrapper_3}>
				<Divider />
			</div>

			{/* <div style={{ paddingBottom: '60px' }} className={styles.gridFeatures}>
				<Grid container spacing={8}>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>12/12/2020</h1>
							<p className={styles.gridFeatureBusinessP}>James Segun</p>
						</div>
					</Grid>

					<Grid item xs={6} md={8}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Comment</h1>
							<p className={styles.gridFeatureBusinessP}>
								This merchant’s compliance request was reviewed and denied based
								on the fact that merchant failed to attach the necessary
								documents to help with verification of business.
							</p>
						</div>
					</Grid>
				</Grid>
			</div> */}
		</div>
	);
}

export default ComplianceDetails;
