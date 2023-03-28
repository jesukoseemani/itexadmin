import React, { useState, useEffect, useCallback } from "react";
import styles from "./Compliance.module.scss";
import { makeStyles } from "@material-ui/core";
import NavBar from "../../components/navbar/NavBar";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Box from "@mui/material/Box";
import ComplianceList from "./ComplianceList";
import LimitCompliance from "./LimitCompliance";
import FeeCompliance from "./FeeCompliance";
import ScheduleCompliance from "./ScheduleCompliance";
import ConfigCompliance from "./ConfigCompliance";
function AllCompliance() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div className={styles.container}>
        <NavBar name="Compliance" />

        <Box width={"100%S"} px={3}>
          <TabContext value={value}>
            <Box>
              <TabList
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                sx={{
                  "& .MuiButtonBase-root": {
                    textTransform: "capitalize",
                  },
                }}
              >
                <Tab label="All Business" value="1" />
                <Tab label="Business Limit" value="2" />
                <Tab label="Business Fee" value="3" />
                <Tab label="Business Schedule" value="4" />
                <Tab label="Business config" value="5" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ComplianceList />
            </TabPanel>
            <TabPanel value="2">
              <LimitCompliance />
            </TabPanel>
            <TabPanel value="3">
              <FeeCompliance />
            </TabPanel>
            <TabPanel value="4">
              <ScheduleCompliance />
            </TabPanel>
            <TabPanel value="5">
              <ConfigCompliance />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}

export default AllCompliance;
