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
import { MarketingModuleData } from '../../types/MarketingTypes';

const LogDetails = () => {
    interface ParamTypes {
        id: string;
    }

    const { id } = useParams<ParamTypes>();

    const dispatch = useDispatch()
    const history = useHistory()
    const [log, setLog] = useState<any>()

    const handleBackToMarketting = () => {
        history.push('/marketingmgt');
    };

    // fraud by id
    const getSingleLog = async () => {
        dispatch(openLoader());
        try {
            const { data } = await axios.get<any>(`/v1/marketing/email/log/${id}`)
            setLog(data?.mail)
            console.log(data, "logs")
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
        getSingleLog()

    }, [id])


    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <NavBar name='' />

            <Box>
                <div className={styles.m1}>
                    <span className={styles.back} onClick={handleBackToMarketting}>
                        <ArrowLeftIcon /> Back Marketing management
                    </span>
                </div>

                <div className={styles.settlementDetails}>
                    <div>


                        <Box sx={{ flexGrow: 1, margin: '0 1rem 1rem 2rem' }}>
                            <div className={styles.mt1}>


                                <Grid container spacing={10}>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}> id</p>
                                        <p className={styles.detail}>
                                            {/* <span className={styles.header}>2:21 PM</span> */}
                                            {log?.id}

                                        </p>
                                    </Grid>

                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>Firstname</p>
                                        <p className={styles.business}>
                                            {log?.user?.firstname}

                                        </p>
                                    </Grid>

                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Lastname</p>
                                        <p className={styles.detail}>
                                            {log?.user?.lastname}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={3}>
                                        <p className={styles.header}>User Email</p>
                                        <p className={styles.detail}>
                                            {log?.user?.email}

                                        </p>
                                    </Grid>
                                    <br />
                                    <Grid item md={2} xs={6} lg={3}>
                                        <p className={styles.header}>Fullname</p>
                                        <p className={styles.detail}>
                                            {log?.user?.fullname}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>User id</p>
                                        <p className={styles.detail}>
                                            {log?.user?.id}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={4}>
                                        <p className={styles.header}>Subject</p>
                                        <p className={styles.detail}>
                                            {log?.subject}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>Email</p>
                                        <p className={styles.detail}>
                                            {log?.email}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={3}>
                                        <p className={styles.header}>DateAdded</p>
                                        <p className={styles.detail}>
                                            {log?.dateAdded}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={5}>
                                        <p className={styles.header}>Messages</p>
                                        <p className={styles.detail}>
                                            {log?.message}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={3}>
                                        <p className={styles.header}>Date Sent</p>
                                        <p className={styles.detail}>
                                            {log?.dateSent}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>createdAt</p>
                                        <p className={styles.detail}>
                                            {log?.createdAt}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={3}>
                                        <p className={styles.header}>Date</p>
                                        <p className={styles.detail}>
                                            {log?.createdAt}

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

export default LogDetails