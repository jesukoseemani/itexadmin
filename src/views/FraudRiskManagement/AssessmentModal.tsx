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
      <div className={styles.assessmentModalContainer}>
        <div className={styles.modalColumn}>
          <div className={styles.modalHeader}>
            <div>
              <span>Assessment fee</span>
            </div>
          </div>
          <Divider />
          <div>
            <div className={styles.modalBody}>
              <div className={styles.mt1}>
                <p className={styles.header}>Amount</p>
                <p className={styles.detail}>0.0153</p>
              </div>

              <div className={styles.mt1}>
                <p className={styles.header}>Card Scheme</p>
                <p className={styles.detail}>VISA</p>
              </div>

              <div className={styles.mt1}>
                <p className={styles.header}>Comment</p>
                <p className={styles.detail}>
                  Lorem ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                </p>
              </div>

              <div className={styles.mt1}></div>
            </div>
            <Divider />
            <div className={styles.modalBody}>
              <div className={styles.mt1}>
                <p className={styles.header}>Document</p>
                <p className={styles.detail}>0.0153</p>
              </div>

              <Grid container spacing={2}>
                <Grid item md={3} xs={12} lg={3}></Grid>
                <Grid item md={4} xs={6} lg={4}>
                  <button className={styles.editButton}>Edit document</button>
                </Grid>
                <Grid item md={4} xs={6} lg={4}>
                  <button className={styles.downloadButton}>
                    Download document
                  </button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatioModal;
