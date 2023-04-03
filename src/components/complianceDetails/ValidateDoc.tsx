import { Box } from "@mui/material";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import styles from "./styles.module.scss";
import * as Yup from "yup";

import { Grid, InputLabel, TextField } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { closeModal } from "../../redux/actions/modal/modalActions";




interface MsgProps {
    code?: string;
    message: string;
}
const ValidateDoc = (doc: any) => {
    console.log(doc)
    const dispatch = useDispatch()
    const validate = Yup.object({
        passport_lastname: Yup.string().required("Required"),

    });


    return (
        <div className={styles.approval__box}>
            <Box className={styles.headerTitle}>
                <h2>Validate Doc</h2>
            </Box>
            <Box>
                <Formik
                    initialValues={{
                        merchantaccountid: doc?.doc?.merchantaccountid,
                        docid: doc?.doc?.id,
                        passport_lastname: "",


                    }}
                    validationSchema={validate}
                    onSubmit={async (values) => {
                        console.log(values)
                        const { data } = await axios.post<MsgProps>('/v1/compliance/business/docs/validate', values)
                        console.log(data)
                        if (data?.code === "success") {
                            dispatch(
                                openToastAndSetContent({
                                    toastContent: data?.message,
                                    toastStyles: {
                                        backgroundColor: 'green',
                                    },
                                })
                            );
                            dispatch(closeModal());

                        } else {
                            dispatch(
                                openToastAndSetContent({
                                    toastContent: data?.message,
                                    toastStyles: {
                                        backgroundColor: 'red',
                                    },
                                })
                            );
                        }
                    }}
                >
                    {(props) => (
                        <div className={styles.approvalmodalBody}>
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <InputLabel>
                                            <span className={styles.header}>Passport Lastnames</span>
                                        </InputLabel>
                                        <Field
                                            as={TextField}
                                            helperText={
                                                <ErrorMessage name="passport_lastname">
                                                    {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                </ErrorMessage>
                                            }
                                            name="passport_lastname"
                                            placeholder="passport_lastname"
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            size="small"
                                            fullWidth
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <button type="submit">Submit</button>
                                    </Grid>
                                </Grid>
                            </Form>
                        </div>
                    )}
                </Formik>
            </Box>
        </div>
    );
};

export default ValidateDoc