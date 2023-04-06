import { Box } from "@mui/material";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import styles from "./styles.module.scss";
import * as Yup from "yup";

import { Grid, InputLabel, TextField } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from 'react-redux';
import axios from "axios";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { closeModal } from "../../redux/actions/modal/modalActions";



interface Props {
  code?: string;
  message: string;
}


const RollbackModal = ({ id }: any) => {
  const dispatch = useDispatch()

  const validate = Yup.object({
    note: Yup.string().required("Required"),
    otp: Yup.number().required("Required"),
    reserveid: Yup.number(),
  });

  return (
    <div className={styles.rolling__box}>
      <Box className={styles.headerTitle}>
        <h2>Reserve</h2>
      </Box>
      <Box>
        <Formik
          initialValues={{
            note: "",
            otp: "",
            reserveid: id,
          }}
          validationSchema={validate}
          onSubmit={async (values) => {
            console.log(values);
            const { data } = await axios.post<Props>("/v1/rollingreserve/reverse", values)
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
          }}

        >
          {(props) => (
            <div className={styles.rollingmodalBody}>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} style={{ display: "none" }}>
                    <InputLabel>
                      <span className={styles.header}>Reserve ID</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name="reserveid">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="reserveid"
                      placeholder="reserve id"
                      variant="outlined"
                      margin="normal"
                      type="number"
                      size="small"
                      fullWidth
                      value={id}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <InputLabel>
                      <span className={styles.header}>Note</span>
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
                      placeholder="note"
                      variant="outlined"
                      margin="normal"
                      type="text"
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
                      placeholder="Enter otp"
                      variant="outlined"
                      margin="normal"
                      type="text"
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
    </div >
  );
};

export default RollbackModal;
