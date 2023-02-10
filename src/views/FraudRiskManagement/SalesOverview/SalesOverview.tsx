import React from 'react';
import BarTopFilter from '../../../components/BarTopFilter/BarTopFilter';
import OverviewTable from '../../../components/OverviewTable/OverviewTable';
import styles from './SalesOverview.module.scss';
import LinearProgress, {
	linearProgressClasses,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import ProgressBar from '@ramonak/react-progress-bar';
import PieChart2 from '../../../components/pieChart2/PieChart2';
import { Link } from 'react-router-dom';

interface valueType {
	name: string;
	value: number;
}

function SalesOverview() {
	const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
		height: '24px',
		borderRadius: 4,
		[`&.${linearProgressClasses.colorPrimary}`]: {
			backgroundColor:
				theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
		},
		[`& .${linearProgressClasses.bar}`]: {
			borderRadius: 4,
			backgroundColor: theme.palette.mode === 'light' ? '#80C09B' : '#80C09B',
		},
	}));

	const pTransactionMethod = [
		{
			name: 'Card Payments',
			value: 60,
		},
		{
			name: 'Bank Transfers',
			value: 40,
		},
		{
			name: 'QR Payments',
			value: 20,
		},
		{
			name: 'USSD Payments',
			value: 60,
		},
	];

	const failureReason = [
		{
			name: '1',
			value:
				'Insufficient Funds: Your card cannot be charged due to insufficient funds. Please try another card or fund your card and try again.',
		},
		{
			name: '2',
			value:
				'Insufficient Funds: Your card cannot be charged due to insufficient funds. Please try another card or fund your card and try again.',
		},
		{
			name: '3',
			value:
				'Insufficient Funds: Your card cannot be charged due to insufficient funds. Please try another card or fund your card and try again.',
		},
	];

	let resmax = Math.max.apply(
		Math,
		pTransactionMethod?.map(function (o: any) {
			return o.value;
		})
	);

	let resavg = pTransactionMethod?.reduce((acc: any, item: any) => {
		return acc + item.value;
	}, 0);
	resavg = Math.round(resavg / pTransactionMethod.length);
	const data02 = [
		{
			name: 'Total successful',
			amount: 20000,
			color: '#169859',
			transaction: 200,
			percentage: 50,
		},
		{
			name: 'Total failed',
			amount: 12000,
			color: '#f71717',
			transaction: 1000,
			percentage: 70,
		},
	];
	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<BarTopFilter title='Sales Overview' />
			<div className={styles.tableWrapper}>
				<OverviewTable title='Performance' subTitle=''>
					<div className={styles.pieChartWrapper}>
						<PieChart2 data02={data02} />
					</div>
				</OverviewTable>

				<div className={styles.smallXard}>
					<div className={styles.containerS}>
						<div className={styles.headerS}>
							<div className={styles.topFlex}>
								<div className={styles.topFlexChild}>
									<h3 className={styles.headerh2S}>Total processed value</h3>
									<span className={styles.headerSpanS}>N380,000,000</span>
								</div>
								<div className={styles.topFlexChild}>
									<h3 className={styles.headerh2S}>Total revenue</h3>
									<span className={styles.headerSpanS}>N10,000,000</span>
								</div>
							</div>
						</div>
						<div className={styles.tableContentS}>
							<Link className={styles.link} to='/transactionmgt'>
								View all transactions
							</Link>
						</div>
					</div>
					<div className={styles.containerS}>
						<div className={styles.headerS}>
							<div className={styles.topFlex}>
								<div className={styles.topFlexChild}>
									<h3 className={styles.headerh2S}>Total POS sales</h3>
									<span className={styles.headerSpanS}>N180,000,000</span>
								</div>
								<div className={styles.topFlexChild}>
									<h3 className={styles.headerh2S}>Amount of POS sold</h3>
									<span className={styles.headerSpanS}>50,035</span>
								</div>
							</div>
						</div>
						<div className={styles.tableContentS}>
							<Link className={styles.link} to='/pos'>
								View POS
							</Link>
						</div>
					</div>
				</div>

				<OverviewTable title='Most used channels' subTitle=''>
					<div className={styles.paymentContainer}>
						{pTransactionMethod?.map(
							({ name, value }: valueType, i: number) => (
								<div>
									<p>{name}</p>
									<div className={styles.progressBar}>
										<ProgressBar
											bgColor={
												value === resmax
													? '#6FCF97'
													: value <= resavg
													? '#56CCF2'
													: value >= resavg
													? '#F59E0B'
													: 'white'
											}
											completed={value}
											isLabelVisible={true}
											maxCompleted={100}
											height='22px'
											borderRadius='2px'
											labelColor='#000'
										/>
									</div>
								</div>
							)
						)}
					</div>
				</OverviewTable>

				<OverviewTable title='Top reasons for failure' subTitle=''>
					<ol className={styles.transactionContainer}>
						{failureReason?.map(
							({ name, value }: { name: string; value: string }, i: number) => (
								<li>{value}</li>
							)
						)}
					</ol>
				</OverviewTable>
			</div>
		</div>
	);
}

export default SalesOverview;
