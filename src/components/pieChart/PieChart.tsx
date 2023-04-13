import React, { useState, useEffect } from 'react';
import {
	PieChart as PI,
	Pie,
	Legend,
	Tooltip,
	Cell,
	ResponsiveContainer,
	Label,
} from 'recharts';
import styled from 'styled-components';
import axios from 'axios';

const CustomLabel = ({ viewBox, total }: any) => {
	const { cx, cy } = viewBox;
	return (
		<React.Fragment>
			<text x={cx - 20} y={cy - 5}>
				<tspan
					style={{
						fontWeight: 700,
						fontSize: '14px',

						fontFamily: 'inter',
					}}>
					Total
				</tspan>
			</text>
			<text x={cx - 15} y={cy + 20}>
				<tspan
					style={{
						fontSize: '16px',

						fontFamily: 'inter',
					}}>
					{total}
				</tspan>
			</text>
		</React.Fragment>
	);
};

function PieChart({ data }: any) {
	const dataReduce = data?.reduce(
		(acc: any, item: any) => item?.value + acc,
		0
	);

	return (
		<StyledChart>
			<ResponsiveContainer width='100%' height={250}>
				<PI>
					<Pie
						dataKey='value'
						cx='50%'
						cy='50%'
						data={data}
						innerRadius={45}
						outerRadius={90}
						fill='#82ca9d'>
						{data.map((entry: any, index: any) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}

						<Label
							content={<CustomLabel total={dataReduce} />}
							position='center'
						/>
					</Pie>

					<Tooltip />
					<Legend />
				</PI>
			</ResponsiveContainer>
			{/* <StyledReduce>
				Total
				<span>{dataReduce}</span>
			</StyledReduce> */}
		</StyledChart>
	);
}

const StyledChart = styled.div`
	/* width: 100%; */
	box-shadow: 0px 1.65px 3px rgba(75, 75, 75, 0.34);
	border-radius: 0px 0px 8px 8px;
	position: relative;
	font-size: 14px;
	/* border: 1px solid red; */
`;

const StyledReduce = styled.h4`
	position: absolute;
	width: auto;
	top: 42%;
	left: 47%;
	font-size: 13px;

	span {
		font-size: 15px;
		font-weight: bold;
		display: block;
	}
`;

export default PieChart;
