import styles from "./Settlement.module.scss";
import { useState, useEffect, useCallback } from "react";
import ActivityTypes from "../../types/ActivityTypes";
import { useDispatch, useSelector } from "react-redux";
import OperantTable from "../../components/table/OperantTable";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import { TabPanel } from "../../components/Tabs/Tabs";
import * as React from "react";

import Box from "@mui/material/Box";
import { Checkbox } from "@mui/material";

import Report from "./Report";
import { useHistory } from "react-router-dom";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import SingleSettlementModal from "./SingleSettlementModal";

import FilterModal from "../../components/filterConfig/FilterModal";
import moment from "moment";
import {
  openLoader,
  closeLoader,
} from "../../redux/actions/loader/loaderActions";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import {
  ColumnSettlementModule,
  SettlementModuleData,
} from "../../types/SettlementTypes";
import TableHeader from "../../components/TableHeader/TableHeader";
import PaginationTable from "../../components/paginatedTable/pagination-table";

import { Dayjs } from "dayjs";

import {
  dateNow,
  sevenDaysAgo,
  thirtyDaysAgo,
  startOfYear,
  endOfYear,
} from "../../util/datefunction";
import useDownload from "../../interfaces/Download";
import AddSingleSettlement from '../../components/settlement/AddSingleSettlement';
import BulkSettlement from "../../components/settlement/BulkSettlement";
interface data {
  open: boolean;
}

interface dataTypes {
  id: string;
  amount: string;
  settlementaccounttype: string;
  settlementaccountname: number;
  settlementcountry: string;
  settlementaccountnumber: string;
  businessemail: string;
  merchant_id: string;
  date: string;
}

const Settlements = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [settlementLogged, setSettlementLogged] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [isSingleModalOpen, setIsSingleModalOpen] = useState<boolean>(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<ActivityTypes[]>([]);
  const [apiRes, setApiRes] = useState<dataTypes[]>();

  const [settlement, setSettlement] = useState<any>();
  const [contentAction, setContentAction] = useState<any>({});
  const [value, setValue] = useState("");

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [tableRow, setTableRow] = useState<any[]>();

  const [totalRows, setTotalRows] = useState<number>(0);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [previousPage, setPreviousPage] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElDownload, setAnchorElDownload] = useState<null | HTMLElement>(
    null
  );
  const [activeChecked, setActiveChecked] = useState<boolean | undefined>(
    false
  );
  const [dropdown, setDropdown] = useState(false);

  const [dataValue, setDataValue] = useState<number | string>(0);
  const [selected, setSelected] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<{ id: string; type: string }>({
    id: "",
    type: "",
  });

  const [eventDate, setEventDate] = useState("");
  const [fromDate, setFromDate] = useState<Dayjs | null | string>("");
  const [toDate, setToDate] = useState<Dayjs | null | string>("");

  const [open, setOpen] = useState<boolean>(false);
  const [openDownload, setOpenDownload] = useState<boolean>(false);

  const [gotopage, setGotopage] = useState<boolean>(false);
  const [checkValue, setCheckValue] = useState<string[]>([])


  const show = Boolean(anchorEl);
  const showDownload = Boolean(anchorElDownload);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuDownloadClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElDownload(event.currentTarget);
  };
  const handleMenuDownloadClose = () => {
    setAnchorElDownload(null);
  };

  const HandleAllChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setActiveChecked(true);
      setSelected([]);
    } else {
      setActiveChecked(false);
      setSelected([]);
    }
  };

  useEffect(() => {
    if (gotopage) history.push("/settlement");
  }, [gotopage]);

  const checkChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedId({ id: value, type: "add" });
    } else {
      setSelectedId({ id: value, type: "remove" });
    }
  };

  useEffect(() => {
    const { id, type } = selectedId;
    if (type === "add") {
      if (!selected.includes(id)) {
        setSelected((prev: any) => [...prev, id]);
      }
    } else {
      const elems = selected?.filter((elem: any) => elem !== id);
      setSelected(elems);
    }
  }, [selectedId]);

  const openSingleModal = (data: string) => {
    console.log(data, "datatata")
    setIsSingleModalOpen(true);
    handleMenuClose();

    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <AddSingleSettlement id={data} />
          </div>
        ),
      })
    );
  };

  const openBulkModal = (checkValue: any) => {
    console.log(checkValue)
    setIsBulkModalOpen(true);
    handleMenuClose();

    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <BulkSettlement checkValue={checkValue} />
          </div>
        ),
      })
    );
  };

  const history = useHistory();

  const dispatch = useDispatch();

  // DATE CONVERTION
  const now = new Date();
  const dateNow = moment().format("YYYY-MM-DD");
  const sevenDaysAgo = moment().subtract(7, "day").format("YYYY-MM-DD");
  const thirtyDaysAgo = moment().subtract(30, "day").format("YYYY-MM-DD");
  const startOfYear = moment().startOf("year").format("YYYY-MM-DD");
  const endOfYear = moment().endOf("year").format("YYYY-MM-DD");

  // FOR FILTER METHOD

  //   const [fromDate, setFromDate] = useState("");
  //   const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const [bearer, setBearer] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [event, setEvent] = useState("");
  const [reset, setReset] = useState<boolean>(false);
  const [settlementId, setSettlementId] = useState<string | null>(null);
  const [merchantId, setMerchantId] = useState<number | null>(null);

  //PAGINATION

  useEffect(() => {
    if (event === "today") {
      setFromDate(dateNow);
      setToDate(dateNow);
    } else if (event === "last7days") {
      setFromDate(sevenDaysAgo);
      setToDate(dateNow);
    } else if (event === "last30days") {
      setFromDate(thirtyDaysAgo);
      setToDate(dateNow);
    } else if (event === "oneyear") {
      setFromDate(startOfYear);
      setToDate(endOfYear);
    } else {
      setFromDate("");
      setToDate("");
    }
  }, [event]);

  const filteredArray = [
    {
      name: "merchantid",
      value: merchantId,
      setValue: setMerchantId,
      type: "number"
    },
    {
      name: "settlementid",
      value: settlementId,
      setValue: setSettlementId,
      type: "text"
    },
  ];

  const clearHandler = () => {
    setEvent("");
    setFromDate("");
    setToDate("");
    setStatus("");
    setEmail("");
    setBearer(true);
    setIsFilterModalOpen(false);
  };

  const changePage = (value: number) => {
    setPageNumber(value);
  };

  const limit = (value: number) => {
    setRowsPerPage(value);
  };

  // useEffect(() => {
  // 	if (open && dataValue !== null) {
  // 		history.push(`/settlement/${dataValue}`);
  // 	}
  // }, [dataValue, open]);

  const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

  const fetchSettlement = async () => {
    dispatch(openLoader());
    try {
      const { data } = await axios.get(
        `/v1/settlement?fromdate=${fromDate}&search=${value}&todate=${toDate}&perpage=${rowsPerPage}&page=${pageNumber}`
      );
      setSettlement(data);
      dispatch(closeLoader());
      setBearer(false);
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
    fetchSettlement();
  }, [bearer, value, pageNumber, rowsPerPage]);

  useEffect(() => {
    setPageNumber(settlement?._metadata?.page || 1);
  }, [settlement]);

  // useEffect(() => {
  //   Object.values(contentAction).length > 0 &&
  //     // history.push(`/settlement/${contentAction?.settlement_id}`);
  // }, [contentAction]);

  // console.log(contentAction);

  const dataBusinesses = () => {
    const tempArr: SettlementModuleData[] = [];
    settlement?.settlements
      ?.slice(0)
      .reverse()
      .forEach((settlement: any, index: number) => {
        return tempArr.push({
          selectIds: settlement?.responsemessage !== "approved" && <Checkbox onChange={HandleChecked} value={settlement?.settlementid} />,
          account_name: settlement?.settlementaccountname,
          country: settlement?.settlementcountry,
          account_no: settlement?.settlementaccountnumber,
          bank_code: settlement?.settlementbankcode,
          businessemail: settlement?.business.businessemail,
          settlement_id: settlement?.settlementid,
          amount: settlement?.amount,
          action: settlement?.responsemessage === "approved" ? null : (<Box
            sx={{
              display: "flex",
              gap: "10px",

              '& button': {
                border: "none",
                outline: "none",
                width: "max-content",
                padding: "10px 20px",
                background: "#27ae60",
                color: "#fff",
              }
            }}
          >
            <button onClick={() => openSingleModal(settlement?.settlementid)}>Add Single </button>
            {/* <button onClick={openBulkModal}>Add Bulk</button> */}
          </Box>),
          date: settlement?.settlementdate,
          id: settlement?.settlement?.merchantaccountid,
        });
      });
    return tempArr;
  };

  useEffect(() => {
    setTableRow(dataBusinesses());
  }, [settlement?.settlements]);






  // bulk setlement

  const HandleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target
    if (checked) {
      setCheckValue((prev) => [...prev, value])
    } else {
      setCheckValue((prev) => prev.filter(x => x !== value))
    }
  }
  console.log(checkValue)


  // download

  const { calDownload } = useDownload(
    { url: 'https://staging.itex-pay.com/ipgadmin/api/v1/settlement/download', filename: 'settlement.csv' }
  );

  const handleDownload = async () => {
    try {
      dispatch(openLoader());
      await calDownload();
      dispatch(closeLoader());
    } catch (error) {
      dispatch(closeLoader());
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="" />

      <Box sx={{ width: "100%", marginTop: "1rem" }}>


        {/* </ > */}
        <div className={styles.m1}>
          <TableHeader
            pageName="Settlements"
            data={settlement?.settlements}
            dataLength={settlement?._metadata.totalcount}
            value={value}
            setValue={setValue}
            dropdown={dropdown}
            setDropdown={setDropdown}
            handleClick={handleDownload}
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

          {checkValue.length > 0 && <Box
            sx={{
              width: "100%",
              pb: "1rem",
              '& button': {
                float: "right",
                border: "none",
                outline: "none",
                width: "max-content",
                padding: "10px 20px",
                background: "#27ae60",
                color: "#fff",
                cursor: "pointer"
              }
            }}
          >
            <button onClick={() => openBulkModal(checkValue)}>Add Bulk settlement</button>
          </Box>}


          <Box sx={{ overflow: "auto", marginTop: "2rem" }}>

            <PaginationTable
              data={tableRow ? tableRow : []}
              columns={ColumnSettlementModule ? ColumnSettlementModule : []}
              emptyPlaceHolder={
                settlement?._metadata?.totalcount == 0
                  ? "You currently do not have any data"
                  : "Loading..."
              }
              value={value}
              total={settlement?._metadata.totalcount}
              totalPage={settlement?._metadata.pagecount}
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

      </Box >
    </div >
  );
};

export default Settlements;
