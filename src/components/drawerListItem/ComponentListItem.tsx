import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import styles from "./ComponentListItem.module.scss";
import ReactTooltip from 'react-tooltip';


interface drawerlisttypes {
  route: string;
  id: string | number;
  title: string;
  icon: React.ReactElement;
  open: Boolean;
}

const ComponentListItem = ({
  route,
  title,
  id,
  icon,
  open,
}: drawerlisttypes) => {
  const MuiListItem = withStyles({
    root: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: open ? "1px 0 1px 24px" : "1px 0 1px 14px",
    },
  })(ListItem);

  const [activeNav, setActiveNav] = React.useState(false);

  return (
		<MuiListItem key={id}>
			<NavLink
				to={route}
				key={id}
				data-for='custom-event'
				data-tip={title}
				data-background-color='#002841'
				data-text-color='#FFFFFF'
				exact={true}
				className={styles.drawerList}
				style={{
					background: activeNav && title === 'My Account' ? '#D7E0EB' : '',
					width: activeNav && title === 'My Account' ? '100%' : '',
				}}
				activeStyle={{
					width: '100%',
					background: '#e0e0e0',
					border: 'none',
					borderRight: '4px solid #27ae60',
				}}>
				<ListItemIcon key={id}>{icon}</ListItemIcon>
				<ListItemText>
					{' '}
					<div
						style={{ display: open ? 'flex' : 'none' }}
						className={styles.title}>
						{title}
					</div>
				</ListItemText>
				<ReactTooltip id='custom-event' />
			</NavLink>
		</MuiListItem>
	);
};

export default ComponentListItem;
