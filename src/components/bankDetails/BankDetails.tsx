/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import styles from './bankDetails.module.scss';
import NavBar from '../navbar/NavBar';
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
import Modal from 'react-modal';
import { customStyles } from '../../helpers/modalStyles';
import { ReactComponent as CloseIcon } from '../../assets/images/modalclose.svg';
import Bank from '../Bank/Bank';

function BankDetails() {
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

	// useEffect(() => {
	// 	axios
	// 		.get<BusinessTableApiTypes>(`/admin/business?merchantcode=${urlId}`)
	// 		.then((res) => {
	// 			setDetails(res.data);
	// 			console.log('getbusiness:', res.data);
	// 		});
	// }, [urlId]);


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
					<h1 className={styles.detailsHeaderLeftH1}>#1. Access Bank</h1>
				</div>
			</div>

			<div className={styles.divider_wrapper}>
				<Divider />
			</div>

			<div className={styles.gridFeatures}>
				<Grid container spacing={2}>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Bank code</h1>
							<p className={styles.gridFeatureBusinessP}>87658765</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>Bank name</h1>
							<p className={styles.gridFeatureBusinessP}>Access Bank</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>NGN Balance</h1>
							<p className={styles.gridFeatureBusinessP}>NGN20,000,000</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>USD Balance</h1>
							<p className={styles.gridFeatureBusinessP}>USD 10,000</p>
						</div>
					</Grid>
				</Grid>
			</div>

			<div>
				<Bank />
			</div>
		</div>
	);
}

export default BankDetails;
