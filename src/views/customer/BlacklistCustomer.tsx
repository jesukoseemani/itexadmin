import { Box } from "@mui/material";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import styles from "./styles.module.scss";
import * as Yup from "yup";

import { Grid, InputLabel, TextField } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";

const BlacklistCustomer = () => {
  const [otp, setOtp] = useState("");

  const validate = Yup.object({
    reason: Yup.string().required("Required"),
    otp: Yup.number().required("Required"),
    customerid: Yup.number().required("Required"),
  });

  return (
    <div className={styles.blacklist__box}>
      <Box className={styles.headerTitle}>
        <h2>Add to Blacklist</h2>
      </Box>
      <Box>
        <Formik
          initialValues={{
            reason: "",
            otp: "",
            customerid: "",
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(props) => (
            <div className={styles.blacklistmodalBody}>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputLabel>
                      <span className={styles.header}>Reason</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      multiline
                      rows={4}
                      helperText={
                        <ErrorMessage name="reason">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="reason"
                      placeholder="reason"
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
                      <span className={styles.header}>Customer ID</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name="customerid">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="customerid"
                      placeholder="customerid"
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

export default BlacklistCustomer;
