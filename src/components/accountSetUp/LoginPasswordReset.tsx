import { InputLabel, TextField } from "@material-ui/core";
import styles from "./Login.module.scss";
import Logo from "../../assets/images/NavLogo.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const LoginPasswordReset = () => {
  const history = useHistory();

  const validate = Yup.object({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email Address is required"),
  });

  const handleLogin = () => {
    history.push("signin");
  };

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
        history.push("/signin");
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
                <h5 className={styles.headerH}>Password Reset</h5>
                <p className={styles.mt1} />
                <p className={styles.headerP}>
                  Enter the email address associated with your account and we'll
                  send you a link to reset your password.
                </p>
              </div>
              <div className={styles.mt2}>
                <Form>
                  <InputLabel>
                    <span className={styles.formTitle}>Email Address</span>
                  </InputLabel>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage name="email">
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                      </ErrorMessage>
                    }
                    name="email"
                    placeholder="email@email.com"
                    variant="outlined"
                    margin="normal"
                    type="email"
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
                <a className={styles.signinAnchor} onClick={handleLogin}>
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
