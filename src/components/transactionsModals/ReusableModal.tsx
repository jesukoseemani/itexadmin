import React from "react";
import styles from "./TransactionsModals.module.scss";
import { InputLabel, Divider } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

interface stringTypes {
  data: {
    title: string;
    credit: string;
    debit: string;
    buttonText: string;
  };
}

const ReuseableModal = ({ data }: stringTypes) => {
  const validate = Yup.object({
    comment: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={{
        comment: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(props) => (
        <div className={styles.modalContainer}>
          <div className={styles.modalColumn}>
            <div className={styles.modalHeader}>
              <div>
                <span>{data.title}</span>
              </div>
            </div>
            <Divider />
            <div className={styles.modalBody}>
              <Form>
                <InputLabel>
                  <span className={styles.black}>Credit</span>
                </InputLabel>
                <p className={styles.mt1}></p>
                <p className={styles.detail}>{data.credit}</p>

                <p className={styles.mt2}></p>
                <InputLabel>
                  <span className={styles.black}>Debit</span>
                </InputLabel>
                <p className={styles.mt1}></p>
                <p className={styles.detail}>{data.debit}</p>
              </Form>
            </div>
            <Divider />
            <div className={styles.mrl2}>
            <button
              className={styles.buttonMargin}
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
      )}
    </Formik>
  );
};

export default ReuseableModal;
