import React from "react";
import styles from "./TransactionsModals.module.scss";
import { InputLabel, TextField, Divider } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

interface stringTypes {
  data: {
    title: string;
    question: string;
    buttonText: string;
  };
}

const FlagTransactions = ({data}: stringTypes) => {
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
            </div><Divider />
           <div className={styles.modalBody}>
           <Form>
            <InputLabel>
                <span className={styles.black}>{data.question}</span>
              </InputLabel>
              <Field
                as={TextField}
                helperText={
                  <ErrorMessage name="comment">
                    {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                  </ErrorMessage>
                }
                name="comment"
                placeholder="Type your comment here"
                variant="outlined"
                margin="normal"
                type="text/number"
                multiline
                minRows={4}
                maxRows={6}
                size="small"
                fullWidth
              />

              <InputLabel></InputLabel>
              <button className={styles.buttonMargin}
                style={{
                  backgroundColor: "#EB5757",
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
            </Form>
           </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default FlagTransactions;
