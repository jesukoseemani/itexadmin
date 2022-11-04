import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import styles from "./WalletManagement.module.scss";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Divider, Grid, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useDispatch, useSelector } from "react-redux";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import RefundTransaction from "../../components/transactionsModals/RefundTransaction";
import FlagTransaction from "../../components/transactionsModals/FlagTransaction";
import LogChargeback from "../../components/transactionsModals/LogChargeback";
import { useHistory, useLocation, useParams } from "react-router-dom";
import axios from "axios";

interface dataTypes {
  id: string;
  payment_type: string;
  business_name: string;
  transaction_amount: number;
  transaction_reference: string;
  date: string;
}

const DebitDetails = () => {
  const location = useLocation();

  interface ParamTypes {
    id: string;
  }
  const { id } = useParams<ParamTypes>();

  const data = {
    title: "Flag Transaction",
    question: "Why are you flagging this transaction?",
    buttonText: "Flag Transaction",
  };

  const history = useHistory();

  const [apiRes, setApiRes] = useState<dataTypes[]>();

  const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

  useEffect(() => {
    axios
			.get<dataTypes[]>(`/axiosCall/walletMgt_debit.json`, { baseURL: '' })
			.then((res) => {
				setApiRes(res.data);
			});
  }, []);

  const dispatch = useDispatch();

  const handleBackToTransactions = () => {
    history.push("/walletmgt");
  };

  const refundTransactionHandler = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <RefundTransaction />
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
            <FlagTransaction data={data} />
          </div>
        ),
      })
    );
  };

  const logChargebackHandler = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <LogChargeback />
          </div>
        ),
      })
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <NavBar name="FraudulentTransaction" />

      {/* <h1>Balance</h1> */}

      <div className={styles.transactionDetailsHeader}>
        <span className={styles.back} onClick={handleBackToTransactions}>
          <ArrowLeftIcon /> Back to debits/transfers
        </span>

        <Box sx={{ flexGrow: 1, margin: "1rem" }}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12} lg={6}>
              <div>
                <span className={styles.headerAmount}>
                  {/* {apiRes?.transactions[0]?.order?.currency} {apiRes?.tra} */}
                  NGN 33,876.54
                </span>
                <button className={styles.buttonSuccessful}>Successful</button>
              </div>
            </Grid>
            <Grid item md={6} xs={12} lg={6}>
              <div className={styles.headerFlexRight}>
                <button
                  className={styles.buttongrey}
                  onClick={refundTransactionHandler}
                >
                  Refund transaction
                </button>
                <button
                  className={styles.buttonflag}
                  onClick={flagTransactionHandler}
                >
                  Flag as Fraudulent
                </button>
                <button
                  className={styles.buttongreen}
                  onClick={logChargebackHandler}
                >
                  Log Chargeback
                </button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Divider />

      <div className={styles.transactionDetails}>
        <div>
          <Box sx={{ flexGrow: 1, margin: "0 1rem 1rem 2rem" }}>
            <div className={styles.mt1}>
              <Grid container spacing={1}>
                <Grid item md={3} xs={6} lg={3}>
                  <div className={styles.inline}>
                    <p className={styles.header}>Transaction reference</p>
                    <p className={styles.detail}>
                      {/* {apiRes?.transactions[0]?.transaction?.reference} */}
                      ITEX-abc123456yzx
                    </p>
                    <span className={styles.copy}>
                      <ContentCopyIcon fontSize="small" />
                    </span>
                  </div>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Date</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0].transaction.added} */}
                    Aug 15, 2020
                  </p>
                </Grid>
                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}>Provider reference</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0]?.transaction?.linkingreference} */}
                    ITEX-abc123456yzx
                  </p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Custom reference</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0]?.transaction?.linkingreference} */}
                    ITEX-abc123456yzx
                  </p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Merchant name</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0]?.business.tradingname} */}
                    The Holidays Inc
                  </p>
                </Grid>
              </Grid>
            </div>

            <div className={styles.mt2}>
              <Grid container spacing={1}>
                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}> Transaction Fees</p>
                  <p className={styles.detail}>
                    {/* {" "}
                    {apiRes?.transactions[0]?.order?.currency}{" "}
                    {apiRes?.transactions[0]?.order?.amount} */}
                    NGN 33,876.54
                  </p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Fees charged</p>
                  <p className={styles.detail}>
                    {/* {" "}
                    {apiRes?.transactions[0]?.order?.currency}{" "}
                    {apiRes?.transactions[0]?.order?.amount} */}
                    NGN 33,876.54
                  </p>
                </Grid>
                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}>Beneficiary bank</p>
                  <p className={styles.detail}>Lagos, Nigeria</p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Beneficiary bank code</p>
                  <p className={styles.detail}>Access Bank</p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Beneficiary account number</p>
                  <p className={styles.detail}>00912345678</p>
                </Grid>
              </Grid>
            </div>

            <div className={styles.mt2}>
              <Grid container spacing={1}>
                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}>Initiate by</p>
                  <p className={styles.detail}>James Holiday</p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Approved by</p>
                  <p className={styles.detail}>Segun Boss</p>
                </Grid>
                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}>Debit type</p>
                  <p className={styles.detail}>Lagos, Nigeria</p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Provider</p>
                  <p className={styles.detail}>Access Bank</p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Cost</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0]?.order?.currency}{" "}
                    {apiRes?.transactions[0]?.order?.amount} */}
                    NGN 33,876.54
                  </p>
                </Grid>
              </Grid>
            </div>
          </Box>
        </div>

        <div>
          <Box sx={{ flexGrow: 1, margin: "3rem 1rem 1rem 2rem" }}>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12} lg={4}>
                <p>Transaction timeline</p>
              </Grid>

              <Grid item md={4} xs={12} lg={4}>
                <p>
                  <span className={styles.green}>1 min 05secs </span>
                  <span className={styles.text}>Time spent making payment</span>
                </p>
              </Grid>

              <Grid item md={4} xs={12} lg={4}>
                <p>
                  <span className={styles.error}>1 Error </span>
                  <span className={styles.text}> While making payment</span>
                </p>
              </Grid>
            </Grid>
            <Divider />
          </Box>
        </div>

        <div>
          <Box sx={{ flexGrow: 1, margin: "2rem 1rem 1rem 2rem" }}>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12} lg={4}>
                <p className={styles.inline}>
                  <CheckCircleOutlineIcon fontSize="small" />
                  <p className={styles.ml1}>
                    Payment started <br />
                    <span className={styles.header}></span>
                  </p>
                </p>

                <div className={styles.mt1}>
                  <p className={styles.inline}>
                    <DoneAllRoundedIcon
                      fontSize="small"
                      style={{ color: "#219653" }}
                    />
                    <p className={styles.ml1}>
                      Payment completed <br />
                      <span className={styles.header}></span>
                    </p>
                  </p>
                </div>

                <p className={styles.show}>Show breakdown</p>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default DebitDetails;
