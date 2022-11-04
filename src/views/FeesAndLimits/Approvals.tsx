import styles from "./FeesAndLimits.module.scss";
import { useState, useEffect, useCallback } from "react";
import ActivityTypes from "../../types/ActivityTypes";
import {  useDispatch } from "react-redux";
import OperantTable from "../../components/table/OperantTable";
import { PendingProviderApiTypes } from "../../types/UserTableTypes";
import FeeApprovals from "./FeesApproval";
import LimitsApproval from "./LimitsApprovals";
import AddProviderModal from "../../components/feesAndLimitsModals/AddProvider";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import { TabPanel } from "../../components/Tabs/Tabs";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import ProviderApprovalModal from "./ProviderApprovalModal";
import {
  closeLoader,
  openLoader,
} from "../../redux/actions/loader/loaderActions";

const Approvals = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [rows, setRows] = useState<ActivityTypes[]>([]);
  const [apiRes, setApiRes] = useState<PendingProviderApiTypes>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
    5
  );
  const [totalRows, setTotalRows] = useState<number>(0);
  const [dataValue, setDataValue] = useState<string | number>("");
  const [open, setOpen] = useState<boolean>(false);

  const changePage = (value: number) => {
    setPageNumber(value);
  };

  const limit = (value: number) => {
    setRowsPerPage(value);
  };

  const dispatch = useDispatch();

  const addProviderHandler = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <AddProviderModal />
          </div>
        ),
      })
    );
  };

  useEffect(() => {
    open &&
      dispatch(
        openModalAndSetContent({
          modalStyles: {
            padding: 0,
          },
          modalContent: (
            <div className="modalDiv">
              <ProviderApprovalModal
                dataValue={dataValue}
                open={open}
                setOpen={setOpen}
              />
            </div>
          ),
        })
      );
  }, [dataValue, open]);


  useEffect(() => {
    dispatch(openLoader());
    axios
      .get<PendingProviderApiTypes>(
        `/admin/provider/pending?perpage=${rowsPerPage}&page=${pageNumber}`
      )
      .then((res) => {
        dispatch(closeLoader());
        setApiRes(res.data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(closeLoader());
      });
  }, [rowsPerPage, pageNumber]);

  useEffect(() => {
    setTotalRows(Number(apiRes?.providers.length));
  }, [apiRes]);

  interface Column {
    id: "provider_name" | "provider_short_name" | "currency";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "provider_name", label: "Provider name", minWidth: 100 },
    { id: "provider_short_name", label: "Provider short name", minWidth: 100 },
    { id: "currency", label: "Currency", minWidth: 100 },
  ];

  const ProviderRowTab = useCallback(
    (
      id: number | string,
      name: string,
      shortname: string | number,
      currency: string | number,
      actionid: string | number
    ) => ({
      provider_name: name,
      provider_short_name: shortname,
      currency: currency,
      actionid: actionid,
    }),
    []
  );
  useEffect(() => {
    const newRowOptions: any[] = [];
    apiRes &&
      apiRes?.providers.map((each: any) =>
        newRowOptions.push(
          ProviderRowTab(
            each.actionid,
            each.name,
            each.shortname,
            each.currency,
            each.actionid
          )
        )
      );
    setRows(newRowOptions);
  }, [apiRes, ProviderRowTab]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="Transaction Management" />

      <Box sx={{ width: "100%", marginTop: "1rem" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            style={{ padding: "0 1rem", margin: "0" }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              style: {
                background: "#27AE60",
                borderRadius: "8px",
                height: "4px",
              },
            }}
          >
            <Tab
              label="Providers setup approval"
              style={{
                margin: "0 1rem",
                textTransform: "capitalize",
                color: value === 0 ? "#27AE60" : "#333333",
              }}
            />
            <Tab
              label="Fees approval"
              style={{
                textTransform: "capitalize",
                margin: "0 1rem",
                color: value === 1 ? "#27AE60" : "#333333",
              }}
            />
            <Tab
              label="Limits approval"
              style={{
                textTransform: "capitalize",
                margin: "0 1rem",
                color: value === 2 ? "#27AE60" : "#333333",
              }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderLeft}>
              <p className={styles.header}>
                {apiRes?._metadata?.totalcount} providers
              </p>
            </div>
            <div className={styles.tableHeaderRight}>
              <div className={styles.buttonDiv}>
                <button
                  className={styles.buttonAdd}
                  onClick={addProviderHandler}
                >
                  <p>Add a new provider</p>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.m1}>
            {apiRes?.providers.length && (
              <OperantTable
                columns={columns}
                rows={rows}
                totalRows={totalRows}
                changePage={changePage}
                limit={limit}
                setDataValue={setDataValue}
                setOpen={setOpen}
              />
            )}
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <FeeApprovals />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <LimitsApproval />
        </TabPanel>
      </Box>
    </div>
  );
};

export default Approvals;
