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
import Select from "../formUI/Select";
import { useDispatch } from "react-redux";

const AddNewCollectionLimit = () => {
  const business_type = [
    { name: "Individual" },
    { name: "Business" },
    { name: "NGO" },
  ];
  const compliance_status = [{ name: "0.0" }, { name: "1" }, { name: "2" }];

  const dispatch = useDispatch();
  const history = useHistory();

  const validate = Yup.object({
    businessType: Yup.string().required("Required"),
    complianceStatus: Yup.string().required("Required"),
    currency: Yup.string().required("Required"),
    minValue: Yup.string().required("Required"),
    maxValue: Yup.string().required("Required"),
    cumValue: Yup.string().required("Required"),
    industry: Yup.string().required("Required"),
    riskCategory: Yup.string().required("Required"),
  });

  
  return (
    <Formik
      initialValues={{
        businessType: "",
        complianceStatus: "",
        currency: "",
        minValue: "",
        maxValue: "",
        cumValue: "",
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
                <span>Collection Limit</span>
              </div>
            </div>
            <Divider />
            <div className={styles.modalBody}>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <InputLabel>
                      <span className={styles.black}>
                        Select Business Type
                      </span>
                    </InputLabel>
                    <Field
                      as={Select}
                      helperText={
                        <ErrorMessage name="businessType">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="businessType"
                      size="small"
                      options={business_type}
                      defaultValue={business_type && business_type[0]}
                      // fullWidth
                      style={{
                        marginTop: "8px",
                        // marginBottom: '22px',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputLabel>
                      <span className={styles.black}>
                        Complaince Status
                      </span>
                    </InputLabel>
                    <Field
                      as={Select}
                      helperText={
                        <ErrorMessage name="businessType">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="businessType"
                      size="small"
                      options={compliance_status}
                      defaultValue={compliance_status && compliance_status[0]}
                      // fullWidth
                      style={{
                        marginTop: "8px",
                        // marginBottom: '22px',
                      }}
                    />
                  </Grid>
                </Grid>

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
                    {" "}
                    <InputLabel>
                      <span className={styles.black}>Minimum value per txn</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name="minValue">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="minValue"
                      placeholder="0"
                      variant="outlined"
                      margin="normal"
                      type="text/number"
                      size="small"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <InputLabel>
                      <span className={styles.black}>Minimum value per txn</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name="maxValue">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name="maxValue"
                      placeholder="100,000"
                      variant="outlined"
                      margin="normal"
                      type="text/number"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>

              
                <InputLabel>
                  <span className={styles.black}>Currency</span>
                </InputLabel>
                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name="cumValue">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="cumValue"
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
                  Add Limit
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddNewCollectionLimit;
