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
          <ComplianceList />
        </Box>
      </div>
    </div>
  );
}

export default AllCompliance;
