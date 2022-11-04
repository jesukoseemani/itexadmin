import styles from "./FraudRiskManagement.module.scss";
import { useState, useEffect, useCallback } from "react";
import ActivityTypes from "../../types/ActivityTypes";
import { useDispatch, useSelector } from "react-redux";
import OperantTable from "../../components/table/OperantTable";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import * as React from "react";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useHistory } from "react-router-dom";
import FilterModal from '../../components/filterConfig/FilterModal';
import RatioModal from "./RatioModal";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";

interface data {
  open: boolean;
}

interface dataTypes {
  id: string;
  merchant_id: string;
  status: string;
  cb_ratio: number;
  fraud_ratio: string;
  risk_status: string;
}

const CBFraudRatio = () => {
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

  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  const history = useHistory();

  const changePage = (value: number) => {
    setPageNumber(value);
  };

  const limit = (value: number) => {
    setRowsPerPage(value);
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
              <RatioModal
                dataValue={dataValue}
                open={open}
                setOpen={setOpen}
              />
            </div>
          ),
        })
      );
  }, [dataValue, open]);

  const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

  useEffect(() => {
    axios
			.get<dataTypes[]>(`/axiosCall/fraudMgt_cbandfraudratio.json`, {
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
      | "merchant_id"
      | "status"
      | "cb_ratio"
      | "fraud_ratio"
      | "risk_status";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "merchant_id", label: "Merchant ID", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "cb_ratio", label: "Chargeback ratio threshold", minWidth: 100 },
    { id: "fraud_ratio", label: "Fraud ratio threshold", minWidth: 100 },
    { id: "risk_status", label: "Risk Status", minWidth: 100 },
  ];
  const TransactionRowTab = useCallback(
    (
      id: number | string,
      merchant_id: string,
      status: string,
      cb_ratio: string | number,
      fraud_ratio: string | number,
      risk_status: string | number
    ) => ({
      merchant_id: merchant_id,
      status: (
        <span
          className={styles.tableSpan}
          style={{
            backgroundColor:
              (status === "Successful" && "#27AE60") ||
              (status === "Error" && "#EB5757") ||
              (status === "Pending" && "#F2C94C") ||
              "rgba(169, 170, 171, 0.22)",
            color:
              (status === "Successful" && "#FFFFFF") ||
              (status === "Error" && "#FFFFFF") ||
              (status === "Pending" && "#12122C") ||
              "#FFFFFF",
          }}
        >
          {status}
        </span>
      ),
      cb_ratio: cb_ratio,
      fraud_ratio: fraud_ratio,
      risk_status: risk_status,
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
            each.merchant_id,
            each.status,
            each.cb_ratio,
            each.fraud_ratio,
            each.risk_status
          )
        )
      );
    setRows(newRowOptions);
  }, [apiRes, TransactionRowTab]);

  const dispatch = useDispatch();

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="Fraud Management" />

      <Box sx={{ width: "auto", margin: "1rem" }}>
      <FilterModal
					isOpen={isFilterModalOpen}
					handleClose={() => setIsFilterModalOpen(false)}
				/>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderLeft}>
              <p className={styles.titleHead}>{apiRes?.length} Fruad Summary</p>
            </div>
            <div className={styles.tableHeaderRight}>
              <div className={styles.buttonDiv}>
                <button className={styles.button1} onClick={() => setIsFilterModalOpen(true)} >
                  <span className={styles.buttonSpan}>
                    Filter
                    <ArrowDropDownIcon />
                  </span>
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

export default CBFraudRatio;
