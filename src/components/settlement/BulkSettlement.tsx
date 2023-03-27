import { Box } from "@mui/material";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import styles from "./styles.module.scss";
import * as Yup from "yup";

import { Grid, InputLabel, TextField } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";

const BulkSettlement = () => {
  const [otp, setOtp] = useState("");

  const validate = Yup.object({
    note: Yup.string().required("Required"),
    otp: Yup.number().required("Required"),
    settlementids: Yup.number().required("Required"),
  });

  return (
    <div>
      <Box className={styles.headerTitle}>
        <h2>Add Bulk Settlement</h2>
      </Box>
      <Box>
        <Formik
          initialValues={{
            note: "",
            otp: "",
            settlementids: "",
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(props) => (
            <div className={styles.modalBody}>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputLabel>
                      <span className={styles.header}>Notes</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      multiline
                      rows={4}
                      helperText={
                        <ErrorMessage name="note">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="note"
                      placeholder="Account"
                      variant="outlined"
                      margin="normal"
                      type="text/number"
                      size="small"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <InputLabel>
                      <span className={styles.header}>OTP</span>
                    </InputLabel>

                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      //   name="otp"
                      containerStyle={styles.otpBox}
                      numInputs={5}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} />}
                      inputStyle={styles.otpInput}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>
                      <span className={styles.header}>settlementids</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      multiline
                      rows={2}
                      helperText={
                        <ErrorMessage name="settlementids">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="settlementids"
                      placeholder="settlementids"
                      variant="outlined"
                      margin="normal"
                      type="number"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <button type="submit">Submit</button>
                  </Grid>
                </Grid>
              </Form>
            </div>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default BulkSettlement;
