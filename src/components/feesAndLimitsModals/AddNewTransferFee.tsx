import React from "react";
import styles from "./FeesAndLimitsModals.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import {
  Grid,
  InputLabel,
  TextField,
  Divider,
  Checkbox,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const AddNewTransferFee = () => {
  

  const validate = Yup.object({
    providerName: Yup.string().required("Required"),
    providerShortName: Yup.string().required("Required"),
    currency: Yup.string().required("Required"),
    transactionCost: Yup.string().required("Required"),
  });


  return (
    <Formik
      initialValues={{
        country: "",
        paymentType: "",
        percentageValue: "",
        flatValue: "",
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
                <span>Add a Fee</span>
              </div>
            </div>
            <Divider />
            <div className={styles.modalBody}>
              <Form>
                <InputLabel>
                  <span className={styles.black}>Country</span>
                </InputLabel>
                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name="country">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="country"
                  placeholder="Nigeria"
                  variant="outlined"
                  margin="normal"
                  type="text/number"
                  size="small"
                  fullWidth
                />

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
                  placeholder="0"
                  variant="outlined"
                  margin="normal"
                  type="text/number"
                  size="small"
                  fullWidth
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    {" "}
                    <InputLabel>
                      <span className={styles.black}>Percentage Value</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name="percentageValue">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="percentageValue"
                      placeholder="%"
                      variant="outlined"
                      margin="normal"
                      type="text/number"
                      size="small"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <InputLabel>
                      <span className={styles.black}>Flat Value</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name="flatValue">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="flatValue"
                      placeholder="0.0"
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
                  Add Fee
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddNewTransferFee;
