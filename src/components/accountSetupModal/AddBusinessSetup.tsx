import { Grid, InputLabel, TextField } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./AccountSetup.module.scss";
import Select from "../formUI/Select";

const businessCategory = [{ name: "Technology" }, { name: "Education" }];

const AddBusinessSetup = () => {
  const validate = Yup.object({
    tradingName: Yup.string().required("Required"),
    busAddress: Yup.string().required("Required"),
    busDesc: Yup.string().required("Required"),
    busCategory: Yup.string().required("Required"),
    website: Yup.string().required("Required"),
    supportEmail: Yup.string().email("Email is invalid").required("Required"),
    chargeBackEmail: Yup.string()
      .email("Email is invalid")
      .required("Required"),
    upload: Yup.string().required("Required"),
    nin: Yup.string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(11, "NIN is exactly 11 digits")
      .max(11, "NIN is exactly 11 digits")
      .required("Required"),
  });

  const SelectFieldStyle = {
    padding: "0.7rem",
  };

  return (
    <Formik
      initialValues={{
        tradingName: "",
        busAddress: "",
        busDesc: "",
        busCategory: "",
        website: "",
        supportEmail: "",
        chargeBackEmail: "",
        upload: "",
        nin: "",
        handleFileUpload: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(props) => (
        <div className={styles.modalBusinessContainer}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <InputLabel>
                <span>Business profile set up</span>
              </InputLabel>
              <hr />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel>
                <span>Trading name</span>
              </InputLabel>
              <Form>
                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name="tradingName">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="tradingName"
                  placeholder="Food Bank"
                  variant="outlined"
                  margin="normal"
                  type="text/number"
                  size="small"
                  fullWidth
                />
                <InputLabel>
                  <span>Business address</span>
                </InputLabel>
                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name="busAddress">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="busAddress"
                  placeholder="email@email.com"
                  variant="outlined"
                  margin="normal"
                  type="text"
                  size="small"
                  fullWidth
                />

                <InputLabel>
                  <span>Business description</span>
                </InputLabel>
                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name="busDesc">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="busDesc"
                  placeholder="Description"
                  variant="outlined"
                  margin="normal"
                  type="text/number"
                  size="small"
                  fullWidth
                />

                <InputLabel>
                  <span>What's your business category?</span>
                </InputLabel>

                <Field
                  as={Select}
                  helperText={
                    <ErrorMessage name="busCategory">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="busCategory"
                  size="small"
                  options={businessCategory}
                  defaultValue={businessCategory[0]}
                  // fullWidth
                  style={{
                    marginTop: "1rem",
                  }}
                />
                <InputLabel>
                  <span>Website URL</span>
                </InputLabel>

                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name="website">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="website"
                  placeholder="www.website.com"
                  variant="outlined"
                  margin="normal"
                  type="text/number"
                  size="small"
                  fullWidth
                />
              </Form>
            </Grid>
            <Grid item xs={12} md={6}>
              <Form>
                <InputLabel>
                  <span>Support email</span>
                </InputLabel>
                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name="supportEmail">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="supportEmail"
                  placeholder="supportemail@email.com"
                  variant="outlined"
                  margin="normal"
                  type="text/number"
                  size="small"
                  fullWidth
                />
                <InputLabel>
                  <span>Charge Email</span>
                </InputLabel>
                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name="chargeBackEmail">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="chargeBackEmail"
                  placeholder="chargebackemail@email.com"
                  variant="outlined"
                  margin="normal"
                  type="text"
                  size="small"
                  fullWidth
                />

                <InputLabel>
                  <span>Upload File</span>
                </InputLabel>
                <div>
                  <input
                    style={{
                      padding: "0.6rem",
                      margin: "0.7rem 0 0.7rem 0",
                    }}
                    id="file"
                    name="upload"
                    type="text"
                  />
                </div>

                <InputLabel>
                  <span>NIN</span>
                </InputLabel>

                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name="nin">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="nin"
                  placeholder="12345678912"
                  variant="outlined"
                  margin="normal"
                  type="text/number"
                  size="small"
                  fullWidth
                />

                <InputLabel></InputLabel>
                <button
                  style={{
                    backgroundColor: "#27AE60",
                    padding: "0.7rem",
                    marginTop: "1rem",
                    width: "100%",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                  }}
                  type="submit"
                  color="primary"
                >
                  Continue
                </button>
              </Form>
            </Grid>
          </Grid>
        </div>
      )}
    </Formik>
  );
};

export default AddBusinessSetup;

function setFieldValue(arg0: string, arg1: File) {
  throw new Error("Function not implemented.");
}
