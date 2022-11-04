import React, { useEffect, useState, useCallback } from "react";
import NavBar from "../../components/navbar/NavBar";
import styles from "./Settlement.module.scss";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Divider, Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import FlagTransaction from "../../components/transactionsModals/FlagTransaction";
import { useHistory, useParams } from "react-router-dom";
import { GetSettlements } from "../../types/UserTableTypes";
import { format, parseISO } from "date-fns";
import { TransactionManagementApiTypes } from "../../types/UserTableTypes";
import axios from "axios";
import ActivityTypes from "../../types/ActivityTypes";
import OperantTable from "../../components/table/OperantTable";
import UnflagTransactions from "../../components/transactionsModals/UnflagTransactions";

const ReviewedSettlementDetails = () => {

  interface ParamTypes {
    uniqueId: string;
  }
  
  const { uniqueId } = useParams<ParamTypes>();

  const flagData = {
    title: "Flag Settlement",
    question: "Why are you flagging this settlement?",
    buttonText: "Flag Settlement",
  };

  const markData = {
    title: "Review Settlement",
    body: "Are sure you want to mark this settlement as reviewed",
    question: "",
    buttonText: "Mark Settlement as reviewed",
  };

  const [apiRes, setApiRes] = useState<GetSettlements>();
  const [apiTrans, setApiTrans] = useState<TransactionManagementApiTypes>();
  const [rows, setRows] = useState<ActivityTypes[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
    5
  );
  const [pageNumber, setPageNumber] = useState<number>(1);
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

  const { access_token } = useSelector((state) => state?.authPayReducer?.auth);


  useEffect(() => {
    axios
      .get<TransactionManagementApiTypes>(
        `/admin/transactions?`
      )
      .then((res) => {
        setApiTrans(res.data);
      
      });
  }, []);
  const dispatch = useDispatch();

  const handleBackToSettlements = () => {
    history.push("/settlements");
  };

  const markSettlementHandler = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <UnflagTransactions data={markData} />
          </div>
        ),
      })
    );
  };

  const flagTransactionHandler = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <FlagTransaction data={flagData} />
          </div>
        ),
      })
    );
  };

  interface Column {
    id:
      | "amount"
      | "status"
      | "customer_id"
      | "business_name"
      | "transaction_ref"
      | "date";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "amount", label: "Amount", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "customer_id", label: "Customer ID", minWidth: 100 },
    { id: "business_name", label: "Subaccount Share", minWidth: 100 },
    { id: "transaction_ref", label: "Payment Type", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 100 },
  ];
  const TransactionRowTab = useCallback(
    (
      id: number | string,
      code: string,
      amount: string | number,
      email: string | number,
      tradingname: string,
      linkingreference: string | number,
      added: string,
      reference: string | number
    ) => ({
      amount: amount,
      status: (
        <span
          className={styles.tableSpan}
          style={{
            backgroundColor:
              (code === "00" && "#27AE60") ||
              (code !== "00" && code !== "09" && "#F2C94C") ||
              (code === "09" && "#EB5757") ||
              "rgba(169, 170, 171, 0.22)",
            color:
              (code === "00" && "#FFFFFF") ||
              (code === "09" && "#FFFFFF") ||
              (code !== "09" && "#333333") ||
              "#002841",
          }}
        >
          {(code === "00" && "Successful") ||
            (code === "09" && "Failed") ||
            "Pending"}
        </span>
      ),
      customer_id: email,
      business_name: tradingname,
      transaction_ref: linkingreference,
      date: `${format(parseISO(added), "dd MMM yyyy")}`,
      reference: reference,
      // action: <MoreHorizIcon/>
    }),
    []
  );
  useEffect(() => {
    const newRowOptions: any[] = [];
    apiTrans &&
      apiTrans?.transactions.map((each: any) =>
        newRowOptions.push(
          TransactionRowTab(
            each.transaction.linkingreference,
            each.code,
            each.order.currency + parseInt(each.order.amount),
            each.source.customer.email,
            each.business.tradingname,
            each.transaction.linkingreference,
            each.transaction.added,
            each.transaction.reference
          )
        )
      );
    setRows(newRowOptions);
  }, [apiTrans, TransactionRowTab]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="" />

      {/* <h1>Balance</h1> */}

      <div className={styles.m1}>
        <span className={styles.back} onClick={handleBackToSettlements}>
          <ArrowLeftIcon /> Back to reviewed settlements
        </span>

        <Box sx={{ flexGrow: 1, margin: "1rem" }}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12} lg={6}>
              <div>
                <span className={styles.headerAmount}>
                  {/* NGN {apiRes?.settlements[0]?.amount} */}
                  NGN 50,000
                </span>
                <button className={styles.buttonSuccessful}>Live</button>
                <button className={styles.buttonPending}>Pending approval</button>
              </div>
            </Grid>
            <Grid item md={6} xs={12} lg={6}>
              <div className={styles.headerFlexRight}>
                <button
                  className={styles.buttonflag}
                  onClick={flagTransactionHandler}
                >
                  Flag Settlement
                </button>
                <button
                  className={styles.buttongreen}
                  onClick={markSettlementHandler}
                >
                  Mark as Reviewed
                </button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Divider />

      <div className={styles.settlementDetails}>
        <div>
          <Box sx={{ flexGrow: 1, margin: "0 1rem 1rem 2rem" }}>
            <Grid container spacing={1}>
              <Grid item md={2} xs={6} lg={2}>
                <p className={styles.header}>Transaction date</p>
                <p className={styles.detail}>
                  {/* {apiRes?.settlements[0]?.initiatedat} */}Aug 13 2020
                  {/* <span className={styles.header}>2:21 PM</span> */}
                </p>
              </Grid>

              <Grid item md={2} xs={6} lg={2}>
                <p className={styles.header}>Settlement date</p>
                <p className={styles.detail}>
                  {/* {apiRes?.settlements[0]?.initiatedat} */}
                  Aug 13 2020
                </p>
              </Grid>

              <Grid item md={3} xs={6} lg={3}>
                <p className={styles.header}>Merchant ID</p>
                <p className={styles.detail}>
                  {/* {apiRes?.settlements[0]?.settlementid} */}
                  0912345
                </p>
              </Grid>

              <Grid item md={2} xs={6} lg={2}>
                <p className={styles.header}>Merchant Name</p>
                <p className={styles.detail}>
                  {/* {apiRes?.settlements[0]?.tradingname} */}
                  James Haliday
                </p>
              </Grid>
              <Grid item md={2} xs={6} lg={2}>
                <p className={styles.header}>Total transaction amount</p>
                <p className={styles.detail}>
                  {/* {apiRes?.settlements[0]?.amount} */}
                  NGN 50,000
                </p>
              </Grid>
            </Grid>

            <div className={styles.mt1}>
              <Grid container spacing={1}>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Total fee</p>
                  <p className={styles.detail}>
                    {/* <span className={styles.header}>2:21 PM</span> */}
                    NGN 45
                  </p>
                </Grid>

                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Settlement type</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.settlements[0]?.settlementaccounttype} */}
                    Bank account
                  </p>
                </Grid>

                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}>Settlement bank</p>
                  <p className={styles.detail}>Access Bank</p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Bank Code</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.settlements[0]?.settlementbankcode} */}
                    0912345
                  </p>
                </Grid>

                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Account number</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.settlements[0]?.settlementaccountnumber} */}
                    1234567819
                  </p>
                </Grid>
              </Grid>
            </div>
          </Box>
        </div>
      </div>

      <Divider />

      <div>
        <div className={styles.m1}>
          <h4>{apiRes?._metadata?.totalcount} Transactions</h4>
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
      </div>
    </div>
  );
};

export default ReviewedSettlementDetails;
