import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./EmailTemplates.module.scss";
import { Divider } from "@material-ui/core";

const MerchantTransaction = () => {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.emailBody}>
        <p className={styles.transheader}>Hello,</p>
          <p className={styles.mt}>
            You have a successful transaction from James Segun Odunlade.
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
                  <p className={styles.mt}>Transaction Fee (Customer)</p>
                  <p className={styles.mt}>Payment Method</p>
                </div>
                <div className={styles.right}>
                  <p>ITEX-ab95cf961f454669a4</p>
                  <p className={styles.mt}>2nd April, 2021</p>
                  <p className={styles.mt}>NGN 4.45</p>
                  <p className={styles.mt}>Card</p>
                </div>
              </div>
              <div className={styles.mt}>
                <Divider />
              </div>
              <p className={styles.mt}>
                If you have questions or issues with this payment, check out our
                <span className={styles.unsubscribe}> FAQ</span> portal or simply reply to this email.
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
              Go to your Dashboard
            </button>
          </div>
          <div className={styles.push}></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MerchantTransaction;
