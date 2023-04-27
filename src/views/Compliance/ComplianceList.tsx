import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dayjs } from "dayjs";
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
import StatusView from "../../components/StatusView/StatusView";
import {
  ColumnComplianceModule,
  ComplianceModuleData,
} from "../../types/ComplianceTypes";
import { Box } from "@mui/material";
import TableHeader from "../../components/TableHeader/TableHeader";
import FilterModal from "../../components/filterConfig/FilterModal";
import PaginationTable from "../../components/paginatedTable/pagination-table";

const ComplianceList = () => {
  const [tableRow, setTableRow] = useState<any[]>();
  const [businesses, setBusinesses] = useState<any>();
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
  const fetchBusinesses = async () => {
    dispatch(openLoader());
    try {
      const { data } = await axios.get<any>(
        `/v1/compliance/business?perpage=${rowsPerPage}&page=${pageNumber}&search=${value}`
      );
      setBusinesses(data);
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
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, [bearer, value, pageNumber, rowsPerPage]);

  useEffect(() => {
    setPageNumber(businesses?._metadata?.page || 1);
  }, [businesses]);

  useEffect(() => {
    console.log(contentAction)
    Object.values(contentAction).length > 0 &&
      history.push(`/compliance/business/${contentAction.merchantid}`);
  }, [contentAction]);

  const dataBusinesses = () => {
    const tempArr: ComplianceModuleData[] = [];
    businesses?.businesses
      ?.slice(0)
      .reverse()
      .forEach((business: any, index: number) => {
        return tempArr.push({
          bizindustrycategory: business?.bizindustrycategory,
          businessemail: business?.businessemail,
          businessphone: business?.businessphone,
          tradingname: business?.tradingname,
          // country: business?.country,
          // merchantaccounttype: business?.merchantaccounttype,
          merchantcode: business?.merchantcode,
          merchantid: business?.merchantaccountid,
          // status: business?.status,
          // isapproved: business?.isapproved,
          docuploaded: business?.docuploaded,
          createdAt: business?.createdat,
        });
      });
    return tempArr;
  };

  useEffect(() => {
    setTableRow(dataBusinesses());
  }, [businesses?.businesses]);

  return (
    <div>
      <Box>
        <TableHeader
          pageName="Compliance"
          data={businesses?.businesses}
          dataLength={businesses?._metadata.totalcount}
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
            columns={ColumnComplianceModule ? ColumnComplianceModule : []}
            emptyPlaceHolder={
              businesses?._metadata?.totalcount == 0
                ? "You currently do not have any data"
                : "Loading..."
            }
            value={value}
            total={businesses?._metadata.totalcount}
            totalPage={businesses?._metadata.pagecount}
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
  );
};

export default ComplianceList;
