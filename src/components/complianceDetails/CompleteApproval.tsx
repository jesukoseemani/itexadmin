import { Box } from "@mui/material";

import React, { useState } from "react";
import OtpInput from "react-otp-input";
import styles from "./styles.module.scss";
import * as Yup from "yup";

import { Grid, InputLabel, TextField } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";

import { makeStyles } from '@material-ui/core';
import Select from "../formUI/Select";
import axios from "axios";
import { closeModal } from '../../redux/actions/modal/modalActions';
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { useDispatch } from 'react-redux';




interface Props {
    code?: string;
    message: string;
}

const useStyles = makeStyles({
    root: {
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '& .MuiOutlinedInput-input.MuiInputBase-input.MuiInputBase-input.MuiOutlinedInput-input':
        {
            textAlign: 'center',
            padding: '8.1px 14px',
        },
    },
    select: {
        '& .MuiOutlinedInput-root': {
            color: '#414141',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '14px',
            lineHeight: '16px',
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            outline: 'none',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
            backgroundColor: '#ffffff',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#E0E0E0',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #E0E0E0',
        },
    },
});



const CompleteApproval = ({ id }: any) => {
    const dispatch = useDispatch()
    const [otp, setOtp] = useState("");
    console.log(id, "feefefefe")

    const validate = Yup.object({
        reason: Yup.string().required("Required"),
        otp: Yup.string().required("Required"),
        id: Yup.number().required("Required"),
        action: Yup.string().required("Required"),
        approvalType: Yup.string().required("Required"),
    });
    const actionOption = [
        {
            name: 'approve',
        },
        {
            name: 'reject',
        },
    ];

    const approvalTypes = [
        {
            name: 'BUSINESS',
        },
        {
            name: 'LIMIT',
        },
        {
            name: 'FEE',
        },
        {
            name: 'SCHEDULE',
        },
        {
            name: 'CONFIG',
        },
    ];


    const classes = useStyles();

    return (
        <div className={styles.approval__box}>
            <Box className={styles.headerTitle}>
                <h2>Complete approval</h2>
            </Box>
            <Box>
                <Formik
                    initialValues={{
                        reason: "",
                        otp: "",
                        id: id,
                        action: "",
                        approvalType: ""
                    }}
                    validationSchema={validate}
                    onSubmit={async (values) => {
                        const { data } = await axios.post<Props>("/v1/compliance/complete/approval", values)
                        console.log(data.message)
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
                        <div className={styles.approvalmodalBody}>
                            <Form >


                                <Grid item xs={12}>
                                    <InputLabel>
                                        <span className={styles.header}>Action</span>
                                    </InputLabel>

                                    <Field
                                        as={Select}

                                        helperText={
                                            <ErrorMessage name='action'>
                                                {(msg) => <span style={{ color: 'red' }}>{msg}</span>}
                                            </ErrorMessage>
                                        }
                                        name='action'
                                        size='small'
                                        options={actionOption}
                                        defaultValue={actionOption && actionOption[0]}
                                        className={classes.select}

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
                                        <span className={styles.header}>Approval Types</span>
                                    </InputLabel>

                                    <Field
                                        as={Select}

                                        helperText={
                                            <ErrorMessage name='approvalType'>
                                                {(msg) => <span style={{ color: 'red' }}>{msg}</span>}
                                            </ErrorMessage>
                                        }
                                        name='approvalType'
                                        size='small'
                                        options={approvalTypes}
                                        defaultValue={approvalTypes && approvalTypes[0]}
                                        className={classes.select}

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
                                        <span className={styles.header}>OTP</span>
                                    </InputLabel>

                                    {/* <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        //   name="otp"
                                        // name="otp"
                                        containerStyle={styles.otpBox}
                                        numInputs={5}
                                        renderSeparator={<span>-</span>}
                                        renderInput={(props) => <input {...props} name="otp" />}
                                        inputStyle={styles.otpInput}

                                    /> */}
                                    <Field
                                        as={TextField}
                                        helperText={
                                            <ErrorMessage name="otp">
                                                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                            </ErrorMessage>
                                        }
                                        name="otp"
                                        placeholder="Otp"
                                        variant="outlined"
                                        margin="normal"
                                        type="text"
                                        size="small"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} style={{ display: "none" }}>
                                    <InputLabel>
                                        <span className={styles.header}> ID</span>
                                    </InputLabel>
                                    <Field
                                        as={TextField}
                                        helperText={
                                            <ErrorMessage name="id">
                                                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                            </ErrorMessage>
                                        }
                                        name="id"
                                        placeholder="id"
                                        variant="outlined"
                                        margin="normal"
                                        type="number"
                                        size="small"
                                        fullWidth
                                        defaultValue={id}

                                    />
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <InputLabel>
                                            <span className={styles.header}>Reason</span>
                                        </InputLabel>
                                        <Field
                                            as={TextField}
                                            multiline
                                            minRows={4}
                                            helperText={
                                                <ErrorMessage name="reason">
                                                    {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                </ErrorMessage>
                                            }
                                            name="reason"
                                            placeholder="reason"
                                            variant="outlined"
                                            margin="normal"
                                            type="text/number"
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



export default CompleteApproval;

