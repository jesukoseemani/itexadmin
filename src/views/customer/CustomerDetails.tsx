import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/NavBar'
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { useParams } from 'react-router-dom';
import { CustomerModuleData } from '../../types/CustomerTypes';
import { Box, Grid } from '@mui/material';

import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';



const CustomerDetails = () => {
    interface ParamTypes {
		id: string;
	}

	const { id } = useParams<ParamTypes>();

const dispatch =  useDispatch()
const history = useHistory()
const [customer, setCustomer] = useState<any>()

const handleBackToCustomer = () => {
    history.push('/customermgt');
};

	// customer by id
	const getCustomerId = async () => {
		dispatch(openLoader());
		try {
			const { data } = await axios.get<CustomerModuleData>(`/v1/customer/${id}`)
			setCustomer(data)
			console.log(data, "customerid")
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
		getCustomerId()

	}, [id])


  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
    <NavBar name='' />

    <Box>
        <div className={styles.m1}>
				<span className={styles.back} onClick={handleBackToCustomer}>
					<ArrowLeftIcon /> Back to due customers
				</span>
</div>
				
			<div className={styles.settlementDetails}>
				<div>
					<Box sx={{ flexGrow: 1, margin: '0 1rem 1rem 2rem' }}>
						<Grid container spacing={1}>
							<Grid item md={2} xs={6} lg={2}>
								<p className={styles.header}>First name</p>
								<p className={styles.detail}>
									{/* {apiRes?.settlements[0]?.initiatedat} */}
									{customer?.customer?.firstname}

								</p>
							</Grid>

							<Grid item md={2} xs={6} lg={2}>
								<p className={styles.header}>Last name</p>
								<p className={styles.detail}>
									{/* {apiRes?.settlements[0]?.initiatedat} */}
									{customer?.customer?.lastname}
								</p>
							</Grid>

							<Grid item md={3} xs={6} lg={3}>
								<p className={styles.header}>Email address</p>
								<p className={styles.detail}>
									{/* {apiRes?.settlements[0]?.settlementid} */}
									{customer?.customer?.email}

								</p>
							</Grid>

							<Grid item md={2} xs={6} lg={2}>
								<p className={styles.header}>Blacklist reason</p>
								<p className={styles.detail}>
									{/* {apiRes?.settlements[0]?.tradingname} */}
									{customer?.customer?.blacklistreason}

								</p>
							</Grid>
							<Grid item md={2} xs={6} lg={2}>
								<p className={styles.header}>Identifier</p>
								<p className={styles.detail}>
									{/* {apiRes?.settlements[0]?.amount} */}
									{customer?.customer?.identifier}

								</p>
							</Grid>

						</Grid>

						<div className={styles.mt1}>
							<Grid container spacing={1}>
								<Grid item md={2} xs={6} lg={2}>
									<p className={styles.header}>Isblacklisted</p>
									<p className={styles.detail}>
										{/* <span className={styles.header}>2:21 PM</span> */}
										 {customer?.customer?.isblacklisted ? "true" : "false"}

									</p>
								</Grid>

								<Grid item md={2} xs={6} lg={2}>
									<p className={styles.header}>Merchant code</p>
									<p className={styles.detail}>
										{customer?.customer?.business?.merchantcode}

									</p>
								</Grid>

								<Grid item md={3} xs={6} lg={3}>
									<p className={styles.header}>Trading name</p>
									<p className={styles.detail}>
										{customer?.customer?.business?.tradingname}

									</p>
								</Grid>
								<Grid item md={2} xs={6} lg={2}>
									<p className={styles.header}>Business email</p>
									<p className={styles.detail}>
										{/* {apiRes?.settlements[0]?.settlementbankcode} */}
										{customer?.customer?.business?.businessemail}

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

export default CustomerDetails
