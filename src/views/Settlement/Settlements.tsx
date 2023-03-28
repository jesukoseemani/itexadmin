import styles from "./Settlement.module.scss";
import { useState, useEffect, useCallback } from "react";
import ActivityTypes from "../../types/ActivityTypes";
import { useDispatch, useSelector } from "react-redux";
import OperantTable from "../../components/table/OperantTable";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import { TabPanel } from "../../components/Tabs/Tabs";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Divider, Menu, MenuItem } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FailedSettlements from "./FailedSettlements";
import ReviewedSettlements from "./ReviewedSettlements";
import Report from "./Report";
import { useHistory } from "react-router-dom";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import SingleSettlementModal from "./SingleSettlementModal";
import { Checkbox } from "@material-ui/core";
import BulkSettlement from "./BulkSettlement";
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
import DueSettlement from "./DueSettlement";
import { Dayjs } from "dayjs";

import {
  dateNow,
  sevenDaysAgo,
  thirtyDaysAgo,
  startOfYear,
  endOfYear,
} from "../../util/datefunction";
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

  const openSingleModal = () => {
    setIsSingleModalOpen(true);
    handleMenuClose();

    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <SingleSettlementModal />
          </div>
        ),
      })
    );
  };

  const openBulkModal = () => {
    setIsBulkModalOpen(true);
    handleMenuClose();

    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <BulkSettlement title="Bulk Settlement" setGotopage={setGotopage} />
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
  const [settlementId, setSettlementId] = useState("");
  const [merchantId, setMerchantId] = useState("");

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
    },
    {
      name: "settlementid",
      value: settlementId,
      setValue: setSettlementId,
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

  useEffect(() => {
    Object.values(contentAction).length > 0 &&
      history.push(`/settlement/${contentAction?.settlement_id}`);
  }, [contentAction]);

  console.log(contentAction);

  const dataBusinesses = () => {
    const tempArr: SettlementModuleData[] = [];
    settlement?.settlements
      ?.slice(0)
      .reverse()
      .forEach((settlement: any, index: number) => {
        return tempArr.push({
          account_name: settlement?.settlementaccountname,
          country: settlement?.settlementcountry,
          account_no: settlement?.settlementaccountnumber,
          bank_code: settlement?.settlementbankcode,
          businessemail: settlement?.business.businessemail,
          settlement_id: settlement?.settlementid,
          amount: settlement?.amount,
          // // status: (
          // // 	<StatusView
          // // 		status={business?.status === 0 ? 'InActive' : 'Active'}
          // // 		green='Active'
          // // 		red='InActive'
          // // 	/>
          // ),
          date: settlement?.settlementdate,
          id: settlement?.settlement?.merchantaccountid,
        });
      });
    return tempArr;
  };

  useEffect(() => {
    setTableRow(dataBusinesses());
  }, [settlement?.settlements]);

  // download settlement list
  const handleDownloadSettlement = async () => {
    dispatch(openLoader());

    try {
      const { data } = await axios.get(
        `/v1/settlement/download?fromdate=${fromDate}&todate=${toDate}&perpage=${rowsPerPage}&page=${pageNumber}`
      );
      console.log(data);
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

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="" />

      <Box sx={{ width: "100%", marginTop: "1rem" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            style={{ padding: "0 1rem", margin: "0" }}
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              style: {
                background: "#27AE60",
                borderRadius: "8px",
                height: "4px",
              },
            }}
          >
            <Tab
              label="All Settlements"
              style={{
                margin: "0 1rem",
                textTransform: "capitalize",
                color: tabValue === 0 ? "#27AE60" : "#333333",
              }}
            />
            <Tab
              label="settlements Due"
              style={{
                textTransform: "capitalize",
                margin: "0 1rem",
                color: tabValue === 1 ? "#27AE60" : "#333333",
              }}
            />
            {/* <Tab
							label='Failed settlements'
							style={{
								textTransform: 'capitalize',
								margin: '0 1rem',
								color: value === 2 ? '#27AE60' : '#333333',
							}}
						/>
						<Tab
							label='Reports'
							style={{
								textTransform: 'capitalize',
								margin: '0 1rem',
								color: value === 3 ? '#27AE60' : '#333333',
							}}
						/> */}
          </Tabs>
        </Box>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderLeft}>
            {/* <p className={styles.tableTitle}>
							{
								apiRes?.filter((item: dataTypes) => item.status === 'Due')
									.length
							}{' '}
							{value === 0
								? 'settlement due fees'
								: value === 1
								? 'Reviewed settlements'
								: value === 2
								? 'Failed settlements'
								: 'Reports'}
						</p> */}
          </div>
          <div className={styles.tableHeaderRight}>
            <div>
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className={styles.button1}
              >
                <span className={styles.buttonSpan}>
                  All Settlements
                  <ArrowDropDownIcon />
                </span>
              </button>

              <button
                className={styles.button1}
                id="download-menu"
                aria-controls={openDownload ? "download-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openDownload ? "true" : undefined}
                onClick={handleMenuDownloadClick}
              >
                <p className={styles.buttonSpan}>
                  Download
                  <span className={styles.mlhalf}>
                    <CloudDownloadIcon style={{ fontSize: 15 }} />
                  </span>
                </p>
              </button>

              <Menu
                id="download-menu"
                anchorEl={anchorElDownload}
                open={showDownload}
                onClose={handleMenuDownloadClose}
                MenuListProps={{
                  "aria-labelledby": "log-refund-button",
                }}
                PaperProps={{
                  style: {
                    width: "150px",
                    padding: ".25rem",
                    textAlign: "center",
                  },
                }}
              >
                <MenuItem onClick={handleDownloadSettlement}>
                  <p style={{ padding: ".4rem", fontSize: "0.7rem" }}>CSV</p>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <p style={{ padding: ".4rem", fontSize: "0.7rem" }}>Excel</p>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <p style={{ padding: ".4rem", fontSize: "0.7rem" }}>Pdf</p>
                </MenuItem>
              </Menu>

              <button
                className={styles.buttonAdd}
                id="log-refund-button"
                aria-controls={open ? "refund-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleMenuClick}
              >
                Log settlement
              </button>
              <Menu
                id="refund-menu"
                anchorEl={anchorEl}
                open={show}
                onClose={handleMenuClose}
                MenuListProps={{
                  "aria-labelledby": "log-refund-button",
                }}
                PaperProps={{
                  style: {
                    maxWidth: "150px",
                    padding: ".25rem",
                  },
                }}
              >
                <MenuItem onClick={openSingleModal}>
                  <p style={{ padding: ".4rem", fontSize: "0.7rem" }}>
                    Single settlement
                  </p>
                </MenuItem>
                <Divider />
                <MenuItem onClick={openBulkModal}>
                  <p style={{ padding: ".4rem", fontSize: "0.7rem" }}>
                    Bulk settlement
                  </p>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <TabPanel value={tabValue} index={0}>
          <div className={styles.m1}>
            <TableHeader
              pageName="Settlements"
              data={settlement?.settlements}
              dataLength={settlement?._metadata.totalcount}
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
          </div>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <DueSettlement />
        </TabPanel>

        {/* <TabPanel value={tabValue} index={2}>
					<DueSettlement />
				</TabPanel> */}

        {/* <TabPanel value={tabValue} index={3}>
					<Report />
				</TabPanel> */}
      </Box>
    </div>
  );
};

export default Settlements;
