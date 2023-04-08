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
import { makeStyles } from '@material-ui/core';
import Select from '../../components/formUI/Select';





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


const DisableInvoice = ({ id, setNavigate }: any) => {
    const dispatch = useDispatch()
    const [otp, setOtp] = useState("");
    const auth = useSelector((state) => state?.authPayReducer?.auth);
    const access_token = auth?.access_token;

    const validate = Yup.object({
        action: Yup.string().required("Required"),
        otp: Yup.number().required("Required"),
        id: Yup.number().required("Required"),
    });
    const url = "/v1/payment/disable"

    const actionOption = [
        {
            name: 'paymentlink',
        },
        {
            name: 'invoice',
        },
    ];

    const classes = useStyles()
    return (
        <div className={styles.blacklist__box}>
            <Box className={styles.headerTitle}>
                <h2>Disable Paymentlink/invoice</h2>
            </Box>
            <Box>
                <Formik
                    initialValues={{
                        action: "",
                        otp: "",
                        id
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
                            setNavigate(false)

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
                        setNavigate(false)
                    }}
                >



                    {(props) => (
                        <div className={styles.blacklistmodalBody}>
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <InputLabel>
                                            <span className={styles.header}>action</span>
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
                                            value={id}
                                            style={{ display: "none" }}
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


export default DisableInvoice