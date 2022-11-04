import React from "react";
import styles from "./BusinessModal.module.scss";
import { Grid } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { InputLabel, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import BankAccount from "./BankAccountModal";
import * as Yup from "yup";
const RnDocument = () => {
  const dispatch = useDispatch();
  const modalHandler = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },

        modalContent: (
          <div className='modalDiv'>
            <BankAccount />
          </div>
        ),
      })
    );
  }
  const validate = Yup.object({
    bnNumber: Yup.string()
    .max(30, "Must be 11 characters")
    .required('This is required'),
    certificate: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Registered Address is required"),
    relevantDocument: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Office Address is required"),
    idDirector: Yup.string()
      .min(11, " must be at least 11 characters")
      .required("BVN is required"),
  });
  return (
    <div style={{ width: "100%", maxWidth: "400px", }}>
      <div className={styles.header}>
        <h3>Business document upload</h3>
      </div>
      <div style={{width : '80%', margin : '0 auto'}}>
        <Formik
          initialValues={{
            bnNumber: "",
            certificate: "",
            relevantDocument: "",
            idDirector : ""
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            console.log(values)
            modalHandler()
          }}
        >
          {(props) => (
            <Form>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <InputLabel>BN Number</InputLabel>
                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name='bnNumber'>
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name='bnNumber'
                  placeholder='1234567890'
                  variant='outlined'
                  margin='normal'
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid  item md={12} >
                <InputLabel>CAC Certificate</InputLabel>
                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name='certificate'>
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name='certificate'
                  placeholder='Choose file to upload'
                  variant='outlined'
                  margin='normal'
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid  item md={12}>
                <InputLabel>Any other relevant document</InputLabel>
                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name='relevantDocument'>
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name='relevantDocument'
                  placeholder='1234567890'
                  variant='outlined'
                  margin='normal'
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid  item md={12}>
                <InputLabel>Valid ID for one Director</InputLabel>
                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name='idDirector'>
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name='idDirector'
                  placeholder='Choose file to upload'
                  variant='outlined'
                  margin='normal'
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid  item md={12}>
                <Button
                  variant='contained'
                  style={{
                    background: "rgba(39, 174, 96, 1)",
                    color: "white",
                    marginTop: "0.8rem",
                    padding: "0.9rem",
                    marginBottom : '2rem'
                  }}
                  fullWidth
                  type='submit'
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RnDocument;
