import { Box } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from "./styles.module.scss"
import { Grid } from '@mui/material';
import moment from 'moment';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';


interface Props {
    sums: {
        count: number;
        currency: string;
        totalcharged: number;
        totalfees: number;
        totalsettled: number;
    }[]
}
const SettlementSummary = () => {
    const [wealth, setWealth] = useState<Props>()
    const [fromdate, setFromdate] = useState("2021-10-2021")
    let now = dayjs().format("YYYY-MM-DD")
    const [todate, setTodate] = useState(now)
    const dispatch = useDispatch()
    // setTodate(todaydate)
    const fetchWealth = async () => {


        try {
            dispatch(openLoader());

            const { data } = await axios.get<Props>(`/v1/wealth/settlement/summary?fromdate=${fromdate}&todate=${todate}`)
            setWealth(data)

            dispatch(closeLoader());

            console.log(data, "data");
        } catch (error: any) {
            dispatch(closeLoader());
            const { message } = error.response.data;
            dispatch(
                dispatch(
                    openToastAndSetContent({
                        toastContent: message,
                        toastStyles: {
                            backgroundColor: "red",
                        },
                    })
                )
            );
        } finally {
            dispatch(closeLoader());
        }
    }
    useEffect(() => {
        fetchWealth()

    }, [fromdate, todate])
    console.log(wealth, "wealthh");
    // console.log(new Date().toLocaleDateString().split(' ')[0], "date")



    return (
        <div>
            <Box className={styles.searchBox} >
                <Grid container columnGap={2} p={2}>
                    <Grid xs={6} md={5}><input type="date" name='fromdate' onChange={(e) => setFromdate(e.target.value)} /></Grid>
                    <Grid xs={6} md={5}><input type="date" onChange={(e) => setTodate(e.target.value)} /></Grid>

                    {/* <Grid xs={4} md={2}><button>Search</button></Grid> */}
                </Grid>
            </Box>
            <Box className={styles.box__wrapper}>

                {!wealth?.sums.length ? (
                    <p>no summary found between  {fromdate} to {todate}</p>
                )

                    : (
                        wealth?.sums?.map((x) => (
                            <Box className={styles.box}>
                                <h2>Count: <p>{x?.count}</p></h2>
                                <h2>Currency: <p>{x?.currency}</p></h2>
                                <h2>Totalcharged: <p>{x?.totalcharged}</p></h2>
                                <h2>Totalfees: <p>{x?.totalfees}</p></h2>
                                <h2>totalsettled: <p>{x?.totalsettled}</p></h2>
                            </Box>))

                    )
                }

            </Box>
        </div>
    )
}

export default SettlementSummary