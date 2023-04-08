import { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    dateNow,
    sevenDaysAgo,
    thirtyDaysAgo,
    startOfYear,
    endOfYear,
} from "../../util/datefunction";
import NavBar from '../../components/navbar/NavBar'
import { ColumnPayoutModule, PayoutModuleData } from '../../types/PayoutTypes';
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { Box } from '@mui/material';
import TableHeader from '../../components/TableHeader/TableHeader';
import FilterModal from '../../components/filterConfig/FilterModal';
import PaginationTable from '../../components/paginatedTable/pagination-table';
import { ColumnPaymentModule, PaymentModuleData } from '../../types/PaymentTypes';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import DisableInvoice from './DisableInvoice';
import styles from "./styles.module.scss"

const PaymentLink = () => {
    const [tableRow, setTableRow] = useState<any[]>();
    const [payment, setPayment] = useState<any>();
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
    const [navigate, setNavigate] = useState(false)
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
    const fetchPayment = async () => {
        dispatch(openLoader());
        try {

            const { data } = await axios.get<PaymentModuleData>(
                `/v1/payment/paymentlinks?status=${status}&search=${value}&perpage=${rowsPerPage}&page=${pageNumber}`
            );
            console.log(data);
            setPayment(data);
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
        fetchPayment();
    }, [bearer, value, pageNumber, rowsPerPage]);

    useEffect(() => {
        setPageNumber(payment?._metadata?.page || 1);
    }, [payment]);

    useEffect(() => {
        Object.values(contentAction).length > 0 && !navigate &&
            history.push(`/paymentlinks/${contentAction?.id}`);
    }, [contentAction]);

    const dataBusinesses = () => {
        const tempArr: PaymentModuleData[] = [];
        payment?.paymentlinks
            ?.slice(0)
            .reverse()
            .forEach((pay: any, index: number) => {
                return tempArr.push({
                    id: pay?.id,
                    amount: `${pay?.currency} ${pay?.amount}`,
                    fullname: `${pay?.user?.firstname} ${pay?.user?.lastname}`,
                    merchantreference: pay?.merchantreference,
                    paymentreference: pay?.paymentreference,
                    linkName: pay?.linkName,
                    linkType: pay?.linkType,
                    description: pay?.description,
                    pageImage: <img src={pay?.pageImage} alt={pay?.pageImage} width="40px" height={"40px"} />,
                    email: pay?.business?.businessemail,
                    firstname: pay?.user?.firstname,
                    status: pay?.status,
                    merchantaccountid: pay?.business?.merchantaccountid,
                    donationWebsite: pay?.donationWebsite,
                    donationContact: pay?.donationContact,
                    tradingname: pay?.business?.tradingname,
                    deletedAt: pay?.deletedAt,
                    isDeleted: pay?.isDeleted ? "True" : "False",
                    date: pay?.createdAt,
                    action: pay?.status === "inactive" ? null : <button onClick={() => handleDisable(pay?.id)}

                        style={{
                            outline: "none",
                            border: "none",
                            padding: "10px 20px",
                            cursor: "pointer",
                            background: "red",
                            color: "#fff",
                            width: "max-content"
                        }}
                    >Disable</button>



                });
            });
        return tempArr;
    };

    useEffect(() => {
        setTableRow(dataBusinesses());
    }, [payment?.paymentlinks]);

    const handleDisable = (id: number) => {
        setNavigate(true)
        setTimeout(() => {
            setNavigate(false)

        }, 3000);
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    width: 400,
                    // height: 500,
                    borderRadius: "20px",
                },
                modalContent: (
                    <div className={styles.modalDiv}>
                        <DisableInvoice id={id} setNavigate={setNavigate} />
                    </div>
                ),
            })
        );
    }
    return (
        <div>
            <NavBar name='Payment Link' />
            <Box width="100%" py={"1rem"} px={"2rem"} >
                <TableHeader
                    pageName="payout"
                    data={payment?.paymentlinks}
                    dataLength={payment?._metadata.totalcount}
                    value={value}
                    setValue={setValue}
                    dropdown={dropdown}
                    setDropdown={setDropdown}
                    placeHolder="Search"
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
                        columns={ColumnPaymentModule ? ColumnPaymentModule : []}
                        emptyPlaceHolder={
                            payment?._metadata?.totalcount == 0
                                ? "You currently do not have any data"
                                : "Loading..."
                        }
                        value={value}
                        total={payment?._metadata.totalcount}
                        totalPage={payment?._metadata.pagecount}
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

export default PaymentLink