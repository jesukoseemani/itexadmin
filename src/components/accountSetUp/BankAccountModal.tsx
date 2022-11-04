import React from "react";
import styles from "./BusinessModal.module.scss";
import { Grid } from "@material-ui/core";
import { Formik, Field, ErrorMessage } from "formik";
import { InputLabel, TextField, Button } from "@material-ui/core";
import Select from "../formUI/Select";
import * as Yup from "yup";
const BankAccount = () => {
  const validate = Yup.object({
    bankName: Yup.string().max(30, "Must be 11 characters").required(),
    bankNumber: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Registered Address is required"),
    settlementType: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("This is required"),
  });

  const settlementOptions = {
    BA: "Bank Account",
  };
  return (
    <div style={{ width: "100%", maxWidth: "400px", }}>
      <div className={styles.header}>
        <h3>Add a bank account</h3>
      </div>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <Formik
          initialValues={{
            bankName: "",
            bankNumber: "",
            settlementType: "",
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(props) => (
            <Grid container spacing={2}>
              <Grid item md={12}>
                <InputLabel>Bank name</InputLabel>
                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name='bankName'>
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name='bankName'
                  placeholder='Access bank'
                  variant='outlined'
                  margin='normal'
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid item md={12}>
                <InputLabel>Corporate Bank Account Number</InputLabel>
                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name='certificate'>
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name='bankNumber'
                  placeholder='Choose file to upload'
                  variant='outlined'
                  margin='normal'
                  size='small'
                  fullWidth
                />
              </Grid>
              <div
                style={{ color: "rgba(130, 130, 130, 1)", marginLeft: "8px" }}
              >
                <h6>Resolved Account name</h6>
              </div>
              <Grid item md={12}>
                <InputLabel>Settlement type</InputLabel>
                <Field
                  as={Select}
                  helperText={
                    <ErrorMessage name='settlementType'>
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name='settlementType'
                  placeholder='1234567890'
                  variant='outlined'
                  margin='normal'
                  size='small'
                  options={settlementOptions}
                  fullWidth
                />
              </Grid>

              <Grid item md={12}>
                <Button
                  variant='contained'
                  style={{
                    background: "rgba(39, 174, 96, 1)",
                    color: "white",
                    marginTop: "0.8rem",
                    padding: "0.9rem",
                    marginBottom: "2rem",
                  }}
                  fullWidth
                  type='submit'
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BankAccount;
