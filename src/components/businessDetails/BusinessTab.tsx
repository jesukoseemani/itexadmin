import React, { useState, useEffect } from 'react';
import styles from './BusinessDetails.module.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/navbar/NavBar';
import BusinessDetails from './BusinessDetails';
import { BusinessDetailApiTypes } from '../../types/UserTableTypes';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Limit from './Limit';
import Fee from './Fee';
import Document from './Document';
import SettlementSchedule from './SettlementSchedule';
import PaymentMethod from './paymentMethod/PaymentMethod';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
function BusinessTab() {
	const { id }: any = useParams();
	const [value, setValue] = useState(0);
	const [details, setDetails] = useState<BusinessDetailApiTypes>();

	useEffect(() => {
		axios.get<BusinessDetailApiTypes>(`/v1/business/${id}`).then((res) => {
			setDetails(res.data);
		});
	}, [id]);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	const useStyles = makeStyles({
		indicator: {
			backgroundColor: '#27AE60',
			width: '62px',
			height: '4px',
			borderRadius: '80px',
		},
		flexContainer: {
			justifyContent: 'space-between',
			width: '50%',
		},
		scrollButtons: {
			marginBottom: '13px',
		},
	});
	const classes = useStyles();
	return (
		<>
			<NavBar name='business' />
			<div className={styles.container}>
				<Box sx={{ width: '100%' }}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs
							variant='scrollable'
							scrollButtons='auto'
							classes={{
								indicator: classes.indicator,
								scrollButtons: classes.scrollButtons,
								flexContainer: classes.flexContainer,
							}}
							TabIndicatorProps={{
								style: {
									background: '#27AE60',
									borderRadius: '8px',
									height: '4px',
								},
							}}
							value={value}
							onChange={handleChange}
							aria-label='basic tabs example'>
							<Tab
								style={{
									fontFamily: 'Roboto',
									fontStyle: 'normal',
									fontWeight: 'normal',
									fontSize: '16px',
									lineHeight: '19px',
									color: value === 0 ? '#27AE60' : '#4F4F4F',
									textTransform: 'capitalize',
								}}
								label='Business'
								{...a11yProps(0)}
							/>
							<Tab
								style={{
									fontFamily: 'Roboto',
									fontStyle: 'normal',
									fontWeight: 'normal',
									fontSize: '16px',
									lineHeight: '19px',
									color: value === 1 ? '#27AE60' : '#4F4F4F',
									textTransform: 'capitalize',
								}}
								label='Limit'
								{...a11yProps(1)}
							/>
							<Tab
								style={{
									fontFamily: 'Roboto',
									fontStyle: 'normal',
									fontWeight: 'normal',
									fontSize: '16px',
									lineHeight: '19px',
									color: value === 2 ? '#27AE60' : '#4F4F4F',
									textTransform: 'capitalize',
								}}
								label='Fees'
								{...a11yProps(2)}
							/>
							<Tab
								style={{
									fontFamily: 'Roboto',
									fontStyle: 'normal',
									fontWeight: 'normal',
									fontSize: '16px',
									lineHeight: '19px',
									color: value === 3 ? '#27AE60' : '#4F4F4F',
									textTransform: 'capitalize',
								}}
								label='Settlements'
								{...a11yProps(3)}
							/>
							<Tab
								style={{
									fontFamily: 'Roboto',
									fontStyle: 'normal',
									fontWeight: 'normal',
									fontSize: '16px',
									lineHeight: '19px',
									color: value === 4 ? '#27AE60' : '#4F4F4F',
									textTransform: 'capitalize',
								}}
								label='Documents'
								{...a11yProps(4)}
							/>
							<Tab
								style={{
									fontFamily: 'Roboto',
									fontStyle: 'normal',
									fontWeight: 'normal',
									fontSize: '16px',
									lineHeight: '19px',
									color: value === 5 ? '#27AE60' : '#4F4F4F',
									textTransform: 'capitalize',
								}}
								label='Payment Method'
								{...a11yProps(5)}
							/>
						</Tabs>
					</Box>
					<TabPanel value={value} index={0}>
						<BusinessDetails id={id} details={details} />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Limit id={id} />
					</TabPanel>
					<TabPanel value={value} index={2}>
						<Fee id={id} />
					</TabPanel>
					<TabPanel value={value} index={3}>
						<SettlementSchedule id={id} />
					</TabPanel>
					<TabPanel value={value} index={4}>
						<Document id={id} />
					</TabPanel>
					<TabPanel value={value} index={5}>
						<PaymentMethod id={id} />
					</TabPanel>
				</Box>
			</div>
		</>
	);
}

export default BusinessTab;
