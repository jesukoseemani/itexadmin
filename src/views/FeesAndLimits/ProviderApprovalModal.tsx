import React, { useEffect, useState } from "react";
import styles from "./Modals.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import { PendingProviderApiTypes } from "../../types/UserTableTypes";
import { Grid, Divider } from "@material-ui/core";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import axios from "axios";

const ProviderApprovalModal = ({
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
        <div className={styles.modalContainer}>
          <div className={styles.modalColumn}>
            <div className={styles.modalHeader}>
              <div>
                <span>Provider Approval</span>
              </div>
            </div>
            <Divider />
            <div>
              <div className={styles.modalBody}>
                <Grid container spacing={2}>
                  <Grid item md={3} xs={6} lg={3}>
                    <div className={styles.inline}>
                      <p className={styles.header}>Provider ID</p>
                      <p className={styles.detail}> 9087654</p>
                    </div>
                  </Grid>
                  <Grid item md={3} xs={6} lg={3}>
                    <p className={styles.header}>Date Created</p>
                    <p className={styles.detail}>12/02/2021</p>
                  </Grid>
                  <Grid item md={3} xs={6} lg={3}>
                    <p className={styles.header}>Provider</p>
                    <p className={styles.detail}>Jahehe</p>
                  </Grid>
                  <Grid item md={3} xs={6} lg={3}>
                    <p className={styles.header}></p>
                    <p className={styles.detail}></p>
                  </Grid>
                </Grid>
              </div>
              <Divider />

              <div className={styles.modalBody}>
                <Grid container spacing={1}>
                  <Grid item md={10} xs={10} lg={10}>
                    <div className={styles.inline}>
                      <p className={styles.header}>
                        Enable provider transactions
                      </p>
                      <div className={styles.mt1}>
                        <p className={styles.inline}>
                          <DoneAllRoundedIcon
                            fontSize="small"
                            style={{ color: "#219653" }}
                          />
                          <p className={styles.ml1}>
                            <span className={styles.detail}>
                              International card transaction
                            </span>
                          </p>
                        </p>
                      </div>
                      <div className={styles.mt1}>
                        <p className={styles.inline}>
                          <DoneAllRoundedIcon
                            fontSize="small"
                            style={{ color: "#219653" }}
                          />
                          <p className={styles.ml1}>
                            <span className={styles.detail}>
                              International account transaction
                            </span>
                          </p>
                        </p>
                      </div>
                      <div className={styles.mt1}>
                        <p className={styles.inline}>
                          <DoneAllRoundedIcon
                            fontSize="small"
                            style={{ color: "#219653" }}
                          />
                          <p className={styles.ml1}>
                            <span className={styles.detail}>
                              {" "}
                              Local account transaction
                            </span>
                          </p>
                        </p>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>

              <Divider />

              <div className={styles.modalBody}>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12} lg={6}>
                    <div className={styles.inline}>
                      <p className={styles.header}>
                        Internet banking transaction cost
                      </p>
                      <p className={styles.detail}>NGN 7,748.12</p>
                    </div>
                  </Grid>
                  <Grid item md={6} xs={12} lg={6}>
                    <p className={styles.header}>QR code transaction cost</p>
                    <p className={styles.detail}>NGN 7,748.12</p>
                  </Grid>
                </Grid>
              </div>

              <div className={styles.modalBody}>
                <Grid container spacing={2}>
                  <Grid item md={2} xs={12} lg={2}></Grid>
                  <Grid item md={5} xs={6} lg={5}>
                    <button className={styles.buttonDecline}>Decline</button>
                  </Grid>
                  <Grid item md={5} xs={6} lg={5}>
                    <button className={styles.buttonAccept}>Accept</button>
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

export default ProviderApprovalModal;
