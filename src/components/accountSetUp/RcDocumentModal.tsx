import React from "react";
import styles from "./BusinessModal.module.scss";
import { Grid } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { InputLabel, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import RnDocument from "./RnDocumentModal";
import * as Yup from "yup";
const RcDocument = () => {
  const validate = Yup.object({
    rcNumber: Yup.string()
    .max(30, "Must be 11 characters")
    .required('This is required'),
    certificate: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Registered Address is required"),
    relevantDocument: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Office Address is required"),
      firstDirector: Yup.string()
      .min(11, " must be at least 11 characters")
      .required("BVN is required"),
      secondDirector: Yup.string()
      .min(11, "Must be at least 11 characters")
      .required("NIN is required"),
       bvnDirector: Yup.string()
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
            <RnDocument />
          </div>
        ),
      })
    );
  }
  return (
    <div style={{padding : '1rem'}}>
      <div className={styles.header}>
        <h3>Business document upload</h3>
      </div>
      <div className={styles.wrapper}>
        <Formik
          initialValues={{
            rcNumber: "",
            certificate: "",
            relevantDocument: "",
            firstDirector : "",
            secondDirector : "",
            bvnDirector : ""
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            console.log(values)
            modalHandler()
          }}
        >
          {(props) => (
            <Form>
            <Grid>
              <Grid container spacing={2} item md={12}>
                <Grid item md={6}>
                  <InputLabel>RC Number</InputLabel>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name='rcNumber'>
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name='rcNumber'
                    placeholder='1234567890'
                    variant='outlined'
                    margin='normal'
                    size='small'
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
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
                <Grid item md={6}>
                  <InputLabel>Any other revelant document</InputLabel>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name='relevantDocument'>
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name='relevantDocument'
                    placeholder='Choose file to upload'
                    variant='outlined'
                    margin='normal'
                    size='small'
                    fullWidth
                  />
                </Grid>
              </Grid>
              <div className ={styles.header}></div>
              <Grid container spacing={2} item md={12}>
                <Grid item md={6}>
                  <InputLabel>ID for first Director</InputLabel>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name='firstDirector'>
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name='firstDirector'
                    placeholder='Choose file to upload'
                    variant='outlined'
                    margin='normal'
                    size='small'
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel>ID for second Director</InputLabel>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name='secondDirector'>
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name='secondDirector'
                    placeholder='Choose file to upload'
                    variant='outlined'
                    margin='normal'
                    size='small'
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel>BVN for the second Director</InputLabel>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name='bvnDirector'>
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name='bvnDirector'
                    placeholder='1234567890'
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
                  >Continue</Button>
                </Grid>
              </Grid>
            </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RcDocument;
