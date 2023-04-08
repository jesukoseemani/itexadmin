import { Grid, Box, Divider } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import OperantTable from '../../components/table/OperantTable';

const PaymentTransactions = ({ paymentDetails }: any) => {
    interface ParamTypes {
        id: string;
    }
    console.log(paymentDetails, "dedededededede")
    const { id } = useParams<ParamTypes>();

    const dispatch = useDispatch()

    const location = useLocation();
    const history = useHistory();
    const [rows, setRows] = useState<any[]>([]);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(10);
    const [dataValue, setDataValue] = useState<number | string>(0);

    const [open, setOpen] = useState<boolean>(false);

    const changePage = (value: number) => {
        setPageNumber(value);
    };

    const limit = (value: number) => {
        setRowsPerPage(value);
    };
    //FILTERING
    const [value, setValue] = useState("");


    interface Column {
        id:
        | "id"
        | "linkingreference"
        | "merchantreference"
        | "reference"
        | "amount"
        | "chargeamount"
        | "authoption"
        | "fee"
        | "country"
        | "chargetype"
        | "issuer"
        | "mask"
        | "timein"
        | "cardtype"
        | "paymentid"
        | "date"
        | "route"
        | "responsemessage"
        | "paymentlinkreference"
        | "paylocationtype"
        | "paylocationcountry"

        label: string;
        minWidth?: number;
        align?: "right" | "left" | "center";
    }
    const columns: Column[] = [
        { id: "linkingreference", label: "Linking ref", minWidth: 100 },
        { id: "merchantreference", label: "merchantref", minWidth: 100 },
        { id: "reference", label: "Reference", minWidth: 100 },
        { id: "authoption", label: "Authoption", minWidth: 100 },
        { id: "amount", label: "Amount", minWidth: 100 },
        { id: "chargeamount", label: "Charge amt", minWidth: 100 },
        { id: "fee", label: "Fee", minWidth: 100 },
        { id: "country", label: "Country", minWidth: 100 },
        { id: "chargetype", label: "chargetype", minWidth: 100 },
        { id: "route", label: "route", minWidth: 100 },
        { id: "timein", label: "Timein", minWidth: 100 },
        { id: "cardtype", label: "Card type", minWidth: 100 },
        { id: "issuer", label: "Issuer", minWidth: 100 },
        { id: "mask", label: "Mask", minWidth: 100 },
        { id: "paymentid", label: "paymentid", minWidth: 100 },
        { id: "responsemessage", label: "responsemessage", minWidth: 100 },
        { id: "paymentlinkreference", label: "payment linkreference", minWidth: 100 },
        { id: "paylocationtype", label: "Pay loc.type", minWidth: 100 },
        { id: "paylocationcountry", label: "paylocationcountry", minWidth: 100 },


    ];
    const TransactionRowTab = useCallback(
        (
            id: number,
            linkingreference?: string,
            merchantreference?: string,
            reference?: string,
            authoption?: string,
            amount?: string | number,
            chargeamount?: number,
            fee?: number,
            country?: string,
            chargetype?: string,
            route?: boolean,
            timein?: string,
            cardtype?: string,
            issuer?: boolean,
            mask?: string,
            paymentid?: string,
            responsecode?: number,
            responsemessage?: string,
            rrn?: boolean,
            paylocationtype?: boolean,
            paylocationcountry?: boolean,
            paymentlinkreference?: string,
        ) => ({
            amount,
            cardtype,
            chargeamount,
            authoption,
            chargetype,
            country,
            fee,
            issuer, linkingreference, mask, merchantreference, paylocationcountry, paylocationtype, paymentid, paymentlinkreference, reference, responsecode, responsemessage, route, rrn, timein,
            id

        }),
        []
    );
    useEffect(() => {
        const newRowOptions: any[] = [];
        paymentDetails &&
            paymentDetails?.transactions?.map((each: any) =>
                newRowOptions.push(
                    TransactionRowTab(
                        each.id,
                        each.linkingreference,
                        each.merchantreference,
                        each.reference,
                        each.authoption,
                        each.amount,
                        each.chargeamount,
                        each.fee,
                        each.country,
                        each.chargetype,
                        each.route,
                        each.timein,
                        each.cardtype,
                        each.issuer,
                        each.mask,
                        each.paymentid,
                        each.responsecode,
                        each.responsemessage,
                        each.rrn,
                        each.paylocationtype,
                        each.paylocationcountry,
                        each.paymentlinkreference

                    )
                )
            );
        setRows(newRowOptions);
    }, [paymentDetails, TransactionRowTab]);








    return (
        <div>
            <Box mt={5} width="100%" py={"1rem"} px={"2rem"} sx={{
                overflowX: "auto"
            }} >
                {/* <TableHeader
                    pageName=""
                    data={paymentDetails?.transactions}
                    dataLength={paymentDetails?._metadata.totalcount}
                    value={value}
                    setValue={setValue}
                    dropdown={dropdown}
                    setDropdown={setDropdown}
                    placeHolder="Search"

                /> */}


                <h2>Transactions</h2>

                <OperantTable
                    columns={columns}
                    rows={rows}
                    totalRows={totalRows}
                    changePage={changePage}
                    limit={limit}
                    setDataValue={setDataValue}
                    setOpen={setOpen}
                />

            </Box>
        </div>
    )
}


export default PaymentTransactions