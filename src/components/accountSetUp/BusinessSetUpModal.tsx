import React from "react";
import styles from "./BusinessModal.module.scss";
import { InputLabel, TextField, Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import DocumentUpload from './DocumentUpload'
import * as Yup from "yup";
const BusinessContent = () => {
  const validate = Yup.object({
    registeredAddress: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Registered Address is required"),
    officeAddress: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Office Address is required"),
    business: Yup.string()
      .min(10, "Must be at least 10 characters")
      .required("This is required"),
    businessLogo: Yup.string()
      .min(6, "This is required")
      .required("Business Logo is required"),
    supportEmail: Yup.string().email("Email is invalid"),
    chargebackEmail: Yup.string().email("Email is invalid"),
    website: Yup.string().min(6, "Must be at least 6 characters"),
    bvn: Yup.string()
      .min(11, " must be at least 11 characters")
      .required("BVN is required"),
    nin: Yup.string()
      .min(11, "Must be at least 11 characters")
      .required("NIN is required"),
    dateOfBirth: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("This is required"),
  });

  const dispatch = useDispatch();
  const modalHandler = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },

        modalContent: (
          <div className='modalDiv'>
            <DocumentUpload />
          </div>
        ),
      })
    );
  }
  return (
    <div className={styles.container} >
      <div className={styles.header}>
        <h3>Business Profile Setup</h3>
      </div>
      <div style={{ margin: "2rem auto 0 auto", width: "90%", paddingBottom : '1rem'}}>
        <Formik
          initialValues={{
            registeredAddress: "",
            officeAddress: "",
            business: "",
            businessLogo: "",
            supportEmail: "",
            chargebackEmail: "",
            website: "",
            bvn: "",
            nin: "",
            dateOfBirth: "",
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
                <Grid item md={6}>
                  <div>
                    <InputLabel>Registered Address</InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name='registeredAddress'>
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name='registeredAddress'
                      placeholder='1James street, Lekki Phase 1, Lagos'
                      variant='outlined'
                      margin='normal'
                      size='small'
                      fullWidth
                    />
                  </div>
                </Grid>

                <Grid item sm={12} md={6}>
                  {" "}
                  <InputLabel>Office Address</InputLabel>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name='officeAddress'>
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name='officeAddress'
                    placeholder='1James street, Lekki Phase 1, Lagos'
                    variant='outlined'
                    margin='normal'
                    size='small'
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  {" "}
                  <InputLabel>What does your business do?</InputLabel>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name='business'>
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name='business'
                    placeholder='The business is a tech startup that builds enterprise software for businesses.'
                    variant='outlined'
                    margin='normal'
                    size='small'
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel>Support Email (Optional)</InputLabel>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name='supportEmail'>
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name='supportEmail'
                    placeholder='email@email.com'
                    variant='outlined'
                    margin='normal'
                    size='small'
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel>Chargeback email (Optional)</InputLabel>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name='chargebackEmail'>
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name='chargebackEmail'
                    placeholder='chargeback@email.com'
                    variant='outlined'
                    margin='normal'
                    size='small'
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel>Website URL (Optional)</InputLabel>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name='website'>
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name='website'
                    placeholder='www.website.com'
                    variant='outlined'
                    margin='normal'
                    size='small'
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel>Business Logo</InputLabel>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name='businessLogo'>
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name='businessLogo'
                    placeholder='Choose file upload'
                    variant='outlined'
                    margin='normal'
                    size='small'
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel>BVN</InputLabel>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name='bvn'>
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name='bvn'
                    placeholder='1234567890'
                    variant='outlined'
                    margin='normal'
                    size='small'
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel>NIN</InputLabel>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name='nin'>
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name='nin'
                    placeholder='1234567890'
                    variant='outlined'
                    margin='normal'
                    size='small'
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel>Date of birth</InputLabel>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name='dateOfBirth'>
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name='dateOfBirth'
                    placeholder='10/04/2000'
                    variant='outlined'
                    margin='normal'
                    size='small'
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel style={{ marginTop: "1rem" }}></InputLabel>
                  <Button
                    variant='contained'
                    style={{
                      background: "rgba(39, 174, 96, 1)",
                      color: "white",
                      marginTop: "0.8rem",
                      padding: "0.9rem",
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

export default BusinessContent;
