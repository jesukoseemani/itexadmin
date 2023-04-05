import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/NavBar'
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { FraudModuleData } from '../../types/FraudTypes';



const FraudDetails = () => {
    interface ParamTypes {
        id: string;
    }

    const { id } = useParams<ParamTypes>();

    const dispatch = useDispatch()
    const history = useHistory()
    const [fraud, setFraud] = useState<any>()

    const handleBackTofraud = () => {
        history.push('/fraudmgt');
    };

    // fraud by id
    const getFraudMgt = async () => {
        dispatch(openLoader());
        try {
            const { data } = await axios.get<any>(`/v1/fraudmgt/flagged/${id}`)
            setFraud(data?.flagged)
            console.log(data, "fraudid")
        } catch (err: any) {
            dispatch(closeLoader());
            const { message } = err?.response.data;
            dispatch(
                dispatch(
                    openToastAndSetContent({
                        toastContent: message,
                        toastStyles: {
                            backgroundColor: 'red',
                        },
                    })
                )
            );

        } finally {
            dispatch(closeLoader());

        }

    }

    useEffect(() => {
        getFraudMgt()

    }, [id])


    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <NavBar name='' />

            <Box>
                <div className={styles.m1}>
                    <span className={styles.back} onClick={handleBackTofraud}>
                        <ArrowLeftIcon /> Back Fraud management
                    </span>
                </div>

                <div className={styles.settlementDetails}>
                    <div>


                        <Box sx={{ flexGrow: 1, margin: '0 1rem 1rem 2rem' }}>
                            <div className={styles.mt1}>


                                <Grid container spacing={1}>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>Fraud id</p>
                                        <p className={styles.detail}>
                                            {/* <span className={styles.header}>2:21 PM</span> */}
                                            {fraud?.id}

                                        </p>
                                    </Grid>

                                    <Grid item md={2} xs={6} lg={4}>
                                        <p className={styles.header}>Payment id</p>
                                        <p className={styles.business}>
                                            {fraud?.paymentid}

                                        </p>
                                    </Grid>

                                    <Grid item md={3} xs={6} lg={3}>
                                        <p className={styles.header}>Flag</p>
                                        <p className={styles.detail}>
                                            {fraud?.flag}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={4}>
                                        <p className={styles.header}>Activity</p>
                                        <p className={styles.detail}>
                                            {/* {apiRes?.settlements[0]?.tradingname} */}
                                            {fraud?.activity}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>Status</p>
                                        <p className={styles.detail}>
                                            {/* {apiRes?.settlements[0]?.tradingname} */}
                                            {fraud?.status}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>Priority</p>
                                        <p className={styles.detail}>
                                            {/* {apiRes?.settlements[0]?.tradingname} */}
                                            {fraud?.priority}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>Masked</p>
                                        <p className={styles.detail}>
                                            {/* {apiRes?.settlements[0]?.tradingname} */}
                                            {fraud?.masked}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>Bin</p>
                                        <p className={styles.detail}>
                                            {/* {apiRes?.settlements[0]?.tradingname} */}
                                            {fraud?.bin}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>Last4</p>
                                        <p className={styles.detail}>
                                            {/* {apiRes?.settlements[0]?.tradingname} */}
                                            {fraud?.last4}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>Date</p>
                                        <p className={styles.detail}>
                                            {/* {apiRes?.settlements[0]?.tradingname} */}
                                            {fraud?.createdat}

                                        </p>
                                    </Grid>


                                </Grid>
                            </div>



                            <h3>Customer</h3>
                            <Grid container spacing={1}>
                                <Grid item md={2} xs={6} lg={2}>
                                    <p className={styles.header}>Id</p>
                                    <p className={styles.detail}>
                                        {/* {apiRes?.settlements[0]?.initiatedat} */}
                                        {fraud?.id}

                                    </p>
                                </Grid>

                                <Grid item md={2} xs={6} lg={2}>
                                    <p className={styles.header}>first name</p>
                                    <p className={styles.detail}>
                                        {/* {apiRes?.settlements[0]?.initiatedat} */}
                                        {fraud?.customer?.firstname}
                                    </p>
                                </Grid>
                                <Grid item md={2} xs={6} lg={2}>
                                    <p className={styles.header}>Last name</p>
                                    <p className={styles.detail}>
                                        {/* {apiRes?.settlements[0]?.initiatedat} */}
                                        {fraud?.customer?.lastname}
                                    </p>
                                </Grid>

                                <Grid item md={3} xs={6} lg={3}>
                                    <p className={styles.header}>Email address</p>
                                    <p className={styles.detail}>
                                        {/* {apiRes?.settlements[0]?.settlementid} */}
                                        {fraud?.customer?.email}

                                    </p>
                                </Grid>

                                <Grid item md={2} xs={6} lg={3}>
                                    <p className={styles.header}>Identifier</p>
                                    <p className={styles.detail}>
                                        {/* {apiRes?.settlements[0]?.amount} */}
                                        {fraud?.customer?.identifier}

                                    </p>
                                </Grid>

                            </Grid>

                            <div className={styles.mt1}>
                                <h3>Business</h3>

                                <Grid container spacing={1}>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>Business email</p>
                                        <p className={styles.detail}>
                                            {/* <span className={styles.header}>2:21 PM</span> */}
                                            {fraud?.business?.businessemail}

                                        </p>
                                    </Grid>

                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>Merchant code</p>
                                        <p className={styles.business}>
                                            {fraud?.business?.merchantcode}

                                        </p>
                                    </Grid>

                                    <Grid item md={3} xs={6} lg={3}>
                                        <p className={styles.header}>Trading name</p>
                                        <p className={styles.detail}>
                                            {fraud?.business?.tradingname}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>merchantcode</p>
                                        <p className={styles.detail}>
                                            {/* {apiRes?.settlements[0]?.tradingname} */}
                                            {fraud?.business?.merchantcode}

                                        </p>
                                    </Grid>


                                </Grid>
                            </div>

                        </Box>
                    </div>
                </div>
            </Box>
        </div>
    )
}



export default FraudDetails