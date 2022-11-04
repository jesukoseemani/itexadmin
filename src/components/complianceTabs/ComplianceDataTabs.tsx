import React from 'react';
import styles from './ComplianceDataTabs.module.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import AllComplianceTable from '../allComplianceTable/AllComplianceTable';
import PendingComplianceTable from '../pendingComplianceTable/PendingComplianceTable';
import PendingInitComplianceTable from '../pendingInitComplianceTable/PendingInitComplianceTable';

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
				<Box sx={{ p: 0 }}>
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

function ComplianceDataTabs() {
	const [value, setValue] = React.useState(0);

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
			width: '35%',
			// marginLeft: '30px',
		},
		scrollButtons: {
			marginBottom: '13px',
		},
	});
	const classes = useStyles();

	return (
		<div className={styles.wrapper}>
			<div className={styles.modalbox}>
				<Box sx={{ width: '100%' }}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label='basic tabs example'
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
							}}>
							<Tab
								style={{
									fontFamily: 'Roboto',
									fontStyle: 'normal',
									fontWeight: 'normal',
									fontSize: '16px',
									lineHeight: '19px',
									color: value === 0 ? '#27AE60' : '#4F4F4F',
									textTransform: 'capitalize',
									margin: '0 15px',
								}}
								label='All Compliance'
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
									margin: '0 15px',
								}}
								label='Pending review'
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
									margin: '0 15px',
									textTransform: 'capitalize',
								}}
								label='Pending Approval'
								{...a11yProps(2)}
							/>
						</Tabs>
					</Box>
					<TabPanel value={value} index={0}>
						<AllComplianceTable />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<PendingInitComplianceTable />
					</TabPanel>
					<TabPanel value={value} index={2}>
						<PendingComplianceTable />
					</TabPanel>
				</Box>
			</div>
		</div>
	);
}

export default ComplianceDataTabs;
