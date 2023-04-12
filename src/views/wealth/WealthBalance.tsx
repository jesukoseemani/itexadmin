import { Grid, Box, Divider, IconButton } from '@mui/material';
import axios from 'axios';
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import OperantTable from '../../components/table/OperantTable';
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { CountryModuleData } from '../../types/UtilityTypes';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import styles from "./styles.module.scss"

import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import NavBar from '../../components/navbar/NavBar';


const WealthBalance = () => {

    const dispatch = useDispatch()

    const location = useLocation();
    const history = useHistory();

    const [rows, setRows] = useState<any[]>([]);
    const [balance, setBalance] = useState<any>()
    const [totalRows, setTotalRows] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(10)
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
        | "providername"
        | "providershortname"
        | "providercode"
        | "country"
        | "currency"
        | "accounttype"
        | "acceptance"
        | "balance"



        label: string;
        minWidth?: number;
        align?: "right" | "left" | "center";
    }
    const columns: Column[] = [
        { id: "id", label: "Id", minWidth: 80 },
        { id: "providername", label: "Provider name", minWidth: 100 },
        { id: "providershortname", label: "provider shortname.", minWidth: 100 },
        { id: "providercode", label: "Provider code", minWidth: 100 },
        { id: "country", label: "Country", minWidth: 100 },
        { id: "currency", label: "Currency", minWidth: 100 },
        { id: "accounttype", label: "Accounttype", minWidth: 100 },
        { id: "acceptance", label: "Acceptance", minWidth: 100 },
        { id: "balance", label: "Balance", minWidth: 100 },



    ];
    const TransactionRowTab = useCallback(
        (
            id: number,
            providername: string,
            providershortname: string,
            providercode: number,
            country: string,
            currency: string,
            accounttype: string,
            acceptance: string,
            balance: number,
        ) => ({
            id,
            providername,
            providershortname,
            providercode,
            country,
            currency,
            accounttype,
            balance,
            acceptance,

        }),
        []
    );

    // fetching all customer list
    const FetchBalance = async () => {
        dispatch(openLoader());
        try {

            const { data } = await axios.get("v1/wealth/provider/balance");
            console.log(data);
            setBalance(data);
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
    };

    useEffect(() => {
        FetchBalance();
    }, []);






    useEffect(() => {
        const newRowOptions: any[] = [];
        balance &&
            balance?.balances?.map((each: any) =>
                newRowOptions.push(
                    TransactionRowTab(
                        each.id,
                        each.country,
                        each.acceptance,
                        each.providername,
                        each.providershortname,
                        each.currency,
                        each.accounttype,
                        each.balance,
                        each.providercode,



                    )
                )
            );
        setRows(newRowOptions);
    }, [balance, TransactionRowTab]);








    return (

        <div>
            <NavBar name="Balance" />
            <Box mt={2} width="100%" px={"2rem"} sx={{
                overflowX: "auto"
            }} >


                <h2>Provider Balance</h2>

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

export default WealthBalance



