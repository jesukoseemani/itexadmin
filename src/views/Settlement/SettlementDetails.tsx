import React, { useEffect, useState, useCallback } from "react";
import NavBar from "../../components/navbar/NavBar";
import styles from "./Settlement.module.scss";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Divider, Grid, Box } from "@mui/material";
import { useDispatch } from "react-redux";
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
import {
  closeLoader,
  openLoader,
} from "../../redux/actions/loader/loaderActions";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import {
  ColumnSettlementTransactionModule,
  SettlementModuleData,
  SettlementTransactionModuleData,
} from "../../types/SettlementTypes";
import TableHeader from "../../components/TableHeader/TableHeader";
import PaginationTable from "../../components/paginatedTable/pagination-table";
import { ExportToCsv } from "export-to-csv";
import { CSVLink } from "react-csv";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddSingleSettlement from "../../components/settlement/AddSingleSettlement";
import BulkSettlement from "../../components/settlement/BulkSettlement";
import useDownload from '../../interfaces/Download';

const SettlementDetails = () => {
  interface ParamTypes {
    id: string;
  }

  const { id } = useParams<ParamTypes>();

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
  const [contentAction, setContentAction] = useState<any>({});
  const [value, setValue] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [previousPage, setPreviousPage] = useState<number | null>(null);
  const [bearer, setBearer] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [tableRow, setTableRow] = useState<any[]>();

  const [download, setDownload] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);

  const [settlement, setSettlement] = useState<any>();
  const [transaction, setTransactions] = useState<any>();

  const history = useHistory();
  const changePage = (value: number) => {
    setPageNumber(value);
  };

  // add settlement
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const limit = (value: number) => {
    setRowsPerPage(value);
  };

  // useEffect(() => {
  // 	axios
  // 		.get<GetSettlements>(
  // 			`/settlement/upload?uploaduniquereference=${id}`
  // 		)
  // 		.then((res) => {
  // 			setApiRes(res.data);
  // 			// dispatch(saveOpen(false));
  // 		});
  // }, [rowsPerPage, pageNumber]);

  const gettransactionlist = async () => {
    dispatch(openLoader());

    try {
      const { data } = await axios.get(
        `/v1/settlement/${id}/transactions?perpage=${rowsPerPage}&page=${pageNumber}`
      );
      console.log(data, "lists");
      console.log(id, "id");
      setTransactions(data);
    } catch (err: any) {
      dispatch(closeLoader());
      const { message } = err?.response.data;
      dispatch(
        dispatch(
          openToastAndSetContent({
            toastContent: message,
            toastStyles: {
              backgroundColor: "red",
            },
          })
        )
      );
    } finally {
      dispatch(closeLoader());
    }
  };
  // useEffect(() => {
  // }, [id]);
  console.log(transaction, "transaction");

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

  // settlement by id
  const getSettlementbyId = async () => {
    dispatch(openLoader());
    try {
      const { data } = await axios.get<SettlementModuleData>(
        `/v1/settlement/${id}`
      );
      setSettlement(data);
      // console.log(data, "settlementid")
    } catch (err: any) {
      dispatch(closeLoader());
      const { message } = err?.response.data;
      dispatch(
        dispatch(
          openToastAndSetContent({
            toastContent: message,
            toastStyles: {
              backgroundColor: "red",
            },
          })
        )
      );
    }
  };

  useEffect(() => {
    getSettlementbyId();
  }, [id]);

  useEffect(() => {
    gettransactionlist();
  }, [bearer, value, pageNumber, id, rowsPerPage]);

  useEffect(() => {
    setPageNumber(settlement?._metadata?.page || 1);
  }, [settlement]);

  useEffect(() => {
    Object.values(contentAction).length > 0 &&
      history.push(`/settlement/${contentAction?.settlement_id}`);
  }, [contentAction]);

  const settlementTrans = () => {
    const tempArr: SettlementTransactionModuleData[] = [];
    transaction?.transactions
      ?.slice(0)
      .reverse()
      .forEach((transaction: any, index: number) => {
        return tempArr.push({
          amount: transaction?.amount,
          currency: transaction?.currency,
          linkingreference: transaction?.linkingreference,
          chargetype: transaction?.chargetype,
          status: transaction?.responsemessage,
          merchantId: transaction?.merchantaccountid,
          date: transaction?.transactiontime,
        });
      });
    return tempArr;
  };

  useEffect(() => {
    setTableRow(settlementTrans());
  }, [settlement?.settlements]);


  // download

  const { calDownload } = useDownload(
    { url: `https://staging.itex-pay.com/ipgadmin/api/v1/settlement/${contentAction?.settlement_id}/transactions/download`, filename: 'transaction.csv' }
  );

  const handleDownload = async () => {
    try {
      dispatch(openLoader());
      await calDownload();
      dispatch(closeLoader());
    } catch (error) {
      dispatch(closeLoader());
    }
  };


  const showSingleSettlement = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          width: 400,
          // height: 500,
          borderRadius: "20px",
        },
        modalContent: (
          <div className={styles.modalDiv}>
            <AddSingleSettlement id={id} />
          </div>
        ),
      })
    );
    handleClose();
  };
  const showBulkSettlement = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          width: 400,
          // height: 500,
          borderRadius: "20px",
        },
        modalContent: (
          <div className={styles.modalDiv}>
            {/* <BulkSettlement /> */}
          </div>
        ),
      })
    );
    handleClose();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="" />

      {/* <h1>Balance</h1> */}

      <div className={styles.m1}>
        <span className={styles.back} onClick={handleBackToSettlements}>
          <ArrowLeftIcon /> Back to due settlements
        </span>

        <button className={styles.buttongreen} onClick={handleClick}>
          Add settlement
        </button>
      </div>
      <Divider />

      <div className={styles.settlementDetails}>
        <div>
          <Box sx={{ flexGrow: 1, margin: "0 1rem 1rem 2rem" }}>
            <Grid container spacing={1}>
              <Grid item md={2} xs={6} lg={2}>
                <p className={styles.header}>Transaction date</p>
                <p className={styles.detail}>
                  {/* {apiRes?.settlements[0]?.initiatedat} */}
                  {settlement?.settlement?.startedat}
                </p>
              </Grid>

              <Grid item md={2} xs={6} lg={2}>
                <p className={styles.header}>Settlement date</p>
                <p className={styles.detail}>
                  {/* {apiRes?.settlements[0]?.initiatedat} */}
                  {settlement?.settlement?.settlementdate}
                </p>
              </Grid>

              <Grid item md={3} xs={6} lg={3}>
                <p className={styles.header}>Merchant ID</p>
                <p className={styles.detail}>
                  {/* {apiRes?.settlements[0]?.settlementid} */}
                  {settlement?.settlement?.settlementid}
                </p>
              </Grid>

              <Grid item md={2} xs={6} lg={2}>
                <p className={styles.header}>Merchant email</p>
                <p className={styles.detail}>
                  {/* {apiRes?.settlements[0]?.tradingname} */}
                  {settlement?.settlement?.merchantaccount?.businessemail}
                </p>
              </Grid>
              <Grid item md={2} xs={6} lg={2}>
                <p className={styles.header}>Merchant phone</p>
                <p className={styles.detail}>
                  {/* {apiRes?.settlements[0]?.amount} */}
                  {settlement?.settlement?.merchantaccount?.businessphone}
                </p>
              </Grid>
            </Grid>

            <div className={styles.mt1}>
              <Grid container spacing={1}>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Total fee</p>
                  <p className={styles.detail}>
                    {/* <span className={styles.header}>2:21 PM</span> */}
                    NGN {settlement?.settlement?.chargeamount}
                  </p>
                </Grid>

                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Settlement type</p>
                  <p className={styles.detail}>
                    {settlement?.settlement?.settlementaccounttype}
                  </p>
                </Grid>

                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}>Settlement Account name</p>
                  <p className={styles.detail}>
                    {settlement?.settlement?.settlementaccountname}
                  </p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Bank Code</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.settlements[0]?.settlementbankcode} */}
                    {settlement?.settlement?.settlementbankcode}
                  </p>
                </Grid>

                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Account number</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.settlements[0]?.settlementaccountnumber} */}
                    {settlement?.settlement?.settlementaccountnumber}
                  </p>
                </Grid>
              </Grid>
            </div>
          </Box>
        </div>
      </div>

      <Divider />

      <div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={showSingleSettlement}>Single settlement</MenuItem>
          <MenuItem onClick={showBulkSettlement}>Bulk settlement</MenuItem>
        </Menu>
      </div>
      <Box mt={10}>
        <div className={styles.m1}>
          <h4>{transaction?._metadata?.totalcount} Transactions</h4>
          <TableHeader
            pageName="Transactions"
            data={transaction?.transactions}
            dataLength={transaction?._metadata.totalcount}
            value={value}
            setValue={setValue}
            dropdown={dropdown}
            setDropdown={setDropdown}
            placeHolder="Search"
            handleClick={handleDownload}
          />
          {/* <CSVDownload data={download} /> */}

          <PaginationTable
            data={tableRow ? tableRow : []}
            columns={
              ColumnSettlementTransactionModule
                ? ColumnSettlementTransactionModule
                : []
            }
            emptyPlaceHolder={
              settlement?._metadata?.totalcount == 0
                ? "You currently do not have any data"
                : "Loading..."
            }
            value={value}
            total={transaction?._metadata.totalcount}
            totalPage={transaction?._metadata.pagecount}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            nextPage={nextPage}
            setNextPage={setNextPage}
            previousPage={previousPage}
            setPreviousPage={setPreviousPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            clickAction={true}
            setContentAction={setContentAction}
          />
        </div>
      </Box>
    </div>
  );
};

export default SettlementDetails;
