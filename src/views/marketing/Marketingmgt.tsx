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
import { ColumnFraudModule, FraudModuleData, HotlistModuleData } from '../../types/FraudTypes';
import { ColumnMarkettingModule, MarketingModuleData } from '../../types/MarketingTypes';
import Sendmessages from './Sendmessages';

const Marketingmgt = () => {
    const [tableRow, setTableRow] = useState<any[]>();
    const [logs, setLogs] = useState<any>();
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
        },
    ];

    // fetching all customer list
    const fetchMarketinglog = async () => {
        dispatch(openLoader());
        try {

            const { data } = await axios.get<MarketingModuleData>(
                `/v1/marketing/email/logs?search=${value}&perpage=${rowsPerPage}&page=${pageNumber}`
            );
            console.log(data);
            setLogs(data);
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
        fetchMarketinglog();
    }, [bearer, value, pageNumber, rowsPerPage]);

    useEffect(() => {
        setPageNumber(logs?._metadata?.page || 1);
    }, [logs]);

    useEffect(() => {
        Object.values(contentAction).length > 0 &&
            history.push(`/logs/${contentAction?.id}`);
    }, [contentAction]);

    const logsdatas = () => {
        const tempArr: MarketingModuleData[] = [];
        logs?.mails
            ?.slice(0)
            .reverse()
            .forEach((log: any, index: number) => {
                return tempArr.push({
                    id: log?.id,
                    firstname: log?.user?.firstname,
                    lastname: log?.user?.lastname,
                    email: log?.user?.email,
                    fullname: log?.user?.fullname,
                    userId: log?.user?.id,
                    subject: log?.subject,
                    dateSent: log?.dateSent,
                    dateAdded: log?.dateAdded,
                    date: log?.createdAt







                });

            });
        return tempArr;
    };

    useEffect(() => {
        setTableRow(logsdatas());
    }, [logs?.mails]);



    const sendMessage = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    width: 600,
                    // height: 500,
                    borderRadius: "20px",
                    maxHeight: "99vh",
                    overflowY: "auto"
                },
                modalContent: (
                    <div className={styles.modalDiv}>
                        <Sendmessages />

                    </div>
                ),
            })
        );
    }




    return (
        <div>
            <NavBar name='Marketing' />
            <Box width="100%" py={"1rem"} px={"2rem"} >
                <TableHeader
                    pageName="Fraud"
                    data={logs?.mails}
                    dataLength={logs?._metadata.totalcount}
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
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",

                    '& button': {
                        padding: "10px 20px",
                        border: "none",
                        background: "#27ae60",
                        outline: "none",
                        color: "#fff"
                    }
                }}>
                    <button onClick={sendMessage}>Send Message</button>
                </Box>

                <Box sx={{
                    overflowX: "auto"
                }}>

                    <PaginationTable
                        data={tableRow ? tableRow : []}
                        columns={ColumnMarkettingModule ? ColumnMarkettingModule : []}
                        emptyPlaceHolder={
                            logs?._metadata?.totalcount == 0
                                ? "You currently do not have any data"
                                : "Loading..."
                        }
                        value={value}
                        total={logs?._metadata.totalcount}
                        totalPage={logs?._metadata.pagecount}
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

export default Marketingmgt