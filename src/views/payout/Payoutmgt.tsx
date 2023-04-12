import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Dayjs } from "dayjs";
import {
    dateNow,
    sevenDaysAgo,
    thirtyDaysAgo,
    startOfYear,
    endOfYear,
} from "../../util/datefunction";
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/navbar/NavBar'
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { ColumnFraudModule, FraudModuleData } from '../../types/FraudTypes';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import TableHeader from '../../components/TableHeader/TableHeader';
import FilterModal from '../../components/filterConfig/FilterModal';
import PaginationTable from '../../components/paginatedTable/pagination-table';
import { ColumnPayoutModule, PayoutModuleData } from '../../types/PayoutTypes';
import useDownload from '../../interfaces/Download';

const Payoutmgt = () => {
    const [tableRow, setTableRow] = useState<any[]>();
    const [payout, setPayout] = useState<any>();
    const [contentAction, setContentAction] = useState<any>({});
    const history = useHistory();

    const dispatch = useDispatch();
    //PAGINATION
    const [pageNumber, setPageNumber] = React.useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
    const [nextPage, setNextPage] = useState<number | null>(null);
    const [previousPage, setPreviousPage] = useState<number | null>(null);

    //FILTERING
    const [value, setValue] = useState("");
    const [dropdown, setDropdown] = useState(false);
    const [eventDate, setEventDate] = useState("");
    const [fromDate, setFromDate] = useState<Dayjs | null | string>("");
    const [toDate, setToDate] = useState<Dayjs | null | string>("");
    const [country, setCountry] = useState("");
    const [status, setStatus] = useState("");
    const [email, setEmail] = useState("");
    const [merchantId, setMerchantId] = useState("");

    const [bearer, setBearer] = useState(false);

    const clearHandler = () => {
        setEventDate("");
        setFromDate("");
        setToDate("");
        setCountry("");
        setStatus("");
        setDropdown(false);
        setBearer(true);
    };

    useEffect(() => {
        if (eventDate === "today") {
            setFromDate(dateNow);
            setToDate(dateNow);
        } else if (eventDate === "last7days") {
            setFromDate(sevenDaysAgo);
            setToDate(dateNow);
        } else if (eventDate === "last30days") {
            setFromDate(thirtyDaysAgo);
            setToDate(dateNow);
        } else if (eventDate === "oneyear") {
            setFromDate(startOfYear);
            setToDate(endOfYear);
        } else {
            setFromDate("");
            setToDate("");
        }
    }, [eventDate]);

    const filteredArray = [
        {
            name: "merchantid",
            value: merchantId,
            setValue: setMerchantId,
            type: "text"
        },
    ];

    // fetching all customer list
    const fetchCustomers = async () => {
        dispatch(openLoader());
        try {

            const { data } = await axios.get<PayoutModuleData>(
                `/v1/payout?status=${status}&search=${value}&perpage=${rowsPerPage}&page=${pageNumber}`
            );
            console.log(data);
            setPayout(data);
            dispatch(closeLoader());
            setBearer(false);
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
    };

    useEffect(() => {
        fetchCustomers();
    }, [bearer, value, pageNumber, rowsPerPage]);

    useEffect(() => {
        setPageNumber(payout?._metadata?.page || 1);
    }, [payout]);

    useEffect(() => {
        Object.values(contentAction).length > 0 &&
            history.push(`/payout/${contentAction?.linkingreference}`);
    }, [contentAction]);

    const dataBusinesses = () => {
        const tempArr: PayoutModuleData[] = [];
        payout?.payouts
            ?.slice(0)
            .reverse()
            .forEach((payout: any, index: number) => {
                return tempArr.push({
                    id: payout?.id,
                    amount: `${payout?.currency} ${payout?.amount}`,
                    country: payout.country,
                    fullname: `${payout?.user?.firstname} ${payout?.user?.lastname}`,
                    merchantreference: payout?.merchantreference,
                    network: payout?.network,
                    processorreference: payout?.processorreference,
                    recipientaccountnumber: payout?.recipientaccountnumber,
                    recipientbankcode: payout?.recipientbankcode,
                    linkingreference: payout?.linkingreference,
                    transfertype: payout?.transfertype,
                    email: payout?.business?.businessemail,
                    firstname: payout?.user?.firstname,
                    merchantaccountid: payout?.business?.merchantaccountid,
                    timein: payout?.timein,
                    timeout: payout?.timeout,
                    tradingname: payout?.business?.tradingname,
                    // date: payout?.createdat,


                });
            });
        return tempArr;
    };

    useEffect(() => {
        setTableRow(dataBusinesses());
    }, [payout?.payouts]);


    // download payout data
    const { calDownload } = useDownload(
        { url: 'https://staging.itex-pay.com/ipgadmin/api/v1/payout/download', filename: `payout${Date.now()}.csv` }
    );

    const handleDownload = async () => {
        try {
            dispatch(openLoader());
            await calDownload();
            dispatch(closeLoader());
        } catch (error) {
            dispatch(closeLoader());
        }
    };


    return (
        <div>
            <NavBar name='Payout' />
            <Box width="100%" py={"1rem"} px={"2rem"} >
                <TableHeader
                    pageName="payout"
                    data={payout?.payouts}
                    dataLength={payout?._metadata.totalcount}
                    value={value}
                    setValue={setValue}
                    dropdown={dropdown}
                    setDropdown={setDropdown}
                    placeHolder="Search"
                    handleClick={handleDownload}
                    FilterComponent={
                        <FilterModal
                            eventDate={eventDate}
                            setEventDate={setEventDate}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            setFromDate={setFromDate}
                            setToDate={setToDate}
                            fromDate={fromDate}
                            toDate={toDate}
                            setBearer={setBearer}
                            clearHandler={clearHandler}
                            filteredArray={filteredArray}
                        />
                    }
                />

                <Box sx={{
                    overflowX: "auto"
                }}>

                    <PaginationTable
                        data={tableRow ? tableRow : []}
                        columns={ColumnPayoutModule ? ColumnPayoutModule : []}
                        emptyPlaceHolder={
                            payout?._metadata?.totalcount == 0
                                ? "You currently do not have any data"
                                : "Loading..."
                        }
                        value={value}
                        total={payout?._metadata.totalcount}
                        totalPage={payout?._metadata.pagecount}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        nextPage={nextPage}
                        setNextPage={setNextPage}
                        previousPage={previousPage}
                        setPreviousPage={setPreviousPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        clickAction={true}
                        setContentAction={setContentAction}
                    />
                </Box>

            </Box>
        </div>
    )
}

export default Payoutmgt