import React, { useEffect, useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import styles from './Drawer.module.scss';
import Logo from '../../assets/images/NavLogo.svg';
import CollapseIcon from '../../assets/images/collapse.svg';
import { useLocation } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PeopleIcon from '@mui/icons-material/People';
import PendingIcon from '@mui/icons-material/Pending';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ListIcon from '@mui/icons-material/List';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import PolicyIcon from '@mui/icons-material/Policy';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ComponentListItem from '../drawerListItem/ComponentListItem';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const adminOverview = [
	{
		id: 'DAO',
		title: 'Home',
		route: '/',
		icon: <HomeIcon />,
	},
];

const businesses = [
	{
		id: 'DB',
		title: 'Businesses',
		route: '/businesses',
		icon: <ArticleIcon />,
	},
];

const transactionManagement = [
	{
		id: 'DTM',
		title: 'Transactions',
		route: '/transactionmgt',
		icon: <FolderSpecialIcon />,
	},
];

const feesAndLimits = [
	{
		id: 'DPF',
		title: 'Fees',
		route: '/fees',
		icon: <DonutLargeIcon />,
	},

	{
		id: 'DFL',
		title: 'Limits',
		route: '/fees/limits',
		icon: <DonutSmallIcon />,
	},

	{
		id: 'DAP',
		title: 'Providers',
		route: '/fees/providers',
		icon: <AccountBoxIcon />,
	},

	{
		id: 'DPA',
		title: 'Approvals',
		route: '/fees/approvals',
		icon: <DoneAllIcon />,
	},
];

const walletManagement = [
	{
		id: 'DC',
		title: 'Wallet Management',
		route: '/walletmgt',
		icon: <AccountBalanceWalletIcon />,
	},
];

const settlement = [
	{
		id: 'DS',
		title: 'Settlements',
		route: '/settlements',
		icon: <ListIcon />,
	},
	{
		id: 'DSR',
		title: 'Reconciliation',
		route: '/settlements/reconciliation',
		icon: <FactCheckIcon />,
	},
	{
		id: 'DSP',
		title: 'Pending Approval',
		route: '/settlements/pending_approval',
		icon: <PendingIcon />,
	},
];

const compliance = [
	{
		id: 'DAC',
		title: 'Compliance',
		route: '/compliance',
		icon: <AssuredWorkloadIcon />,
	},
];

const pointOfSale = [
	{
		id: 'DPOS',
		title: 'POS',
		route: '/pos',
		icon: <PointOfSaleIcon />,
	},
];

const legal = [
	{
		id: 'DLB',
		title: 'Legal',
		route: '/legal',
		icon: <PolicyIcon />,
	},
];

const Bank = [
	{
		id: 'DBBB',
		title: 'Bank Balances',
		route: '/bank',
		icon: <AssuredWorkloadIcon />,
	},
];

const fraudRiskManagement = [
	{
		id: 'DFMS',
		title: 'Sales',
		route: '/fraudmgt_sales',
		icon: <PriceCheckIcon />,
	},

	{
		id: 'DFCB',
		title: 'Chargeback Breakdown',
		route: '/fraudmgt/chargeback',
		icon: <MapsHomeWorkIcon />,
	},

	{
		id: 'DFCF',
		title: 'CB & Fraud Summary',
		route: '/fraudmgt/fraud_summary',
		icon: <SummarizeIcon />,
	},

	{
		id: 'DFCR',
		title: 'CB & Fraud Ratio',
		route: '/fraudmgt/fraud_ratio',
		icon: <AspectRatioIcon />,
	},

	{
		id: 'DFRA',
		title: 'Assessment Fee',
		route: '/fraudmgt/fraud_assessment_fee',
		icon: <AssessmentIcon />,
	},

	{
		id: 'DFRAT',
		title: 'Audit Trail',
		route: '/fraudmgt/audittrail',
		icon: <ReceiptLongIcon />,
	},
];

const chargebackManagement = [
	{
		id: 'DCA',
		title: 'Chargebacks',
		route: '/chargebackmgt',
		icon: <WarehouseIcon />,
	},

	{
		id: 'DCR',
		title: 'Refunds',
		route: '/refunds',
		icon: <ChangeCircleIcon />,
	},
];

const usersAndPermissions = [
	{
		id: 'DU',
		title: 'Users',
		route: '/usersandpermissions',
		icon: <PeopleIcon />,
	},

	{
		id: 'DUR',
		title: 'Roles',
		route: '/usersandpermissions/roles',
		icon: <AssignmentIndIcon />,
	},

	{
		id: 'DUM',
		title: 'Modules',
		route: '/usersandpermissions/modules',
		icon: <AssignmentIndIcon />,
	},
];

const drawerWidth = 269;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
	background: '#EBEBEB',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	background: '#EBEBEB',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(9)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

export default function MiniDrawer() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	const [activeNav, setActiveNav] = React.useState(false);

	const { pathname } = useLocation();

	const handleDrawerOpen = () => {
		setOpen(!open);
	};

	const handleDrawerClose = () => {
		setOpen(!open);
	};

	const MuiListItem = withStyles({
		root: {
			display: 'flex',
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
			padding: open ? '1px 0 1px 24px' : '1px 0 1px 10px',
		},
	})(ListItem);

	// const ComponentListItem = withStyles({
	//   root: {
	//     padding: open ? "1px 0 1px 24px" : "1px 0 1px 10px",
	//   },
	// });

	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		function handleResize() {
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [width]);

	useEffect(() => {
		if (width <= 850) {
			setOpen(false);
		} else if (width > 850) {
			setOpen(true);
		}
	}, [width]);

	if (
		pathname.toLowerCase() === '/signup' ||
		pathname.toLowerCase() === '/signin' ||
		pathname.toLowerCase() === '/individual_signup' ||
		pathname.toLowerCase() === '/email' ||
		pathname.toLowerCase() === '/forgotpass' ||
		pathname.toLowerCase() === '/customer' ||
		pathname.toLowerCase() === '/merchant' ||
		pathname.toLowerCase() === '/forgotpassword' ||
		pathname.toLowerCase() === '/newpassword' ||
		pathname.toLowerCase() === '/reset-password'
	) {
		return <div></div>;
	}
	if (
		pathname.toLowerCase() === '/business/signup' ||
		pathname.toLowerCase() === '/ngo/signup'
	) {
		return <div></div>;
	}

	const styledH2 = {
		display: !open ? 'none' : 'block',
	};

	const styledText = {
		display: !open ? 'none' : 'block',
	};
	// useEffect(() => {
	// 	axios
	// 		.get(`/transaction/banks`)
	// 		.then((res) => {
	// 			dispatch(saveCountry(res.data));
	// 		})
	// 		.catch((err) => console.log(err));
	// }, [dispatch]);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position='fixed' open={open}></AppBar>
			<Drawer variant='permanent' open={open}>
				<div className={styles.logo}>
					<img src={Logo} alt='' className={styles.logoimg} />
				</div>

				<div className={styles.wrapperList}>
					<div className={styles.drawerMenu}>
						<List>
							{adminOverview.map(({ route, title, id, icon }) => (
								<ComponentListItem
									key={id}
									route={route}
									title={title}
									id={id}
									icon={icon}
									open={open}
								/>
							))}

							<h2 style={styledH2} className={styles.sectionTitle}>
								Businesses
							</h2>
							{businesses.map(({ route, title, id, icon }) => (
								<ComponentListItem
									key={id}
									route={route}
									title={title}
									id={id}
									icon={icon}
									open={open}
								/>
							))}

							<h2 style={styledH2} className={styles.sectionTitle}>
								Transaction Management
							</h2>
							{transactionManagement.map(({ route, title, id, icon }) => (
								<ComponentListItem
									key={id}
									route={route}
									title={title}
									id={id}
									icon={icon}
									open={open}
								/>
							))}

							<h2 style={styledH2} className={styles.sectionTitle}>
								Fees &amp; Limits
							</h2>
							{feesAndLimits.map(({ route, title, id, icon }) => (
								<ComponentListItem
									key={id}
									route={route}
									title={title}
									id={id}
									icon={icon}
									open={open}
								/>
							))}

							<h2 style={styledH2} className={styles.sectionTitle}>
								Wallet Management
							</h2>
							{walletManagement.map(({ route, title, id, icon }) => (
								<ComponentListItem
									key={id}
									route={route}
									title={title}
									id={id}
									icon={icon}
									open={open}
								/>
							))}

							<h2 style={styledH2} className={styles.sectionTitle}>
								Bank
							</h2>
							{Bank.map(({ route, title, id, icon }) => (
								<ComponentListItem
									key={id}
									route={route}
									title={title}
									id={id}
									icon={icon}
									open={open}
								/>
							))}

							<h2 style={styledH2} className={styles.sectionTitle}>
								Settlement
							</h2>
							{settlement.map(({ route, title, id, icon }) => (
								<ComponentListItem
									key={id}
									route={route}
									title={title}
									id={id}
									icon={icon}
									open={open}
								/>
							))}

							<h2 style={styledH2} className={styles.sectionTitle}>
								Compliance
							</h2>
							{compliance.map(({ route, title, id, icon }) => (
								<ComponentListItem
									key={id}
									route={route}
									title={title}
									id={id}
									icon={icon}
									open={open}
								/>
							))}

							<h2 style={styledH2} className={styles.sectionTitle}>
								Point Of Sale
							</h2>
							{pointOfSale.map(({ route, title, id, icon }) => (
								<ComponentListItem
									key={id}
									route={route}
									title={title}
									id={id}
									icon={icon}
									open={open}
								/>
							))}

							<h2 style={styledH2} className={styles.sectionTitle}>
								Legal
							</h2>
							{legal.map(({ route, title, id, icon }) => (
								<ComponentListItem
									key={id}
									route={route}
									title={title}
									id={id}
									icon={icon}
									open={open}
								/>
							))}

							<h2 style={styledH2} className={styles.sectionTitle}>
								Fraud &amp; Risk Management
							</h2>
							{fraudRiskManagement.map(({ route, title, id, icon }) => (
								<ComponentListItem
									key={id}
									route={route}
									title={title}
									id={id}
									icon={icon}
									open={open}
								/>
							))}

							<h2 style={styledH2} className={styles.sectionTitle}>
								Chargeback Management
							</h2>
							{chargebackManagement.map(({ route, title, id, icon }) => (
								<ComponentListItem
									key={id}
									route={route}
									title={title}
									id={id}
									icon={icon}
									open={open}
								/>
							))}

							<h2 style={styledH2} className={styles.sectionTitle}>
								Users &amp; Permissions
							</h2>
							{usersAndPermissions.map(({ route, title, id, icon }) => (
								<ComponentListItem
									key={id}
									route={route}
									title={title}
									id={id}
									icon={icon}
									open={open}
								/>
							))}
						</List>
					</div>
				</div>

				{/* <DrawerHeader>
          <IconButton></IconButton>
        </DrawerHeader> */}

				<List>
					{theme.direction === 'rtl' ? null : (
						<MuiListItem onClick={handleDrawerClose}>
							<div className={styles.drawerList}>
								<ListItemIcon>
									<img src={CollapseIcon} alt='icons' className={styles.icon} />
								</ListItemIcon>
								<ListItemText>
									{/* <img src={icon} alt="icons" /> */}
									<div style={styledText} className={styles.title}>
										Collapse SideBar
									</div>
								</ListItemText>
							</div>
						</MuiListItem>
					)}
				</List>
			</Drawer>
		</Box>
	);
}
