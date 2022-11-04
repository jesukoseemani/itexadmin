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
              <span>Fraud Details</span>
            </div>
          </div>
          <Divider />
          <div>
            <div className={styles.modalBody}>
              <div className={styles.mt1}>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>Chargeback ratio</p>
                    <p className={styles.detail}>0.0153</p>
                  </Grid>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>Fraud ratio</p>
                    <p className={styles.detail}>0.0153</p>
                  </Grid>
                </Grid>
              </div>

              <div className={styles.mt1}>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>Risk Status</p>
                    <p className={styles.detail}>Low</p>
                  </Grid>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>Status</p>
                    <p className={styles.detail}>
                      <button className={styles.buttonSuccessful}
                      >
                        Successful
                      </button>
                    </p>
                  </Grid>
                </Grid>
              </div>

              <div className={styles.mt1}>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>Chargeback threshold</p>
                    <p className={styles.detail}>NGN,1230,000</p>
                  </Grid>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>MasterCard</p>
                    <p className={styles.detail}>NGN,1230,000</p>
                  </Grid>
                </Grid>
              </div>

              <div className={styles.mt1}>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>VISA</p>
                    <p className={styles.detail}>NGN,1230,000</p>
                  </Grid>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>Verve</p>
                    <p className={styles.detail}>NGN,1230,000</p>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatioModal;
