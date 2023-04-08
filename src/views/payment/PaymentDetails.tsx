import { Grid, Box, Divider } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { PaymentModuleData, PaymentTransModuleData } from '../../types/PaymentTypes';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import styles from "./styles.module.scss"
import NavBar from '../../components/navbar/NavBar';
import PaymentTransactions from './PaymentTransactions';

const PaymentDetails = () => {
    interface ParamTypes {
        id: string;
    }

    const { id } = useParams<ParamTypes>();

    const dispatch = useDispatch()

    const location = useLocation();
    const history = useHistory();
    const [paymentDetails, setPaymentDetails] = useState<any>()
    const [tableRow, setTableRow] = useState<any[]>();


    const goBack = () => {
        history.push('/paymentlinks');
    };

    // fraud by id
    const getpaymentDetails = async () => {
        dispatch(openLoader());
        try {
            const { data } = await axios.get<PaymentModuleData>(`/v1/payment/paymentlinks/${id}`)
            setPaymentDetails(data)
            console.log(data, "paymentDetailss")
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
        getpaymentDetails()

    }, [id])


    return (
        <div>
            <NavBar name='' />
            <Box>
                <div className={styles.m1}>
                    <span className={styles.back} onClick={goBack}>
                        <ArrowLeftIcon /> Back Payment management
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
                                            {paymentDetails?.paymentlink?.user?.firstname}

                                        </p>
                                    </Grid>

                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Lastname</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.paymentlink?.user?.lastname}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={4}>
                                        <p className={styles.header}>User Email</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.paymentlink?.user?.email}

                                        </p>
                                    </Grid>
                                    <br />
                                    <Grid item md={2} xs={6} lg={3}>
                                        <p className={styles.header}>Fullname</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.paymentlink?.user?.fullname}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>User id</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.paymentlink?.user?.id}

                                        </p>
                                    </Grid>



                                </Grid>

                                <h3>Business Info</h3>
                                <Grid container spacing={10}>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}> Trading name</p>
                                        <p className={styles.detail}>
                                            {/* <span className={styles.header}>2:21 PM</span> */}
                                            {paymentDetails?.paymentlink?.business?.tradingname}

                                        </p>
                                    </Grid>

                                    <Grid item md={2} xs={6} lg={4}>
                                        <p className={styles.header}>Business Email</p>
                                        <p className={styles.business}>
                                            {paymentDetails?.paymentlink?.business?.businessemail}

                                        </p>
                                    </Grid>

                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Merchandid</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.paymentlink?.business?.merchantaccountid}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={4}>
                                        <p className={styles.header}>Merchand code</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.paymentlink?.business?.merchantcode}

                                        </p>
                                    </Grid>




                                </Grid>
                                <Divider sx={{ marginTop: "30px" }} />
                                <Grid container spacing={10} mt={3}>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}> id</p>
                                        <p className={styles.detail}>
                                            {/* <span className={styles.header}>2:21 PM</span> */}
                                            {paymentDetails?.paymentlink?.id}

                                        </p>
                                    </Grid>

                                    <Grid item md={2} xs={6} lg={4}>
                                        <p className={styles.header}>Payment ref</p>
                                        <p className={styles.detail}>
                                            {/* <span className={styles.header}>2:21 PM</span> */}
                                            {paymentDetails?.paymentlink?.paymentreference}

                                        </p>
                                    </Grid>

                                    <Grid item md={2} xs={6} lg={3}>
                                        <p className={styles.header}>Amount</p>
                                        <p className={styles.business}>
                                            {paymentDetails?.paymentlink?.currency}{paymentDetails?.paymentlink?.amount}

                                        </p>
                                    </Grid>

                                    <Grid item md={3} xs={6} lg={3}>
                                        <p className={styles.header}>Link name</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.paymentlink?.linkName}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>LinkType</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.paymentlink?.linkType}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={4}>
                                        <p className={styles.header}>Description</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.paymentlink?.description}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>status</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.paymentlink?.status ? "True" : "False"}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={3}>
                                        <p className={styles.header}>pageImage</p>
                                        <p className={styles.detail}>

                                            <img src={paymentDetails?.paymentlink?.pageImage} alt={paymentDetails?.paymentlink?.pageImage} height="100px" width={"100px"} />

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Donation Website</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.paymentlink?.donationWebsite}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>donationContact</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.paymentlink?.donationContact}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={3}>
                                        <p className={styles.header}>isDeleted</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.paymentlink?.isDeleted ? "True" : "False"}


                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>DeletedAt</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.paymentlink?.deletedAt}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>CreatedAt</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.paymentlink?.createdAt}

                                        </p>
                                    </Grid>




                                </Grid>
                            </div>





                        </Box>
                    </div>
                </div>
            </Box>

            <Box>
                <PaymentTransactions paymentDetails={paymentDetails} />
            </Box>
        </div>
    )
}

export default PaymentDetails