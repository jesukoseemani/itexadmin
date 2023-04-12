import React, { useState } from "react";
import OtpInput from "react-otp-input";
import styles from "./styles.module.scss";
import * as Yup from "yup";

import { Grid, InputLabel, TextField } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { closeModal } from "../../redux/actions/modal/modalActions";
import { makeStyles } from '@material-ui/core';
import Select from '../../components/formUI/Select';
import { Box } from "@mui/material";








interface Props {
    code?: string;
    message: string;
}
const UpdateCountry = ({ id, currencyStatus, countrystatus }: any) => {
    console.log(id, currencyStatus, countrystatus, "idd");
    const dispatch = useDispatch()
    const auth = useSelector((state) => state?.authPayReducer?.auth);
    const access_token = auth?.access_token;

    const validate = Yup.object({
        currencyStatus: Yup.boolean().required("Required"),
        otp: Yup.number().required("Required"),
        countrystatus: Yup.boolean().required("Required"),
    });
    const url = `/v1/utility/countries/${id}/update`


    // const classes = useStyles()
    return (
        <div className={styles.blacklist__box}>
            <Box className={styles.headerTitle}>
                <h2>
                    Update Country Currencies </h2>
            </Box>
            <Box>
                <Formik
                    initialValues={{
                        countrystatus,
                        currencyStatus,
                        otp: ""
                    }}
                    validationSchema={validate}
                    onSubmit={async (values) => {
                        const { data } = await axios.post<Props>(url, values)
                        // console.log(blacklistCustomer);
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
                        console.log(values, "values")

                    }}
                >



                    {(props) => (
                        <div className={styles.blacklistmodalBody}>
                            <Form>
                                <Grid container spacing={2}>


                                    <Grid item xs={12}>
                                        <InputLabel>
                                            <span className={styles.header}>OTP</span>
                                        </InputLabel>


                                        <Field
                                            as={TextField}
                                            helperText={
                                                <ErrorMessage name="otp">
                                                    {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                </ErrorMessage>
                                            }
                                            name="otp"
                                            placeholder="otp"
                                            variant="outlined"
                                            margin="normal"
                                            type="number"
                                            size="small"
                                            fullWidth
                                        // value={custId}
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
}

export default UpdateCountry