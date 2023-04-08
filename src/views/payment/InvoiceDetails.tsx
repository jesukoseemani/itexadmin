import { Grid, Box, Divider } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { PaymentInvoceModuleData } from '../../types/PaymentTypes';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import styles from "./styles.module.scss"
import NavBar from '../../components/navbar/NavBar';
import PaymentTransactions from './PaymentTransactions';

const InvoiceDetails = () => {
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
        history.push('/merchantinvoice');
    };

    // fraud by id
    const getInvoiceDEtails = async () => {
        dispatch(openLoader());
        try {
            const { data } = await axios.get<PaymentInvoceModuleData>(`/v1/payment/merchantinvoices/${id}`)
            setPaymentDetails(data)
            console.log(data, "paymentInvoice")
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
        getInvoiceDEtails()

    }, [id])


    return (
        <div>
            <NavBar name='' />
            <Box>
                <div className={styles.m1}>
                    <span className={styles.back} onClick={goBack}>
                        <ArrowLeftIcon /> Back Merchant invoice
                    </span>
                </div>

                <div className={styles.settlementDetails}>
                    <div>


                        <Box sx={{ flexGrow: 1, margin: '0 1rem 1rem 2rem' }}>
                            <div className={styles.mt1}>

                                <h3>User</h3>

                                <Grid container spacing={9}>

                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>Firstname</p>
                                        <p className={styles.business}>
                                            {paymentDetails?.invoice?.user?.firstname}

                                        </p>
                                    </Grid>

                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Lastname</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.invoice?.user?.lastname}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>User Email</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.invoice?.user?.email}

                                        </p>
                                    </Grid>
                                    <br />
                                    <Grid item md={2} xs={6} lg={3}>
                                        <p className={styles.header}>Fullname</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.invoice?.user?.fullname}

                                        </p>
                                    </Grid>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}>User id</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.invoice?.user?.id}

                                        </p>
                                    </Grid>



                                </Grid>
                                <Divider sx={{ marginTop: "3rem" }} />


                                <Box>
                                    <h3>Customer</h3>

                                    <Grid container spacing={9}>

                                        <Grid item md={2} xs={6} lg={2}>
                                            <p className={styles.header}>Firstname</p>
                                            <p className={styles.business}>
                                                {paymentDetails?.invoice?.customer?.firstname ?? "null"}

                                            </p>
                                        </Grid>

                                        <Grid item md={3} xs={6} lg={2}>
                                            <p className={styles.header}>Lastname</p>
                                            <p className={styles.detail}>
                                                {paymentDetails?.invoice?.customer?.lastname ?? "null"}

                                            </p>
                                        </Grid>
                                        <Grid item md={2} xs={6} lg={3}>
                                            <p className={styles.header}>customer Email</p>
                                            <p className={styles.detail}>
                                                {paymentDetails?.invoice?.customer?.email}

                                            </p>
                                        </Grid>
                                        <br />
                                        <Grid item md={2} xs={6} lg={3}>
                                            <p className={styles.header}>Identifier</p>
                                            <p className={styles.detail}>
                                                {paymentDetails?.invoice?.customer?.identifier}

                                            </p>
                                        </Grid>
                                        <Grid item md={2} xs={6} lg={2}>
                                            <p className={styles.header}>customer id</p>
                                            <p className={styles.detail}>
                                                {paymentDetails?.invoice?.customer?.id}

                                            </p>
                                        </Grid>



                                    </Grid>
                                </Box>
                                <Divider sx={{ marginTop: "3rem" }} />

                                <h3>Business Info</h3>
                                <Grid container spacing={10}>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}> Trading name</p>
                                        <p className={styles.detail}>
                                            {/* <span className={styles.header}>2:21 PM</span> */}
                                            {paymentDetails?.invoice?.business?.tradingname}

                                        </p>
                                    </Grid>

                                    <Grid item md={2} xs={6} lg={4}>
                                        <p className={styles.header}>Business Email</p>
                                        <p className={styles.business}>
                                            {paymentDetails?.invoice?.business?.businessemail}

                                        </p>
                                    </Grid>

                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Merchandid</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.invoice?.business?.merchantaccountid}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={4}>
                                        <p className={styles.header}>Merchand code</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.invoice?.business?.merchantcode}

                                        </p>
                                    </Grid>




                                </Grid>
                                <Divider sx={{ marginTop: "3rem" }} />

                                <Grid container spacing={10} mt={3}>
                                    <Grid item md={2} xs={6} lg={2}>
                                        <p className={styles.header}> id</p>
                                        <p className={styles.detail}>
                                            {/* <span className={styles.header}>2:21 PM</span> */}
                                            {paymentDetails?.invoice?.id}

                                        </p>
                                    </Grid>

                                    <Grid item md={2} xs={6} lg={4}>
                                        <p className={styles.header}>Payment ref</p>
                                        <p className={styles.detail}>
                                            {/* <span className={styles.header}>2:21 PM</span> */}
                                            {paymentDetails?.invoice?.paymentreference}

                                        </p>
                                    </Grid>

                                    <Grid item md={2} xs={6} lg={3}>
                                        <p className={styles.header}>Amount</p>
                                        <p className={styles.business}>
                                            {paymentDetails?.invoice?.currency}{paymentDetails?.invoice?.totalAmount}

                                        </p>
                                    </Grid>

                                    <Grid item md={3} xs={6} lg={3}>
                                        <p className={styles.header}>Invoice Name </p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.invoice?.invoiceName}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Tax</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.invoice?.tax}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={4}>
                                        <p className={styles.header}>Comment</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.invoice?.comment}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>status</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.invoice?.status ? "True" : "False"}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={3}>
                                        <p className={styles.header}>Business logo</p>
                                        <p className={styles.detail}>

                                            <img src={paymentDetails?.invoice?.businesslogo} alt={paymentDetails?.invoice?.businesslogo} height="100px" width={"100px"} />

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>Discount</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.invoice?.discount}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>DueDate</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.invoice?.dueDate}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={3}>
                                        <p className={styles.header}>isDeleted</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.invoice?.isDeleted ? "True" : "False"}


                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>DeletedAt</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.invoice?.deletedAt ?? "null"}

                                        </p>
                                    </Grid>
                                    <Grid item md={3} xs={6} lg={2}>
                                        <p className={styles.header}>CreatedAt</p>
                                        <p className={styles.detail}>
                                            {paymentDetails?.invoice?.createdAt}

                                        </p>
                                    </Grid>




                                </Grid>
                            </div>

                            <Divider sx={{ marginTop: "3rem" }} />
                            <Box mt={6}>
                                <h3>Items</h3>
                                <Grid container spacing={4}>
                                    {paymentDetails?.items?.map((customer: any) => (
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Box className={styles.itemBox}>

                                                <Box>
                                                    <h4>Invoice Id</h4>
                                                    <p> {customer?.invoiceId}</p>
                                                </Box>
                                                <Box>
                                                    <h4>Item Name</h4>
                                                    <p> {customer?.itemName}</p>
                                                </Box>
                                                <Box>
                                                    <h4>Price</h4>
                                                    <p> {customer?.price}</p>
                                                </Box>
                                                <Box>
                                                    <h4>Quantity</h4>
                                                    <p> {customer?.quantity}</p>
                                                </Box>
                                                <Box>
                                                    <h4>Sub total</h4>
                                                    <p> {customer?.subtotal}</p>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>


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

export default InvoiceDetails
