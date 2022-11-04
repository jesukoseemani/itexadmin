import React, { useEffect, useState } from "react";
import styles from "./Modals.module.scss";
import * as Yup from "yup";
import { PendingProviderApiTypes } from "../../types/UserTableTypes";
import {
  Grid,
  Divider,
} from "@material-ui/core";
import axios from "axios";

const ReconciliationsModal = ({
  dataValue,
  open,
  setOpen,
}: {
  dataValue: string | number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const validate = Yup.object({
    providerName: Yup.string().required("Required"),
    providerShortName: Yup.string().required("Required"),
    currency: Yup.string().required("Required"),
    transactionCost: Yup.string().required("Required"),
  });

  const [apiRes, setApiRes] = useState<PendingProviderApiTypes>();

  const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
    5
  );


  useEffect(() => {
    axios
      .get<PendingProviderApiTypes>(
        `/admin/provider/pending?actionid=${dataValue}`
      )
      .then((res) => {
        setApiRes(res.data);
        setOpen(false);
      });
  }, []);

  return (
    <div className={styles.reconciliationContainer}>
      <div className={styles.modalColumn}>
        <div className={styles.modalHeader}>
          <div>
            <span>Settlement Transaction details</span>
          </div>
        </div>
        <Divider />
        <div>
          <div className={styles.modalBody}>
            <Grid container spacing={2}>
              <Grid item md={3} xs={6} lg={3}>
                <div>
                  <p className={styles.header}>Transaction ID</p>
                  <p className={styles.detail}>9087654</p>
                </div>
              </Grid>
              <Grid item md={2} xs={6} lg={2}>
                <p className={styles.header}>ITEX Merchant on the acquirer</p>
                <p className={styles.detail}>9087654MER</p>
              </Grid>
              <Grid item md={3} xs={6} lg={3}>
                <p className={styles.header}>Amount</p>
                <p className={styles.detail}>789,902</p>
              </Grid>
              <Grid item md={2} xs={6} lg={2}>
                <p className={styles.header}>Currency</p>
                <p className={styles.detail}>NGN</p>
              </Grid>
            </Grid>

            <div className={styles.mt1}>
              <Grid container spacing={2}>
                <Grid item md={3} xs={6} lg={3}>
                  <div>
                    <p className={styles.header}>Cost</p>
                    <p className={styles.detail}>789,902</p>
                  </div>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Provider Name</p>
                  <p className={styles.detail}>Merxy</p>
                </Grid>
                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}>ITEX Reference</p>
                  <p className={styles.detail}>ITEX-ab45678943</p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Merchant Reference</p>
                  <p className={styles.detail}>ITEX-ab45678943</p>
                </Grid>
              </Grid>
            </div>

            <div className={styles.mt1}>
              <Grid container spacing={2}>
                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}>
                    Retrieval Reference Number(RRN)
                  </p>
                  <p className={styles.detail}>ITEX-ab45678943</p>
                </Grid>

                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Provider Platform</p>
                  <p className={styles.detail}>Merxy</p>
                </Grid>

                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}>Transaction Type</p>
                  <p className={styles.detail}>Collection</p>
                </Grid>

                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Authentication Model</p>
                  <p className={styles.detail}>WWQXX902</p>
                </Grid>
              </Grid>
            </div>

            <div className={styles.mt1}>
              <Grid container spacing={2}>
                <Grid item md={3} xs={6} lg={3}>
                  <div>
                    <p className={styles.header}>Country</p>
                    <p className={styles.detail}>Chicago</p>
                  </div>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Narration</p>
                  <p className={styles.detail}>Merxy Detail</p>
                </Grid>
                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}>Masked PAN</p>
                  <p className={styles.detail}>****1234</p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Response Code</p>
                  <p className={styles.detail}>0987654</p>
                </Grid>
              </Grid>
            </div>

            <div className={styles.mt1}>
              <Grid container spacing={2}>
                <Grid item md={3} xs={6} lg={3}>
                  <div>
                    <p className={styles.header}>Response message</p>
                    <p className={styles.detail}>Failed</p>
                  </div>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Card Scheme</p>
                  <p className={styles.detail}>Scheme</p>
                </Grid>
                <Grid item md={3} xs={6} lg={3}>
                  <p className={styles.header}>Transaction card type</p>
                  <p className={styles.detail}>Debit</p>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Card Country</p>
                  <p className={styles.detail}>Nigeria</p>
                </Grid>
              </Grid>
            </div>

            <div className={styles.mt1}>
              <Grid container spacing={2}>
                <Grid item md={3} xs={6} lg={3}>
                  <div>
                    <p className={styles.header}>Transaction Date &#47; Time</p>
                    <p className={styles.detail}>
                      Aug 23, 2020 <span className={styles.header}>2:21pm</span>
                    </p>
                  </div>
                </Grid>
                <Grid item md={2} xs={6} lg={2}>
                  <p className={styles.header}>Merchant Name</p>
                  <p className={styles.detail}>Merxy</p>
                </Grid>
                <Grid item md={3} xs={6} lg={3}></Grid>
                <Grid item md={2} xs={6} lg={2}></Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReconciliationsModal;
