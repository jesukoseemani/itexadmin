import React, { useState } from "react";
import styles from "./Modals.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import { Grid, Divider } from "@material-ui/core";
import { useSelector } from "react-redux";

const FailedSettlementsModal = ({
  dataValue,
  open,
  setOpen
}: {
  dataValue: string | number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const validate = Yup.object({
    providerName: Yup.string().required("Required"),
    providerShortName: Yup.string().required("Required"),
    currency: Yup.string().required("Required"),
    transactionCost: Yup.string().required("Required"),
  });

  const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
    5
  );

  const { access_token } = useSelector((state) => state?.authPayReducer?.auth);
  
  return (
    <Formik
      initialValues={{
        providerName: "",
        providerShortName: "",
        currency: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        const inputValue = {
          ...values,
        };

        console.log("values: ", values);
      }}
    >
      {(props) => (
        <div className={styles.feesApprovalContainer}>
          <div className={styles.modalColumn}>
            <div className={styles.modalHeader}>
              <div>
                <span>Collection fee approval</span>
              </div>
            </div>
            <Divider />
            <div>
              <div className={styles.modalBody}>
                <Grid container spacing={2}>
                  <Grid item md={9} xs={12} lg={9}>
                    <p className={styles.header}>Country</p>
                    <p className={styles.detail}>Country</p>
                  </Grid>

                  <Grid item md={9} xs={12} lg={9}>
                    <p className={styles.header}>Payment Type</p>
                    <p className={styles.detail}>Card</p>
                  </Grid>

                  <Grid item md={9} xs={12} lg={9}>
                    <p className={styles.header}>Percentage Value</p>
                    <p className={styles.detail}>4%</p>
                  </Grid>

                  <Grid item md={9} xs={12} lg={9}>
                    <p className={styles.header}>Flat Value</p>
                    <p className={styles.detail}>12</p>
                  </Grid>

                  <Grid item md={9} xs={12} lg={9}>
                    <p className={styles.header}>Currency</p>
                    <p className={styles.detail}>NGN</p>
                  </Grid>
                </Grid>
              </div>

              <div className={styles.modalBody}>
                <Grid container spacing={2}>
                  <Grid item md={1} xs={12} lg={1}></Grid>
                  <Grid item md={5} xs={6} lg={5}>
                    <button className={styles.feeDecline}>Decline</button>
                  </Grid>
                  <Grid item md={5} xs={6} lg={5}>
                    <button className={styles.feeAccept}>Accept</button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default FailedSettlementsModal;
