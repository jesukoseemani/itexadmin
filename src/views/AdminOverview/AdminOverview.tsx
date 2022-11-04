import React, { useEffect, useState } from 'react';
import AreChart from '../../components/areaChart/AreChart';
import BarTopFilter from '../../components/BarTopFilter/BarTopFilter';
import NavBar from '../../components/navbar/NavBar';
import PieChart2 from '../../components/pieChart2/PieChart2';
import styles from './AdminOverview.module.scss';
import ProgressBar from '../../components/progressbar/ProgressBar';
import axios from 'axios';
import { trendTypes, progressSuccessTypes } from '../../types/UserTableTypes';
import { saveMe } from '../../redux/actions/me/meActions';
import { useDispatch } from 'react-redux';

interface businessData {
	total: string;
	active: string;
	inactive: string;
	code: string;
	message: string;
}

const AdminOverview = () => {
	const [businessData, setBusinessData] = useState<businessData>();
	const [overviewData, setOverviewData] = useState<trendTypes>();
	const [progressSuccessData, setProgressSuccessData] =
		useState<progressSuccessTypes>();
	const [progressFailedData, setProgressFailedData] =
		useState<progressSuccessTypes>();
	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.get(`/merchant/account/me`)
			.then((res) => {
				dispatch(saveMe(res.data));
			})
			.catch((err) => console.log(err));
	}, [dispatch]);

	const data02 = [
		{
			name: 'Success',
			amount: overviewData?.success[0]?.successful,
			color: '#169859',
			transaction: overviewData?.success[0]?.successful,
			percentage: overviewData?.success[0]?.successfulpercent,
		},
		{
			name: 'Failed',
			amount: overviewData?.success[0]?.failed,
			color: '#f71717',
			transaction: overviewData?.success[0]?.failed,
			percentage: overviewData?.success[0]?.failpercent,
		},
	];

	const dataFigure = [
		{
			business: 'james Business',
			amount: 49373499,
		},
		{
			business: 'james Business',
			amount: 49373499,
		},
		{
			business: 'james Business',
			amount: 49373499,
		},
		{
			business: 'james Business',
			amount: 49373499,
		},

		{
			business: 'james Business',
			amount: 49373499,
		},
	];

	const dataPercent = [
		{
			business: 'james Business',
			amount: 49,
		},
		{
			business: 'james Business',
			amount: 42,
		},
		{
			business: 'james Business',
			amount: 33,
		},
		{
			business: 'james Business',
			amount: 73,
		},

		{
			business: 'james Business',
			amount: 39,
		},
	];

	useEffect(() => {
		axios
			.get<businessData>(
				`/admin/dashboard/trend/business`
			)
			.then((res) => {
				setBusinessData(res.data);
			});
	}, []);

	useEffect(() => {
		axios
			.get<trendTypes>(
				`/admin/dashboard/trend/transactions`
			)
			.then((res) => {
				setOverviewData(res.data);
			});
	}, []);

	useEffect(() => {
		axios
			.get<progressSuccessTypes>(
				`/admin/dashboard/trend/successtrxpercent`
			)
			.then((res) => {
				setProgressSuccessData(res.data);
			});
	}, []);

	useEffect(() => {
		axios
			.get<progressSuccessTypes>(
				`/admin/dashboard/trend/failtrxpercent`
			)
			.then((res) => {
				setProgressFailedData(res.data);
			});
	}, []);

	return (
		<div className={styles.wrapper}>
			<NavBar name='business' />
			{/* <NavBar name='Admin Overview' /> */}

			{/* first */}
			<div className={styles.container}>
				<div className={styles.lineChartContainer}>
					<BarTopFilter />
					<hr className={styles.firstline} />
					<div className={styles.gridContainer}>
						<div className={styles.gridContainerLeft}>
							{/* <div className={styles.lineChartHeader}> */}
							<div className={styles.lineChartHeaderLeft}>
								<div className={styles.breakOffContent}>
									<h1 className={styles.breakOffContentH1}>
										Total processed volume
									</h1>
									<p className={styles.breakOffContentP}>
										{overviewData?.tpv[0]?.volume || 0}
									</p>
								</div>
								<div className={styles.breakOffContent}>
									<h1 className={styles.breakOffContentH1}>
										Total processed value
									</h1>
									<p className={styles.breakOffContentP}>
										$ {overviewData?.tpv[0]?.value || 0}
									</p>
								</div>
								<div className={styles.breakOffContent}>
									<h1 className={styles.breakOffContentH1}>Total revenue</h1>
									<p className={styles.breakOffContentP}>
										$ {overviewData?.tpv[0]?.value || 0}
									</p>
								</div>
							</div>
							<div className={styles.gridAreaChart}>
								<AreChart />
							</div>

							{/* <div className={styles.lineChartHeaderRight}>
									<div className={styles.bulletWrapper}>
										<div className={styles.bullet}></div>
										<p className={styles.bulletContent}></p>
									</div>
									<div className={styles.bulletWrapper}>
										<div className={styles.bullet}></div>
										<p className={styles.bulletContent}></p>
									</div>
								</div> */}
							{/* </div> */}
						</div>

						<div className={styles.gridContainerRight}>
							<div className={styles.gridContainerRightTop}>
								<div className={styles.breakOffContentTopBox}>
									<h1 className={styles.breakOffContentH1}>
										Total successful transaction
									</h1>
									<p className={styles.breakOffContentP}>
										{overviewData?.success[0]?.successful}
									</p>
								</div>
								<div className={styles.breakOffContentTopBox}>
									<h1 className={styles.breakOffContentH1}>
										Total failed transactions
									</h1>
									<p className={styles.breakOffContentP}>
										{overviewData?.success[0]?.failed}
									</p>
								</div>
							</div>
							<hr className={styles.secondline} />
							<div className={styles.gridContainerRightBottom}>
								<PieChart2 data02={data02} />
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* second */}
			<div className={styles.container}>
				<div className={styles.gridFeatures}>
					<div className={styles.gridFeatureContent}>
						<h1 className={styles.gridFeatureContentH1}>Total businesses</h1>
						<p className={styles.gridFeatureContentP}>{businessData?.total}</p>
					</div>

					<div className={styles.gridFeatureContent}>
						<h1 className={styles.gridFeatureContentH1}>Active businesses</h1>
						<p className={styles.gridFeatureContentP}>{businessData?.active}</p>
					</div>

					<div className={styles.gridFeatureContent}>
						<h1 className={styles.gridFeatureContentH1}>Inactive businesses</h1>
						<p className={styles.gridFeatureContentP}>
							{businessData?.inactive}
						</p>
					</div>

					<div className={styles.gridFeatureContenth}>
						<h1 className={styles.gridFeatureContentH1}>
							POS Devices deployed
						</h1>
						<p className={styles.gridFeatureContentP}>0</p>
					</div>
				</div>
			</div>

			{/* third */}

			{/* <div className={styles.container}>
				<div className={styles.gridFeaturesTable}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<DashboardProductTable
								title='Top Businesses'
								data={dataFigure}
								figured={true}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<DashboardProductTable
								title='Top merchant by success rate'
								data={dataPercent}
								figured={false}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<DashboardProductTable
								title='Top merchant by failure rate'
								data={dataPercent}
								figured={false}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<DashboardProductTable
								title='Top refund merchant'
								data={dataPercent}
								figured={true}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<DashboardProductTable
								title='Top merchant by funding'
								data={dataPercent}
								figured={true}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<DashboardProductTable
								title='Card networks'
								data={dataPercent}
								figured={false}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<DashboardProductTable
								title='Funding per funding type'
								data={dataPercent}
								figured={false}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<DashboardProductTable
								title='Top merchant by success rate'
								data={dataPercent}
								figured={false}
							/>
						</Grid>
					</Grid>
				</div>
			</div> */}

			{/* fourth */}
			<div className={styles.container}>
				<div style={{ marginBottom: '20px' }}>
					<div className={styles.progressBarContainer}>
						<div className={styles.progreeBarChild}>
							<ProgressBar
								data={progressSuccessData?.transactions}
								title='Percentage of successful transactions'
								color='rgba(111, 207, 151, 0.71)'
							/>
						</div>
						<div className={styles.progreeBarChild}>
							<ProgressBar
								data={progressFailedData?.transactions}
								title='Percentage of failed transactions'
								color='rgba(235, 87, 87, 0.71)'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminOverview;
