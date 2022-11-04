import styles from "./WalletManagement.module.scss";
import { useState, useEffect, useCallback } from "react";
import ActivityTypes from "../../types/ActivityTypes";
import { useSelector } from "react-redux";
import OperantTable from "../../components/table/OperantTable";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useHistory } from "react-router-dom";

interface dataTypes {
  id: string;
  provider: string;
  amount: string;
  cost: number;
  income: string;
  date: string;
}

const ProviderSummary = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [rows, setRows] = useState<ActivityTypes[]>([]);
  const [apiRes, setApiRes] = useState<dataTypes[]>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
    10
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

  // useEffect(() => {
  //   if (open) history.push(`/walletmgt/${dataValue}`);
  // }, [dataValue, open]);

  const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

  useEffect(() => {
    axios
			.get<dataTypes[]>(`/axiosCall/walletMgt_providerSummary.json`, {
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
      | "provider"
      | "amount"
      | "cost"
      | "income"
      | "date";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "provider", label: "Provider", minWidth: 100 },
    { id: "amount", label: "Total amount funded", minWidth: 100 },
    { id: "cost", label: "Cost", minWidth: 100 },
    { id: "income", label: "Income", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 100 },
  ];
  const TransactionRowTab = useCallback(
    (
      id: number | string,
      provider: string,
      amount: string,
      cost: string | number,
      income: string | number,
      date: string | number
    ) => ({
      id: id,
      provider: provider,
      amount: amount,
      cost: cost,
      income: income,
      date: date,
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
            each.provider,
            each.amount,
            each.cost,
            each.income,
            each.date
          )
        )
      );
    setRows(newRowOptions);
  }, [apiRes, TransactionRowTab]);

  return (
    <div>
      <Box sx={{ width: "100%", marginTop: "1rem" }}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderLeft}>
            <p className={styles.titleHead}>{apiRes?.length} businesses</p>
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

export default ProviderSummary;
