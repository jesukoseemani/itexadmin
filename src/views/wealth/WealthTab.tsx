import React, { ReactNode } from 'react'
import NavBar from '../../components/navbar/NavBar'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SettlementSummary from './SettlementSummary';
import RollingSummary from './RollingSettlement';


const WealthTab = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <div>
            <NavBar name='Wealth Summary' />
            <Box sx={{ width: '100%', typography: 'body1', }} py={"1rem"} px={"1rem"}>
                <TabContext value={value}>
                    <Box>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{
                            '.MuiButtonBase-root': {
                                margin: "0px 10px !important",
                                textTransform: "inherit",


                            },



                        }}>
                            <Tab label="Settlement" value="1" />
                            <Tab label="Rolling Reserve" value="2" />
                            {/* <Tab label="Item Three" value="3" /> */}
                        </TabList>
                    </Box>
                    <TabPanel value="1"><SettlementSummary /></TabPanel>
                    <TabPanel value="2"><RollingSummary /></TabPanel>
                    {/* <TabPanel value="3">Item Three</TabPanel> */}
                </TabContext>
            </Box>
        </div>
    )
}

export default WealthTab