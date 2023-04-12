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
import Select from "../../components/formUI/Select";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';



interface Props {
    code?: string;
    message: string;
}

const Sendmessages = ({ custId }: any) => {
    const [value, setValue] = useState('');
    const { quill, quillRef } = useQuill();

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
    const dispatch = useDispatch()
    const [otp, setOtp] = useState("");
    const auth = useSelector((state) => state?.authPayReducer?.auth);
    const access_token = auth?.access_token;
    React.useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                console.log('Text change!');
                // console.log(); // Get text only
                setValue(quill.getText())


            });
        }
    }, [quill]);



    // console.log(value)
    const actionOption = [
        {
            name: 'TEST',
        },
        {
            name: 'ALL_BUSINESSES',
        },
        {
            name: 'ADMIN_USERS',
        },
        {
            name: 'TOP_BUSINESSES',
        },
        {
            name: '30DAYS_BUSINESSES',
        },
        {
            name: 'LIVE_BUSINESSES',
        },
        {
            name: 'ZERO_BUSINESSES',
        },
    ];
    const validate = Yup.object({
        recipients: Yup.string().required("Required"),
        subject: Yup.string().required("Required"),
        otp: Yup.number().required("Required"),
        message: Yup.string().required("Required")
    });
    const url = "/v1/marketing/send/email"


    const classes = useStyles();
    return (
        <div className={styles.blacklist__box}>
            <Box className={styles.headerTitle}>
                <h2>Send Messages</h2>
            </Box>
            <Box>
                {/* <input type="text" onChange={(e) =>} name="" id="" /> */}
                <Formik
                    initialValues={{
                        recipients: "",
                        subject: "",
                        otp: "",
                        message: value
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
                                            <span className={styles.header}>Receipients</span>
                                        </InputLabel>

                                        <Field
                                            as={Select}

                                            helperText={
                                                <ErrorMessage name='recipients'>
                                                    {(msg) => <span style={{ color: 'red' }}>{msg}</span>}
                                                </ErrorMessage>
                                            }
                                            name='recipients'
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
                                            <span className={styles.header}>Subject</span>
                                        </InputLabel>
                                        <Field
                                            as={TextField}
                                            multiline
                                            rows={2}
                                            helperText={
                                                <ErrorMessage name="subject">
                                                    {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                </ErrorMessage>
                                            }
                                            name="subject"
                                            placeholder="Subject"
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            size="small"
                                            fullWidth
                                            ref={quillRef}
                                        />
                                    </Grid>

                                    <Grid xs={12}>
                                        <InputLabel>
                                            <span className={styles.header}>Messages</span>
                                        </InputLabel>
                                        {/* <Box width={"100%"} sx={{ width: "100%", minHeight: "300px" }}> */}

                                        <Field
                                            as={TextField}
                                            multiline
                                            rows={5}
                                            helperText={
                                                <ErrorMessage name="message">
                                                    {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                </ErrorMessage>
                                            }
                                            name="message"
                                            placeholder="message"
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            size="small"
                                            fullWidth
                                        />
                                        {/* <ReactQuill theme="snow" value={value} onChange={setValue} className={styles.editor} />; */}


                                        {/* <div ref={quillRef} defaultValue={value} style={{ color: "#000", width: "100%", minHeight: "200px" }} ></div> */}

                                        {/* </Box> */}
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


export default Sendmessages