import React from "react";
import styles from "./TransactionsModals.module.scss";
import { InputLabel, TextField, Divider } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import {
  openLoader,
  closeLoader,
} from "../../redux/actions/loader/loaderActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveAuth } from "../../redux/actions/auth/authActions";
import { saveLoading } from "../../redux/actions/loadingState/loadingStateActions";
import { closeModal } from '../../redux/actions/modal/modalActions';
import * as Yup from "yup";
import axios from "axios";

const RefundTransaction = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const validate = Yup.object({
    ref: Yup.string().required("Required"),
    amount: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={{
        ref: "",
        amount: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        const inputValue = {
          ...values
        }
        dispatch(openLoader());

        axios({
          method: "POST",
          url: "/transaction/refund",
          data: {
            transaction: {
              merchantreference: inputValue?.ref,
            },
            order: {
              amount: inputValue?.amount,
              currency: "NGN",
            },
          },
        })
          .then((res) => {
            dispatch(closeLoader());
            dispatch(saveAuth(res.data));
            dispatch(saveLoading(true));
            dispatch(
              openToastAndSetContent({
                toastContent: "Log Refund Successful",
                toastStyles: {
                  backgroundColor: "green",
                },
              })
            );
            dispatch(closeModal());
          })
          .catch((err) => {
            dispatch(closeLoader());
            dispatch(saveLoading(false));
            dispatch(
              openToastAndSetContent({
                toastContent: "Log Refund Failed",
                toastStyles: {
                  backgroundColor: "red",
                },
              })
            );
          });
      }}
    >
      {(props) => (
        <div className={styles.modalContainer}>
          <div className={styles.modalColumn}>
            <div className={styles.modalHeader}>
              <div>
                <span>Log a Refund</span>
              </div>
            </div>
            <Divider />
            <div className={styles.modalBody}>
              <Form>
                <InputLabel>
                  <span className={styles.black}>Transaction Reference</span>
                </InputLabel>
                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name="ref">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="ref"
                  placeholder="124uu4werds"
                  variant="outlined"
                  margin="normal"
                  type="text/number"
                  size="small"
                  fullWidth
                />

                <InputLabel>
                  <span className={styles.black}>Amount</span>
                </InputLabel>
                <Field
                  as={TextField}
                  helperText={
                    <ErrorMessage name="amount">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="amount"
                  placeholder="NGN 100"
                  variant="outlined"
                  margin="normal"
                  type="text/number"
                  size="small"
                  fullWidth
                />

                <InputLabel></InputLabel>
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
                  Log Refund
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default RefundTransaction;
