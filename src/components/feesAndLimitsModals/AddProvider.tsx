import React from "react";
import styles from "./FeesAndLimitsModals.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Grid,
  InputLabel,
  TextField,
  Divider,
  Checkbox,
} from "@material-ui/core";
import { FormControlLabel, FormGroup, Typography } from "@mui/material";

const AddProviderModal = () => {
  

  const validate = Yup.object({
    providerName: Yup.string().required("Required"),
    providerShortName: Yup.string().required("Required"),
    currency: Yup.string().required("Required"),
    transactionCost: Yup.string().required("Required"),
  });


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

        // axios
        //   .post("https://staging.itex-pay.com/ipg/api/v1/admin/provider", {
        //     name: inputValue?.providerName,
        //     shortName: inputValue?.providerShortName,
        //     currency: inputValue?.currency,
        //   })

        //   .then((res) => {
        //     dispatch(closeLoader());
        //     dispatch(saveAuth(res.data));
        //     dispatch(saveLoading(true));
        //     console.log(res.data);

        //     dispatch(
        //       openToastAndSetContent({
        //         toastContent: "Provider Added Successful",
        //         toastStyles: {
        //           backgroundColor: "green",
        //         },
        //       })
        //     );

        //     history.push("/fees/allproviders");
        //   })

        // .catch((err) => {
        //   console.log(err);
        //   dispatch(closeLoader());
        //   dispatch(saveLoading(false));

        //   dispatch(
        //     openToastAndSetContent({
        //       toastContent: "Something Went Wrong",
        //       toastStyles: {
        //         backgroundColor: "red",
        //       },
        //     })
        //   );
        //   history.push("/fees/allproviders");
        // });
      }}
    >
      {(props) => (
        <div className={styles.modalContainer}>
          <div className={styles.modalColumn}>
            <div className={styles.modalHeader}>
              <div>
                <span>Add Provider</span>
              </div>
            </div>
            <Divider />
            <div className={styles.modalBody}>
              <Form>
                <InputLabel>
                  <span className={styles.black}>Provider Name</span>
                </InputLabel>
                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name="providerName">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="providerName"
                  placeholder="Jehehe"
                  variant="outlined"
                  margin="normal"
                  type="text/number"
                  size="small"
                  fullWidth
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <InputLabel>
                      <span className={styles.black}>Provider short name</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name="providerShortName">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="providerShortName"
                      placeholder="JHH"
                      variant="outlined"
                      margin="normal"
                      type="text/number"
                      size="small"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <InputLabel>
                      <span className={styles.black}>Currency</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name="currency">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="currency"
                      placeholder="NGN"
                      variant="outlined"
                      margin="normal"
                      type="text/number"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Divider />

                <FormGroup>
                  <FormControlLabel
                    className={styles.mb1}
                    name="cardCheck"
                    control={<Checkbox />}
                    label={
                      <Typography>
                        <span className={styles.black}>International card transaction</span>
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    className={styles.mb1}
                    name="accountCheck"
                    control={<Checkbox />}
                    label={
                      <Typography>
                        <span className={styles.black}>International account transaction</span>
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    className={styles.mb1}
                    name="localCardCheck"
                    control={<Checkbox />}
                    label={
                      <Typography>
                        <span className={styles.black}>Local card transaction</span>
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    className={styles.mb1}
                    name="localAccountCheck"
                    control={<Checkbox />}
                    label={
                      <Typography>
                        <span className={styles.black}>Local account transaction</span>
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    name="ussd"
                    control={<Checkbox />}
                    label={
                      <Typography>
                        <span className={styles.black}>USSD transaction</span>
                      </Typography>
                    }
                  />
                </FormGroup>

                <Divider />

                <InputLabel  className={styles.mt1}>
                  <span className={styles.black}>Transaction Cost</span>
                </InputLabel>
                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name="transactionCost">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="transactionCost"
                  placeholder="0"
                  variant="outlined"
                  margin="normal"
                  type="text/number"
                  size="small"
                  fullWidth
                />

                <InputLabel></InputLabel>
                <button
                  className={styles.buttonMargin}
                  style={{
                    backgroundColor: "#27AE60",
                    padding: "0.7rem",
                    width: "100%",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                  }}
                  type="submit"
                  color="primary"
                >
                  Add Provider
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddProviderModal;
