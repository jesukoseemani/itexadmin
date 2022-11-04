import React, { useState } from "react";
import styles from "./FraudRiskManagement.module.scss";
import { PendingProviderApiTypes } from "../../types/UserTableTypes";
import { Grid, Divider } from "@material-ui/core";
import { useSelector } from "react-redux";

const ReuseModal = ({
  dataValue,
  open,
  setOpen,
  title,
  type,
}: {
  dataValue: string | number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  type: string;
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
              <span>{title}</span>
            </div>
          </div>
          <Divider />
          <div>
            <div className={styles.modalBody}>
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
              <div className={styles.mt1}>
                <Grid container spacing={2} className={styles.mt1}>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>Merchant Name</p>
                    <p className={styles.detail}>James Haliday Ventures</p>
                  </Grid>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>{type} Type</p>
                    <p className={styles.detail}>Local</p>
                  </Grid>
                </Grid>
              </div>
              <div className={styles.mt1}>
                <Grid container spacing={2} className={styles.mt1}>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>{type} total volume</p>
                    <p className={styles.detail}>1000</p>
                  </Grid>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>{type} total value</p>
                    <p className={styles.detail}>NGN,1230,000</p>
                  </Grid>
                </Grid>
              </div>
              <div className={styles.mt1}>
                <Grid container spacing={2} className={styles.mt1}>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>VISA</p>
                    <p className={styles.detail}>NGN,1230,000</p>
                  </Grid>
                  <Grid item md={6} xs={6} lg={6}>
                    <p className={styles.header}>MasterCard</p>
                    <p className={styles.detail}>NGN,1230,000</p>
                  </Grid>
                </Grid>
              </div>
              <div className={styles.mt1}>
                <Grid container spacing={2} className={styles.mt1}>
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

export default ReuseModal;
