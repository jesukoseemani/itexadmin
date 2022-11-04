import React from 'react';
import {
	PieChart,
	Pie,
	Legend,
	Tooltip,
	Cell,
	ResponsiveContainer,
	Label,
} from 'recharts';
import styled from 'styled-components';

interface pieTypes {
	data02: {
		name: string;
		amount: number | undefined;
		color: string;
		transaction: number | undefined;
		percentage: number | undefined;
	}[];
}

const StyledUl = styled.ul`
	/* @media (max-width: 950px) {
		
	} */
`;

const CustomLabel = ({ viewBox, total }: any) => {
	const { cx, cy } = viewBox;
	return (
		<React.Fragment>
			<text x={cx - 40} y={cy + 10}>
				<tspan
					style={{
						fontFamily: 'Inter',
						fontStyle: 'normal',
						fontWeight: '600',
						fontSize: '24px',
						lineHeight: '120%',
						color: 'rgba(0, 40, 65, 0.8)',
					}}>
					{total === 0 ? `${total}.00%` : total}
				</tspan>
			</text>
		</React.Fragment>
	);
};

const renderLegend = (props: any) => {
	const { payload } = props;
	/* const styledwrapper: React.CSSProperties = {
		
	}; */
	const styledli: React.CSSProperties = {
		listStyle: 'none',
		display: 'flex',
		alignItems: 'center',
		marginTop: '20px',
	};
	const styledbox: React.CSSProperties = {
		width: '11px',
		height: '11px',
		background: `${payload.color}`,
		borderRadius: '2px',
	};
	const styledp: React.CSSProperties = {
		fontFamily: 'Roboto',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '16px',
		lineHeight: '21px',
		letterSpacing: '-0.20423px',
		color: '#333333',
	};

	const styledContent: React.CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		marginLeft: '10px',
	};

	const styledpT: React.CSSProperties = {
		fontFamily: 'Roboto',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '16px',
		lineHeight: '21px',
		letterSpacing: '-0.20423px',
		color: '#333333',
	};
	const styledpV: React.CSSProperties = {
		fontFamily: 'Roboto',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '16px',
		lineHeight: '21px',
		letterSpacing: '-0.20423px',
		color: '#333333',
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
						<p style={styledpT}>-{entry.payload.transaction}</p>
						<p style={styledpV}>({entry.payload.percentage}%)</p>
					</div>
				</li>
			))}
		</StyledUl>
	);
};

function PieChart2({ data02 }: pieTypes) {
	return (
		<StyledChart>
			<ResponsiveContainer width='100%' height={150}>
				<PieChart width={75} height={75}>
					<Pie
						dataKey='amount'
						cx={45}
						cy={60}
						data={data02}
						innerRadius={20}
						outerRadius={50}
						fill='#82ca9d'>
						{data02.map((entry: any, index: any) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>

					<Tooltip />

					<Legend
						content={renderLegend}
						iconType='square'
						iconSize={10}
						height={30}
						width={350}
						layout='vertical'
						align='center'
						verticalAlign='bottom'
					/>
				</PieChart>
			</ResponsiveContainer>
		</StyledChart>
	);
}

const StyledChart = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
`;

export default PieChart2;
