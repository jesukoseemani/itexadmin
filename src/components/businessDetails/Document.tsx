import React, { useEffect, useState } from 'react';
import styles from './BusinessDetails.module.scss';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { useHistory } from 'react-router-dom';
import { ReactComponent as PendingIcon } from '../../assets/images/alert-circle.svg';
import { ReactComponent as DangerIcon } from '../../assets/images/close-circle.svg';
import { ReactComponent as ApprovedIcon } from '../../assets/images/checkmark-circle.svg';
import Modal from 'react-modal';
import { customStyles } from '../../helpers/modalStyles';
import { Divider } from '@material-ui/core';
import { ReactComponent as CloseIcon } from '../../assets/images/modalclose.svg';

function Document({ id }: { id: number | undefined }) {
	const [businesses, setBusinesses] = useState<any>();
	const [docsDetails, setDocsDetails] = useState<any>();
	const history = useHistory();

	const dispatch = useDispatch();

	const [modalIsOpen, setIsOpen] = React.useState(false);
	function closeModal() {
		setIsOpen(false);
	}

	const back = '<< Back';
	const next = 'Next >>';
	const imageViewerHandler = (
		idurl: string,
		idtype: string,
		status: string,
		merchantaccountidentificationid: number,
		index: number
	) => {
		setDocsDetails({
			idurl,
			idtype,
			status,
			merchantaccountidentificationid,
			index,
		});
		setIsOpen(true);
	};

	const moveHandler = (identify: string) => {
		setIsOpen(false);

		if (identify === 'back') {
			const filterdata = businesses?.documents?.filter(
				(item: any, i: number) => item.id === docsDetails.id - 1
			);
			setDocsDetails(filterdata[0]);
		}

		if (identify === 'next') {
			const filterdata = businesses?.documents.filter(
				(item: any) => item.id === docsDetails.id + 1
			);
			setDocsDetails(filterdata[0]);
		}

		setTimeout(() => {
			setIsOpen(true);
		}, 100);
	};

	const fetchBusinesses = async () => {
		dispatch(openLoader());
		try {
			const data: any = await axios.get(`/v1/business/${id}/documents`);
			const docs = data?.data?.documents?.map((item: any, i: number) => ({
				...item,
				id: i + 1,
			}));
			setBusinesses(docs);
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
		fetchBusinesses();
	}, []);

	return (
		<>
			<div className={styles.containerHeader}>
				{businesses?.documents?.length > 0 ? (
					businesses?.documents?.map(
						(
							{
								idurl,
								idtype,
								status,
								merchantaccountidentificationid,
							}: {
								idurl: string;
								idtype: string;
								status: string;
								merchantaccountidentificationid: number;
							},
							i: number
						) => (
							<div
								key={merchantaccountidentificationid}
								onClick={() =>
									imageViewerHandler(
										idurl,
										idtype,
										status,
										merchantaccountidentificationid,
										i
									)
								}
								className={styles.singleDocs}>
								<p>{idtype}</p>
								<div className={styles.singleDocsImage}>
									<img src={idurl} alt='' />
									<span>
										{status === 'APPROVED' ? (
											<ApprovedIcon />
										) : status === 'PENDING' ? (
											<PendingIcon />
										) : (
											<DangerIcon />
										)}
									</span>
								</div>
							</div>
						)
					)
				) : (
					<h1>NO DOCUMENT UPLOADED YET</h1>
				)}
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
						{/* <button
							disabled={docsDetails?.id >= docs?.length}
							onClick={() => moveHandler('next')}
							className={styles.contentButtonNext}>
							{next}
						</button> */}
					</div>
				</div>
			</Modal>
		</>
	);
}

export default Document;
