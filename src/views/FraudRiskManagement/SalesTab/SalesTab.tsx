import React from 'react';
import styles from './SaesTab.module.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import Sales from '../Sales';
import NavBar from '../../../components/navbar/NavBar';
import SalesOverview from '../SalesOverview/SalesOverview';

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

function SalesTab() {
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
			width: '20%',
		},
		scrollButtons: {
			marginBottom: '13px',
		},
	});
	const classes = useStyles();

	return (
		<>
			<NavBar name='Fraud Management' />
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
										margin: '0 5px',
									}}
									label='Overview'
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
										margin: '0 5px',
									}}
									label='Sales Volume & Value'
									{...a11yProps(1)}
								/>
							</Tabs>
						</Box>
						<TabPanel value={value} index={0}>
							<SalesOverview />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<Sales />
						</TabPanel>
					</Box>
				</div>
			</div>
		</>
	);
}

export default SalesTab;
