import { Box } from "@mui/material";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import styles from "./styles.module.scss";
import * as Yup from "yup";

import { Grid, InputLabel, TextField } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { closeModal } from "../../redux/actions/modal/modalActions";






interface Props {
  code?: string;
  message: string;
}

const BlacklistCustomer = ({ custId, setNavigate }: any) => {
  const dispatch = useDispatch()
  const [otp, setOtp] = useState("");
  const auth = useSelector((state) => state?.authPayReducer?.auth);
  const access_token = auth?.access_token;

  const validate = Yup.object({
    reason: Yup.string().required("Required"),
    otp: Yup.number().required("Required"),
    customerid: Yup.number().required("Required"),
  });
  const url = "/v1/customer/blacklist"


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
            customerid: custId
          }}
          validationSchema={validate}
          onSubmit={async (values) => {
            const { data } = await axios.post<Props>(url, values)
            // console.log(blacklistCustomer);
            if (data?.code === "success") {
              dispatch(
                openToastAndSetContent({
                  toastContent: data?.message,
                  toastStyles: {
                    backgroundColor: 'green',
                  },
                })
              );
              dispatch(closeModal());
              setNavigate(false)

            } else {
              dispatch(
                openToastAndSetContent({
                  toastContent: data?.message,
                  toastStyles: {
                    backgroundColor: 'red',
                  },
                })
              );
            }
            console.log(values, "values")
            setNavigate(false)
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

                    {/* <OtpInput
                      value={otp}
                      onChange={setOtp}
                      //   name="otp"
                      containerStyle={styles.otpBox}
                      numInputs={5}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} />}
                      inputStyle={styles.otpInput}
                    /> */}

                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name="otp">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="otp"
                      placeholder="otp"
                      variant="outlined"
                      margin="normal"
                      type="number"
                      size="small"
                      fullWidth
                    // value={custId}
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
                      value={custId}
                      style={{ display: "none" }}
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
