import styles from "./WalletManagement.module.scss";
import { useState, useEffect, useCallback } from "react";
import ActivityTypes from "../../types/ActivityTypes";
import OperantTable from "../../components/table/OperantTable";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useHistory } from "react-router-dom";
import {useSelector} from 'react-redux'

interface dataTypes {
  id: string;
  status: string;
  business_name: string;
  transaction_amount: number;
  transaction_reference: string;
  debit_type: string;
  date: string;
}

const Debit = () => {
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

  const [dataValue, setDataValue] = useState<number | string>(0);

  const [open, setOpen] = useState<boolean>(false);

  const history = useHistory();

  const changePage = (value: number) => {
    setPageNumber(value);
  };

  const limit = (value: number) => {
    setRowsPerPage(value);
  };

  useEffect(() => {
    if (open) history.push(`/walletmgt/debit/${dataValue}`);
  }, [dataValue, open]);

  const { access_token } = useSelector((state:any) => state?.authPayReducer?.auth);

  useEffect(() => {
    axios
			.get<dataTypes[]>(`/axiosCall/walletMgt_debit.json`, { baseURL: '' })
			.then((res) => {
				setApiRes(res.data);
			});
  }, []);

  useEffect(() => {
    setTotalRows(Number(apiRes?.length));
  }, [apiRes, rows]);

  interface Column {
    id:
      | "status"
      | "business_name"
      | "transaction_amount"
      | "transaction_reference"
      | "debit_type"
      | "date";

    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "status", label: "Status", minWidth: 100 },
    {
      id: "business_name",
      label: "Business name",
      align: "left",
      minWidth: 100,
    },
    {
      id: "transaction_amount",
      label: "Transaction amount",
      align: "left",
      minWidth: 100,
    },
    { id: "transaction_reference", label: "Transaction Reference", minWidth: 100 },
    {
      id: "debit_type",
      label: "Debit Type",
      align: "left",
      minWidth: 100,
    },
    { id: "date", label: "Date", align: "left", minWidth: 100 },
  ];

  const LoanRowTab = useCallback(
    (   
      id: number | string,
      status: string,
      business_name: number,
      transaction_amount: string,
      transaction_reference: string,
      debit_type: string,
      date: string
    ) => ({
      status: (
        <span
          className={styles.tableSpan}
          style={{
            backgroundColor:
              (status === "Approved" && "#27AE60") ||
              (status === "Declined" && "#EB5757") ||
              (status === "Pending" && "#F2C94C") ||
              "rgba(169, 170, 171, 0.22)",
            color:
              (status === "Approved" && "#FFFFFF") ||
              (status === "Declined" && "#FFFFFF") ||
              (status === "Pending" && "#12122C") ||
              "#FFFFFF",
          }}
        >
          {status}
        </span>
      ),
      business_name: business_name,
      transaction_amount: transaction_amount,
      transaction_reference: transaction_reference,
      debit_type: debit_type,
      date: date,
    }),
    []
  );
  useEffect(() => {
    const newRowOptions: any[] = [];
    apiRes &&
      apiRes?.map((each: any) =>
        newRowOptions.push(
          LoanRowTab(
            each.id,
            each.status,
            each.business_name,
            each.transaction_amount,
            each.transaction_reference,
            each.debit_type,
            each.date
          )
        )
      );
    setRows(newRowOptions);
  }, [apiRes, LoanRowTab]);

  return (
    <div>
      <Box sx={{ width: "100%", marginTop: "1rem" }}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderLeft}>
            <p className={styles.titleHead}>
              {apiRes?.length} businesses
            </p>
          </div>
          <div className={styles.tableHeaderRight}>
            <div className={styles.buttonDiv}>
              <button className={styles.button1}>
                <span className={styles.buttonSpan}>
                  All Transactions
                  <ArrowDropDownIcon />
                </span>
              </button>

              <button className={styles.button2}>
                <p className={styles.buttonSpan}>
                  Download
                  <span className={styles.mlhalf}>
                    <CloudDownloadIcon />
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

export default Debit;
