import React from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { convertApiDate } from '../../util/DateUtil';

export default function SimpleBarChart({ data, identifier }: any) {
	return (
		<div style={{ padding: '20px' }}>
			<ResponsiveContainer width='90%' height={250}>
				<BarChart
					width={500}
					height={250}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
					barSize={20}
					barGap={3}>
					<XAxis
						dataKey={`${identifier}`}
						scale='point'
						padding={{ left: 50, right: 10 }}
					/>
					<YAxis dataKey='total' axisLine={false} tickLine={false} />
					<Tooltip />

					<CartesianGrid opacity={0.1} vertical={false} />
					<Bar
						dataKey='success'
						fill='#1ad257'
						background={{ fill: '#ffffff' }}
					/>
					<Bar
						dataKey='failed'
						fill='#D21A78'
						background={{ fill: '#ffffff' }}
					/>
					<Bar
						dataKey='pending'
						fill='#1a2cd2'
						background={{ fill: '#ffffff' }}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
