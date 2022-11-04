import React from 'react';
import NavBar from '../../components/navbar/NavBar';
import Grid from '@mui/material/Grid';
import { Divider } from '@material-ui/core';
import styles from './Compliance.module.scss';
import ComplianceDataTabs from '../../components/complianceTabs/ComplianceDataTabs';
import { ExportToXLS } from '../../helpers/ExportToExcel';


const AllCompliance = () => {
	return (
		<div className={styles.container}>
			<NavBar name='All Compliance' />
			<div className={styles.businesss_trans}>
				<h3 className={styles.businesss_trans_h3}>Compliance Stats</h3>
			</div>

			<div className={styles.divider_wrapper_2}>
				<Divider />
			</div>

			<div className={styles.gridFeatures}>
				<Grid container spacing={2}>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusiness}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Total merchants reviewed
							</h1>
							<p className={styles.gridFeatureBusinessP}>22</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusinessh}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Total Merchant Approved
							</h1>

							<p
								style={{ color: '#27AE60' }}
								className={styles.gridFeatureBusinessP}>
								22
							</p>
						</div> 
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusinessh}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Total Merchant declined
							</h1>

							<p
								style={{ color: '#EB5757' }}
								className={styles.gridFeatureBusinessP}>
								22
							</p>
						</div>
					</Grid>
					<Grid item xs={6} md={2}>
						<div className={styles.gridFeatureBusinessh}>
							<h1 className={styles.gridFeatureBusinessH1}>
								Total Merchant pending
							</h1>
							<p
								style={{ color: '#F59607' }}
								className={styles.gridFeatureBusinessP}>
								22
							</p>
						</div>
					</Grid>
				</Grid>
			</div>

			<ComplianceDataTabs />
		</div>
	);
};

export default AllCompliance;
