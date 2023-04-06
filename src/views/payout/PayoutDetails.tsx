import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/NavBar'
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { PayoutModuleData } from '../../types/PayoutTypes';

const PayoutDetails = () => {
    interface ParamTypes {
        id: string;
    }

    const { id } = useParams<ParamTypes>();

    const dispatch = useDispatch()

    const location = useLocation();
    const history = useHistory();
    const [payoutdetails, setPayoutDetails] = useState<any>()

    const goBack = () => {
        history.push('/payout');
    };

    // fraud by id
    const getSinglepayoutdetails = async () => {
        dispatch(openLoader());
        try {
            const { data } = await axios.get<PayoutModuleData>(`/v1/payout/${id}`)
            setPayoutDetails(data)
            console.log(data, "payoutdetailss")
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
        getSinglepayoutdetails()

    }, [id])


    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <NavBar name='' />

            <Box>
                <div className={styles.m1}>
                    <span className={styles.back} onClick={goBack}>
                        <ArrowLeftIcon /> Back Payout management
                    </span>
                </div>

                <div className={styles.settlementDetails}>
                    <div>


                        <Box sx={{ flexGrow: 1, margin: '0 1rem 1rem 2rem' }}>
                            <div className={styles.mt1}>

                                <h3>User</h3>

                                <Grid container spacing={10}>

                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>Firstname</p>
                                        <p className={styles.business}>
                                            {payoutdetails?.payout?.user?.firstname}

                                        </p>
                                    </Grid>

                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Lastname</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.user?.lastname}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={4}>
                                        <p className={styles.header}>User Email</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.user?.email}

                                        </p>
                                    </Grid>
                                    <br />
                                    <Grid item md={2} xs={6} lg={3}>
                                        <p className={styles.header}>Fullname</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.user?.fullname}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>User id</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.user?.id}

                                        </p>
                                    </Grid>



                                </Grid>

                                <h3>Business Info</h3>
                                <Grid container spacing={10}>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}> Trading name</p>
                                        <p className={styles.detail}>
                                            {/* <span className={styles.header}>2:21 PM</span> */}
                                            {payoutdetails?.payout?.business?.tradingname}

                                        </p>
                                    </Grid>

                                    <Grid item md={2} xs={6} lg={4}>
                                        <p className={styles.header}>Business Email</p>
                                        <p className={styles.business}>
                                            {payoutdetails?.payout?.business?.businessemail}

                                        </p>
                                    </Grid>

                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Merchandid</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.business?.merchantaccountid}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={4}>
                                        <p className={styles.header}>Merchand code</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.business?.merchantcode}

                                        </p>
                                    </Grid>




                                </Grid>
                                <Grid container spacing={10} mt={3}>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}> id</p>
                                        <p className={styles.detail}>
                                            {/* <span className={styles.header}>2:21 PM</span> */}
                                            {payoutdetails?.payout?.id}

                                        </p>
                                    </Grid>

                                    <Grid item md={2} xs={6} lg={3}>
                                        <p className={styles.header}> Linking reference</p>
                                        <p className={styles.detail}>
                                            {/* <span className={styles.header}>2:21 PM</span> */}
                                            {payoutdetails?.payout?.linkingreference}

                                        </p>
                                    </Grid>

                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>Amount</p>
                                        <p className={styles.business}>
                                            {payoutdetails?.payout?.currency}{payoutdetails?.payout?.amount}

                                        </p>
                                    </Grid>

                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Country</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.country}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Merchant reference</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.merchantreference}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>narration</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.narration}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>network</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.network}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Recipient acct no</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.recipientaccountnumber}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Recipient bankcode</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.recipientbankcode}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Recipient bank</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.recipientbank ?? "null"}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={3}>
                                        <p className={styles.header}>Reference</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.reference}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Response message</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.responsemessage}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Route</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.route}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={3}>
                                        <p className={styles.header}>Timein</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.timein}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={3}>
                                        <p className={styles.header}>Timeout</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.timeout}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Transfer type</p>
                                        <p className={styles.detail}>
                                            {payoutdetails?.payout?.transfertype}

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

export default PayoutDetails
