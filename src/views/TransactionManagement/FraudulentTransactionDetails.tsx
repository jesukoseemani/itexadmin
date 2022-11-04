import React from "react";
import NavBar from "../../components/navbar/NavBar";
import styles from "./TransactionManagement.module.scss";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Divider, Grid, Box } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useDispatch } from "react-redux";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import RefundTransaction from "../../components/transactionsModals/RefundTransaction";
import UnflagTransactions from "../../components/transactionsModals/UnflagTransactions";
import LogChargeback from "../../components/transactionsModals/LogChargeback";

const data = {
  title: "Unflag transaction",
  body: "You are about to unflag this transaction as fraudulent. The merchant will be settled for this transaction once you unflg this transaction",
  question: "Do you want to proceed?",
  buttonText: "Unflag Transaction",
};

const FraudulentTransactionDetails = () => {
  const dispatch = useDispatch();

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

  const unflagTransactionHandler = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <UnflagTransactions data={data} />
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
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="FraudulentTransaction" />

      {/* <h1>Balance</h1> */}

      <div className={styles.transactionDetailsHeader}>
        <span className={styles.back}>
          <ArrowLeftIcon /> Back to transactions
        </span>

        <Box sx={{ flexGrow: 1, margin: "1rem" }}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12} lg={6}>
              <div className={styles.headerFlexLeft}>
                <span className={styles.headerAmount}>NGN 33,983.92</span>

                <button className={styles.buttonSuccessful}>Successful</button>
                <button className={styles.buttonFraudulent}>
                  Flagged as Fruadulent
                </button>
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
                  className={styles.buttongrey}
                  onClick={unflagTransactionHandler}
                >
                  Unflag Transaction
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
          <Box sx={{ flexGrow: 1, margin: "0 1rem 1rem 1rem" }}>
            <Grid container spacing={3}>
              <Grid item md={2} xs={6} lg={2}>
                <p className={styles.header}>Date / Time</p>
                <p className={styles.detail}>
                  Aug 13 2020 <span className={styles.header}>2:21 PM</span>
                </p>
              </Grid>
              <hr className={styles.dividerClass} />
              <Grid item md={2} xs={6} lg={2}>
                <p className={styles.header}>Customer</p>
                <p className={styles.detail}>thejames@email.com</p>
              </Grid>
              <hr className={styles.dividerClass} />
              <Grid item md={2} xs={6} lg={2}>
                <p className={styles.header}>Card type</p>
                <p className={styles.detail}>VISA</p>
              </Grid>
              <hr className={styles.dividerClass} />
              <Grid item md={2} xs={6} lg={2}>
                <p className={styles.header}>Card number</p>
                <p className={styles.detail}>**** **** **** 12384</p>
              </Grid>
              <Grid item md={3} xs={6} lg={3}>
                <span className={styles.blacklist}>
                  Blacklist customer <BlockIcon fontSize="small" />
                </span>
              </Grid>
            </Grid>
          </Box>
        </div>

        <div>
          <Box sx={{ flexGrow: 1, margin: "0 1rem 1rem 1rem" }}>
            <h4 className={styles.gridHeader}>Payment information</h4>
            <Divider />
            <div className={styles.mt1}>
              <Grid container spacing={3}>
                <Grid item md={3} xs={6} lg={3}>
                  <div className={styles.inline}>
                    <p className={styles.header}>Payment reference</p>
                    <p className={styles.detail}>ITEX-ab95cf961f454669a4</p>
                    <span className={styles.copy}>
                      <ContentCopyIcon fontSize="small" />
                    </span>
                  </div>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Transaction Fee</p>
                  <p className={styles.detail}>NGN 7,748.12</p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Country/Region</p>
                  <p className={styles.detail}>Lagos, Nigeria</p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Bank name</p>
                  <p className={styles.detail}>Access Bank</p>
                </Grid>
                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}>ITEX Reference</p>
                  <p className={styles.detail}>ITEX-ab95cf961f454669a4</p>
                </Grid>
              </Grid>
            </div>

            <div className={styles.mt2}>
              <Grid container spacing={3}>
                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}>Merchant ID</p>
                  <p className={styles.detail}>098765</p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Provider</p>
                  <p className={styles.detail}>NGN 7,748.12</p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Payment location</p>
                  <p className={styles.detail}>Local transaction</p>
                </Grid>
                <Grid item md={5} xs={6} lg={5}>
                  <p className={styles.header}>ITEX Reference</p>
                  <p className={styles.detail}>ITEX-ab95cf961f454669a4</p>
                </Grid>
              </Grid>
            </div>
          </Box>
        </div>

        <div>
          <Box sx={{ flexGrow: 1, margin: "0 1rem 1rem 1rem" }}>
            <h4 className={styles.gridHeader}>Device information</h4>
            <Divider />
            <div className={styles.mt1}>
              <Grid container spacing={3}>
                <Grid item md={4} xs={12} lg={4}>
                  <p className={styles.header}>Device fingerprint</p>
                  <p className={styles.detail}>A546c4ec42df8cd798b0de3121fc</p>
                </Grid>
                <Grid item md={2} xs={12} lg={2}>
                  <p className={styles.header}>IP Address</p>
                  <p className={styles.detail}>197.237.180.70</p>
                </Grid>
              </Grid>
            </div>
          </Box>
        </div>

        <div>
          <Box sx={{ flexGrow: 1, margin: "3rem 1rem 1rem 1rem" }}>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12} lg={4}>
                <p>Transaction timeline</p>
              </Grid>

              <Grid item md={4} xs={12} lg={4}>
                <p>
                  <span className={styles.green}>1 min 05secs </span>
                  <span className={styles.text}>
                    {" "}
                    Time spent making payment
                  </span>
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
          <Box sx={{ flexGrow: 1, margin: "2rem 1rem 1rem 1rem" }}>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12} lg={4}>
                <p className={styles.inline}>
                  <CheckCircleOutlineIcon fontSize="small" />
                  <p className={styles.ml1}>
                    Payment started <br /> Aug 13 2020
                    <span className={styles.header}>2:21 PM</span>
                  </p>
                </p>

                <div className={styles.mt1}>
                  <p className={styles.inline}>
                    <DoneAllRoundedIcon
                      fontSize="small"
                      style={{ color: "#219653" }}
                    />
                    <p className={styles.ml1}>
                      Payment completed <br /> Aug 13 2020
                      <span className={styles.header}>2:21 PM</span>
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

export default FraudulentTransactionDetails;
