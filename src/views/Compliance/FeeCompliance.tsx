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
  ColumnComplianceFeeModule,
  ColumnComplianceLimitModule,
  ColumnComplianceModule,
  ComplianceFeeModuleData,
  ComplianceLimitModuleData,
  ComplianceModuleData,
} from "../../types/ComplianceTypes";
import { Box } from "@mui/material";
import TableHeader from "../../components/TableHeader/TableHeader";
import FilterModal from "../../components/filterConfig/FilterModal";
import PaginationTable from "../../components/paginatedTable/pagination-table";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import CompleteApproval from "../../components/complianceDetails/CompleteApproval";
import NavBar from '../../components/navbar/NavBar';

const FeeCompliance = () => {
  const [tableRow, setTableRow] = useState<any[]>();
  const [fee, setFee] = useState<any>();
  const [contentAction, setContentAction] = useState<any>({});
  const history = useHistory();

  const dispatch = useDispatch();
  //PAGINATION
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [previousPage, setPreviousPage] = useState<number | null>(null);
  const [merchantid, setMerchantId] = useState("");

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
    {
      name: "merchantid",
      value: merchantid,
      setValue: setMerchantId,
    },
  ];
  const fetchBusinessesLimit = async () => {
    dispatch(openLoader());
    try {
      const { data } = await axios.get<any>(
        `/v1/compliance/business/fee?search=${value}&status=${status}&perpage=${rowsPerPage}&page=${pageNumber}`
      );
      setFee(data);
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
    setPageNumber(fee?._metadata?.page || 1);
  }, [fee]);

  useEffect(() => {
    Object.values(contentAction).length > 0 &&
      history.push(`/businesses/${contentAction}`);
  }, [contentAction]);

  const dataBusinesses = () => {
    const tempArr: ComplianceFeeModuleData[] = [];
    fee?.fees
      ?.slice(0)
      .reverse()
      .forEach((fee: any, index: number) => {
        return tempArr.push({
          businessemail: fee?.business?.businessemail,
          activity: fee?.activity,
          tradingname: fee?.business?.tradingname,
          // transactiontype: fee?.transactiontype,
          feecap: fee?.feecap,
          feemin: fee?.feemin,
          merchantcode: fee?.business?.merchantcode,
          status: fee?.status,
          paymentmethod: fee?.paymentmethod,
          feesetting: fee?.feesetting,
          id: fee.id,
          action: fee?.approved ? "" : <button onClick={() => handleApproval(fee.id)}
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
          createdAt: fee?.createdat,
        });
      });
    return tempArr;
  };

  useEffect(() => {
    setTableRow(dataBusinesses());
  }, [fee?.fees]);





  const handleApproval = (fee: any) => {

    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <Box>
            <CompleteApproval id={fee} />
          </Box>
        ),
      })
    );
  }
  return (
    <div>
      <NavBar name="Fee" />

      <Box px={3} overflow="auto" width={"100%"}>
        <TableHeader
          pageName="Compliance"
          data={fee?.fees}
          dataLength={fee?._metadata.totalcount}
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
            columns={ColumnComplianceFeeModule ? ColumnComplianceFeeModule : []}
            emptyPlaceHolder={
              fee?._metadata?.totalcount == 0
                ? "You currently do not have any data"
                : "Loading..."
            }
            value={value}
            total={fee?._metadata.totalcount}
            totalPage={fee?._metadata.pagecount}
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

export default FeeCompliance;
