import styles from "./WalletManagement.module.scss";
import { useState, useEffect, useCallback } from "react";
import ActivityTypes from "../../types/ActivityTypes";
import OperantTable from "../../components/table/OperantTable";
import axios from "axios";
import * as React from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useHistory } from "react-router-dom";

interface dataTypes {
  id: string;
  business_name: string;
  transaction_amount: number;
  date: string;
}

const CreditSummary = () => {
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

  // const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

 
  useEffect(() => {
    axios
			.get<dataTypes[]>(`/axiosCall/walletMgt_credit.json`, { baseURL: '' })
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
      | "business_name"
      | "amount"
      | "date";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "business_name", label: "Payment type", minWidth: 100 },
    { id: "amount", label: "Transaction amount", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 100 },
  ];
  const TransactionRowTab = useCallback(
    (
      id: number | string,
      business_name: string,
      transaction_amount: string | number,
      date: string | number
    ) => ({
      id: id,
      business_name: business_name,
      amount: transaction_amount,
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
            each.business_name,
            each.transaction_amount,
            each.date
          )
        )
      );
    setRows(newRowOptions);
  }, [apiRes, TransactionRowTab]);


  return (
    <div>
    
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
     
    </div>
  );
};

export default CreditSummary;
