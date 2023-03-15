import styles from "./FraudRiskManagement.module.scss";
import { useState, useEffect, useCallback } from "react";
import ActivityTypes from "../../types/ActivityTypes";
import { useDispatch, useSelector } from "react-redux";
import OperantTable from "../../components/table/OperantTable";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import * as React from "react";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import FilterModal from "../../components/filterConfig/FilterModal";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import SingleSettlementModal from "../Settlement/SingleSettlementModal";
import BulkSettlement from "../Settlement/BulkSettlement";

interface dataTypes {
  id: string;
  acquirer: string;
  merchant_name: string;
  rrn: string;
  transaction_reference: string;
  amount: string;
  account: string;
}

const Chargeback = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [rows, setRows] = useState<ActivityTypes[]>([]);
  const [apiRes, setApiRes] = useState<dataTypes[]>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
    5
  );

  const [totalRows, setTotalRows] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dataValue, setDataValue] = useState<number | string>(0);
  const [isSingleModalOpen, setIsSingleModalOpen] = useState<boolean>(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [gotopage, setGotopage] = useState<boolean>(false);

  const show = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  const history = useHistory();

  const changePage = (value: number) => {
    setPageNumber(value);
  };

  const limit = (value: number) => {
    setRowsPerPage(value);
  };

  useEffect(() => {
    if (open) history.push(`/fraudmgt/chargeback/${dataValue}`);
  }, [dataValue, open]);

  const dispatch = useDispatch();

  const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

  useEffect(() => {
    axios
			.get<dataTypes[]>(`/axiosCall/fraudMgt_chargeback.json`, { baseURL: '' })
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
      | "acquirer"
      | "merchant_name"
      | "rrn"
      | "transaction_reference"
      | "amount"
      | "account";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "acquirer", label: "Acquirer", minWidth: 100 },
    { id: "merchant_name", label: "Merchant name", minWidth: 100 },
    { id: "rrn", label: "RRN", minWidth: 100 },
    {
      id: "transaction_reference",
      label: "Tranasaction Reference",
      minWidth: 100,
    },
    { id: "amount", label: "Amount", minWidth: 100 },
    { id: "account", label: "Account", minWidth: 100 },
  ];
  const TransactionRowTab = useCallback(
    (
      id: number | string,
      acquirer: string,
      merchant_name: string,
      rrn: string | number,
      transaction_reference: string | number,
      amount: string,
      account: string | number
    ) => ({
      id: id,
      acquirer: acquirer,
      merchant_name: merchant_name,
      rrn: rrn,
      transaction_reference: transaction_reference,
      amount: amount,
      account: account,
    }),
    []
  );
  useEffect(() => {
    const newRowOptions: any[] = [];
    apiRes &&
      apiRes?.map((each: any) =>
        newRowOptions.push(
          TransactionRowTab(
            each.id,
            each.acquirer,
            each.merchant_name,
            each.rrn,
            each.transaction_reference,
            each.amount,
            each.account
          )
        )
      );
    setRows(newRowOptions);
  }, [apiRes, TransactionRowTab]);

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

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="Fraud Management" />

      <Box sx={{ width: "auto", margin: "1rem" }}>
       
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderLeft}>
            <p className={styles.titleHead}>
              {apiRes?.length} Chargeback breakdown
            </p>
          </div>
          <div className={styles.tableHeaderRight}>
            <div className={styles.buttonDiv}>
              <button
                className={styles.buttonAdd}
                id="log-chargeback-button"
                aria-controls={open ? " chargeback-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={openBulkModal}
              >
                Upload
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

export default Chargeback;
