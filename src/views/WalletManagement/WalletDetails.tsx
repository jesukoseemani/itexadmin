import React, { useEffect, useState } from "react";
import styles from "./WalletManagement.module.scss";
import NavBar from "../../components/navbar/NavBar";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Divider, Grid, Box } from "@mui/material";
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

const WalletDetails = () => {
  const location = useLocation();

  interface ParamTypes {
    dataValue: string;
  }
  const { dataValue } = useParams<ParamTypes>();

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
			.get<dataTypes[]>(`/axiosCall/walletMgt_credit.json`, { baseURL: '' })
			.then((res) => {
				setApiRes(res.data);
			});
  }, []);

  const dispatch = useDispatch();

  const handleBackToWallet = () => {
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
        <span className={styles.back} onClick={handleBackToWallet}>
          <ArrowLeftIcon /> Back to Credits
        </span>

        <Box sx={{ flexGrow: 1, margin: "1rem" }}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12} lg={6}>
              <div>
                <span className={styles.headerAmount}>
                  {/* NGN {apiRes?.transactions[0]?.order?.amount} */}
                  NGN 33,876.54
                </span>
                <button className={styles.buttonSuccessful}>Successful</button>
              </div>
            </Grid>
            <Grid item md={6} xs={12} lg={6}>
              <div className={styles.headerFlexRight}>
                <button
                  className={styles.buttonflag}
                  onClick={flagTransactionHandler}
                >
                  Flag as Fraudulent
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
                      {/* {apiRes?.transaction_reference} */}
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
                  <p className={styles.header}>Merchant name</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0]?.business.tradingname} */}
                    The Holidays Inc
                  </p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Transaction fee</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0]?.order?.currency}{" "}
                    {apiRes?.transactions[0]?.order?.amount} */}
                    NGN 7,712
                  </p>
                </Grid>
              </Grid>
            </div>

            <div className={styles.mt2}>
              <Grid container spacing={1}>
                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}>Reference</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0]?.transaction?.linkingreference} */}
                    ITEX-abc123456yzx
                  </p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Fees charged</p>
                  <p className={styles.detail}>
                 {/* {apiRes?.transactions[0]?.order?.currency}{" "}
                    {apiRes?.transactions[0]?.order?.amount} */}
                    NGN 7,712
                  </p>
                </Grid>
                <Grid item md={5} xs={6} lg={5}>
                  <p className={styles.header}>Narration</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0]?.order.description} */}
                    Payment for Bills
                  </p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Payment type</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0].transaction.paymentmethod} */}
                    ITEX-abc123456yzx
                  </p>
                </Grid>
              </Grid>
            </div>

            <div className={styles.mt2}>
              <Grid container spacing={1}>
                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}>Type</p>
                  <p className={styles.detail}>Merchant Refund</p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Cost</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0]?.order?.amount} */}
                    NGN 7,712
                  </p>
                </Grid>
                <Grid item md={5} xs={6} lg={5}>
                  <p className={styles.header}>Income</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0]?.order?.amount} */}
                    NGN 7,712
                  </p>
                </Grid>
              </Grid>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default WalletDetails;
