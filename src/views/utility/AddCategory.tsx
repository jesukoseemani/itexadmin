import { Box } from "@mui/material";
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


interface Props {
    code?: string;
    message: string;
}
interface addProps {
    categoryCode: string;
    categoryid: number;
    categoryName: string
}


const AddCategory = ({ categoryid, categoryCode, categoryName }: addProps) => {



    const dispatch = useDispatch()


    console.log(categoryid, categoryCode, categoryName);


    const validate = Yup.object({
        categoryName: Yup.string().required("Required"),
        categoryCode: Yup.string().required("Required"),
        otp: Yup.number().required("Required"),
        categoryid: Yup.number()
    });
    const url = "/v1/utility/business/categories"

    return (
        <div className={styles.blacklist__box}>
            <Box className={styles.headerTitle}>
                <h2>Add/Edit category</h2>
            </Box>
            <Box>
                {/* <input type="text" onChange={(e) =>} name="" id="" /> */}
                <Formik
                    initialValues={{
                        categoryid: categoryid || "",
                        categoryName: categoryName || "",
                        categoryCode: categoryCode || "",
                        otp: "",

                    }}
                    validationSchema={validate}
                    onSubmit={async (values) => {
                        const { data } = await axios.post<Props>(url, values)

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
                        <div className={styles.blacklistmodalBody} style={{ width: "100%" }}>
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <InputLabel>
                                            <span className={styles.header}>category Id</span>
                                        </InputLabel>

                                        <Field
                                            as={TextField}

                                            helperText={
                                                <ErrorMessage name='categoryid'>
                                                    {(msg) => <span style={{ color: 'red' }}>{msg}</span>}
                                                </ErrorMessage>
                                            }
                                            name="categoryid"
                                            placeholder="categoryid"
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            size="small"
                                            fullWidth
                                            defaultValue={categoryid}



                                            // fullWidth
                                            style={{
                                                marginTop: '8px',
                                                marginBottom: '22px',
                                                width: "100%"
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputLabel>
                                            <span className={styles.header}>CategoryName</span>
                                        </InputLabel>

                                        <Field
                                            as={TextField}

                                            helperText={
                                                <ErrorMessage name='categoryName'>
                                                    {(msg) => <span style={{ color: 'red' }}>{msg}</span>}
                                                </ErrorMessage>
                                            }
                                            name="categoryName"
                                            placeholder="categoryName"
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            size="small"
                                            fullWidth
                                            defaultValue={categoryName}



                                            // fullWidth
                                            style={{
                                                marginTop: '8px',
                                                marginBottom: '22px',
                                                width: "100%"
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputLabel>
                                            <span className={styles.header}>categoryCode</span>
                                        </InputLabel>
                                        <Field
                                            as={TextField}

                                            helperText={
                                                <ErrorMessage name="categoryCode">
                                                    {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                </ErrorMessage>
                                            }
                                            name="categoryCode"
                                            placeholder="categoryCode"
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            size="small"
                                            defaultValue={categoryCode}
                                            fullWidth

                                        />
                                    </Grid>






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
};


export default AddCategory
