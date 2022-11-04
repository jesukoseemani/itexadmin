import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./EmailTemplates.module.scss";

const ForgotPassword = () => {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.emailBody}>
          <h1 className={styles.mt}>Hello James,</h1>
          <p className={styles.mt}>
            We received a request to reset your password. Click the buton below
            to setup a new password.
          </p>
          <p className={styles.mt}>
            This link will expire after 20 minutes. If you didn’t request a
            password reset, ignore this email and continue using your current
            passwod.
          </p>
          <div className={styles.buttonDiv}>
            <button
              style={{
                backgroundColor: "#27AE60",
                padding: "0.7rem",
                width: "12rem",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                textAlign: "center",
              }}
              type="submit"
              color="primary"
            >
              Reset Your Password
            </button>
          </div>
          <div className={styles.push2}>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
