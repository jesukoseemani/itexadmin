import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dayjs } from "dayjs";
import { useEffect } from "react";
import {
    dateNow,
    sevenDaysAgo,
    thirtyDaysAgo,
    startOfYear,
    endOfYear,
} from "../../util/datefunction";
import {
    closeLoader,
    openLoader,
} from "../../redux/actions/loader/loaderActions";
import axios from "axios";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import {
    ColumnCustomerModule,
    CustomerModuleData,
} from "../../types/CustomerTypes";
import TableHeader from "../../components/TableHeader/TableHeader";
import { Box } from "@mui/material";
import PaginationTable from "../../components/paginatedTable/pagination-table";
import { ColumnBusinessCustomerModule } from "../../types/BusinessModule";
import styles from "./styles.module.scss";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";

import FilterModal from "../../components/filterConfig/FilterModal";
import useDownload from "../../interfaces/Download";
import { ColumnFraudModule, FraudModuleData } from '../../types/FraudTypes';
import FlaggedModal from './FlaggedModal';

const Fraudmgt = () => {
    const [tableRow, setTableRow] = useState<any[]>();
    const [fraud, setFraud] = useState<any>();
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

            const { data } = await axios.get<FraudModuleData>(
                `/v1/fraudmgt/flagged?status=${status}&search=${value}&perpage=${rowsPerPage}&page=${pageNumber}`
            );
            console.log(data);
            setFraud(data);
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
        setPageNumber(fraud?._metadata?.page || 1);
    }, [fraud]);

    useEffect(() => {
        Object.values(contentAction).length > 0 &&
            history.push(`/fraudmgt/${contentAction?.id}`);
    }, [contentAction]);

    const dataBusinesses = () => {
        const tempArr: FraudModuleData[] = [];
        fraud?.flagged
            ?.slice(0)
            .reverse()
            .forEach((flag: any, index: number) => {
                return tempArr.push({
                    id: flag?.id,
                    paymentid: flag?.paymentid,
                    activity: flag?.activity,
                    email: flag?.business?.businessemail,
                    flag: flag?.flag,
                    identifier: flag?.customer?.identifier,
                    masked: flag?.masked,
                    bin: flag?.bin,
                    last4: flag?.last4,
                    merchantaccountid: flag?.business?.merchantaccountid,
                    merchantcode: flag?.business?.merchantcode,
                    priority: flag?.priority,
                    tradingname: flag?.business?.tradingname,
                    date: flag?.createdat,
                    action: <Box><button style={{
                        outline: "none",
                        border: "none",
                        padding: "10px 20px",
                        cursor: "pointer",
                        background: "#219653",
                        color: "#fff",
                        width: "max-content"
                    }}

                        onClick={() => handleFlag(flag?.id)}
                    >Flag</button></Box>

                });

            });
        return tempArr;
    };

    useEffect(() => {
        setTableRow(dataBusinesses());
    }, [fraud?.flagged]);





    const handleFlag = (id: any) => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                },
                modalContent: (
                    <Box>
                        <FlaggedModal id={id} />
                    </Box>
                ),
            })
        );

    }


    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <NavBar name="Fraud" />

            <Box width="100%" py={"1rem"} px={"2rem"} >
                <TableHeader
                    pageName="Fraud"
                    data={fraud?.flagged}
                    dataLength={fraud?._metadata.totalcount}
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
                        columns={ColumnFraudModule ? ColumnFraudModule : []}
                        emptyPlaceHolder={
                            fraud?._metadata?.totalcount == 0
                                ? "You currently do not have any data"
                                : "Loading..."
                        }
                        value={value}
                        total={fraud?._metadata.totalcount}
                        totalPage={fraud?._metadata.pagecount}
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

export default Fraudmgt