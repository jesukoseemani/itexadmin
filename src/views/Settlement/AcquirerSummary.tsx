import styles from "./Settlement.module.scss";
import { useState, useEffect, useCallback } from "react";
import ActivityTypes from "../../types/ActivityTypes";
import { useDispatch, useSelector } from "react-redux";
import OperantTable from "../../components/table/OperantTable";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useHistory } from "react-router-dom";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import SingleSettlementModal from "./SingleSettlementModal";
import BulkSettlement from "./BulkSettlement";
import FilterModal from "../../components/filterConfig/FilterModal";

interface data {
  open: boolean;
}

interface dataTypes {
  id: string;
  transaction_id: string;
  currency: string;
  amount: string;
  amount_processed: string;
  volume: string;
  reference: string;
  business_name: string;
  provider: string;
  country: string;
  merchant_id: string;
  date: string;
}


const AcquirerSummary = () => {
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
      | "amount"
      | "business_name"
      | "provider"
      | "amount_processed"
      | "currency";
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "transaction_id", label: "Transaction ID", minWidth: 100 },
    { id: "amount", label: "Transaction Cost", minWidth: 100 },
    { id: "business_name", label: "Provider name", minWidth: 100 },
    { id: "provider", label: "Provider platform", minWidth: 100 },
    { id: "amount_processed", label: "Transaction amount processed", minWidth: 100 },
    { id: "currency", label: "Currency", minWidth: 100 },
  ];
  const SettlementsRowTab = useCallback(
    (
      id: "string",
      transaction_id: "string",
      amount: "string",
      business_name: "string",
      provider: "string",
      amount_processed: "string",
      currency: "string"
    ) => ({
      id: id,
      transaction_id: transaction_id,
      amount: amount,
      business_name: business_name,
      provider: provider,
      amount_processed: amount_processed,
      currency: currency
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
              each.amount,
              each.business_name,
              each.provider,
              each.amount_processed,
              each.currency
            )
          )
        );
    setRows(newRowOptions);
  }, [apiRes, SettlementsRowTab, activeChecked]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
   
      <Box sx={{ width: "100%", marginTop: "1rem" }}>
        <FilterModal
          isOpen={isFilterModalOpen}
          handleClose={() => setIsFilterModalOpen(false)}
        />
      
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

      </Box>
    </div>
  );
};

export default AcquirerSummary;
