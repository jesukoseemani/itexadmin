import React from "react";
import NavBar from "../../components/navbar/NavBar";
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
import BlacklistCustomer from "./BlacklistCustomer";

const Customermgt = () => {
  const [tableRow, setTableRow] = useState<any[]>();
  const [customers, setCustomers] = useState<any>();
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
      name: "Status",
      value: status,
      setValue: setStatus,
      selective: [{ name: "YES" }, { name: "NO" }],
    },
  ];

  // fetching all customer list
  const fetchCustomers = async () => {
    dispatch(openLoader());
    try {
      const { data } = await axios.get(
        `/v1/customer?status=${status}&search=${value}&perpage=${rowsPerPage}&page=${pageNumber}`
      );
      console.log(data);
      setCustomers(data);
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
    setPageNumber(customers?._metadata?.page || 1);
  }, [customers]);

  useEffect(() => {
    Object.values(contentAction).length > 0 &&
      history.push(`/customer/${contentAction?.id}`);
  }, [contentAction]);

  const dataBusinesses = () => {
    const tempArr: CustomerModuleData[] = [];
    customers?.customers
      ?.slice(0)
      .reverse()
      .forEach((customer: any, index: number) => {
        return tempArr.push({
          id: customer?.id,
          blacklistreason: customer?.blacklistreason,
          firstname: customer?.firstname,
          lastname: customer?.lastname,
          email: customer?.email,
          identifier: customer?.identifier,
          merchantcode: customer?.business?.merchantcode,
          isblacklisted: customer?.isblacklisted ? "true" : "false",
        });
      });
    return tempArr;
  };

  useEffect(() => {
    setTableRow(dataBusinesses());
  }, [customers?.customers]);

  const handleDownload = async () => {
    try {
      const res = await axios.get<any>("/v1/customer/download");
      console.log(res);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // showBlacklistForm
  const showBlacklistForm = () => {
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
            <BlacklistCustomer />
          </div>
        ),
      })
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="Customer" />
      {/* padding: 1rem 2rem; */}

      <Box className={styles.blackist}>
        <button onClick={showBlacklistForm}>Blacklist</button>
      </Box>
      <Box width="100%" py={"1rem"} px={"2rem"}>
        <TableHeader
          pageName="Customers"
          data={customers?.customers}
          dataLength={customers?._metadata.totalcount}
          value={value}
          setValue={setValue}
          dropdown={dropdown}
          setDropdown={setDropdown}
          placeHolder="Search"
          handleClick={handleDownload}
        />

        <PaginationTable
          data={tableRow ? tableRow : []}
          columns={ColumnBusinessCustomerModule ? ColumnCustomerModule : []}
          emptyPlaceHolder={
            customers?._metadata?.totalcount == 0
              ? "You currently do not have any data"
              : "Loading..."
          }
          value={value}
          total={customers?._metadata.totalcount}
          totalPage={customers?._metadata.pagecount}
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
    </div>
  );
};

export default Customermgt;
