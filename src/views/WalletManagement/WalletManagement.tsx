import styles from "./WalletManagement.module.scss";
import { useState, useEffect, useCallback } from "react";
import ActivityTypes from "../../types/ActivityTypes";
import { Provider, useDispatch, useSelector } from "react-redux";
import OperantTable from "../../components/table/OperantTable";
import { TransactionManagementApiTypes } from "../../types/UserTableTypes";
import { format, parseISO } from "date-fns";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import { TabPanel } from "../../components/Tabs/Tabs";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import { useHistory } from "react-router-dom";
import { Divider, Grid } from "@mui/material";
import ReuseableModal from "../../components/transactionsModals/ReusableModal";
import CreditSummary from "./CreditSummary";
import Debit from "./Debit";
import ProviderSummary from "./ProviderSummary";

interface dataTypes {
  id: string;
  payment_type: string;
  business_name: string;
  transaction_amount: number;
  transaction_reference: string;
  date: string;
}

const WalletManagement = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [rows, setRows] = useState<ActivityTypes[]>([]);
  const [apiRes, setApiRes] = useState<dataTypes[]>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
    10
  );

  const [totalRows, setTotalRows] = useState<number>(0);

  const [dataValue, setDataValue] = useState<number | string>(0);

  const [open, setOpen] = useState<boolean>(false);

  const history = useHistory();

  const changePage = (value: number) => {
    setPageNumber(value);
  };

  const limit = (value: number) => {
    setRowsPerPage(value);
  };

  useEffect(() => {
    if (open) history.push(`/walletMgt/${dataValue}`);
  }, [dataValue, open]);

  const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

  useEffect(() => {
    axios
			.get<dataTypes[]>(`/axiosCall/walletMgt_credit.json`, { baseURL: '' })
			.then((res) => {
				setApiRes(res.data);
			});
  }, []);

  useEffect(() => {
    setTotalRows(Number(apiRes?.length));
  }, [apiRes, rows]);

  interface Column {
    id:
      | "id"
      | "payment_type"
      | "business_name"
      | "amount"
      | "reference"
      | "date";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "payment_type", label: "Payment type", minWidth: 100 },
    { id: "business_name", label: "Business name", minWidth: 100 },
    { id: "amount", label: "Transaction amount", minWidth: 100 },
    { id: "reference", label: "Transaction Reference", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 100 },
  ];
  const TransactionRowTab = useCallback(
    (
      id: number | string,
      payment_type: string,
      business_name: string,
      transaction_amount: string | number,
      transaction_reference: string | number,
      date: string | number
    ) => ({
      id: id,
      amount: transaction_amount,
      payment_type: payment_type,
      business_name: business_name,
      reference: transaction_reference,
      date: date,
    }),
    []
  );
  useEffect(() => {
    const newRowOptions: any[] = [];
    apiRes &&
      apiRes?.map((each: any) =>
        newRowOptions.push(
          TransactionRowTab(
            each.id,
            each.payment_type,
            each.business_name,
            each.transaction_amount,
            each.transaction_reference,
            each.date
          )
        )
      );
    setRows(newRowOptions);
  }, [apiRes, TransactionRowTab]);

  const dispatch = useDispatch();

  const dataFunding = {
    title: "Funding GL",
    credit: "NGN 2,876,345,678",
    debit: "NGN10.0",
    buttonText: "Close",
  };

  const dataRefund = {
    title: "Refund GL",
    credit: "NGN 2,876,345,678",
    debit: "NGN10.0",
    buttonText: "Close",
  };

  const dataChargeback = {
    title: "Chargeback GL",
    credit: "NGN 2,876,345,678",
    debit: "NGN10.0",
    buttonText: "Close",
  };

  const handleFundingModal = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <ReuseableModal data={dataFunding} />
          </div>
        ),
      })
    );
  };

  const handleRefundModal = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <ReuseableModal data={dataRefund} />
          </div>
        ),
      })
    );
  };

  const handleChargebackModal = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <ReuseableModal data={dataChargeback} />
          </div>
        ),
      })
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="Transaction Management" />

      <div>
        <Box sx={{ flexGrow: 1, margin: "0 1rem 0 2rem" }}>
          <h4 className={styles.header}>Compliance stats</h4>
          <Divider />
        </Box>
      </div>
      <div>
        <Box sx={{ flexGrow: 1, margin: "1rem 1rem 1rem 2rem" }}>
          <Grid container spacing={3}>
            <Grid item md={2} xs={12} lg={2}>
              <p className={styles.header}>Funding</p>
              <p className={styles.detail}>NGN 50,000,000</p>
              <p className={styles.sub} onClick={handleFundingModal}>
                See breakdown
              </p>
            </Grid>
            <hr className={styles.dividerClass} />
            <Grid item md={2} xs={12} lg={2}>
              <p className={styles.header}>Refund</p>
              <p className={styles.detail}>NGN 50,000,000</p>
              <p className={styles.sub} onClick={handleRefundModal}>
                See breakdown
              </p>
            </Grid>
            <hr className={styles.dividerClass} />
            <Grid item md={2} xs={12} lg={2}>
              <p className={styles.header}>Chargeback</p>
              <p className={styles.detail}>NGN 50,000,000</p>
              <p className={styles.sub} onClick={handleChargebackModal}>
                See breakdown
              </p>
            </Grid>
            <hr className={styles.dividerClass} />
            <Grid item md={3} xs={12} lg={3}>
              <p className={styles.header}>Rolling Reserve</p>
              <p className={styles.detail}>NGN 50,000,000</p>
            </Grid>
          </Grid>
        </Box>
      </div>
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
              label="Credit"
              style={{
                margin: "0 1rem",
                textTransform: "capitalize",
                color: value === 0 ? "#27AE60" : "#333333",
              }}
            />
            <Tab
              label="Credit Summary"
              style={{
                textTransform: "capitalize",
                margin: "0 1rem",
                color: value === 1 ? "#27AE60" : "#333333",
              }}
            />
            <Tab
              label="Provider Summary"
              style={{
                margin: "0 1rem",
                textTransform: "capitalize",
                color: value === 2 ? "#27AE60" : "#333333",
              }}
            />
            <Tab
              label="Debt / Transfer"
              style={{
                textTransform: "capitalize",
                margin: "0 1rem",
                color: value === 3 ? "#27AE60" : "#333333",
              }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderLeft}>
              <p className={styles.titleHead}>{apiRes?.length} businesses</p>
            </div>
            <div className={styles.tableHeaderRight}>
              <div className={styles.buttonDiv}>
                <button className={styles.button1}>
                  <span className={styles.buttonSpan}>
                    All Transactions
                    <ArrowDropDownIcon />
                  </span>
                </button>

                <button className={styles.button2}>
                  <p className={styles.buttonSpan}>
                    Download
                    <span className={styles.mlhalf}>
                      <CloudDownloadIcon />
                    </span>
                  </p>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.m1}>
            <OperantTable
              columns={columns}
              rows={rows}
              totalRows={totalRows}
              changePage={changePage}
              limit={limit}
              setDataValue={setDataValue}
              setOpen={setOpen}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CreditSummary />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <ProviderSummary />
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Debit />
        </TabPanel>
      </Box>
    </div>
  );
};

export default WalletManagement;
