import { Grid, InputLabel, TextField } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Select from "../../components/formUI/Select";
import styles from "./Settlement.module.scss";
import { Divider } from "@mui/material";

const businessCategory = [{ name: "Technology" }, { name: "Education" }];

const providerSelect = [{ name: "Technology" }, { name: "Education" }];

const currencySelect = [{ name: "Technology" }, { name: "Education" }];

const frequencySelect = [{ name: "Technology" }, { name: "Education" }];

const SingleSettlementModal = () => {
  const validate = Yup.object({
    account: Yup.string().required("Required"),
    currency: Yup.string().required("Required"),
    amount: Yup.string().required("Required"),
    reference: Yup.string().required("Required"),
    narration: Yup.string().required("Required"),
    merchantBank: Yup.string().required("Required"),
    merchantAccountNumber: Yup.string().required("Required"),
  });

  const SelectFieldStyle = {
    padding: "0.7rem",
  };

  return (
    <Formik
      initialValues={{
        reference: "",
        provider: "",
        chargebackStage: "",
        currency: "",
        frequency: "",
        reason: "",
        check: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(props) => (
        <div className={styles.modalContainer}>
          <div className={styles.headerModal}>
            <div>
              <span className={styles.header}>Log Settlement</span>
            </div>
          </div>
          <Divider />

          <div className={styles.modalBody}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                <InputLabel>
                  <span className={styles.header}>Settlement account</span>
                </InputLabel>
                <Form>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name="account">
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name="account"
                    placeholder="Account"
                    variant="outlined"
                    margin="normal"
                    type="text/number"
                    size="small"
                    fullWidth
                  />
                </Form>
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <InputLabel>
                  <span className={styles.header}>Currency</span>
                </InputLabel>
                <Form>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name="currency">
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name="currency"
                    placeholder="Currency"
                    variant="outlined"
                    margin="normal"
                    type="text/number"
                    size="small"
                    fullWidth
                  />
                </Form>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                <InputLabel>
                  <span className={styles.header}>Amount</span>
                </InputLabel>
                <Field
                  as={Select}
                  helperText={
                    <ErrorMessage name="amount">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="amount"
                  size="small"
                  options={providerSelect}
                  defaultValue={providerSelect[0]}
                  // fullWidth
                  style={{
                    marginTop: "1rem",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <InputLabel>
                  <span className={styles.header}>Reference</span>
                </InputLabel>
                <Form>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name="reference">
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name="reference"
                    placeholder="0.0"
                    variant="outlined"
                    margin="normal"
                    type="text/number"
                    size="small"
                    fullWidth
                  />
                </Form>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                <InputLabel>
                  <span className={styles.header}>Narration</span>
                </InputLabel>
                <Form>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name="narration">
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name="narration"
                    placeholder="0.0"
                    variant="outlined"
                    margin="normal"
                    type="text/number"
                    size="small"
                    fullWidth
                  />
                </Form>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <InputLabel>
                  <span className={styles.header}>Merchant Bank</span>
                </InputLabel>
                <Form>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name="merchantBank">
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name="merchantBank"
                    placeholder="0.0"
                    variant="outlined"
                    margin="normal"
                    type="text/number"
                    size="small"
                    fullWidth
                  />
                </Form>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                <InputLabel>
                  <span className={styles.header}>Merchant Account Number</span>
                </InputLabel>
                <Form>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name="merchantAccountNumber">
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name="merchantAccountNumber"
                    placeholder="0.0"
                    variant="outlined"
                    margin="normal"
                    type="text/number"
                    size="small"
                    fullWidth
                  />
                </Form>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <InputLabel>
                </InputLabel>
                <Form>
                <button
                  className={styles.buttonMargin}
                  style={{
                    backgroundColor: "#27AE60",
                    padding: "0.7rem",
                    marginTop: "2rem",
                    width: "100%",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                  }}
                  type="submit"
                  color="primary"
                >
                  Submit for review
                </button>
                </Form>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default SingleSettlementModal;
