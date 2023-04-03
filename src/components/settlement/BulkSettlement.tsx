import { Box } from "@mui/material";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import styles from "./styles.module.scss";
import * as Yup from "yup";

import { Grid, InputLabel, TextField } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { closeModal } from "../../redux/actions/modal/modalActions";





interface MsgProps {
  code?: string;
  message: string;
}
const BulkSettlement = (id: any) => {
  console.log(id)
  const dispatch = useDispatch()
  const validate = Yup.object({
    note: Yup.string().required("Required"),
    otp: Yup.number().required("Required"),
    // settlementids: Yup.string()
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
            settlementids: id?.checkValue,
          }}
          validationSchema={validate}
          onSubmit={async (values) => {
            const { data } = await axios.post<MsgProps>('/v1/settlement/settle/bulk', values)
            console.log(data)
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
                      minRows={4}
                      helperText={
                        <ErrorMessage name="note">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="note"
                      placeholder="Note"
                      variant="outlined"
                      margin="normal"
                      type="text"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} style={{ display: "none" }}>

                    <Field
                      as={TextField}

                      helperText={
                        <ErrorMessage name="settlementids">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="settlementids"
                      placeholder="settlementids"
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
