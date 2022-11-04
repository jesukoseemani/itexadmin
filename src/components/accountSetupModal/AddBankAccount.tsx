import React from "react";
import { InputLabel, TextField} from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./AccountSetup.module.scss";
import Select from "../formUI/Select";

const settlementOptions = [
  {
    name: "Bank Account",
  },
];

const AddBankAccount = () => {
  const validate = Yup.object({
    phoneNumber: Yup.number()
      .integer()
      .typeError("Please enter a valid phone number")
      .required("Required"),
    bankName: Yup.string().required("Required"),
    accountNumber: Yup.number()
      .integer()
      .typeError("Please enter a valid phone number")
      .required("Required"),
    settlementType: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={{
        phoneNumber: "",
        bankName: "",
        accountNumber: "",
        settlementType: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(props) => (
        <div className={styles.modalContainer}>
          <div className={styles.modalColumn}>
            <div className={styles.modalHeader}>
              <div>
                <span>Add a bank account</span>
              </div>
              <hr />
            </div>
            <Form>
              <InputLabel className={styles.mt1}>
                <span>Phone Number</span>
              </InputLabel>
              <Field
                as={TextField}
                helperText={
                  <ErrorMessage name="phoneNumber">
                    {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                  </ErrorMessage>
                }
                name="phoneNumber"
                placeholder="Food Bank"
                variant="outlined"
                margin="normal"
                type="text/number"
                size="small"
                fullWidth
              />
              <InputLabel>
                <span>Bank Name</span>
              </InputLabel>
              <Field
                as={TextField}
                helperText={
                  <ErrorMessage name="bankName">
                    {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                  </ErrorMessage>
                }
                name="bankName"
                placeholder="email@email.com"
                variant="outlined"
                margin="normal"
                type="text"
                size="small"
                fullWidth
              />

              <InputLabel>
                <span>Account Number</span>
              </InputLabel>
              <Field
                as={TextField}
                helperText={
                  <ErrorMessage name="accountNumber">
                    {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                  </ErrorMessage>
                }
                name="accountNumber"
                placeholder="09087564534"
                variant="outlined"
                margin="normal"
                type="text/number"
                size="small"
                fullWidth
              />

              <InputLabel>
                <span>Settlement Type</span>
              </InputLabel>

              <Field
                as={Select}
                helperText={
                  <ErrorMessage name="settlementType">
                    {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                  </ErrorMessage>
                }
                name="settlementType"
                size="small"
                options={settlementOptions}
                defaultValue={settlementOptions[0]}
                style={{
                  marginTop: "1rem",
                }}
              />

              <InputLabel></InputLabel>
              <button
                style={{
                  backgroundColor: "#27AE60",
                  padding: "0.7rem",
                  marginTop: "1.5rem",
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
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddBankAccount;
