import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./EmailTemplates.module.scss";
import Email from "../../assets/images/Email.svg";
import { Divider } from "@material-ui/core";

const CustomerTransaction = () => {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.emailBody}>
          <p className={styles.transheader}>Hello,</p>
          <p className={styles.mt}>
            Your payment was successful and has been received by Bamboo Systems
            Technology Limited.
          </p>

          <div className={styles.mt}>
            <p className={styles.transheader}>NGN 15,000</p>
          </div>

          <div className={styles.mt}>
            <div className={styles.transactionWrapper}>
              <h3>Transaction details</h3>
              <div className={styles.transaction}>
                <div className={styles.left}>
                  <p>Transaction reference</p>
                  <p className={styles.mt}>Transaction date</p>
                </div>
                <div className={styles.right}>
                  <p>ITEX-ab95cf961f454669a4</p>
                  <p className={styles.mt}>2nd April, 2021</p>
                </div>
              </div>
              <div className={styles.mt}>
                <Divider />
              </div>
              <p className={styles.mt}>
                If you have questions or issues with this payment, contact James
                Haliday Limited at james@jameshaliday.com or simply reply to
                this email.
              </p>
            </div>
          </div>
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
              Download receipt as PDF
            </button>
          </div>
          <div className={styles.push}></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomerTransaction;
