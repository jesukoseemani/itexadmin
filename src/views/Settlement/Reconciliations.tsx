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
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useHistory } from "react-router-dom";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import SingleSettlementModal from "./SingleSettlementModal";
import BulkSettlement from "./BulkSettlement";
import FilterModal from "../../components/filterConfig/FilterModal";
import SettlementSummary from "./SettlementSummary"
import AcquirerSummary from "./AcquirerSummary"
import ReconciliationsModal from "./ReconciliationsModal"

interface data {
  open: boolean;
}

interface dataTypes {
  id: string;
  transaction_id: string;
  currency: string;
  amount: string;
  reference: string;
  business_name: string;
  country: string;
  date: string;
}

const Reconciliations = () => {
  const [value, setValue] = React.useState(0);
  const [settlementLogged, setSettlementLogged] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [isSingleModalOpen, setIsSingleModalOpen] = useState<boolean>(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<ActivityTypes[]>([]);
  const [apiRes, setApiRes] = useState<dataTypes[]>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeChecked, setActiveChecked] = useState<boolean | undefined>(
    false
  );
  const [dataValue, setDataValue] = useState<number | string>(0);
  const [selected, setSelected] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<{ id: string; type: string }>({
    id: "",
    type: "",
  });
  const [open, setOpen] = useState<boolean>(false);

  const [gotopage, setGotopage] = useState<boolean>(false);

  const show = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
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
    open &&
      dispatch(
        openModalAndSetContent({
          modalStyles: {
            padding: 0,
          },
          modalContent: (
            <div className="modalDiv">
              <ReconciliationsModal
                dataValue={dataValue}
                open={open}
                setOpen={setOpen}
              />
            </div>
          ),
        })
      );
  }, [dataValue, open]);

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

  const changePage = (value: number) => {
    setPageNumber(value);
  };

  const limit = (value: number) => {
    setRowsPerPage(value);
  };

  useEffect(() => {
    if (open && dataValue !== null) {
      history.push(`/settlement/${dataValue}`);
    }
  }, [dataValue, open]);

  const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

  useEffect(() => {
    axios
			.get<dataTypes[]>(`/axiosCall/settlement_reconciliation.json`, {
				baseURL: '',
			})
			.then((res) => {
				setApiRes(res.data);
			});
  }, []);

  useEffect(() => {
    setTotalRows(Number(apiRes?.length));
  }, [apiRes, rows]);

  interface Column {
    id:
      | "id"
      | "transaction_id"
      | "currency"
      | "amount"
      | "reference"
      | "business_name"
      | "country"
      | "date";
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "transaction_id", label: "Transaction ID", minWidth: 100 },
    { id: "currency", label: "Currency", minWidth: 100 },
    { id: "amount", label: "Amount", minWidth: 100 },
    { id: "reference", label: "ITEX Reference", minWidth: 100 },
    { id: "business_name", label: "Business Name", minWidth: 100 },
    { id: "country", label: "Country", minWidth: 100 },
    { id: "date", label: "Transaction Date", minWidth: 100 },
  ];
  const SettlementsRowTab = useCallback(
    (
      id: "string",
      transaction_id: "string",
      currency: "string",
      amount: "string",
      reference: "string",
      business_name: "string",
      country: "string",
      date: "string"
    ) => ({
      id: id,
      transaction_id: transaction_id,
      currency: currency,
      amount: amount,
      reference: reference,
      business_name: business_name,
      country: country,
      date: date
    }),
    []
  );

  useEffect(() => {
    const newRowOptions: any[] = [];
    apiRes &&
      apiRes
        .map((each: any) =>
          newRowOptions.push(
            SettlementsRowTab(
              each.id,
              each.transaction_id,
              each.currency,
              each.reference,
              each.amount,
              each.business_name,
              each.country,
              each.date
            )
          )
        );
    setRows(newRowOptions);
  }, [apiRes, SettlementsRowTab, activeChecked]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="" />

      <Box sx={{ width: "100%", marginTop: "1rem" }}>
      
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            style={{ padding: "0 1rem", margin: "0" }}
            value={value}
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
              label="Settlements transaction"
              style={{
                margin: "0 1rem",
                textTransform: "capitalize",
                color: value === 0 ? "#27AE60" : "#333333",
              }}
            />
            <Tab
              label="Settlements transaction summary"
              style={{
                textTransform: "capitalize",
                margin: "0 1rem",
                color: value === 1 ? "#27AE60" : "#333333",
              }}
            />
            <Tab
              label="Acquirer/Provider summary"
              style={{
                textTransform: "capitalize",
                margin: "0 1rem",
                color: value === 2 ? "#27AE60" : "#333333",
              }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderLeft}>
              <p className={styles.tableTitle}>
                {
                  apiRes?.length
                } settlements
              </p>
            </div>
            <div className={styles.tableHeaderRight}>
              <div>
                <button className={styles.button1}>
                  <span
                    className={styles.buttonSpan}
                    onClick={() => setIsFilterModalOpen(true)}
                  >
                    All Settlements
                    <ArrowDropDownIcon />
                  </span>
                </button>

                <button className={styles.button1}>
                  <p className={styles.buttonSpan}>
                    Download
                    <span className={styles.mlhalf}>
                      <CloudDownloadIcon style={{ fontSize: 15 }} />
                    </span>
                  </p>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.m1}>
            <OperantTable
              columns={columns}
              rows={rows}
              totalRows={totalRows}
              changePage={changePage}
              limit={limit}
              setDataValue={setDataValue}
              setOpen={setOpen}
            />
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <SettlementSummary />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <AcquirerSummary />
        </TabPanel>

      </Box>
    </div>
  );
};

export default Reconciliations;
