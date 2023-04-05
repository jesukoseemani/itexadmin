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
import TableHeader from "../../components/TableHeader/TableHeader";
import { Box } from "@mui/material";
import PaginationTable from "../../components/paginatedTable/pagination-table";
import styles from "./styles.module.scss";

import FilterModal from "../../components/filterConfig/FilterModal";
import { ColumnHotlistModule, HotlistModuleData } from '../../types/FraudTypes';

const Hotlist = () => {
    const [tableRow, setTableRow] = useState<any[]>();
    const [hotList, setHotlist] = useState<any>();
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
    const [status, setStatus] = useState("Blocked");
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

    const filteredArray = [{
        name: "Status",
        value: status,
        setValue: setStatus,
        selective: [{ name: "Blocked" }, { name: "complained" }],
    },
    {
        name: "merchantid",
        value: merchantId,
        setValue: setMerchantId,
    },
    ];

    // fetching all customer list
    const fetchCustomers = async () => {
        dispatch(openLoader());
        try {






            const { data } = await axios.get<HotlistModuleData>(`/v1/fraudmgt/hotlisted?status=${status}&search=${value}&perpage=${rowsPerPage}&page=${pageNumber}`
            );
            console.log(data);
            setHotlist(data);
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
        setPageNumber(hotList?._metadata?.page || 1);
    }, [hotList]);

    // useEffect(() => {
    //     Object.values(contentAction).length > 0 &&
    //         history.push(`/fraudmgt/${contentAction?.id}`);
    // }, [contentAction]);

    const dataBusinesses = () => {
        const tempArr: HotlistModuleData[] = [];
        hotList?.hotlist
            ?.slice(0)
            .reverse()
            .forEach((hot: any, index: number) => {
                return tempArr.push({
                    id: hot?.id,
                    reason: hot?.reason,
                    masked: hot?.masked,
                    bin: hot?.bin,
                    last4: hot?.last4,
                    status: hot?.status,
                    date: hot?.createdat,
                });

            });
        return tempArr;
    };

    useEffect(() => {
        setTableRow(dataBusinesses());
    }, [hotList?.hotlist]);




    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <NavBar name="Hotlist" />

            <Box width="100%" py={"1rem"} px={"2rem"} >
                <TableHeader
                    pageName="Hotlist"
                    data={hotList?.hotlist}
                    dataLength={hotList?._metadata.totalcount}
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
                        columns={ColumnHotlistModule ? ColumnHotlistModule : []}
                        emptyPlaceHolder={
                            hotList?._metadata?.totalcount == 0
                                ? "You currently do not have any data"
                                : "Loading..."
                        }
                        value={value}
                        total={hotList?._metadata.totalcount}
                        totalPage={hotList?._metadata.pagecount}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        nextPage={nextPage}
                        setNextPage={setNextPage}
                        previousPage={previousPage}
                        setPreviousPage={setPreviousPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        // clickAction={true}
                        setContentAction={setContentAction}
                    />
                </Box>

            </Box>

        </div>
    )
}


export default Hotlist