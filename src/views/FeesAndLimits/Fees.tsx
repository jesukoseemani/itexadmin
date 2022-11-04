import styles from "./FeesAndLimits.module.scss";
import { useState, useEffect, useCallback } from "react";
import ActivityTypes from "../../types/ActivityTypes";
import { useDispatch } from "react-redux";
import OperantTable from "../../components/table/OperantTable";
import { GetFees } from "../../types/UserTableTypes";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import { TabPanel } from "../../components/Tabs/Tabs";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import TransferFees from "./TransferFees";
import AddNewTransferFee from "../../components/feesAndLimitsModals/AddNewTransferFee";
import AddNewCollectionFee from "../../components/feesAndLimitsModals/AddNewCollectionFee";
import {
  closeLoader,
  openLoader,
} from "../../redux/actions/loader/loaderActions";

const Fees = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [rows, setRows] = useState<ActivityTypes[]>([]);
  const [transferRows, setTransferRows] = useState<ActivityTypes[]>([]);
  const [apiRes, setApiRes] = useState<GetFees>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

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

  const handleNewTransferFee = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <AddNewTransferFee />
          </div>
        ),
      })
    );
  };

  const handleNewCollectionFee = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <AddNewCollectionFee />
          </div>
        ),
      })
    );
  };


  useEffect(() => {
    dispatch(openLoader());
    axios
      .get<GetFees>(
        `/admin/provider/fee?perpage=${rowsPerPage}&page=${pageNumber}`
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
    setTotalRows(Number(apiRes?.providers?.length));
  }, [apiRes]);

  interface Column {
    id: "country" | "payment_type" | "currency" | "fee";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "country", label: "Country", minWidth: 100 },
    { id: "payment_type", label: "Payment Type", minWidth: 100 },
    { id: "currency", label: "Currency", minWidth: 100 },
    { id: "fee", label: "Fee", minWidth: 100 },
  ];
  const FeeRowTab = useCallback(
    (
      id: number | string,
      industrycategory: string,
      transactiontype: string | number,
      currency: string,
      value: string | number
    ) => ({
      country: industrycategory,
      payment_type: transactiontype,
      currency: currency,
      fee: value,
    }),
    []
  );
  useEffect(() => {
    const newRowOptions: any[] = [];
    apiRes &&
      apiRes?.providers?.map((each: any) =>
        each?.feesetup?.map((each: any) =>
          newRowOptions.push(
            FeeRowTab(
              each.providercode,
              each.industrycategory,
              each.transactiontype,
              each.fees[0]?.currency,
              each.fees[0]?.value
            )
          )
        )
      );
    setRows(newRowOptions);
  }, [apiRes, FeeRowTab]);

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
              label="Collection fees"
              style={{
                margin: "0 1rem",
                textTransform: "capitalize",
                color: value === 0 ? "#27AE60" : "#333333",
              }}
            />
            <Tab
              label="Transfer fees"
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
                {apiRes?._metadata?.totalcount} collection fees
              </p>
            </div>
            <div className={styles.tableHeaderRight}>
              <div className={styles.buttonDiv}>
                <button
                  className={styles.buttonAdd}
                  onClick={handleNewCollectionFee}
                >
                  <p>Add a new fee</p>
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
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderLeft}>
              <p className={styles.header}>
                {apiRes?._metadata?.totalcount} transfer fees
              </p>
            </div>
            <div className={styles.tableHeaderRight}>
              <div className={styles.buttonDiv}>
                <button
                  className={styles.buttonAdd}
                  onClick={handleNewTransferFee}
                >
                  <p>Add a new fee</p>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.m1}>
            <TransferFees />
          </div>
        </TabPanel>
      </Box>
    </div>
  );
};

export default Fees;
