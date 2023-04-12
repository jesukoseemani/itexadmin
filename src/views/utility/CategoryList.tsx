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
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import styles from "./styles.module.scss"
import { CategoryModuleData, ColumnCategoryModule } from '../../types/UtilityTypes';
import AddCategory from './AddCategory';

const CategoryList = () => {
    const [tableRow, setTableRow] = useState<any[]>();
    const [categoryList, setCategoryList] = useState<any>();
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



    const filteredArray = [
        {
            name: "merchantid",
            value: merchantId,
            setValue: setMerchantId,
            type: "text"
        },
    ];

    // fetching all customer list
    const fetchCategory = async () => {
        dispatch(openLoader());
        try {

            const { data } = await axios.get<CategoryModuleData>(
                `/v1/utility/business/categories?perpage=${rowsPerPage}&page=${pageNumber}`
            );
            console.log(data);
            setCategoryList(data);
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
        fetchCategory();
    }, [bearer, value, pageNumber, rowsPerPage]);

    useEffect(() => {
        setPageNumber(categoryList?._metadata?.page || 1);
    }, [categoryList]);

    // useEffect(() => {
    //     Object.values(contentAction).length > 0 && !navigate &&
    //         history.push(`/paymentlinks/${contentAction?.id}`);
    // }, [contentAction]);

    const dataBusinesses = () => {
        const tempArr: CategoryModuleData[] = [];
        categoryList?.categories
            ?.slice(0)
            .reverse()
            .forEach((cate: any, index: number) => {
                return tempArr.push({
                    id: cate?.id,

                    fullname: `${cate?.user?.firstname} ${cate?.user?.lastname}`,
                    categoryName: cate?.categoryName,
                    categoryCode: cate?.categoryCode,
                    status: cate?.status ? "True" : "False",
                    date: cate?.createdAt,
                    email: cate?.user?.email,
                    userId: cate?.user?.id,
                    firstname: cate?.user?.firstname,
                    lastname: cate?.user?.lastname,


                    action: <button onClick={() => handleCategory(cate?.id, cate?.categoryName, cate?.categoryCode)}

                        style={{
                            outline: "none",
                            border: "none",
                            padding: "10px 20px",
                            cursor: "pointer",
                            background: "#27ae60",
                            color: "#fff",
                            width: "max-content"
                        }}
                    >Add category</button>



                });
            });
        return tempArr;
    };

    useEffect(() => {
        setTableRow(dataBusinesses());
    }, [categoryList?.categories]);

    const handleCategory = (id: any, categoryCode: any, categoryName: any) => {
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
                        <AddCategory categoryid={id} categoryCode={categoryCode} categoryName={categoryName} />
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
                    pageName="Category List"
                    data={categoryList?.categories}
                    dataLength={categoryList?._metadata.totalcount}
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

                <Box>

                    <PaginationTable
                        data={tableRow ? tableRow : []}
                        columns={ColumnCategoryModule ? ColumnCategoryModule : []}
                        emptyPlaceHolder={
                            categoryList?._metadata?.totalcount == 0
                                ? "You currently do not have any data"
                                : "Loading..."
                        }
                        value={value}
                        total={categoryList?._metadata.totalcount}
                        totalPage={categoryList?._metadata.pagecount}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        nextPage={nextPage}
                        setNextPage={setNextPage}
                        previousPage={previousPage}
                        setPreviousPage={setPreviousPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        clickAction={false}
                        setContentAction={setContentAction}
                    />
                </Box>

            </Box>
        </div>
    )
}

export default CategoryList

