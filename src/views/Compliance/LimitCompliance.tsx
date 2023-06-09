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
  ColumnComplianceLimitModule,
  ColumnComplianceModule,
  ComplianceLimitModuleData,
  ComplianceModuleData,
} from "../../types/ComplianceTypes";
import { Box } from "@mui/material";
import TableHeader from "../../components/TableHeader/TableHeader";
import FilterModal from "../../components/filterConfig/FilterModal";
import PaginationTable from "../../components/paginatedTable/pagination-table";
import CompleteApproval from "../../components/complianceDetails/CompleteApproval";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import NavBar from '../../components/navbar/NavBar';

const LimitCompliance = () => {
  const [tableRow, setTableRow] = useState<any[]>();
  const [limit, setLimit] = useState<any>();
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
  const fetchBusinessesLimit = async () => {
    dispatch(openLoader());
    try {
      const { data } = await axios.get<any>(
        `/v1/compliance/business/limit?search=${value}&status=${status}&perpage=${rowsPerPage}&page=${pageNumber}`
      );
      setLimit(data);
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
    fetchBusinessesLimit();
  }, [bearer, value, pageNumber, rowsPerPage]);

  useEffect(() => {
    setPageNumber(limit?._metadata?.page || 1);
  }, [limit]);

  useEffect(() => {
    Object.values(contentAction).length > 0 &&
      history.push(`/businesses/${contentAction}`);
  }, [contentAction]);

  const dataBusinesses = () => {
    const tempArr: ComplianceLimitModuleData[] = [];
    limit?.limits
      ?.slice(0)
      .reverse()
      .forEach((limit: any, index: number) => {
        return tempArr.push({
          businessemail: limit?.business?.businessemail,
          activity: limit?.activity,
          tradingname: limit?.business?.tradingname,
          transactiontype: limit?.transactiontype,
          minlimit: limit?.minlimit,
          maxlimit: limit?.maxlimit,
          merchantcode: limit?.business?.merchantcode,
          // status: limit?.status,
          paymentmethod: limit?.paymentmethod,
          limittype: limit?.limittype,
          createdAt: limit?.createdat,
          id: limit.id,
          action: limit?.approved ? null : <button onClick={() => handleApproval(limit?.id)}
            style={{
              outline: "none",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              background: "#219653",
              color: "#fff",
              width: "max-content"
            }}



          >Complete Approval</button>,


        });
      });
    return tempArr;
  };

  useEffect(() => {
    setTableRow(dataBusinesses());
  }, [limit?.limits]);



  const handleApproval = (limit: any) => {

    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <Box>
            <CompleteApproval id={limit} />
          </Box>
        ),
      })
    );
  }

  return (
    <div>
      <NavBar name="Limit" />

      <Box px={3} overflow="auto" width={"100%"}>
        <TableHeader
          pageName="Compliance"
          data={limit?.limits}
          dataLength={limit?._metadata.totalcount}
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
            columns={
              ColumnComplianceLimitModule ? ColumnComplianceLimitModule : []
            }
            emptyPlaceHolder={
              limit?._metadata?.totalcount == 0
                ? "You currently do not have any data"
                : "Loading..."
            }
            value={value}
            total={limit?._metadata.totalcount}
            totalPage={limit?._metadata.pagecount}
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
  );
};

export default LimitCompliance;
