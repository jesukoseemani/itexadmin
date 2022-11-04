import { Grid, InputLabel, TextField, Checkbox } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./TransactionsModals.module.scss";
import Select from "../formUI/Select";
import { Divider, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const businessCategory = [{ name: "Technology" }, { name: "Education" }];

const providerSelect = [{ name: "Technology" }, { name: "Education" }];

const currencySelect = [{ name: "Technology" }, { name: "Education" }];

const frequencySelect = [{ name: "Technology" }, { name: "Education" }];

const AddBusinessSetup = () => {
  const validate = Yup.object({
    reference: Yup.string().required("Required"),
    provider: Yup.string().required("Required"),
    chargebackStage: Yup.string().required("Required"),
    currency: Yup.string().required("Required"),
    frequency: Yup.string().required("Required"),
    reason: Yup.string().required("Required"),
    check: Yup.string().required("Required"),
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
        <div className={styles.chargebackContainer}>
          <div className={styles.chargebackheader}>
            <div>
              <span>Log Chargeback</span>
            </div>
          </div>
          <Divider />

          <div className={styles.modalBody}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <InputLabel>
                  <span>Currency</span>
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
                    placeholder="ITEX-abcde234erftok345"
                    variant="outlined"
                    margin="normal"
                    type="text/number"
                    size="small"
                    fullWidth
                  />
                </Form>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <InputLabel>
                  <span>Currency</span>
                </InputLabel>
                <Field
                  as={Select}
                  helperText={
                    <ErrorMessage name="provider">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="provider"
                  size="small"
                  options={providerSelect}
                  defaultValue={providerSelect[0]}
                  // fullWidth
                  style={{
                    marginTop: "1rem",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel>
                  <span>Chargeback Stage</span>
                </InputLabel>
                <Field
                  as={Select}
                  helperText={
                    <ErrorMessage name="frequency">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="frequency"
                  size="small"
                  options={frequencySelect}
                  defaultValue={frequencySelect[0]}
                  // fullWidth
                  style={{
                    marginTop: "1rem",
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <InputLabel>
                  <span>Currency</span>
                </InputLabel>
                <Field
                  as={Select}
                  helperText={
                    <ErrorMessage name="currency">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="currency"
                  size="small"
                  options={currencySelect}
                  defaultValue={currencySelect[0]}
                  // fullWidth
                  style={{
                    marginTop: "1rem",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel>
                  <span>Chargeback Stage</span>
                </InputLabel>
                <Field
                  as={Select}
                  helperText={
                    <ErrorMessage name="chargebackStage">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="chargebackStage"
                  size="small"
                  options={currencySelect}
                  defaultValue={currencySelect[0]}
                  // fullWidth
                  style={{
                    marginTop: "1rem",
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <InputLabel>
                  <span>Reason for Chargeback</span>
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
                    placeholder="Enter your description here"
                    variant="outlined"
                    margin="normal"
                    multiline
                    minRows={2}
                    maxRows={3}
                    type="text/number"
                    size="small"
                    fullWidth
                  />
                </Form>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <FormGroup>
                  <FormControlLabel
                    name="check"
                    control={<Checkbox defaultChecked />}
                    label={<Typography className={styles.formControlLabel}>Include weekends when determining due date</Typography>}
                  />
                </FormGroup>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}></Grid>
              <Grid item xs={12} md={6}>
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
                  Submit
                </button>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddBusinessSetup;

function setFieldValue(arg0: string, arg1: File) {
  throw new Error("Function not implemented.");
}
