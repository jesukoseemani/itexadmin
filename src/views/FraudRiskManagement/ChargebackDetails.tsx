import React, { useEffect, useState } from "react";
import styles from "./FraudRiskManagement.module.scss";
import NavBar from "../../components/navbar/NavBar";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Divider, Grid, Box } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import axios from "axios";

interface dataTypes {
  id: string;
  acquirer: string;
  merchant_name: string;
  rrn: string;
  transaction_reference: string;
  amount: string;
  account: string;
}

const ChargebackDetails = () => {
  const location = useLocation();

  interface ParamTypes {
    dataValue: string;
  }
  const { dataValue } = useParams<ParamTypes>();

  const history = useHistory();

  const [apiRes, setApiRes] = useState<dataTypes[]>();

  const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

  useEffect(() => {
    axios
			.get<dataTypes[]>(`/axiosCall/fraudMgt_chargeback.json`, { baseURL: '' })
			.then((res) => {
				setApiRes(res.data);
			});
  }, []);

  const dispatch = useDispatch();

  const handleBackToChargeback= () => {
    history.push("/fraudmgt/chargeback");
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

      <div className={styles.detailsHeader}>
        <span className={styles.back} onClick={handleBackToChargeback}>
          <ArrowLeftIcon /> Back to Chargeback breakdown
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
            
          </Grid>
        </Box>
      </div>
      <Divider />

      <div className={styles.transactionDetails}>
        <div>
          <Box sx={{ flexGrow: 1, margin: "0 1rem 1rem 2rem" }}>
          <h5 className={styles.mbn1}>Chargeback Information</h5>
          <Divider/>
            <div className={styles.mt1}>
              <Grid container spacing={2}>
                <Grid item md={3} xs={6} lg={3}>
                  <div className={styles.inline}>
                    <p className={styles.header}>Transaction RRN</p>
                    <p className={styles.detail}>
                      {/* {apiRes?.rrn} */}
                      09827736andb1234567r
                    </p>
                    <span className={styles.copy}>
                      <ContentCopyIcon fontSize="small" />
                    </span>
                  </div>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Transaction Reference</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0].transaction.added} */}
                    ITEX-ab5673sdej3647s3
                  </p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Card Scheme</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0]?.transaction?.linkingreference} */}
                    Lagos, Nigeria
                  </p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Acquirer</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0]?.business.tradingname} */}
                    Access Bank
                  </p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Merchant ID number</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0]?.order?.currency}{" "}
                    {apiRes?.transactions[0]?.order?.amount} */}
                    ITEX-ab5673sdej3647s3
                  </p>
                </Grid>
              </Grid>
            </div>

            <div className={styles.mt2}>
              <Grid container spacing={2}>
                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}>Merchant name</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0]?.transaction?.linkingreference} */}
                    James Haliday Ventures
                  </p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Authentication mode</p>
                  <p className={styles.detail}>
                 {/* {apiRes?.transactions[0]?.order?.currency}{" "}
                    {apiRes?.transactions[0]?.order?.amount} */}
                    undefined
                  </p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Reason Code</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0]?.order.description} */}
                    092345892
                  </p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Auth code</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0].transaction.paymentmethod} */}
                    092345892
                  </p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Transaction date</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0].transaction.paymentmethod} */}
                    Aug 13, 2020
                  </p>
                </Grid>
              </Grid>
            </div>

            <div className={styles.mt2}>
              <Grid container spacing={1}>
                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}>Card number</p>
                  <p className={styles.detail}>**** **** **** 12384</p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Chargeback date</p>
                  <p className={styles.detail}>
                    {/* {apiRes?.transactions[0]?.order?.amount} */}
                    Aug 13, 2020 
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

export default ChargebackDetails;
