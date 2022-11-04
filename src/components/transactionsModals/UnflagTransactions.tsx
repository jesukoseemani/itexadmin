import React from "react";
import styles from "./TransactionsModals.module.scss";
import { Divider } from "@material-ui/core";


interface stringTypes {
  data: {
    title: string;
    body: string;
    question: string;
    buttonText: string;
  };
}

const UnflagTransactions = ({data}: stringTypes) => {
  return (
    <div className={styles.unflagmodalContainer}>
      <div className={styles.modalColumn}>
        <div className={styles.modalHeader}>
          <div>
            <span>{data.title}</span>
          </div>
        </div>
        <Divider />
        <div className={styles.textDiv}>
          <p>
           {data.body}
          </p>
          <p className={styles.mt1}>{data.question}</p>

          <button className={styles.buttonMargin}
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
                {data.buttonText}
              </button>
        </div>
      </div>
    </div>
  );
};

export default UnflagTransactions;
