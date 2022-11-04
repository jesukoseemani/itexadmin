import { InputLabel, TextField } from "@material-ui/core";
import styles from "./Login.module.scss";
import Logo from "../../assets/images/NavLogo.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const LoginPasswordReset = () => {
  const history = useHistory();

  const validate = Yup.object({
    password: Yup.string()
    .min(6, "Password must be at least 6 charaters")
    .required("Password is required"),

    confirm_password: Yup.string()
    .min(6, "Password must be at least 6 charaters")
    .required("Please enter password again")
  });

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
        history.push("signin");
      }}
    >
      {(props) => (
        <div className={styles.signinContainer}>
          <div className={styles.logo}>
            <img src={Logo} alt="" />
          </div>
          <div className={styles.mt1}>
            <div className={styles.signinDiv}>
              <div className={styles.signinHeader}>
                <h5 className={styles.headerH}>New Password</h5>
                <p className={styles.mt1} />
                <p className={styles.headerP}>
                  Hello Felix, let’s set up a new password for your account
                </p>
              </div>
              <div className={styles.mt2}>
                <Form>
                  <InputLabel>
                    <span className={styles.formTitle}>New Password</span>
                  </InputLabel>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name="password">
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name="password"
                    placeholder="1234567890"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    size="small"
                    fullWidth
                  />

                  <InputLabel>
                    <span className={styles.formTitle}>Re-enter Password</span>
                  </InputLabel>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name="confirm_password">
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name="confirm_password"
                    placeholder="1234567890"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    size="small"
                    fullWidth
                  />
                  <InputLabel className={styles.mt1}></InputLabel>
                  <button
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
                    Continue
                  </button>
                </Form>
              </div>
            </div>
          </div>

          <div className={styles.sub}>
            <p className={styles.mt2}>
              <span className={styles.subP}>
                <a className={styles.signinAnchor}>
                  <span className={styles.desc}>Remember your password? </span>
                  Back to Login
                </a>
              </span>
            </p>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginPasswordReset;
