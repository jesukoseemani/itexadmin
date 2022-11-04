import { InputLabel, TextField, Button } from "@material-ui/core";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import styles from "../SignUp/SignUpPage/style.module.scss";
import Logo from "../../assets/images/NavLogo.svg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// const CssTextField = withStyles({
//     root: {
//     //   '& label.Mui-focused': {
//     //     color: 'green',
//     //   },
//     //   '& .MuiInput-underline:after': {
//     //     borderBottomColor: 'green',
//     //   },
//       '& .MuiOutlinedInput-root': {
//         '& Field as = {TextField}set': {
//           border: '1px solid #DDDDDD',
//         },
//         '&:hover Field as = {TextField}set': {
//             border: '1px solid ##27AE60',
//         },
//         '&.Mui-focused Field as = {TextField}set': {
//             border: '1px solid ##27AE60',
//         },
//       },
//     },
//   })(Field as = {TextField});

const createAccount = [
  {
    id: "FS",
    title: "Fast and free sign up",
    description: "Enter your details to create an account.",
    icon: <CheckCircleIcon sx={{ color: "#60C090" }} />,
  },

  {
    id: "SA",
    title: "Start accepting payments .",
    description:
      "Start accepting payment using our infrastructure from customers anywhere in the world.",
    icon: <CheckCircleIcon sx={{ color: "#60C090" }} />,
  },

  {
    id: "MP",
    title: "Multiple payment options",
    description: "Accept credit / debit cards, USSD, Bank transfer and more.",
    icon: <CheckCircleIcon sx={{ color: "#60C090" }} />,
  },
];

const SignUp = () => {
  const [json, setJson] = useState<string>();

  const validate = Yup.object({
    fullName: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Full Name is required"),
    email: Yup.string()
      .email("Email is invalid")
      .required("Email Address is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    country: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Country is required"),
    optional: Yup.string().max(15, "Must be 15 characters or less"),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref("password"), null], "Password must match")
    //   .required("Confirm password is required"),
  });

  return (
    <>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          country: "",
          optional: "",
          // confirmPassword: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(props) => (
          <div className={styles.signupContainer}>
            <div className={styles.logo}>
              <img src={Logo} alt='' />
            </div>
            <div className={styles.signupDiv}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <h4 className={styles.header}>Create Account</h4>
                  {createAccount.map(({ id, title, description, icon }) => (
                    <div key={id}>
                      <List key={id}>
                        <div className={styles.signupList}>
                          <div>
                            <ListItemIcon>{icon}</ListItemIcon>
                          </div>

                          <div>
                            <ListItemText>
                              <h5 className={styles.title}>{title}</h5>
                              <p className={styles.desc}>{description}</p>
                            </ListItemText>
                          </div>
                        </div>
                      </List>
                    </div>
                  ))}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Form>
                    <InputLabel>
                      <span className={styles.formTitle}>Full Name</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name='fullName'>
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name='fullName'
                      variant='outlined'
                      margin='normal'
                      size='small'
                      fullWidth
                      required
                    />
                    <InputLabel>
                      <span className={styles.formTitle}>Email Address</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name='email'>
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name='email'
                      variant='outlined'
                      margin='normal'
                      type='email'
                      size='small'
                      fullWidth
                    />
                    <InputLabel>
                      <span className={styles.formTitle}>Password</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name='password'>
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name='password'
                      variant='outlined'
                      margin='normal'
                      type='password'
                      size='small'
                      fullWidth
                    />
                    <InputLabel>
                      <span className={styles.formTitle}>Country</span>
                    </InputLabel>
                    <Field
                      as={TextField}
                      helperText={
                        <ErrorMessage name='country'>
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      }
                      name='country'
                      variant='outlined'
                      margin='normal'
                      size='small'
                      fullWidth
                    />

                    <InputLabel>
                      How did you hear about us? (Optional)
                    </InputLabel>
                    <TextField
                      variant='outlined'
                      margin='normal'
                      size='small'
                      fullWidth
                    />
                    <InputLabel className={styles.mt1}></InputLabel>
                    <Button
                      style={{
                        backgroundColor: "#27AE60",
                        padding: "1.5rem",
                      }}
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                    >
                      Create Account
                    </Button>
                    <InputLabel className={styles.mt1}>
                      By clicking the “Create account” button, you agree to
                      Itex’s terms and conditions.
                    </InputLabel>
                  </Form>
                </Grid>
              </Grid>
            </div>

            <div className={styles.sub}>
              <p>
                <span className={styles.subP}>Already have an account?</span>
                <a href="''">Log in</a>
              </p>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default SignUp;

// import React from "react";
// import {
//   Container,
//   Wrapper,
//   RightContent,
//   LeftContent,
//   FormContainer,
//   Button,
//   Form,
//   MainContent,
//   FlexedItem,
// } from "./SignUpElements";
// import MarkSvg from "../../assets/images/mark.svg";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import MenuItem from "@mui/material/MenuItem";
// const SignUp = () => {

// const validate = Yup.object({
// 	merchant_id: Yup.string().required('Is required'),
// 	operator_id: Yup.string().required('Is required'),
// 	password: Yup.string().required('Password is required'),
// });
//   return (
//     <Container>
//       <Wrapper>
//         <LeftContent>
//           <h1>Create account</h1>
//           <MainContent>
//             <FlexedItem>
//               <div className='mark__svg'>
//                 <img src={MarkSvg} alt='mark svg' />
//               </div>

//               <div>
//                 <h2>Fast and free sign up</h2>
//                 <p>Enter your details to create an account.</p>
//               </div>
//             </FlexedItem>
//             <FlexedItem>
//               <div className='mark__svg'>
//                 <img src={MarkSvg} alt='mark svg' />
//               </div>
//               <div>
//                 <h2>Start accepting payments </h2>
//                 <p>
//                   Start accepting payment using our infrastructure from
//                   customers anywhere in the world.
//                 </p>
//               </div>
//             </FlexedItem>
//             <FlexedItem>
//               <div className='mark__svg'>
//                 <img src={MarkSvg} alt='mark svg' />
//               </div>
//               <div>
//                 <h2> Multiple payment options</h2>
//                 <p>
//                   Start accepting payment using our infrastructure from
//                   customers anywhere in the world.
//                 </p>
//               </div>
//             </FlexedItem>
//           </MainContent>
//         </LeftContent>
//         <RightContent>
//           <FormContainer>

//             <Form>
//               <div>
//                 <label>Full name</label>
//                 <input placeholder='James Bond'required />
//               </div>
//               <div>
//                 <label>Business name</label>
//                 <input placeholder='Tech Business' required />
//               </div>
//               <div>
//                 <label>Business Category</label>
//                 {/* <input placeholder='James Bond' /> */}
//                 <Select
//                   labelId='demo-simple-select-label'
//                   id='demo-simple-select'
//                   label='Technology'
//                   fullWidth
//                   size="small"
//                 >
//                   <MenuItem value={10}>Ten</MenuItem>
//                   <MenuItem value={20}>Twenty</MenuItem>
//                   <MenuItem value={30}>Thirty</MenuItem>
//                 </Select>
//               </div>
//               <div>
//                 <label>Your Position in the business</label>
//                 <Select
//                   labelId='demo-simple-select-label'
//                   id='demo-simple-select'
//                   label='Technology'
//                   fullWidth
//                   size="small"
//                 >
//                   <MenuItem value={10}>Ten</MenuItem>
//                   <MenuItem value={20}>Twenty</MenuItem>
//                   <MenuItem value={30}>Thirty</MenuItem>
//                 </Select>
//               </div>
//               <div>
//                 <label>Email</label>
//                 <input placeholder='James Bond' required/>
//               </div>
//               <div>
//                 <label>Phone Number</label>
//                 <input placeholder='James Bond' required/>
//               </div>
//               <div>
//                 <label>Password</label>
//                 <input placeholder='James Bond' required />
//               </div>
//               <div>
//                 <label>Country</label>
//                 <Select
//                   labelId='demo-simple-select-label'
//                   id='demo-simple-select'
//                   label='Technology'
//                   fullWidth
//                   size="small"
//                 >
//                   <MenuItem value={10}>Ten</MenuItem>
//                   <MenuItem value={20}>Twenty</MenuItem>
//                   <MenuItem value={30}>Thirty</MenuItem>
//                 </Select>
//               </div>
//               <div>
//                 <label>How did you hear about us</label>
//                 <input placeholder='James Bond' required/>
//               </div>
//               <div>
//                 <label></label>
//                 <div>
//                   <Button>Create account</Button>
//                   <p className='terms__'>
//                     By clicking the “Create account” button, you agree to Itex’s
//                     terms and conditions.
//                   </p>
//                 </div>
//               </div>
//             </Form>

//           </FormContainer>
//         </RightContent>
//       </Wrapper>
//     </Container>
