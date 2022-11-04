import React, { useState } from "react";
import styles from "./FraudRiskManagement.module.scss";
import { PendingProviderApiTypes } from "../../types/UserTableTypes";
import { Grid, Divider } from "@material-ui/core";
import { useSelector } from "react-redux";

const RatioModal = ({
  dataValue,
  open,
  setOpen,
}: {
  dataValue: string | number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  setOpen(false);

  const [apiRes, setApiRes] = useState<PendingProviderApiTypes>();

  const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
    5
  );

  const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

  return (
    <div>
      <div className={styles.modalContainer}>
        <div className={styles.modalColumn}>
          <div className={styles.modalHeader}>
            <div>
              <span>Activity details</span>
            </div>
          </div>
          <Divider />
          <div>
            <div className={styles.modalBody}>
              <div className={styles.mt1}>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>Date</p>
                    <p className={styles.detail}>0.0153</p>
                  </Grid>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>IP address</p>
                    <p className={styles.detail}>0.0153</p>
                  </Grid>
                </Grid>
              </div>

              <div className={styles.mt1}>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>User</p>
                    <p className={styles.detail}>Low</p>
                  </Grid>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>Role</p>
                    <p className={styles.detail}>
                      <button className={styles.buttonSuccessful}>
                        Successful
                      </button>
                    </p>
                  </Grid>
                </Grid>
              </div>

              <div className={styles.mt1}>
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12} lg={12}>
                    <p className={styles.header}>Email</p>
                    <p className={styles.detail}>NGN,1230,000</p>
                  </Grid>
                </Grid>
              </div>

              <div className={styles.mt1}>
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12} lg={12}>
                    <p className={styles.header}>VISA</p>
                    <p className={styles.detail}>
                      Mozilla/5.0 (Macintosh; Intel Mac X 10_15_0)
                      AppleWebKit/537.36(KHTML, Like Gecko) Chrome/79.0.3945.88
                      Safari/537.36
                    </p>
                  </Grid>
                </Grid>
              </div>

              <div className={styles.mt1}>
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12} lg={12}>
                    <p className={styles.header}>VISA</p>
                    <p className={styles.detail}>
                      User uploaded document james_haliday_fee.pdf document
                    </p>
                  </Grid>
                </Grid>
              </div>

              <div className={styles.mt1}>
                <div className={styles.downloadDiv}>
                  <button className={styles.buttonDownload}>Download information</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatioModal;
