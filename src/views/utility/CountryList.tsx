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
import UpdateCountry from './UpdateCountry';


const CountryList = () => {

    const dispatch = useDispatch()

    const location = useLocation();
    const history = useHistory();

    const [rows, setRows] = useState<any[]>([]);
    const [countryList, setCountryList] = useState<any>()
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
        | "country"
        | "currencyDescription"
        | "currencyCode"
        | "currencyIso"
        | "countryIso"
        | "currencyStatus"
        | "countrystatus"
        | "dialCode"
        | "action"


        label: string;
        minWidth?: number;
        align?: "right" | "left" | "center";
    }
    const columns: Column[] = [
        { id: "id", label: "Id", minWidth: 80 },
        { id: "country", label: "Country", minWidth: 100 },
        { id: "currencyDescription", label: "currency Desc.", minWidth: 100 },
        { id: "currencyCode", label: "Currency Code", minWidth: 100 },
        { id: "currencyIso", label: "Currency Iso", minWidth: 100 },
        { id: "countryIso", label: "CountryIso", minWidth: 100 },
        { id: "currencyStatus", label: "Currency Status", minWidth: 100 },
        { id: "countrystatus", label: "Country status", minWidth: 100 },
        { id: "dialCode", label: "DialCode", minWidth: 100 },
        { id: "action", label: "Action", minWidth: 100 },



    ];
    const TransactionRowTab = useCallback(
        (
            id: number,
            country: string,
            currencyDescription: string,
            currencyCode: number,
            currencyIso: string,
            countryIso: string,
            currencyStatus: boolean,
            countrystatus: boolean,
            dialCode: number,
            action: ReactNode
        ) => ({
            id,
            country,
            currencyDescription,
            currencyCode,
            currencyIso,
            countryIso,
            currencyStatus: currencyStatus ? "True" : "False",
            countrystatus: countrystatus ? "True" : "False",
            dialCode,
            action: <IconButton onClick={() => handleCountry(id, currencyStatus, countrystatus)}><MoreVertOutlinedIcon /></IconButton>

        }),
        []
    );

    // fetching all customer list
    const FetchCountrylist = async () => {
        dispatch(openLoader());
        try {

            const { data } = await axios.get<CountryModuleData>("v1/utility/countries");
            console.log(data);
            setCountryList(data);
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
        FetchCountrylist();
    }, []);


    const handleCountry = (id: any, currencyStatus: any, countrystatus: any) => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    width: 400,
                    height: 300,
                    borderRadius: "20px",
                },
                modalContent: (
                    <div className={styles.modalDiv}>
                        <UpdateCountry id={id} currencyStatus={currencyStatus} countrystatus={countrystatus} />

                    </div>
                ),
            })
        );
    }



    useEffect(() => {
        const newRowOptions: any[] = [];
        countryList &&
            countryList?.countries?.map((each: any) =>
                newRowOptions.push(
                    TransactionRowTab(
                        each.id,
                        each.country,
                        each.currencyDescription,
                        each.currencyCode,
                        each.currencyIso,
                        each.countryIso,
                        each.currencyStatus,
                        each.countrystatus,
                        each.dialCode,
                        each.action,


                    )
                )
            );
        setRows(newRowOptions);
    }, [countryList, TransactionRowTab]);








    return (
        <div>
            <Box mt={5} width="100%" py={"1rem"} px={"2rem"} sx={{
                overflowX: "auto"
            }} >



                <h2>Country Lists</h2>

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

export default CountryList

