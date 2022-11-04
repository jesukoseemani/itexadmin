import React from 'react';
import styled from 'styled-components';
import {
	ResponsiveContainer,
	LineChart,
	XAxis,
	YAxis,
	Line,
	Tooltip,
	CartesianGrid,
	Legend,
} from 'recharts';
// import moment from 'moment';

const formatCash = (n: any) => {
	if (n < 1e3) return n;
	if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
	if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
	if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
	if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
};

const StyledUl = styled.ul`
	margin-top: -100px;
	margin-left: -100px;

	@media (max-width: 1350px) {
		margin-top: -50px;
	}
`;

const renderLegend = (props: any) => {
	const { payload } = props;
	/* const styledwrapper: React.CSSProperties = {
		
	}; */
	const styledli: React.CSSProperties = {
		listStyle: 'none',
		display: 'flex',
		alignItems: 'center',
	};

	const styledp: React.CSSProperties = {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontSize: '14px',
		lineHeight: '140%',
		color: 'rgba(0, 40, 65, 0.8)',
	};

	const styledContent: React.CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		marginLeft: '10px',
	};

	return (
		<StyledUl>
			{payload.map((entry: any, index: any) => (
				<li style={styledli} key={`item-${index}`}>
					<div
						style={{
							width: '11px',
							height: '11px',
							background: `${entry.color}`,
							borderRadius: '50%',
						}}></div>
					<div style={styledContent}>
						<p style={styledp}>{entry.value}</p>
					</div>
				</li>
			))}
		</StyledUl>
	);
};

function CustomTooltip({ active, payload, label }: any) {
	const styledwrapper: React.CSSProperties = {
		borderRadius: '0.25rem',
		background: '#ffffff',
		padding: '.5rem 1rem',
		boxShadow: '15px 30px 40px 5px rgba(0, 0, 0, 0.5)',
		textAlign: 'center',
	};
	const styledh4: React.CSSProperties = {
		color: 'gray',
		fontSize: '10px',
	};
	const styledp: React.CSSProperties = {
		color: 'black',
		fontSize: '13px',
		margin: 0,
		padding: 0,
		textAlign: 'left',
	};

	if (active) {
		// const date = parseISO(label);

		return (
			<div style={styledwrapper}>
				<h4 style={styledh4}>{label}</h4>
				{/* <h4 style={styledh4}>{label && moment(label).format('ddd, MMM d')}</h4> */}

				<p style={styledp}>
					{payload && formatCash(payload[0]?.payload?.value)}
				</p>
				<p style={styledp}>
					{payload && formatCash(payload[0]?.payload?.volume)}
				</p>
			</div>
		);
	}
	return null;
}

function AreChart() {
	const data = [
		{
			volume: 2400,
			value: 2400,
			date: '12:00 AM',
			name: 'A',
		},
		{
			volume: 3000,
			value: 1398,
			date: '03:00 AM',
			name: 'A',
		},
		{
			volume: 2000,
			value: 9800,
			date: '06:00 AM',
			name: 'A',
		},
		{
			volume: 2780,
			value: 3908,
			date: '09:00 AM',
			name: 'A',
		},
		{
			volume: 1890,
			value: 4800,
			date: '12:00 PM',
			name: 'A',
		},
		{
			volume: 2390,
			value: 3800,
			date: '03:00 AM',
			name: 'A',
		},
		{
			volume: 4300,
			value: 4300,
			date: '06:00 AM',
			name: 'A',
		},
	];

	return (
		<StyledAreaChart>
			<ResponsiveContainer width='100%' height={320}>
				<LineChart data={data}>
					<XAxis dataKey='date' axisLine={false} tickLine={false} />
					<YAxis axisLine={false} tickLine={false} />
					<Line
						type='monotone'
						dataKey='value'
						stroke='#406A99'
						dot={false}
						activeDot={{ r: 4 }}
					/>

					<Line
						type='monotone'
						dataKey='volume'
						stroke='#6FCF97'
						dot={false}
						activeDot={{ r: 4 }}
					/>

					<Tooltip content={<CustomTooltip />} />
					<CartesianGrid opacity={0.5} vertical={false} />
					<Legend
						content={renderLegend}
						iconType='circle'
						iconSize={10}
						layout='vertical'
						align='right'
						verticalAlign='top'
					/>
				</LineChart>
			</ResponsiveContainer>
		</StyledAreaChart>
	);
}

const StyledAreaChart = styled.div`
	font-size: 13px;
	margin-left: -20px;
	width: 100%;

	/* @media (max-width: 1350px) {
		min-width: 800px;
	}

	@media (max-width: 900px) {
		min-width: 600px;
	}

	@media (max-width: 700px) {
		width: 350px;
	} */
`;

export default AreChart;
