import React from "react";
import {
  PieChart as PI,
  Pie,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Label,
  XAxis,
} from "recharts";
import styled from "styled-components";
//import { pieTypes } from '../../types/UserTableTypes';

const StyledUl = styled.ul`
  margin-left: -10px;

  @media (max-width: 950px) {
    margin-left: 0px;
  }
`;

const CustomLabel = ({ viewBox, total }: any) => {
  const { cx, cy } = viewBox;
  return (
    <React.Fragment>
      <text x={cx - 40} y={cy + 10}>
        <tspan
          style={{
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "24px",
            lineHeight: "120%",
            color: "rgba(0, 40, 65, 0.8)",
          }}
        >
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
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
  };
  const styledbox: React.CSSProperties = {
    width: "11px",
    height: "11px",
    background: `${payload.color}`,
    borderRadius: "2px",
  };
  const styledp: React.CSSProperties = {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "140%",
    color: "rgba(0, 40, 65, 0.8)",
  };

  const styledContent: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    marginLeft: "10px",
  };

  const styledpT: React.CSSProperties = {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "140%",
    color: "rgba(0, 40, 65, 0.6)",
    // marginLeft: "10px",
  };
  const styledpV: React.CSSProperties = {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "140%",
    color: "#002841",
    marginLeft: "10px",
  };

  return (
    <StyledUl>
      {payload.map((entry: any, index: any) => (
        <li style={styledli} key={`item-${index}`}>
          <div
            style={{
              width: "11px",
              height: "11px",
              background: `${entry.color}`,
              borderRadius: "100%",
            }}
          ></div>
          <div style={styledContent}>
            {/* <p style={styledp}>{entry.value} Customers</p> */}
            <p style={styledpT}>{entry.payload.name}</p>
            <p style={styledpT}>
              ({entry.payload.value} Customers) - {entry.payload.percentage}%
            </p>
          </div>
        </li>
      ))}
    </StyledUl>
  );
};

function PieChart() {
  const data = [
    {
      name: "GTBank",
      value: 188,
      color: "rgba(187, 107, 217, 1)",
      transaction: 7,
      percentage: 16,
    },
    {
      name: "UBA",
      value: 705,
      color: "rgba(245, 166, 35, 1)",
      transaction: 7,
      percentage: 60,
    },
    {
      name: "Kuda",
      value: 282,
      color: "rgba(47, 128, 237, 1)",
      transaction: 7,
      percentage: 24,
    },
  ];

  const dataReduce = data.reduce(
    (acc: any, item: any) => item.percentage + acc,
    0
  );

  return (
    <StyledChart>
      <ResponsiveContainer width="100%" height={315}>
        <PI>
          <Pie
            dataKey="value"
            cx="30%"
            cy="30%"
            data={data}
            innerRadius={20}
            outerRadius={50}
            fill="#82ca9d"
          >
            {data.map((entry: any, index: any) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          {/* <XAxis dataKey="name">
            <Label
              value="Pages of my website"
              offset={0}
              position="insideBottom"
            />
          </XAxis> */}

          <Tooltip />

          <Legend
            content={renderLegend}
            iconType="circle"
            iconSize={10}
            layout="vertical"
            align="right"
            verticalAlign="top"
          />
        </PI>
      </ResponsiveContainer>
    </StyledChart>
  );
}

const StyledChart = styled.div`
  width: 90%;
  /* box-shadow: 0px 1.65px 3px rgba(75, 75, 75, 0.34);
  border-radius: 0px 0px 8px 8px; */
  position: relative;
  font-size: 14px;
  height: 200px;
  /* margin-left: -149px; */
  /* border: 1px solid red; */
`;

const StyledReduce = styled.h4`
  position: absolute;
  width: auto;
  top: 50%;
  left: 31%;
  transform: translate(-50%, -50%);
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 120%;
  color: rgba(0, 40, 65, 0.8);

  @media (max-width: 1280px) {
    top: 50%;
    left: 36%;
  }
`;

export default PieChart;

// { <Legend
//          iconType='square'
//          iconSize={10}
//          layout='vertical'
//          align='right'
//          verticalAlign='middle'
//        /> */}
//        {/* <text
//          x='30%'
//          y='52%'
//          dy={0}
//          width={100}
//          textAnchor='middle'
//          style={{
//            fontSize: '24px',
//            fontFamily: 'Inter',
//            fontStyle: 'normal',
//            fontWeight: '600',
//            lineHeight: '120%',
//            color: 'rgba(0, 40, 65, 0.8)',
//          }}>
//          {dataReduce}%
//        </text>

// interface dataTypes {
//  data: {
//    transaction_count: {
//      percent_change: number;
//      count: number;
//    };
//    transaction_amount: {
//      percent_change: number;
//      amount: number;
//    };
//    pie_chart: {
//      success_amount: number;
//      failed_amount: number;
//      cancelled_amount: number;
//      success_percent: number;
//      fail_percent: number;
//      cancelled_percent: number;
//      success_count: number;
//      fail_count: number;
//      cancelled_count: number;
//    };
//  };
// }

