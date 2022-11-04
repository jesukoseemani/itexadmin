import styles from "./FeesAndLimits.module.scss";
import { useState, useEffect, useCallback } from "react";
import ActivityTypes from "../../types/ActivityTypes";
import { useDispatch, useSelector } from "react-redux";
import OperantTable from "../../components/table/OperantTable";
import { GetLimits } from "../../types/UserTableTypes";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import { TabPanel } from "../../components/Tabs/Tabs";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import AddNewTransferLimit from "../../components/feesAndLimitsModals/AddNewTransferLimit";
import AddNewCollectionLimit from "../../components/feesAndLimitsModals/AddNewCollectionLimit";
import {
  closeLoader,
  openLoader,
} from "../../redux/actions/loader/loaderActions";

const Limits  = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [rows, setRows] = useState<ActivityTypes[]>([]);
  const [transferRows, setTransferRows] = useState<ActivityTypes[]>([]);
  const [apiRes, setApiRes] = useState<GetLimits>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
    5
  );

  const [totalRows, setTotalRows] = useState<number>(0);

  const [dataValue, setDataValue] = useState<number | string>(0);

  const [open, setOpen] = useState<boolean>(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const changePage = (value: number) => {
    setPageNumber(value);
  };

  const limit = (value: number) => {
    setRowsPerPage(value);
  };

  const handleNewTransferLimit = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <AddNewTransferLimit />
          </div>
        ),
      })
    );
  };

  const handleNewCollectionLimit = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <AddNewCollectionLimit />
          </div>
        ),
      })
    );
  };

  const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

  useEffect(() => {
    dispatch(openLoader());
    axios
      .get<GetLimits>(
        `/admin/business/limit?perpage=${rowsPerPage}&page=${pageNumber}`
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
    setTotalRows(Number(apiRes?._metadata.totalcount));
  }, [apiRes]);

  interface Column {
    id: "business_type" | "compliance_status" | "currency" | "min_txn"| "max_txn" | "commulative_daily" ;
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "business_type", label: "Business Tye", minWidth: 100 },
    { id: "compliance_status", label: "Compliance Status", minWidth: 100 },
    { id: "currency", label: "Currency", minWidth: 100 },
    { id: "min_txn", label: "Min.amount/txn", minWidth: 100 },
    { id: "max_txn", label: "Max.amount/txn", minWidth: 100 },
    { id: "commulative_daily", label: "Cumulative daily", minWidth: 100 },
  ];
  const LimitsRowTab = useCallback(
    (
      id: number | string,
      limittype: string,
      status: string,
      currency: string,
      minlimit: string | number,
      maxlimit: string | number,
      cumulativetransactionlimit: string | number
    ) => ({
      business_type: limittype,
      compliance_status: status,
      currency: currency,
      min_txn: minlimit,
      max_txn: maxlimit,
      commulative_daily: cumulativetransactionlimit
    }),
    []
  );
  useEffect(() => {
    const newRowOptions: any[] = [];
    apiRes &&
      apiRes?.businesses?.map((each: any) =>
      (each?.limitsetup?.map((each: any)=> (
        newRowOptions.push(
          LimitsRowTab(
            each?.initiatedby,
            each.limittype,
            each?.status,
            each?.currency,
            each?.minlimit,
            each?.maxlimit,
            each?.cumulativetransactionlimit
            )
            ))
          )));
        setRows(newRowOptions);
      }, [apiRes, LimitsRowTab]);
    

  interface Column2 {
    id: "transfer_currency" | "fee";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns2: Column2[] = [
    { id: "transfer_currency", label: "Country", minWidth: 100 },
    { id: "fee", label: "Fee", minWidth: 100 },
  ];
  const TransferLimitsRowTab = useCallback(
    (id: number | string, transfer_currency: string, fee: string) => ({
      transfer_currency: transfer_currency,
      fee: fee,
    }),
    []
  );

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
              label="Collection limits"
              style={{
                margin: "0 1rem",
                textTransform: "capitalize",
                color: value === 0 ? "#27AE60" : "#333333",
              }}
            />
            <Tab
              label="Transfer limits"
              style={{
                textTransform: "capitalize",
                margin: "0 1rem",
                color: value === 1 ? "#27AE60" : "#333333",
              }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderLeft}>
              <p className={styles.header}>
                {apiRes?._metadata?.totalcount} collection limits
              </p>
            </div>
            <div className={styles.tableHeaderRight}>
              <div className={styles.buttonDiv}>
                <button className={styles.buttonAdd} onClick={handleNewCollectionLimit}>
                  <p>Add a new limit</p>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.m1}>
          {apiRes?.businesses.length && (
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
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderLeft}>
              <p className={styles.header}>
                {apiRes?._metadata?.totalcount} transfer limits
              </p>
            </div>
            <div className={styles.tableHeaderRight}>
              <div className={styles.buttonDiv}>
                <button className={styles.buttonAdd} onClick={handleNewTransferLimit}>
                  <p>Add a new limit</p>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.m1}>
          {apiRes?.businesses.length && (
            <OperantTable
              columns={columns}
              rows={transferRows}
              totalRows={totalRows}
              changePage={changePage}
              limit={limit}
              setDataValue={setDataValue}
              setOpen={setOpen}
            />
          )}
          </div>
        </TabPanel>
      </Box>
    </div>
  );
};

export default Limits;
