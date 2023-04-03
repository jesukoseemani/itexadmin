import { Box } from "@mui/material";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import styles from "./styles.module.scss";
import * as Yup from "yup";

import { Grid, InputLabel, TextField } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { closeModal } from "../../redux/actions/modal/modalActions";
import { useDispatch } from 'react-redux';


interface Prop {
  id: string
}



interface MsgProps {
  code?: string;
  message: string;
}
const AddSingleSettlement = ({ id }: Prop) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch()
  const validate = Yup.object({
    note: Yup.string().required("Required"),
    otp: Yup.number().required("Required"),
  });



  return (
    <div>
      <Box className={styles.headerTitle}>
        <h2>Add Single Settlement</h2>
      </Box>
      <Box>
        <Formik
          initialValues={{
            note: "",
            otp: "",
          }}
          validationSchema={validate}
          onSubmit={async (values) => {
            const { data } = await axios.post<MsgProps>(`/v1/settlement/${id}/settle`, values)
            console.log(data.message)
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
                      placeholder="Enter notes"
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
                      type="text/number"
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

export default AddSingleSettlement;
