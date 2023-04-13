import React from 'react';

import styles from './PolarAreaChart.module.scss';

import {
	Chart as ChartJS,
	RadialLinearScale,
	ArcElement,
	Tooltip,
	Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function PolarAreaChart({ data }: any) {
	const dataRes = {
		labels: data?.map((item: any) => item?.country),
		datasets: [
			{
				label: 'Countries',
				data: data.map((item: any) => item?.total),
				backgroundColor: [
					'#DB2777',
					'#0789AC',
					'#7C3AED',
					'#F59E0B',
					'#3A4CED',
				],
				borderWidth: 1, 
			},
		],
	};

	const options = {
		maintainAspectRatio: false,
		responsive: true,
	};

	return (
		<div className={styles.component}>
			<div className={styles.polar}>
				<PolarArea data={dataRes} options={options} />
			</div>
		</div>
	);
}
