import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/NavBar'
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { ColumnPaymentInvoiceModule, PaymentInvoceModuleData } from '../../types/PaymentTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Dayjs } from 'dayjs';
import {
    dateNow,
    sevenDaysAgo,
    thirtyDaysAgo,
    startOfYear,
    endOfYear,
} from "../../util/datefunction";
import axios from 'axios';
import { Box } from '@mui/material';
import TableHeader from '../../components/TableHeader/TableHeader';
import FilterModal from '../../components/filterConfig/FilterModal';
import PaginationTable from '../../components/paginatedTable/pagination-table';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import DisableInvoice from './DisableInvoice';
import styles from "./styles.module.scss"





const MerchantInvoice = () => {
    const [tableRow, setTableRow] = useState<any[]>();
    const [paymentInvoice, setPaymentInvoice] = useState<any>();
    const [contentAction, setContentAction] = useState<any>({});
    const [navigate, setNavigate] = useState(false)

    const history = useHistory();

    const dispatch = useDispatch();
    	const { DISABLE_INVOICE } = useSelector(
				(state) => state?.permissionPayReducer.permission
			);
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
    const fetchPayment = async () => {
        dispatch(openLoader());
        try {

            const { data } = await axios.get<PaymentInvoceModuleData>(`/v1/payment/merchantinvoices?perpage=${rowsPerPage}&page=${pageNumber}`
            );
            console.log(data);
            setPaymentInvoice(data);
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
        setPageNumber(paymentInvoice?._metadata?.page || 1);
    }, [paymentInvoice]);

    useEffect(() => {
        Object.values(contentAction).length > 0 && !navigate &&
            history.push(`/merchantinvoice/${contentAction?.id}`);
    }, [contentAction]);

    const dataBusinesses = () => {
        const tempArr: PaymentInvoceModuleData[] = [];
        paymentInvoice?.invoices
            ?.slice(0)
            .reverse()
            .forEach((invoice: any, index: number) => {
                return tempArr.push({
                    id: invoice?.id,
                    amount: `${invoice?.currency} ${invoice?.totalAmount}`,
                    fullname: `${invoice?.user?.firstname} ${invoice?.user?.lastname}`,
                    paymentreference: invoice?.paymentreference,
                    comment: invoice?.comment,
                    businesslogo: <img src={invoice?.businesslogo} alt={invoice?.businesslogo} width="40px" height={"40px"} />,
                    email: invoice?.business?.businessemail,
                    status: invoice?.status,
                    merchantaccountid: invoice?.business?.merchantaccountid,
                    tax: invoice?.tax,
                    discount: invoice?.discount,
                    tradingname: invoice?.business?.tradingname,
                    identifier: invoice?.customer?.identifier,
                    date: invoice?.createdAt,
                    dueDate: invoice?.dueDate,
                    invoiceName: invoice?.invoiceName,
                    action: invoice?.status === "inactive" ? null : DISABLE_INVOICE && <button onClick={() => handleDisable(invoice?.id)}

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
    }, [paymentInvoice?.invoices]);
    const handleDisable = (id: number) => {
        setNavigate(true)

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

        setInterval(() => {
            setNavigate(false)

        }, 3000);
    }

    return (
        <div>
            <NavBar name='Merchant Invoice' />


            <Box width="100%" py={"1rem"} px={"2rem"} >
                <TableHeader
                    pageName="Merchant Invoice"
                    data={paymentInvoice?.invoices}
                    dataLength={paymentInvoice?._metadata.totalcount}
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
                        columns={ColumnPaymentInvoiceModule ? ColumnPaymentInvoiceModule : []}
                        emptyPlaceHolder={
                            paymentInvoice?._metadata?.totalcount == 0
                                ? "You currently do not have any data"
                                : "Loading..."
                        }
                        value={value}
                        total={paymentInvoice?._metadata.totalcount}
                        totalPage={paymentInvoice?._metadata.pagecount}
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

export default MerchantInvoice