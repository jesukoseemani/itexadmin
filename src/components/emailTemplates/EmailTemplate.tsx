import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./EmailTemplates.module.scss";
import Email from "../../assets/images/Email.svg";

const EmailTemplate = () => {
  return (
    <div>
      <Header />
      <div className={styles.emailWrapper}>
        <div className={styles.emailBody}>
          <h1 className={styles.mt}>Hello James,</h1>
            <p className={styles.mt}>
              My, philosophy is, basically this. And this is something that I
              live by. And I always have. And I always will. Don’t, ever, for
              any reason, do anything, to anyone, for any reason, ever, no
              matter what, no matter where, or who you are with, or, or where
              you are going, or, or where you’ve been. Ever. For any reason.
              Whatsoever.
            </p>

          <div className={styles.mt}>
            <img
              src={Email}
              alt="Email"
              style={{
                width: "70vw",
                height: "35vw",
                display: "block",
                margin: "auto",
              }}
            />
          </div>
          
            <p className={styles.mt}>
              My, philosophy is, basically this. And this is something that I
              live by. And I always have. And I always will. Don’t, ever, for
              any reason, do anything, to anyone, for any reason, ever, no
              matter what, no matter where, or who you are with, or, or where
              you are going, or, or where you’ve been. Ever. For any reason.
              Whatsoever.
            </p>
          
          <div className={styles.buttonDiv}>
            <button
              style={{
                backgroundColor: "#27AE60",
                padding: "0.7rem",
                width: "6.6rem",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                textAlign: "center",
              }}
              type="submit"
              color="primary"
            >
              CTA Text
            </button>
          </div>
          <div className={styles.push}></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmailTemplate;
