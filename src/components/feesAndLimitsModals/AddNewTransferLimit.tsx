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
import Select from "../formUI/Select";

const AddNewTransferLimit = () => {

  const frequency = [{ name: "Custom" }];



  const validate = Yup.object({
    currency: Yup.string().required("Required"),
    singleLimit: Yup.string().required("Required"),
    cumDailyLimit: Yup.string().required("Required"),
    freq: Yup.string().required("Required"),
    customFreq: Yup.string().required("Required"),
    industry: Yup.string().required("Required"),
    riskCategory: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={{
        currency: "",
        singleLimit: "",
        cumDailyLimit: "",
        freq: "",
        customFreq: "",
        industry: "",
        riskCategory: "",
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
                <span>Transfer Limit</span>
              </div>
            </div>
            <Divider />
            <div className={styles.modalBody}>
              <Form>
            
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

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <InputLabel>
                      <span className={styles.black}>Single transfer limit</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name="singleLimit">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="singleLimit"
                      placeholder="100,000"
                      variant="outlined"
                      margin="normal"
                      type="text/number"
                      size="small"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <InputLabel>
                      <span className={styles.black}>Cumulative daily limit</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name="cumDailyLimit">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="cumDailyLimit"
                      placeholder="0.0"
                      variant="outlined"
                      margin="normal"
                      type="text/number"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>

              
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <InputLabel>
                      <span className={styles.black}>Frequency</span>
                    </InputLabel>
                    <Field
                      as={Select}
                      helperText={
                        <ErrorMessage name="frequency">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="frequency"
                      options={frequency}
                      defaultValue={frequency[0]}
                      size="small"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <InputLabel>
                      <span className={styles.black}>Custom Frequency</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name="customFreq">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="customFreq"
                      placeholder="Enter Frequency"
                      variant="outlined"
                      margin="normal"
                      type="text/number"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>


                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    {" "}
                    <InputLabel>
                      <span className={styles.black}>Industry</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name="industry">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="industry"
                      placeholder="All"
                      variant="outlined"
                      margin="normal"
                      type="text/number"
                      size="small"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <InputLabel>
                      <span className={styles.black}>Risk Category</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name="riskCategory">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="riskCategory"
                      placeholder="All"
                      variant="outlined"
                      margin="normal"
                      type="text/number"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>

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
                  Save Limit
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddNewTransferLimit;
